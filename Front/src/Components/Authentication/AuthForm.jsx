// AuthForm.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../api/apiClient";
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

  // Load token and role from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("auth-token");
    const storedRole = localStorage.getItem("user-role");
    
    if (storedToken && storedRole) {
      setRole(storedRole);
      navigate(storedRole === "author" ? "/addbook" : "/home");
    }
  }, [navigate, setRole]);

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
      const data = await auth.login(formData.email, formData.password);
      
      // Store token and role in localStorage
      localStorage.setItem("auth-token", data.authToken);
      localStorage.setItem("user-role", data.role);
      
      alert("Login successful");
      setRole(data.role); // Store role in context
      navigate(data.role === "author" ? "/addbook" : "/home"); // Redirect based on role
    } catch (err) {
      console.error("Login error:", err);
      alert(err.message || "Login error, please try again");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const data = await auth.register(formData.username, formData.email, formData.password, formData.role);
      
      // Store token and role in localStorage
      localStorage.setItem("auth-token", data.authToken);
      localStorage.setItem("user-role", formData.role);
      
      alert("Registration successful");
      setRole(formData.role); // Store role in context
      setFormData({ username: "", email: "", password: "", role: "author" });
      
      // Navigate immediately after signup
      navigate(formData.role === "author" ? "/addbook" : "/home");
    } catch (err) {
      console.error("Sign Up error:", err);
      alert(err.message || "Registration error, please try again");
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
