import { useState, useEffect } from "react";
import api from "../../API/axiosConfig";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

type RegisterVals = {
  businessName: String;
  username: String;
  password: String;
  verifyPassword: String;
};

const Register = () => {
  const [submitting, setSubmitting] = useState(false);
  const [employerRegistrationFormDTO, setEmployerRegistrationFormDTO] = useState({
    businessName: "",
    username: "",
    password: "",
    verifyPassword: ""
  });
  let navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterVals>();

  const onSubmit: SubmitHandler<RegisterVals> = () => addEmployer();

  useEffect(() => {
    setValue("businessName", employerRegistrationFormDTO.businessName);
    setValue("username", employerRegistrationFormDTO.username);
    setValue("password", employerRegistrationFormDTO.password);
    setValue("verifyPassword", employerRegistrationFormDTO.verifyPassword);
  }, [setValue, employerRegistrationFormDTO]);



  const addEmployer = async () => {
    setSubmitting(true);
    try {
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
      setEmployerRegistrationFormDTO({
        businessName: "",
        username: "",
        password: "",
        verifyPassword: ""
      })

      if (response.status === 200) {
        return navigate("/login");
      }
    } catch (error: any) {
      setSubmitting(false);
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
      <Form method="post" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Control
            placeholder="Business Name"
            aria-label="Business Name"
            readOnly={submitting}
            {...register("businessName", { required: true, minLength: 3 })}
            onChange={(e) => setEmployerRegistrationFormDTO({ ...employerRegistrationFormDTO, "businessName": e.target.value })}
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
            readOnly={submitting}
            {...register("username", {
              required: true,
              minLength: 3,
            })}
            onChange={(e) => setEmployerRegistrationFormDTO({ ...employerRegistrationFormDTO, "username": e.target.value })} />
          {errors.username && (
            <div>Username is required to be at least 3 characters long</div>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Password"
            aria-label="Password"
            readOnly={submitting}
            {...register("password", {
              required: true,
              minLength: 5,
              maxLength: 30,
            })}
            onChange={(e) => setEmployerRegistrationFormDTO({ ...employerRegistrationFormDTO, "password": e.target.value })}
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
            readOnly={submitting}
            {...register("verifyPassword", {
              validate: (val: String) => {
                if (watch("password") != val) {
                  return "Your passwords do not match";
                }
              },
            })}
            onChange={(e) => setEmployerRegistrationFormDTO({ ...employerRegistrationFormDTO, "verifyPassword": e.target.value })}
            type="password"
          />
          {errors.verifyPassword && <div> Your passwords do not match</div>}
        </Form.Group>
        <input
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
          value="Register"
        ></input>
      </Form>
    </>
  );
};

export default Register;
