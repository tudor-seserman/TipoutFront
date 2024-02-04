import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const LoggedInNavBar = () => {
  const { logout } = useAuth();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Tipout</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/employees/add">Add Employee</Nav.Link>
            <Nav.Link as={Link} to="/employees/current">Employees</Nav.Link>
            <Nav.Link as={Link} to="/calculate">Calculate</Nav.Link>
            <Nav.Link as={Link} to="/tipReports">Tip Reports</Nav.Link>
            <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
            <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default LoggedInNavBar;
