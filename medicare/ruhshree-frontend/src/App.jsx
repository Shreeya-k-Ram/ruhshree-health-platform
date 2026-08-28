import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Experience from "./components/Experience";
import Workflow from "./components/Workflow";
import Platform from "./components/Platform";
import Testimonial from "./components/Testimonial";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";


import RuhShreeExperience from "./pages/RuhShreeExperience";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import BookAppointment from "./pages/BookAppointment.jsx";
import PlatformPage from "./pages/PlatformPage";
import Patient from "./pages/Patient";
import Doctor from "./pages/Doctor";
import Clinic from "./pages/Clinic.jsx";
import Admin from "./pages/Admin.jsx";
import AccessDenied from "./pages/AccessDenied";


function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Stats />
            <Experience />
            <Workflow />
            <Platform />
            <Testimonial />
            <FAQ />
            <Footer />
        </>
    );
}

function App() {
    return (
        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/ruhshree" element={<RuhShreeExperience />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/appointments/book" element={<BookAppointment />} />
            <Route path="/platform" element={<PlatformPage />} />
            <Route path="/patient" element={<Patient />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/clinic" element={<Clinic />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/access-denied" element={<AccessDenied />} />

        </Routes>
    );
}

export default App;
