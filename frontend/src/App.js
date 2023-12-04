import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext"; // Import UserProvider
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import NoPage from "./pages/NoPage";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Booking from "./pages/Booking";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="services/book/:_id" element={<Booking />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
