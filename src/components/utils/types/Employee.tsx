import { EmployeeRoles } from "./EmployeeRoles";

export type Employee = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  employeeRoles: EmployeeRoles[];
  tips: number | null;
};
