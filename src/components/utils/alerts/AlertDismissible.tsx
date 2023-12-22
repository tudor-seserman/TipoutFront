import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function AlertDismissible({ text, color }: any) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant={color} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{text}</Alert.Heading>
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

export default AlertDismissible;
