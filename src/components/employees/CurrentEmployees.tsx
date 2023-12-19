import React, { useEffect, useState } from "react";
import api from "../../API/axiosConfig";
import { useAuth } from "../../hooks/useAuth";
import { Button, Form, Table } from "react-bootstrap";
import EmployeeRoleSelect from "./EmployeeRoleSelect";
import { Employee } from "../utils/types/Employee";
import AlertDismissible from "../utils/alerts/AlertDismissible";
import { set } from "react-hook-form";
import { useEmployerInfo } from "../../hooks/useEmployerInfo";

const CurrentEmployees = () => {
  const { user } = useAuth();
  const {
    tipRates,
    setTipRates,
    employees,
    setEmployees,
    refresh,
    setRefresh,
  } = useEmployerInfo();
  const [employeeID, setEmployeeID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeRole, setEmployeeRole] = useState([]);
  const [employeeToDelete, setEmployeeToDelete] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [alertInfo, setAlertInfo] = useState("");
  const [alertColor, setAlertColor] = useState("");

  const EditEmployeeDTO = {
    idEdit,
    firstName,
    lastName,
    employeeRole,
  };

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
      setAlertInfo(`${firstName} ${lastName} was edited`);
      setAlertColor("warning");
      setFirstName("");
      setLastName("");
      setEmployeeRole([]);
      setIdEdit("");
      setRefresh(!refresh);
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
      setAlertColor("danger");
      setRefresh(!refresh);
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
      {alertInfo && (
        <AlertDismissible text={alertInfo} color={alertColor} show={true} />
      )}
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
            const employeeObject: Employee = JSON.parse(employee);
            return (
              <tr key={String(employeeObject.id)}>
                {employeeObject.id != idEdit && (
                  <>
                    <td>
                      {employeeObject.firstName} {employeeObject.lastName}
                    </td>
                    <td>
                      {employeeObject.employeeRoles.map((role) => (
                        <p key={role.id}>{role.name}</p>
                      ))}
                    </td>
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
                        setIdEdit("");
                      } else {
                        setFirstName(employeeObject.firstName);
                        setLastName(employeeObject.lastName);
                        setEmployeeRole(employeeObject.employeeRoles);
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
                      onClick={(e) => {
                        if (
                          window.confirm(
                            `Are You Sure You Want To Delete ${employeeObject.firstName} `
                          )
                        ) {
                          setEmployeeToDelete(employeeObject.id);
                          setAlertInfo(
                            `${employeeObject.firstName} ${employeeObject.lastName} was deleted`
                          );
                        } else {
                          e.preventDefault();
                        }
                      }}
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
