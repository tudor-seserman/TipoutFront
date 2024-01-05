import React from "react";
import LoginOrRegistration from "../login/LoginOrRegistration";
import { useAuth } from "../../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();


  return (
    <>
      <br />
      <h3>
        An app to calculate end of shift distribution of tips collected and
        distributed by a restaurant employer.
      </h3>
      <br />

      {!user && <LoginOrRegistration />}
    </>
  );
};

export default Home;
