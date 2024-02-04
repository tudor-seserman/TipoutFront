import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";

type LoginVals = {
  username: string;
  password: string;
};

function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [loginFormDTO, setLoginFormDTO] = useState({
    username: "",
    password: "",
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginVals>();


  const { login } = useAuth();

  const onSubmit: SubmitHandler<LoginVals> = async () => {
    setSubmitting(true);
    const inProcess = await login(loginFormDTO);
    setSubmitting(false);
  };

  useEffect(() => {
    setValue("username", loginFormDTO.username);
    setValue("password", loginFormDTO.password);
  }, [setValue, loginFormDTO]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            readOnly={submitting}
            {...register("username", { required: true })}
            onPaste={(e) => setLoginFormDTO({ ...loginFormDTO, "username": e.clipboardData.getData("text") })}
            onChange={(e) => setLoginFormDTO({ ...loginFormDTO, "username": e.target.value })}
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
            onPaste={(e) => setLoginFormDTO({ ...loginFormDTO, "password": e.clipboardData.getData("text") })}
            onChange={(e) => setLoginFormDTO({ ...loginFormDTO, "password": e.target.value })}
          />
          {errors.password && <span>This field is required</span>}
        </Form.Group>

        <input
          type="submit"
          className="btn btn-primary"
          value={!submitting ? "Login" : "Submitting..."}
          disabled={submitting}

        ></input>
      </Form>
    </>
  );
}

export default Login;
