import { Employee } from "./Employee"

export type SchemaProps = {
    handleSubmit: (e: any) => Promise<void>;
    moneyHandlers: Employee[];
    setMoneyHandlers: React.Dispatch<React.SetStateAction<Employee[]>>;
    nonMoneyHandlers: Employee[];
    setNonMoneyHandlers: React.Dispatch<React.SetStateAction<Employee[]>>;
}