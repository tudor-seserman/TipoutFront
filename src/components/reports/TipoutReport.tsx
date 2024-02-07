import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { TipoutReportType } from "../utils/types/TipoutReportType";

const TipoutReport = () => {
  const { state } = useLocation();
  const [reportEntry, setReportEntry] = useState<TipoutReportType>({
    totalTips: 0,
    employeesAndTipsOwed: { key: ["", ""] }
  });

  useEffect(() => {
    setReportEntry(state);
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
          {Object.entries(reportEntry.employeesAndTipsOwed).map(function ([key, val]: [string, [string, string]]) {
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
