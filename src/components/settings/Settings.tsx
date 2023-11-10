import React, { useEffect, useState } from "react";
import api from "../../API/axiosConfig";
import { TipRate } from "../utils/types/TipRate";
import { useAuth } from "../../hooks/useAuth";
import { Form } from "react-bootstrap";

const Settings = () => {
  const { user } = useAuth();
  const [tipRates, setTipRates] = useState<TipRate[]>([]);

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

  return (
    <>
      <Form>
        {tipRates.map(function (employeeTypeTipRate, index) {
          return (
            <h5 key={index}>
              <span>
                {employeeTypeTipRate.roleName}:
                <Form.Group>
                  <Form.Control
                    placeholder={String(employeeTypeTipRate.tipRate) + "%"}
                    aria-label="Tip Rate"
                  />
                </Form.Group>
              </span>
            </h5>
          );
        })}
      </Form>
    </>
  );
};

export default Settings;
