import React, { useState } from "react";
import api from "../../API/axiosConfig";
import Banner from "../Banner";
import Form from "react-bootstrap/Form";
import { redirect, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  businessName: String;
  username: String;
  password: String;
  verifyPassword: String;
};

const Register = () => {
  const [businessNameI, setBusinessNameI] = useState("");
  const [usernameI, setUsernameI] = useState("");
  const [passwordI, setPasswordI] = useState("");
  const [verifyPasswordI, setVerifyPasswordI] = useState("");
  let navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = () => addEmployer();

  const employerRegistrationFormDTO = {
    businessName: businessNameI,
    username: usernameI,
    password: passwordI,
    verifyPassword: verifyPasswordI,
  };

  const addEmployer = async () => {
    try {
      // console.log(employerRegistrationFormDTO);
      const response = await api.post(
        "auth/register",
        employerRegistrationFormDTO,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setBusinessNameI("");
      setPasswordI("");
      setUsernameI("");
      setVerifyPasswordI("");

      if (response.status === 200) {
        return navigate("/login");
      }
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(error.response.data.message);
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
      <Banner />
      <Form method="post" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Control
            placeholder="Business Name"
            aria-label="Business Name"
            {...register("businessName", { required: true, minLength: 3 })}
            onChange={(e) => setBusinessNameI(e.target.value)}
          />
          {errors.businessName && (
            <div>
              Business Name is required to be at least 3 characters long
            </div>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            {...register("username", {
              required: true,
              minLength: 3,
            })}
            onChange={(e) => setUsernameI(e.target.value)}
          />
          {errors.username && (
            <div>Username is required to be at least 3 characters long</div>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Password"
            aria-label="Password"
            {...register("password", {
              required: true,
              minLength: 5,
              maxLength: 30,
            })}
            value={passwordI}
            onChange={(e) => setPasswordI(e.target.value)}
            type="password"
          />
          {errors.password && (
            <div>
              Password is required to be between 5 and 30 characters long
            </div>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Verify Password"
            aria-label="Verify Password"
            {...register("verifyPassword", {
              validate: (val: String) => {
                if (watch("password") != val) {
                  return "Your passwords do not match";
                }
              },
            })}
            value={verifyPasswordI}
            onChange={(e) => setVerifyPasswordI(e.target.value)}
            type="password"
          />
          {errors.verifyPassword && <div> Your passwords do not match</div>}
        </Form.Group>
        <input
          type="submit"
          className="btn btn-primary"
          value="Register"
        ></input>
      </Form>
    </>
  );
};

export default Register;
