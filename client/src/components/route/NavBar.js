import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchBar from "../pages/SearchBar";
import Logout from "../buttons/Logout";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const NavBar = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand as={Link} to='/'>
        RECIPE HUB
      </Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Item>
          <Nav.Link as={Link} to='/browse'>
            Browse Recipe
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/random'>
            Random Recipe
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Nav className='mr-auto'>
        <SearchBar />
      </Nav>
      {user ? (
        user.username === "NOT_LOGGED_IN" ? (
          <Nav>
            <Nav.Item>
              <Nav.Link as={Link} to='/login'>
                Login
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to='/signup'>
                Sign Up
              </Nav.Link>
            </Nav.Item>
          </Nav>
        ) : (
          <Nav>
            <Nav.Item>
              <Nav.Link as={Link} to='/fave'>
                Faved
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to='/planner'>
                Planner
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to='/recipe/user'>
                My Recipes
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to='/recipe/new'>
                Add New Recipe
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Logout />
            </Nav.Item>
          </Nav>
        )
      ) : null}
    </Navbar>
  );
};

export default NavBar;
