import React from "react";
import { Link } from "react-router-dom";

const LoginOrRegistration = () => {
  return (
    <>
      <p>
        Have an account? <Link to="/login">Login</Link>
      </p>
      <p>
        Don't have an account? <Link to="/register">Register for one.</Link>
      </p>
    </>
  );
};

export default LoginOrRegistration;
