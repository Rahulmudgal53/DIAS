// AuthForm.js
import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

export const RoleContext = createContext();

const AuthForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "author", // Default role
  });
  const [isLogin, setLogin] = useState(true);
  const { setRole } = useContext(RoleContext); // Access RoleContext
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login successful");
        setRole(data.role); // Store role in context
        navigate(data.role === "author" ? "/addbook" : "/home"); // Redirect based on role
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login error, please try again");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful");
        setFormData({ username: "", email: "", password: "", role: "author" });
        setLogin(true); // Switch back to login form after sign-up
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      console.error("Sign Up error:", err);
      alert("Registration error, please try again");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <button className={isLogin ? "active" : ""} onClick={() => setLogin(true)}>Login</button>
          <button className={!isLogin ? "active" : ""} onClick={() => setLogin(false)}>Sign Up</button>
        </div>

        {isLogin ? (
          <form className="auth" onSubmit={handleLogin}>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button type="submit" >Login</button>
          </form>
        ) : (
          <form  className="auth" onSubmit={handleSignUp}>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <div className="role-selection">
              <label>
                <input type="radio" name="role" value="author" checked={formData.role === "author"} onChange={handleChange} />
                Author
              </label>
              <label>
                <input type="radio" name="role" value="reader" checked={formData.role === "reader"} onChange={handleChange} />
                Reader
              </label>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
