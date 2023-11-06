import React, { useEffect, useState } from "react";
import api from "../../API/axiosConfig";
import Banner from "../Banner";
import { useAuth } from "../../hooks/useAuth";
import { Form, Table } from "react-bootstrap";

const CurrentEmployees = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [employeeToDelete, setEmployeeToDelete] = useState("");
  const [employeesUpdated, setEmployeesUpdated] = useState(false);

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
  }, [employeesUpdated]);

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
                <td>
                  {employeeObject.firstName} {employeeObject.lastName}
                </td>
                <td>{employeeObject.roleDetail}</td>
                <td>
                  {/* <Form onSubmit={handleSubmitEdit}>
                    <Form.Control type="submit" value="Edit Employee" />
                  </Form> */}
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
