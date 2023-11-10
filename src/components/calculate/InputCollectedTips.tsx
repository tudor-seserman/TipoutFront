import React, { useEffect, useState } from "react";
import api from "../../API/axiosConfig";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useAuth } from "../../hooks/useAuth";

type Employee = {
  moneyHandler: {};
  nonMoneyHandler: {};
};

type TipRate = {
  tipRate: {};
};

const InputCollectedTips = () => {
  const { user } = useAuth();
  const [moneyHandlers, setMoneyHandlers] = useState<Employee[]>([]);
  const [nonMoneyHandlers, setNonMoneyHandlers] = useState<Employee[]>([]);
  const [tipsCollected, setTipsCollected] = useState<Employee[]>([]);
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
    api
      .get("/calculate/MoneyHandler", {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      })
      .then((res) => {
        setMoneyHandlers(res.data);
      });
  }, []);

  useEffect(() => {
    api
      .get("/calculate/NonMoneyHandler", {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      })
      .then((res) => {
        setNonMoneyHandlers(res.data);
      });
  }, []);

  useEffect(() => {
    setTipsCollected([...moneyHandlers, ...nonMoneyHandlers]);
  }, [moneyHandlers, nonMoneyHandlers]);

  useEffect(() => {
    api
      .get("/employer/rates", {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      })
      .then((res) => {
        setTipRates(res.data);
      });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await api.post("/calculate/report", tipsCollected, {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      });

      //   console.log(typeof response.data);

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
      <h1>Current Schema: Weighted Tippool</h1>
      <div>
        {tipRates.map(function (tipRate, index) {
          return (
            <h5 key={index}>
              {tipRate.roleName}: {tipRate.tipRate}%
            </h5>
          );
        })}
      </div>
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
                  <Form.Label>
                    {nonMoneyHandler.name}
                    <Form.Check
                      type="checkbox"
                      onChange={(event) =>
                        handleNonMoneyHandlersChange(event, index)
                      }
                    ></Form.Check>
                  </Form.Label>
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

export default InputCollectedTips;
