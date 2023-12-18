import React, { useEffect, useState } from "react";
import api from "../../../API/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useAuth } from "../../../hooks/useAuth";
import { Button } from "react-bootstrap";
import { TipRate } from "../../utils/types/TipRate";
import { Employee } from "../../utils/types/Employee";

const WeightedTippoolByRole = () => {
  const { user, logout } = useAuth();
  const [moneyHandlers, setMoneyHandlers] = useState<Employee[]>([]);
  const [nonMoneyHandlers, setNonMoneyHandlers] = useState<Employee[]>([]);
  const [tipsCollected, setTipsCollected] = useState({});
  const [tipRates, setTipRates] = useState<TipRate[]>([]);
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
    try {
      api
        .get("/calculate/EmployeeTipMap", {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        })
        .then((res) => {
          console.log(res.data);
          setMoneyHandlers(res.data.moneyHandlers);
          setNonMoneyHandlers(res.data.nonMoneyHandlers);
        });
      api
        .get("/employer/rates", {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        })
        .then((res) => {
          setTipRates(res.data);
        });
    } catch (error) {
      // Need to come back to this
      if (error.response.status == 401) {
        logout();
      }
    }
  }, []);

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
      } else if (error.response.status == 401) {
        logout();
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        // and an instance of http.ClientRequest in node.js
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
