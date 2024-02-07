import Select from "react-select";
import Form from "react-bootstrap/Form";
import { SelectProps } from "../types/SelectProps";

const CustomSelect = ({
  label,
  submitting,
  options,
  handleChange,
}: SelectProps) => {


  return (
    <Form.Group>
      <Form.Label>
        {label}
        <Select
          onChange={handleChange}
          options={options}
          isDisabled={submitting}
        />
      </Form.Label>
    </Form.Group>
  );
};

export default CustomSelect;
