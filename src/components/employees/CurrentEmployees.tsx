import React, { useEffect, useState } from "react";
import api from "../../API/axiosConfig";
import Banner from "../Banner";
import { useAuth } from "../../hooks/useAuth";
import { Table } from "react-bootstrap";

const CurrentEmployees = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);

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
  }, []);

  return (
    <>
      <Banner />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
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
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default CurrentEmployees;
