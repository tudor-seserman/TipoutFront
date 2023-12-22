import React, { useEffect, useState } from "react";
import api from "../../../API/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useAuth } from "../../../hooks/useAuth";
import { Button } from "react-bootstrap";
import { useEmployerInfo } from "../../../hooks/useEmployerInfo";

const WeightedTippoolByRole = () => {
  const { user, logout } = useAuth();
  const {
    moneyHandlers,
    setMoneyHandlers,
    nonMoneyHandlers,
    setNonMoneyHandlers,
    tipRates,
    setTipRates,
    calculateTips,
    setCalculateTips
  } = useEmployerInfo();
  const [tipsCollected, setTipsCollected] = useState({});
  const navigate = useNavigate();

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

  useEffect(() => {
    setTipsCollected({
      moneyHandlers: moneyHandlers,
      nonMoneyHandlers: nonMoneyHandlers,
    });
  }, [moneyHandlers, nonMoneyHandlers]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/calculate/WeightedTippoolByRole",
        tipsCollected,
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      );
      setCalculateTips(!calculateTips)
      navigate("/calculate/report", { state: response.data });
    } catch (error: any) {
      console.log(error.response.request.status)
      if (error.response.request.status == 401) {
        alert("Your session has expired. Please log in again.");
        logout();
      }
      else if (error.response) {
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
