import React, { useEffect, useState } from "react";
import api from "../../../API/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useAuth } from "../../../hooks/useAuth";
import { Employee } from "../../utils/types/Employee";
import { useEmployerInfo } from "../../../hooks/useEmployerInfo";

const EvenTippool = () => {
  const { user } = useAuth();
  const {
    moneyHandlers,
    setMoneyHandlers,
    nonMoneyHandlers,
    setNonMoneyHandlers,
    calculateTips,
    setCalculateTips
  } = useEmployerInfo();
  const [tipsCollected, setTipsCollected] = useState<Employee[]>([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    setTipsCollected({
      moneyHandlers: moneyHandlers,
      nonMoneyHandlers: nonMoneyHandlers,
    });
  }, [moneyHandlers, nonMoneyHandlers]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await api.post("/calculate/EvenTippool", tipsCollected, {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      });
      setCalculateTips(!calculateTips)
      navigate("/calculate/report", { state: response.data });
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert("No tips were declared.");
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

export default EvenTippool;
