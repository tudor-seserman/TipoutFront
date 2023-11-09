import React, { useEffect, useState } from "react";
import api from "../../API/axiosConfig";
import Banner from "../Banner";
import { useAuth } from "../../hooks/useAuth";
import { Button, Form, Table } from "react-bootstrap";
import EmployeeRoleSelect from "./EmployeeRoleSelect";

const CurrentEmployees = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [employeeID, setEmployeeID] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeRole, setEmployeeRole] = useState("");
  const [employerRoles, setEmployerRoles] = useState([]);
  const [employeeToDelete, setEmployeeToDelete] = useState("");
  const [employeesUpdated, setEmployeesUpdated] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const EditEmployeeDTO = {
    idEdit,
    firstName,
    lastName,
    employeeRole,
  };

  useEffect(() => {
    api
      .get("/employees/current", {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        setEmployees(res.data);
      });
    api
      .get("/employees", {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        setEmployerRoles(res.data);
      });
  }, [employeesUpdated]);

  const handleSubmitEdit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await api.post("/employees/edit", EditEmployeeDTO, {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      });
      setSubmitting(false);
      alert(`${firstName} was edited`);
      setFirstName("");
      setLastName("");
      setEmployeeRole("");
      setIdEdit(null);
      setEmployeesUpdated(!employeesUpdated);
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

  const handleSubmitDelete = async (e: any) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/employees/delete",
        { employeeToDelete },
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      );
      setEmployeesUpdated(!employeesUpdated);
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert("There was an issues accessing our records");
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(function (employee) {
            const employeeObject: Object = JSON.parse(employee);
            return (
              <tr key={employeeObject.id}>
                {employeeObject.id != idEdit && (
                  <>
                    <td>
                      {employeeObject.firstName} {employeeObject.lastName}
                    </td>
                    <td>{employeeObject.roleDetail}</td>
                  </>
                )}
                {employeeObject.id == idEdit && (
                  <>
                    <td>
                      <Form.Group>
                        <Form.Control
                          placeholder={employeeObject.firstName}
                          aria-label="First Name"
                          readOnly={submitting}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          placeholder={employeeObject.lastName}
                          aria-label="Last Name"
                          readOnly={submitting}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </Form.Group>
                    </td>
                    <td>
                      {/* <EmployeeRoleSelect
                          isDisabled={submitting}
                          handleChange={(value) => setEmployeeRole(value.value)}
                          options={employerRoles.map((t: string) => ({
                            value: t,
                            label: t,
                          }))}
                        /> */}
                    </td>
                  </>
                )}
                <td>
                  <Button
                    onClick={(e) => {
                      if (employeeObject.id == idEdit) {
                        handleSubmitEdit(e);
                        setIdEdit(null);
                      } else {
                        setFirstName(employeeObject.firstName);
                        setLastName(employeeObject.lastName);
                        setEmployeeRole(employeeObject.roleDetail);
                        setIdEdit(employeeObject.id);
                      }
                    }}
                  >
                    edit
                  </Button>
                </td>
                <td>
                  <Form onSubmit={handleSubmitDelete}>
                    <Form.Control
                      type="submit"
                      value="Delete Employee"
                      onClick={(event) =>
                        setEmployeeToDelete(employeeObject.id)
                      }
                    />
                  </Form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default CurrentEmployees;
