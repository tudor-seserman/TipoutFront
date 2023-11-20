import React, { Children } from "react";
import { Container, Row, Col } from "react-bootstrap";

interface StyleProp {
  children: React.ReactNode;
}

const BaseStyle = ({ children }: StyleProp) => {
  return (
    <Container fluid>
      <Row
        className="align-items-center
        justify-content-center
        text-center
        bg-info"
      >
        <Col gx={2} gx-lg={3}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default BaseStyle;
