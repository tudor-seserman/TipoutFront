import Select from "react-select";
import Form from "react-bootstrap/Form";
import { SelectProps } from "../utils/types/SelectProps";

const SchemaSelector = ({ disabled, options, handleChange }: SelectProps) => {
  return (
    <Form.Group>
      <Form.Label>
        <h1>Current Schema: </h1>
        <Select
          onChange={handleChange}
          options={options}
          isDisabled={disabled}
        />
      </Form.Label>
    </Form.Group>
  );
};

export default SchemaSelector;
