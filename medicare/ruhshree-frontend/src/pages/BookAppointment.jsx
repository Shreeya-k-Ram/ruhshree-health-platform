import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookAppointment.css";
import { API_BASE_URL } from "../services/api";

function BookAppointment() {

    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");

    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [patientId, setPatientId] = useState(null);

    useEffect(() => {

        const fetchData = async () => {

            const token = localStorage.getItem("token");

            try {
                const patientResponse = await fetch(
                    `${API_BASE_URL}/patients/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!patientResponse.ok) {
                    throw new Error("Failed to load patient profile");
                }

                const patientData = await patientResponse.json();

                console.log("Logged-in patient:", patientData);

                setPatientId(patientData.id);


                // Get doctors
                const doctorResponse = await fetch(
                    `${API_BASE_URL}/doctors`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!doctorResponse.ok) {
                    throw new Error("Failed to load doctors");
                }

                const doctorData = await doctorResponse.json();

                setDoctors(doctorData);

            } catch (error) {

                console.error(error);
                setError(error.message);

            } finally {

                setLoading(false);

            }
        };

        fetchData();

    }, []);

    const handleDoctorSelect = (doctor) => {

        setSelectedDoctor(doctor);
        setSuccess("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleBooking = async (e) => {

        e.preventDefault();

        if (!selectedDoctor) {
            setError("Please select a doctor.");
            return;
        }

        if (!appointmentDate || !appointmentTime) {
            setError("Please select appointment date and time.");
            return;
        }

        setBooking(true);
        setError("");
        setSuccess("");

        const token = localStorage.getItem("token");

        try {

            const response = await fetch(
                `${API_BASE_URL}/appointments`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        patientId: patientId,
                        doctorId: selectedDoctor.id,
                        appointmentDate: appointmentDate,
                        appointmentTime: appointmentTime
                    })
                }
            );

            if (!response.ok) {

                const text = await response.text();

                throw new Error(
                    text || `Booking failed: ${response.status}`
                );
            }

            const data = await response.json();

            console.log("Appointment booked:", data);

            setSuccess(
                `Appointment successfully booked with ${selectedDoctor.name}!`
            );

            setAppointmentDate("");
            setAppointmentTime("");

            setTimeout(()=> {
                navigate("/patient");
            }, 1000);

        } catch (error) {

            console.error(error);
            setError(error.message);

        } finally {
            setBooking(false);

        }
    };

    if (loading) {
        return (
            <div className="appointment-page">
                <div className="loading">
                    Loading doctors...
                </div>
            </div>
        );
    }

    return (

        <div className="appointment-page">

            <div className="appointment-header">

                <div>

                    <div className="brand">
                        <div className="brand-icon">♡</div>

                        <div>
                            <h2>RuhShree Health</h2>
                            <span>HUMAN-FIRST CARE</span>
                        </div>
                    </div>

                </div>

                <div className="header-title">
                    <h1>Book an appointment</h1>
                    <p>
                        Choose a doctor and schedule your visit with ease.
                    </p>
                </div>

            </div>

            <div className="appointment-container">

                <div className="doctor-section">

                    <div className="section-heading">

                        <span className="small-label">
                            FIND YOUR CARE
                        </span>

                        <h2>Choose your doctor</h2>

                        <p>
                            Select a healthcare professional based on their
                            speciality and experience.
                        </p>

                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="success-message">
                            {success}
                        </div>
                    )}

                    <div className="doctor-grid">

                        {doctors.map((doctor) => (

                            <div
                                key={doctor.id}
                                className={`doctor-card ${
                                    selectedDoctor?.id === doctor.id
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() => handleDoctorSelect(doctor)}
                            >

                                <div className="doctor-avatar">
                                    {doctor.name
                                        ? doctor.name.charAt(0)
                                        : "D"}
                                </div>

                                <div className="doctor-info">

                                    <h3>
                                        {doctor.name}
                                    </h3>

                                    <p className="specialization">
                                        {doctor.specialization}
                                    </p>

                                    <p>
                                        {doctor.experience} years experience
                                    </p>

                                </div>

                                <div className="doctor-arrow">
                                    →
                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                <div className="booking-card">

                    {!selectedDoctor ? (

                        <div className="empty-selection">

                            <div className="empty-icon">
                                ♡
                            </div>

                            <h2>Select a doctor</h2>

                            <p>
                                Choose a doctor from the list to see their
                                details and book an appointment.
                            </p>

                        </div>

                    ) : (

                        <>

                            <div className="selected-doctor">

                                <div className="large-avatar">
                                    {selectedDoctor.name
                                        ? selectedDoctor.name.charAt(0)
                                        : "D"}
                                </div>

                                <div>

                                    <span className="doctor-label">
                                        YOUR SELECTED DOCTOR
                                    </span>

                                    <h2>
                                        {selectedDoctor.name}
                                    </h2>

                                    <p>
                                        {selectedDoctor.specialization}
                                    </p>

                                </div>

                            </div>


                            <div className="doctor-details">

                                <div className="detail-item">

                                    <span>
                                        Experience
                                    </span>

                                    <strong>
                                        {selectedDoctor.experience} years
                                    </strong>

                                </div>


                                <div className="detail-item">

                                    <span>
                                        Email
                                    </span>

                                    <strong>
                                        {selectedDoctor.email}
                                    </strong>

                                </div>

                                <div className="detail-item">

                                    <span>
                                        Phone
                                    </span>

                                    <strong>
                                        {selectedDoctor.phone}
                                    </strong>

                                </div>

                            </div>

                            <div className="price-section">

                                <div>

                                    <span>
                                        Consultation fee
                                    </span>

                                    <h2>
                                        ₹500
                                    </h2>

                                </div>

                                <span className="price-note">
                                    Per consultation
                                </span>

                            </div>

                            <form
                                onSubmit={handleBooking}
                                className="booking-form"
                            >

                                <h3>
                                    Choose your appointment
                                </h3>


                                <div className="form-group">

                                    <label>
                                        Appointment date
                                    </label>

                                    <input
                                        type="date"
                                        value={appointmentDate}
                                        onChange={(e) =>
                                            setAppointmentDate(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>
                                <div className="form-group">

                                    <label>
                                        Appointment time
                                    </label>

                                    <input
                                        type="time"
                                        value={appointmentTime}
                                        onChange={(e) =>
                                            setAppointmentTime(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>


                                <button
                                    type="submit"
                                    className="book-button"
                                    disabled={booking}
                                >

                                    {booking
                                        ? "Booking..."
                                        : "Book appointment →"}

                                </button>

                            </form>


                            <div className="secure-message">
                                🔒 Your appointment information is securely
                                handled.
                            </div>

                        </>

                    )}

                </div>

            </div>

        </div>
    );
}

export default BookAppointment;
