import React, { useState, useEffect } from "react";
// import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Pages/Navbar";
import AppRoutes from "./AppRoutes";
import { RoleContext } from "./Components/Authentication/AuthForm";

function App() {
  const [role, setRole] = useState(""); // Track user role

  // Load role from localStorage on mount
  useEffect(() => {
    const storedRole = localStorage.getItem("user-role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      <Router>
        <Navbar />
        <div className="roleComponent">
          <AppRoutes />
        </div>
      </Router>
    </RoleContext.Provider>
  );
}

export default App;
