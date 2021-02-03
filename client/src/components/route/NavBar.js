import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        RECIPE HUB
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link as={Link} to="/browse">
            Browse Recipe
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/random">
            Random Recipe
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/search">
            Search Bar
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* check if not logged in yet */}
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/signup">
            Sign Up
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* if already login */}
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link} to="/fave">
            Faved
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/planner">
            Planner
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/recipe/new">
            Add New Recipe
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/logout">
            Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
