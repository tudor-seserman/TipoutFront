import React, { useState } from "react";
import Banner from "../Banner";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";

type Inputs = {
  username: string;
  password: string;
};
function Login() {
  const [usernameI, setUsernameI] = useState("");
  const [passwordI, setPasswordI] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const loginFormDTO = {
    username: usernameI,
    password: passwordI,
  };

  const { login } = useAuth();
  const onSubmit: SubmitHandler<Inputs> = () => login(loginFormDTO);

  return (
    <>
      <Banner />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            {...register("username", { required: true })}
            onChange={(e) => setUsernameI(e.target.value)}
          />
          {errors.username && <span>This field is required</span>}
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Password"
            aria-label="Password"
            type="password"
            {...register("password", { required: true })}
            onChange={(e) => setPasswordI(e.target.value)}
          />
          {errors.password && <span>This field is required</span>}
        </Form.Group>

        <input type="submit" className="btn btn-primary" value="Login"></input>
      </Form>
    </>
  );
}

export default Login;
