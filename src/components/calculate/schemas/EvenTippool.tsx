import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useAuth } from "../../../hooks/useAuth";
import { useEmployerInfo } from "../../../hooks/useEmployerInfo";



const EvenTippool = ({ handleSubmit, moneyHandlers, setMoneyHandlers, nonMoneyHandlers, setNonMoneyHandlers }) => {
  // const { user } = useAuth();
  // const {
  //   moneyHandlers,
  //   setMoneyHandlers,
  //   nonMoneyHandlers,
  //   setNonMoneyHandlers,

  // } = useEmployerInfo();

  const handleMoneyHandlersChange = (event, index) => {
    let data = [...moneyHandlers];
    data[index]["tips"] = Number(event.target.value);
    setMoneyHandlers(data);
  };

  const handleNonMoneyHandlersChange = (event, index) => {
    let data = [...nonMoneyHandlers];
    data[index]["tips"] != 0.0001
      ? (data[index]["tips"] = 0.0001)
      : (data[index]["tips"] = null);
    setNonMoneyHandlers(data);
  };


  return (
    <>
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
      </Form >
    </>
  );
};

export default EvenTippool;
