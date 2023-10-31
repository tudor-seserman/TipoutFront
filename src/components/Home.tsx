import React from "react";
import Banner from "./Banner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginOrRegistration from "./login/LoginOrRegistration";

const Home = () => {
  return (
    <>
      <Banner />
      <Container fluid>
        <Row
          className="align-items-center
            justify-content-center
            text-center
            bg-info"
        >
          <Col gx={2} gx-lg={3} h-20>
            <br />
            <h3>
              An app to calculate end of shift distribution of tips collected
              and distributed by a restaurant employer.
            </h3>
            <br />
          </Col>
        </Row>
      </Container>

      <LoginOrRegistration />
    </>
  );
};

export default Home;
