import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ContextProps } from "../components/utils/types/ContextProps";
import api from "../API/axiosConfig";
import { useAuth } from "./useAuth";
import { Employee } from "../components/utils/types/Employee";
import { TipRate } from "../components/utils/types/TipRate";

interface EmployerContextProviderType {
  moneyHandlers: Employee[];
  setMoneyHandlers: React.Dispatch<React.SetStateAction<Employee[]>>;
  nonMoneyHandlers: Employee[];
  setNonMoneyHandlers: React.Dispatch<React.SetStateAction<Employee[]>>;
  tipRates: TipRate[];
  setTipRates: React.Dispatch<React.SetStateAction<TipRate[]>>;
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  calculateTips: boolean;
  setCalculateTips: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmployerContext = createContext({});

export const EmployerContextProvider = ({ children }: ContextProps) => {
  const { user } = useAuth();
  const [moneyHandlers, setMoneyHandlers] = useState<Employee[]>([]);
  const [nonMoneyHandlers, setNonMoneyHandlers] = useState<Employee[]>([]);
  const [tipRates, setTipRates] = useState<TipRate[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [calculateTips, setCalculateTips] = useState(false);


  useEffect(() => {
    try {
      api
        .get("/calculate/EmployeeTipMap", {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        })
        .then((res) => {
          setMoneyHandlers(res.data.moneyHandlers);
          setNonMoneyHandlers(res.data.nonMoneyHandlers);
        });
    } catch (error) { }
  }, [user, calculateTips]);

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
      moneyHandlers,
      setMoneyHandlers,
      nonMoneyHandlers,
      setNonMoneyHandlers,
      tipRates,
      setTipRates,
      employees,
      setEmployees,
      refresh,
      setRefresh,
      calculateTips,
      setCalculateTips
    }),
    [moneyHandlers, nonMoneyHandlers, employees, tipRates, refresh]
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
