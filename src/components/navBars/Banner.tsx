import NavBar from "./NavBar";
import { useAuth } from "../../hooks/useAuth";
import LoggedInNavBar from "./LoggedInNavBar";
import { Container } from "react-bootstrap";
import { ChildrenProps } from "../utils/types/ChildrenProps";

const Banner = ({ children }: ChildrenProps) => {
  const { user } = useAuth();
  return (
    <Container>
      <span className="banner">
        {!user && <NavBar />}
        {user && <LoggedInNavBar />}
      </span>
      {children}
    </Container>
  );
};

export default Banner;
