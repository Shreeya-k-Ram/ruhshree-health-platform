import React, { useEffect, useState } from "react";
import "./Patient.css";
import { API_BASE_URL } from "../services/api";

function Patient() {

    const [patient, setPatient] = useState(null);
    const [appointments, setAppointments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchPatientData();
    }, []);

    const fetchPatientData = async () => {

        if (!token) {
            setError("Please login first.");
            setLoading(false);
            return;
        }

        try {

            setLoading(true);
            setError("");

            // Get logged-in patient's profile
            const patientResponse = await fetch(
                `${API_BASE_URL}/patients/me`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!patientResponse.ok) {
                throw new Error(
                    `Unable to load patient profile: ${patientResponse.status}`
                );
            }

            const patientData =
                await patientResponse.json();

            setPatient(patientData);

            // Get patient's appointments
            const appointmentResponse = await fetch(
                `${API_BASE_URL}/appointments/patient/${patientData.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (appointmentResponse.ok) {

                const appointmentData =
                    await appointmentResponse.json();

                setAppointments(appointmentData);

            } else {
                setAppointments([]);

            }

        } catch (err) {

            console.error(err);
            setError(err.message);

        } finally {

            setLoading(false);

        }
    };


    if (loading) {

        return (
            <div className="patient-loading">

                <div className="patient-loading-spinner"></div>

                <h3>
                    Loading your profile
                </h3>

                <p>
                    Please wait while we fetch your information...
                </p>

            </div>
        );

    }


    if (error) {

        return (
            <div className="patient-error">

                <div className="patient-error-icon">
                    !
                </div>

                <h2>
                    Unable to load your profile
                </h2>

                <p>
                    {error}
                </p>

                <button
                    className="patient-retry-button"
                    onClick={fetchPatientData}
                >
                    Try Again
                </button>

            </div>
        );

    }


    if (!patient) {
        return null;
    }


    return (

        <div className="patient-page">

            <div className="patient-container">

                {/* HEADER */}

                <header className="patient-header">

                    <div>

                        <p className="patient-label">
                            RUHSHREE HEALTH
                        </p>

                        <h1>
                            Welcome, {patient.name} 👋
                        </h1>

                        <p className="patient-subtitle">
                            Manage your health information and appointments
                            from one place.
                        </p>

                    </div>

                    <div className="patient-avatar">

                        {patient.name
                            ? patient.name.charAt(0).toUpperCase()
                            : "P"
                        }

                    </div>

                </header>

                <section className="patient-section">

                    <div className="patient-section-heading">

                        <p className="patient-section-label">
                            PERSONAL INFORMATION
                        </p>

                        <h2>
                            Your Profile
                        </h2>

                        <p>
                            Your registered healthcare information.
                        </p>

                    </div>


                    <div className="patient-profile-card">

                        <div className="patient-profile-item">
                            <span>FULL NAME</span>
                            <strong>{patient.name}</strong>
                        </div>

                        <div className="patient-profile-item">
                            <span>PATIENT ID</span>
                            <strong>#{patient.id}</strong>
                        </div>

                        <div className="patient-profile-item">
                            <span>AGE</span>
                            <strong>{patient.age} years</strong>
                        </div>

                        <div className="patient-profile-item">
                            <span>GENDER</span>
                            <strong>{patient.gender}</strong>
                        </div>

                        <div className="patient-profile-item">
                            <span>PHONE</span>
                            <strong>{patient.phone}</strong>
                        </div>

                        <div className="patient-profile-item">
                            <span>EMAIL</span>
                            <strong>{patient.email}</strong>
                        </div>

                        <div className="patient-profile-item">
                            <span>ADDRESS</span>
                            <strong>{patient.address}</strong>
                        </div>

                    </div>

                </section>

                <section className="patient-section">

                    <div className="book-appointment-card">

                        <div>

                            <p className="patient-section-label">
                                YOUR HEALTHCARE
                            </p>

                            <h2>
                                Need medical assistance?
                            </h2>

                            <p>
                                Book an appointment with one of our
                                healthcare professionals.
                            </p>

                        </div>

                        <button
                            className="book-appointment-button"
                            onClick={() =>
                                window.location.href =
                                    "/appointments/book"
                            }
                        >
                            Book Appointment
                            <span>→</span>
                        </button>

                    </div>

                </section>

                <section className="patient-section">

                    <div className="patient-section-heading">

                        <p className="patient-section-label">
                            YOUR CARE
                        </p>

                        <h2>
                            My Appointments
                        </h2>

                        <p>
                            View your upcoming and previous appointments.
                        </p>

                    </div>


                    {appointments.length === 0 ? (

                        <div className="patient-empty-card">

                            <div className="patient-empty-icon">
                                📅
                            </div>

                            <h3>
                                No appointments yet
                            </h3>

                            <p>
                                You don't have any appointments scheduled.
                            </p>

                            <button
                                className="empty-book-button"
                                onClick={() =>
                                    window.location.href =
                                        "/appointments/book"
                                }
                            >
                                Book Your First Appointment
                            </button>

                        </div>

                    ) : (

                        <div className="appointments-list">

                            {appointments.map(
                                (appointment) => {

                                    const status =
                                        appointment.status ||
                                        "BOOKED";

                                    return (

                                        <div
                                            className="appointment-card"
                                            key={appointment.id}
                                        >

                                            <div className="appointment-doctor">

                                                <div className="appointment-doctor-avatar">
                                                    👨‍⚕️
                                                </div>

                                                <div>

                                                    <h3>
                                                        {appointment.doctor?.name ||
                                                            appointment.doctorName ||
                                                            "Doctor"
                                                        }
                                                    </h3>

                                                    <p>
                                                        {appointment.doctor?.specialization ||
                                                            appointment.specialization ||
                                                            "Healthcare Professional"
                                                        }
                                                    </p>

                                                </div>

                                            </div>


                                            <div className="appointment-info">

                                                <span>
                                                    DATE
                                                </span>

                                                <strong>
                                                    {appointment.date ||
                                                        appointment.appointmentDate ||
                                                        "Not available"
                                                    }
                                                </strong>

                                            </div>


                                            <div className="appointment-info">

                                                <span>
                                                    TIME
                                                </span>

                                                <strong>
                                                    {appointment.time ||
                                                        appointment.appointmentTime ||
                                                        "Not available"
                                                    }
                                                </strong>

                                            </div>


                                            <div className="appointment-status-container">

                                                <span>
                                                    STATUS
                                                </span>

                                                <span
                                                    className={`appointment-status ${status.toLowerCase()}`}
                                                >
                                                    {status}
                                                </span>

                                            </div>

                                        </div>

                                    );

                                }
                            )}

                        </div>

                    )}

                </section>

            </div>

        </div>
    );
}

export default Patient;