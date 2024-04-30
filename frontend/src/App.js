import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import NoPage from "./pages/NoPage";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Carwash from "./pages/Carwash";
import ScrollToTopButton from "./components/up-button/ScrollToTopButton";
import TermsAndCondition from "./pages/TermsAndCondition";

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
              <Route
                path="services/book/auto-detailing/:_id"
                element={<Booking />}
              />
              <Route path="services/book/carwash/:_id" element={<Carwash />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NoPage />} />
              <Route path="terms&condition" element={<TermsAndCondition />} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
      <ScrollToTopButton />
    </div>
  );
}

export default App;
