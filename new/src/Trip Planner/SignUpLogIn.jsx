import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index1.css";

const SignUpLogIn = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleAuth = (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    if (isSignup) {
      
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.find((user) => user.email === email);

      if (userExists) {
        alert("User already exists. Please login.");
        return;
      }

      users.push({ email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup successful! Please login.");
      setIsSignup(false);
    } else {
      
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find((user) => user.email === email && user.password === password);

      if (user) {
        navigate("/trips");
      } else {
        alert("Invalid email or password.");
      }
    }
  };

  return (
    <div className="app-container">
    <div className="auth-container">
      <form onSubmit={handleAuth}>
        <h2>{isSignup ? "Signup" : "Login"}</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isSignup ? "Signup" : "Login"}</button>
        <p onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}
        </p>
      </form>
    </div>
    </div>
  );
};

export default SignUpLogIn;
