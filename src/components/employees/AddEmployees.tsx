import { useEffect, useState } from "react";
import api from "../../API/axiosConfig";
import { useAuth } from "../../hooks/useAuth";
import Form from "react-bootstrap/Form";
import AlertDismissible from "../utils/alerts/AlertDismissible";
import { useEmployerInfo } from "../../hooks/useEmployerInfo";
import CustomSelect from "../utils/select/CustomSelect";
import { Option } from "../utils/types/Option";
import { ActionMeta } from "react-select";


const AddEmployees = () => {
  const { user } = useAuth();
  const { refresh, setRefresh } = useEmployerInfo();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeRole, setEmployeeRole] = useState("");
  const [employerRoles, setEmployerRoles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [newEmployee, setNewEmployee] = useState("");

  useEffect(() => {
    api
      .get("/employer/roles", {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      })
      .then((res) => {
        setEmployerRoles(res.data);
      });
  }, []);

  const CreateEmployeeDTO = {
    firstName,
    lastName,
    employeeRole,
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await api.post("/employees", CreateEmployeeDTO, {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      });
      setEmployeeRole("");
      setNewEmployee(firstName + " " + lastName);
      setFirstName("");
      setLastName("");
      setRefresh(!refresh)
      setSubmitting(false);
      e.target.reset();
    } catch (error: any) {
      setSubmitting(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert("There was issue please try again.");
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

  return (
    <>
      {newEmployee && (
        <AlertDismissible text={`${newEmployee} was added`} color="success" />
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            placeholder="First Name"
            aria-label="First Name"
            readOnly={submitting}
            onPaste={(e) => setFirstName(e.clipboardData.getData("text"))}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Last Name"
            aria-label="Last Name"
            readOnly={submitting}
            onPaste={(e) => setLastName(e.clipboardData.getData("text"))}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <CustomSelect
          label={<h5>What is their role:</h5>}
          value={employeeRole == "" ? undefined :
            {
              label: employeeRole,
              value: employeeRole,
            }}
          disabled={submitting}
          submitting={submitting}
          handleChange={(newValue: Option | null, _actionMeta: ActionMeta<Option>) => { if (newValue != null) setEmployeeRole(newValue.value) }}
          options={employerRoles.map((t: string) => ({ value: t, label: t }))}
        />

        <Form.Group>
          <Form.Control
            disabled={submitting}
            type="submit"
            value="Add Employee"
          />
        </Form.Group>
      </Form >
    </>
  );
};

export default AddEmployees;

{/* <Form.Group>
          <Form.Label>
            <h5>What is their role?</h5>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue="Please"
              value={selectValue}
              onChange={(newValue: SingleValue<{ value: string; label: string; }>, _actionMeta: ActionMeta<Option>) => { if (newValue != null) { setEmployeeRole(newValue.value); setSelectValue(newValue); } }}
              options={employerRoles.map((t: string) => ({ value: t, label: t }))}
              isDisabled={submitting} inputValue={""}
              onInputChange={function (_newValue: string, _actionMeta: InputActionMeta): void {
                null
              }}
              onMenuOpen={function (): void {
                null
              }}
              onMenuClose={function (): void {
                null
              }}
            />
          </Form.Label>
        </Form.Group> */}
