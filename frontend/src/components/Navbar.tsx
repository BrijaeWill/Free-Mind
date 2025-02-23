import React  from 'react';
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const NavigationBar = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await fetch("https://free-mind-2.onrender.com/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        setError("Logout failed");
      }
    } catch (error) {
      setError("An error occurred during logout");
    }
  };

  return (
    <Navbar className="navbar navbar-expand-lg navbar-light">
      <Container>
        <Navbar.Brand className="navbar-title">Free Mind</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto navbar-links">
          {location.pathname === "/journal" && (
              <>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                <NavDropdown
                  title={<img src="profile-icon-url" alt="Profile" className="profile-icon" />}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="#view-profile">View Profile</NavDropdown.Item>
                  <NavDropdown.Item href="#edit-profile">Edit Profile</NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
  
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    </Navbar>
  );
  
};

export default NavigationBar;
