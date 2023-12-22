import React from "react";
import Select, { ActionMeta } from "react-select";
import Form from "react-bootstrap/Form";
import { SelectProps } from "../utils/types/SelectProps";

const EmployeeRoleSelect = ({
  value,
  submitting,
  options,
  handleChange,
}: SelectProps) => {
  // const customStyles = {
  //   control: (base, state) => ({
  //     ...base,
  //     color: "#f9f9f9",
  //     background: "#1a1a1a",
  //     borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
  //     borderColor: state.isFocused ? "#646cff" : "green",
  //     boxShadow: state.isFocused ? null : null,
  //     "&:hover": {
  //       borderColor: state.isFocused ? "red" : "blue",
  //     },
  //   }),
  //   menu: (base) => ({
  //     ...base,
  //     color: "#f9f9f9",
  //     background: "#1a1a1a",
  //     borderRadius: 0,
  //     marginTop: 0,
  //   }),
  //   menuList: (base) => ({
  //     ...base,
  //     color: "#f9f9f9",
  //     background: "#1a1a1a",
  //     padding: 0,
  //   }),
  // };

  return (
    <Form.Group>
      <Form.Label>
        What is their role?
        <Select
          value={value}
          onChange={handleChange}
          options={options}
          isDisabled={submitting}
        />
      </Form.Label>
    </Form.Group>
  );
};

export default EmployeeRoleSelect;
