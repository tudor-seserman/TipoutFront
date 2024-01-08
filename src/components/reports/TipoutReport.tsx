import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";

const TipoutReport = () => {
  const { state } = useLocation();
  const [reportEntry, setReportEntry] = useState({});

  useEffect(() => {
    setReportEntry(state.employeesAndTipsOwed);
  }, [state]);

  return (
    <>
      <h1>Tip Distribution</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Money Owed</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(reportEntry).map(function ([key, val]) {
            return (
              <tr key={key}>
                <td>{val[0]}</td>
                <td>{val[1]}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TipoutReport;
