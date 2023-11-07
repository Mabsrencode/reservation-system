import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Booking from "./Pages/Booking";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
// import Profile from "./Pages/Profile";
import Admin from "./Pages/Admin";
import Page404 from "./Pages/Page404";
import Registration from "./components/Registration";
import RequireAuth from "./context/RequireAuth";
import AdminAuth from "./context/AdminAuth";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route element={<RequireAuth />}>
            <Route path="/booking" element={<Booking />} />
            {/* <Route path="/user" element={<Profile />} /> */}
          </Route>
          <Route element={<AdminAuth />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
