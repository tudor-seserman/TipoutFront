import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useEmployerInfo } from "../../../hooks/useEmployerInfo";

const WeightedTippoolByRole = ({ handleSubmit, moneyHandlers, setMoneyHandlers, nonMoneyHandlers, setNonMoneyHandlers }) => {
  const {
    tipRates
  } = useEmployerInfo();

  const handleMoneyHandlersChange = (event, index) => {
    let data = [...moneyHandlers];
    data[index]["tips"] = Number(event.target.value);
    setMoneyHandlers(data);
  };

  const handleNonMoneyHandlersChange = (event, index) => {
    let data = [...nonMoneyHandlers];
    data[index]["tips"] != 1
      ? (data[index]["tips"] = 1)
      : (data[index]["tips"] = null);
    setNonMoneyHandlers(data);
  };


  return (
    <>

      <Form onSubmit={handleSubmit}>
        <div>
          <h3>Enter Tips</h3>

          <div>
            {moneyHandlers.map(function (moneyHandler, index) {
              return (
                <div key={moneyHandler.id}>
                  <Form.Label>
                    {moneyHandler.name}

                    <Form.Control
                      type="number"
                      step="any"
                      min="0"
                      placeholder={"Tips for " + moneyHandler.name}
                      defaultValue={moneyHandler.tips}
                      onChange={(event) =>
                        handleMoneyHandlersChange(event, index)
                      }
                    />
                  </Form.Label>
                </div>
              );
            })}
          </div>
        </div>

        <br />

        <div>
          <h3>Add other employees to the Tippool</h3>

          <div>
            {nonMoneyHandlers.map(function (nonMoneyHandler, index) {
              return (
                <div key={nonMoneyHandler.id}>
                  <Form.Check
                    className="checkbox"
                    label={nonMoneyHandler.name}
                    type="switch"
                    onChange={(event) =>
                      handleNonMoneyHandlersChange(event, index)
                    }
                  ></Form.Check>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <br />
          <input
            type="submit"
            value="Calculate Tips"
            className="btn btn-primary"
          />
        </div>
      </Form>
      <br />
      <br />
      <h5>Employee Tipout = Total Tips <strong>multiped by</strong> Weighed Assigned to Each Role Included in the Tippool <strong>over</strong> Total Weight of Roles Included In the Tippool <strong>divided by</strong> Number of Employees of that Role in the Tippool</h5>

      <p>Tips are collected and then divide by the weight given to the roles in the tippool.
        The tips from each role are than divided equally by employees in that role.
      </p><p>
        For example:
        If the server role is weighted at 40 and the busser is weighted at 10,
        and there are 2 servers in the tippool and one busser.
      </p><p>
        <strong>Server Tipout = $40 = $100 * (40/50) ÷ 2</strong>
      </p><p>
        If the total tips collected are $100: the servers would split $80($40 a piece) and the busser would receive $20.
      </p><p>
        If a bartender role was weighted at 50 and one was added to the tippool of $100:
        Servers would split $40($20 a piece)
        Busser would receive $20
        Bartender would receive $50
      </p><p>
        <strong>Server Tipout = $20 = $100 * (40/100) ÷ 2</strong>
      </p>
      <div>
        {tipRates.map(function (tipRate, index) {
          return (
            <h5 key={index}>
              {tipRate.roleName + "s"}: {tipRate.tipRate}
            </h5>
          );
        })}
      </div>
      <Link to="/settings">
        <Button>Customize role weight </Button>
      </Link>
    </>
  );
};

export default WeightedTippoolByRole;
