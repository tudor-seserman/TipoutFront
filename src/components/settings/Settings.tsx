import React, { useEffect, useState } from "react";
import api from "../../API/axiosConfig";
import { TipRate } from "../utils/types/TipRate";
import { useAuth } from "../../hooks/useAuth";
import { Form } from "react-bootstrap";
import { useEmployerInfo } from "../../hooks/useEmployerInfo";

const Settings = () => {
  const { user } = useAuth();
  const { tipRates } = useEmployerInfo();
  const [tipRatesToEdit, setTipRatesToEdit] = useState<TipRate[]>(tipRates);


  const handleTipRatesToEditChange = (event: any, index: number) => {
    let data = [...tipRatesToEdit];
    data[index]["tipRate"] = Number(event.target.value);
    setTipRatesToEdit(data);
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await api.post("/employer/editRates", tipRatesToEdit, {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      });
      e.target.reset();
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert("Woops there was an issue, please try again or alert us if the problem persists.");
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
      <h3>Current Role Weights</h3>
      <Form onSubmit={handleSubmit}>
        {tipRates.map(function (employeeTypeTipRate, index) {
          return (
            <h5 key={index}>
              <span>
                {employeeTypeTipRate.roleName}:
                <Form.Group>
                  <Form.Control
                    type="number"
                    step="any"
                    min="0"
                    placeholder={String(employeeTypeTipRate.tipRate)}
                    aria-label="Tip Rate"
                    onChange={(event) =>
                      handleTipRatesToEditChange(event, index)
                    }
                  />
                </Form.Group>
              </span>
            </h5>
          );
        })}
        <Form.Group>
          <Form.Control type="submit" value="Edit Weights" />
        </Form.Group>
      </Form>
    </>
  );
};

export default Settings;
