import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/register";
import Profile from "./components/profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./components/firebase";
import Create from "./react-crud/Create";
import Edit from "./react-crud/Edit";
import Home from "./react-crud/Home";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe(); // Clean up the subscription
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={user ? <Navigate to="/profile" /> : <AuthWrapper><Login /></AuthWrapper>} />
        <Route path="/login" element={<AuthWrapper><Login /></AuthWrapper>} />
        <Route path="/register" element={<AuthWrapper><SignUp /></AuthWrapper>} />

        {/* Protected Routes */}
        <Route path="/profile" element={<AuthWrapper><Profile /></AuthWrapper>} />
        <Route path="/react-crud/*" element={<HomeRoutes />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

function AuthWrapper({ children }) {
  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          {children}
        </div>
      </div>
    </div>
  );
}

function HomeRoutes() {
  return (
    <div className="App">
      <h1 className="Project">ADMIN LOGIN</h1> 
      <h3 className="crud">CRUD App</h3>
      <Routes>
        <Route path="create" element={<Create />} />
        <Route path="edit" element={<Edit />} />
        <Route path="home" element={<Home />} />
        <Route path="*" element={<Navigate to="/react-crud/home" />} />
      </Routes>
    </div>
  );
}

export default App;
  