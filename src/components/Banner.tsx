import React from "react";
import NavBar from "./navBars/NavBar";
import { useAuth } from "../hooks/useAuth";
import LoggedInNavBar from "./navBars/LoggedInNavBar";
import { Container } from "react-bootstrap";

const Banner = () => {
  const { user } = useAuth();
  return (
    <Container>
      <span className="banner">
        {!user && <NavBar />}
        {user && <LoggedInNavBar />}
      </span>
    </Container>
  );
};

export default Banner;
