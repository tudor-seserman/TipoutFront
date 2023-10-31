import React from "react";
import NavBar from "./navBars/NavBar";
import { useAuth } from "../hooks/useAuth";
import LoggedInNavBar from "./navBars/LoggedInNavBar";

const Banner = () => {
  const { user } = useAuth();
  return (
    <>
      {!user && <NavBar />}
      {user && <LoggedInNavBar />}
    </>
  );
};

export default Banner;
