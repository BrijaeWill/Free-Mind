import React, { useState } from "react";
import { registerUser } from "../api/api.ts";
import { useNavigate } from "react-router-dom";
import './register.css'
import "bootstrap/dist/css/bootstrap.min.css";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const response = await registerUser({ username, email, password });

      if (response.message === "User registered successfully") {
        navigate("/login");
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (error) {
      setError("An error occurred during registration");
    }
  };

  return (
    <div className="register-container">
      <div className="card shadow-sm p-4">
        <h2 className="text-center mb-4">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="button" className="btn btn-primary w-100" onClick={handleRegister}>
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <button className="btn btn-link p-0" onClick={() => navigate("/")}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
