import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import api from "../API/axiosConfig";
import { useAuth } from "./useAuth";
import { Employee } from "../components/utils/types/Employee";
import { TipRate } from "../components/utils/types/TipRate";
import { ChildrenProps } from "../components/utils/types/ChildrenProps";

interface EmployerContextProviderType {
  tipRates: TipRate[];
  setTipRates: React.Dispatch<React.SetStateAction<TipRate[]>>;
  employees: string[];
  setEmployees: React.Dispatch<React.SetStateAction<string[]>>;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  calculateTips: boolean;
  setCalculateTips: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmployerContext = createContext({});

export const EmployerContextProvider = ({ children }: ChildrenProps) => {
  const { user } = useAuth();
  const [tipRates, setTipRates] = useState<TipRate[]>([]);
  const [employees, setEmployees] = useState<string[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [calculateTips, setCalculateTips] = useState(false);


  useEffect(() => {
    try {
      api
        .get("/employer/rates", {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        })
        .then((res) => {
          setTipRates(res.data);
        });
    } catch (error) { }
  }, [user]);

  useEffect(() => {
    try {
      api
        .get("/employees/current", {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        })
        .then((res) => {
          setEmployees(res.data);
        });
    } catch (error) { }
  }, [refresh, user])

  const value = useMemo(
    () => ({
      tipRates,
      setTipRates,
      employees,
      setEmployees,
      refresh,
      setRefresh,
      calculateTips,
      setCalculateTips
    }),
    [employees, tipRates, refresh]
  );

  return (
    <EmployerContext.Provider value={value}>
      {children}
    </EmployerContext.Provider>
  );
};

export const useEmployerInfo = () => {
  return useContext(EmployerContext) as EmployerContextProviderType;
};
