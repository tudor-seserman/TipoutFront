import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Banner from "../Banner";
import Table from "react-bootstrap/Table";

const TipoutReport = () => {
  const { state } = useLocation();

  return (
    <>
      <Banner />
      <br />
      <h1>Tip Distribution</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Money Owed</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(state).map(function ([key, val], index) {
            return (
              <tr key={index}>
                <td>{key}</td>
                <td>{val}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TipoutReport;
