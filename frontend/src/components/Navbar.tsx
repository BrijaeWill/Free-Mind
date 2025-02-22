import React  from 'react';
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const NavigationBar = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError("Logout failed");
      }
    } catch (error) {
      setError("An error occurred during logout");
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Free Mind</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            <NavDropdown
              title={<img src="profile-icon-url" alt="Profile" className="profile-icon" />}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#view-profile">View Profile</NavDropdown.Item>
              <NavDropdown.Item href="#edit-profile">Edit Profile</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    </Navbar>
  );
};

export default NavigationBar;
