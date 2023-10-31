import React from "react";
import Select, { ActionMeta } from "react-select";
import Form from "react-bootstrap/Form";

type EmployeeRoleSelectProps = {
  options: readonly unknown[];
  handleChange: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
};

const EmployeeRoleSelect = ({
  options,
  handleChange,
}: EmployeeRoleSelectProps) => {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      color: "#f9f9f9",
      background: "#1a1a1a",
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      borderColor: state.isFocused ? "#646cff" : "green",
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: state.isFocused ? "red" : "blue",
      },
    }),
    menu: (base) => ({
      ...base,
      color: "#f9f9f9",
      background: "#1a1a1a",
      borderRadius: 0,
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      color: "#f9f9f9",
      background: "#1a1a1a",
      padding: 0,
    }),
  };

  return (
    <Form.Group>
      <Form.Label>
        What is their role?
        <Select onChange={handleChange} options={options} />
      </Form.Label>
    </Form.Group>
  );
};

export default EmployeeRoleSelect;
