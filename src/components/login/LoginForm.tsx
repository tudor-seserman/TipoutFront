import React from "react";

const LoginForm = () => {
  return (
    <>
      <form method="post">
        <div className="form-group">
          <label th:for="username">
            Username
            <input
              className="form-control"
              th:field="${employerLoginFormDTO.username}"
            />
          </label>
          <p className="error" th:errors="${employerLoginFormDTO.username}"></p>
        </div>
        <div className="form-group">
          <label>
            Password
            <input
              className="form-control"
              th:field="${employerLoginFormDTO.password}"
              type="password"
            />
          </label>
          <p className="error" th:errors="${employerLoginFormDTO.password}"></p>
        </div>

        <input type="submit" className="btn btn-primary" value="Log In" />
      </form>

      <p>
        Don't have an account? <a href="/register">Register for one.</a>
      </p>
    </>
  );
};

export default LoginForm;
