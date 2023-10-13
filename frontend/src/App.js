import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Booking from "./Pages/Booking";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
// import SignUp from "./Pages/SignUp";
// import AdminDashboard from "./Pages/AdminDashboard";
import Registration from "./components/Registration";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          {/* <Route path="/sign-up" element={<SignUp />} /> */}
          {/* <Route path="/admin-dash-board" element={<AdminDashboard />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
