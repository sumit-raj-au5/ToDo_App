import { Link } from "react-router-dom";
import logo from "./logo.png";
import {Navbar, Container, NavDropdown, Nav, Image} from 'react-bootstrap';

const Navbars = ({ user }) => {
  const logout = () => {
    window.open(`${process.env.REACT_APP_AUTH_URL}/logout`, "_self");
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
    <Container>
    <Link className="link ms-4" to="/">
      <Navbar.Brand>ToDo List</Navbar.Brand>
    </Link>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ms-auto">
        {user && <>
        <Nav.Link> <Image  src={user.photos[0].value} className="avatar"/> {user.displayName} </Nav.Link>
        <Nav.Link eventKey={2} onClick={logout}>
          Logout
        </Nav.Link></>}
        {!user && <Nav.Link className="link" to="login">
          Login
        </Nav.Link>}
      </Nav>
    </Navbar.Collapse>
  </Container>
      {/* <span className="logo">
        <Link className="link ms-4" to="/">
          ToDo List
        </Link>
      </span>
      {user ? (
        <ul className="list ms-auto">
          <li className="listItem">
            <img
              src={user.photos[0].value}
              alt=""
              className="avatar"
            />
          </li>
          <li className="listItem">{user.displayName}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link className="link me-4" to="login">
          Login
        </Link>
      )} */}
    </Navbar>
  );
};

export default Navbars;
