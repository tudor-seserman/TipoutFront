import React, { useState } from "react";
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
  const [submitting, setSubmitting] = useState(false);

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
  const onSubmit: SubmitHandler<Inputs> = async () => {
    setSubmitting(true);
    const inProcess = await login(loginFormDTO);
    setSubmitting(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            readOnly={submitting}
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
            readOnly={submitting}
            {...register("password", { required: true })}
            onChange={(e) => setPasswordI(e.target.value)}
          />
          {errors.password && <span>This field is required</span>}
        </Form.Group>

        <input
          type="submit"
          className="btn btn-primary"
          value="Login"
          disabled={submitting}
        ></input>
      </Form>
    </>
  );
}

export default Login;
