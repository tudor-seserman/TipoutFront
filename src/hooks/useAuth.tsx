import React, { createContext, useContext, useMemo } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import api from "../API/axiosConfig";

interface AuthContextProps {
  children: React.ReactNode;
}
interface AuthProviderType {
  user: { keyName: "token"; accessToken: "" };
  login: (loginFormDTO: {}) => NavigateFunction;
  logout: () => null;
}

const AuthContext = createContext({});

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useLocalStorage({
    keyName: "token",
    accessToken: "",
  });

  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (loginFormDTO: {}) => {
    try {
      const response = await api.post("auth/login", loginFormDTO, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setUser({
        keyName: "token",
        accessToken: response.data.accessToken,
      });
      // localStorage.setItem("token", response.data.accessToken);
      if (localStorage.getItem("token")) {
        return navigate("/");
      }
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert("Does not match user information on record.");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        // and an instance of http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    }
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext) as AuthProviderType;
};
