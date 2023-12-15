import React, { useEffect, useState } from "react";
import api from "../../API/axiosConfig";
import { useAuth } from "../../hooks/useAuth";
import EmployeeRoleSelect from "./EmployeeRoleSelect";
import Form from "react-bootstrap/Form";

const AddEmployees = () => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeRole, setEmployeeRole] = useState("Please Select...");
  const [employerRoles, setEmployerRoles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

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
      setSubmitting(false);
      alert(`${firstName} was added`);
      setFirstName("");
      setLastName("");
      setEmployeeRole("Please Select...");
      e.target.reset();
    } catch (error: any) {
      setSubmitting(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert("Does not match user information on record.");
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
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            placeholder="First Name"
            aria-label="First Name"
            readOnly={submitting}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Last Name"
            aria-label="Lat Name"
            readOnly={submitting}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <EmployeeRoleSelect
          isDisabled={submitting}
          value={{ value: employeeRole, label: employeeRole }}
          handleChange={(value) => setEmployeeRole(value.value)}
          options={employerRoles.map((t: string) => ({ value: t, label: t }))}
        />
        <Form.Group>
          <Form.Control
            disabled={submitting}
            type="submit"
            value="Add Employee"
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default AddEmployees;
