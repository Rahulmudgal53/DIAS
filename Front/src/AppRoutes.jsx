import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Reader/Home";
import AuthForm from "./Components/Authentication/AuthForm";
import AddBook from "./Components/Author/AddBook";
// import ReaderDashboard from "./Components/ReaderDashboard";
import { RoleContext } from "./Components/Authentication/AuthForm"; // Use RoleContext

const AppRoutes = () => {
  const { role } = useContext(RoleContext); // Get the role from context

  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      
      {/* Conditional routes based on user role */}
      {role === "author" && (
        <>
          <Route path="/addbook" element={<AddBook />} />
          {/* <Route path="/reader-dashboard" element={<Navigate to="/" />} /> */}
        </>
      )}

      {role === "reader" && (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/addbook" element={<Navigate to="/" />} />
        </>
      )}

      {/* Fallback for unrecognized paths */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
