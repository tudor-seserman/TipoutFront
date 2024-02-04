import { Container, Row, Col } from "react-bootstrap";
import { ChildrenProps } from "../utils/types/ChildrenProps";


const BaseStyle = ({ children }: ChildrenProps) => {
  return (
    <Container className="baseStyle">
      <Row>
        <Col gx={2} gx-lg={3}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default BaseStyle;
