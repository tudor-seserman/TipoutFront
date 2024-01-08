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
      <div>
        {tipRates.map(function (tipRate, index) {
          return (
            <h5 key={index}>
              {tipRate.roleName}: {tipRate.tipRate}%
            </h5>
          );
        })}
      </div>
      <Link to="/settings">
        <Button>Customize role distribution </Button>
      </Link>
      <br />
      <br />
      <br />
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
    </>
  );
};

export default WeightedTippoolByRole;
