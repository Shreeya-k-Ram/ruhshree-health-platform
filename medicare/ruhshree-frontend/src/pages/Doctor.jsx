import React, { useEffect, useState } from "react";
import "./Doctor.css";
import { API_BASE_URL } from "../services/api";
import { useNavigate } from "react-router-dom";

function Doctor() {

    const [doctor, setDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    const fetchDoctorData = async () => {

        if (!token) {
            setError("Please login first.");
            setLoading(false);
            return;
        }

        try {

            setLoading(true);
            setError("");

            // Get logged-in doctor
            const doctorResponse = await fetch(
                `${API_BASE_URL}/doctors/me`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!doctorResponse.ok) {
                if (
                    doctorResponse.status === 401 ||
                    doctorResponse.status === 403 ||
                    doctorResponse.status === 404
                ) {
                    navigate("/access-denied");
                    return;
                }

                throw new Error(
                    `Unable to load doctor profile: ${doctorResponse.status}`
                );
            }

            const doctorData = await doctorResponse.json();

            setDoctor(doctorData);

            const appointmentResponse = await fetch(
                `${API_BASE_URL}/appointments/doctor/${doctorData.id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!appointmentResponse.ok) {
                throw new Error(
                    `Failed to load appointments: ${appointmentResponse.status}`
                );
            }

            const appointmentData =
                await appointmentResponse.json();

            setAppointments(appointmentData);

        } catch (err) {

            console.error("Doctor dashboard error:", err);
            setError(err.message);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchDoctorData();
    }, []);

    const approveAppointment = async (appointmentId) => {

        try {

            const response = await fetch(
                `${API_BASE_URL}/appointments/${appointmentId}/approve`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            const updatedAppointment =
                await response.json();

            setAppointments((previous) =>
                previous.map((appointment) =>
                    appointment.id === appointmentId
                        ? updatedAppointment
                        : appointment
                )
            );

        } catch (err) {

            console.error(err);
            alert(err.message);

        }
    };

    const cancelAppointment = async (appointmentId) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this appointment?"
        );

        if (!confirmCancel) {
            return;
        }

        try {

            const response = await fetch(
                `${API_BASE_URL}/appointments/${appointmentId}/cancel`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Cancellation failed: ${response.status}`
                );
            }

            const updatedAppointment =
                await response.json();

            setAppointments((previous) =>
                previous.map((appointment) =>
                    appointment.id === appointmentId
                        ? updatedAppointment
                        : appointment
                )
            );

        } catch (err) {

            console.error(err);
            alert(err.message);

        }
    };

    if (loading) {

        return (
            <div className="doctor-page">

                <div className="doctor-loading">

                    <div className="doctor-loading-spinner"></div>

                    <h3>
                        Loading your doctor dashboard
                    </h3>

                    <p>
                        Please wait while we securely fetch your information...
                    </p>

                </div>

            </div>
        );
    }

    if (error) {

        return (
            <div className="doctor-page">

                <div className="doctor-error">

                    <div className="doctor-error-icon">
                        !
                    </div>

                    <h2>
                        Unable to load your profile
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        className="doctor-retry-button"
                        onClick={fetchDoctorData}
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );
    }

    if (!doctor) {
        return null;
    }

    const approvedCount =
        appointments.filter(
            appointment =>
                appointment.status === "APPROVED"
        ).length;

    const cancelledCount =
        appointments.filter(
            appointment =>
                appointment.status === "CANCELLED"
        ).length;

    const pendingCount =
        appointments.filter(
            appointment =>
                appointment.status !== "APPROVED" &&
                appointment.status !== "CANCELLED"
        ).length;

    const cleanDoctorName =
        doctor.name
            ? doctor.name.replace(/^Dr\.?\s*/i, "")
            : "Doctor";

    return (

        <div className="doctor-page">

            <div className="doctor-container">

                <header className="doctor-header">

                    <div>

                        <span className="doctor-brand">
                            RUHSHREE HEALTH
                        </span>

                        <h1>
                            Welcome, Dr. {cleanDoctorName}
                            <img
                                 src="/doc.jpg"
                                 alt="Doctor"
                                 className="doctor-welcome-emoji"
                            />
                        </h1>

                        <p>
                            Manage appointments and patient care
                            from one place.
                        </p>

                    </div>

                    <div className="doctor-avatar-large">

                        {cleanDoctorName
                            .charAt(0)
                            .toUpperCase()
                        }

                    </div>

                </header>

                <section className="doctor-stats">

                    <div className="doctor-stat-card">

                        <div className="doctor-stat-icon">
                            📅
                        </div>

                        <div>

                            <span>
                                Total Appointments
                            </span>

                            <strong>
                                {appointments.length}
                            </strong>

                        </div>

                    </div>


                    <div className="doctor-stat-card">

                        <div className="doctor-stat-icon pending">
                            ⏳
                        </div>

                        <div>

                            <span>
                                Pending
                            </span>

                            <strong>
                                {pendingCount}
                            </strong>

                        </div>

                    </div>


                    <div className="doctor-stat-card">

                        <div className="doctor-stat-icon approved">
                            ✓
                        </div>

                        <div>

                            <span>
                                Approved
                            </span>

                            <strong>
                                {approvedCount}
                            </strong>

                        </div>

                    </div>


                    <div className="doctor-stat-card">

                        <div className="doctor-stat-icon cancelled">
                            ×
                        </div>

                        <div>

                            <span>
                                Cancelled
                            </span>

                            <strong>
                                {cancelledCount}
                            </strong>

                        </div>

                    </div>

                </section>

                <section className="doctor-section">

                    <div className="doctor-section-heading">

                        <div>

                            <span>
                                PROFESSIONAL INFORMATION
                            </span>

                            <h2>
                                Your Profile
                            </h2>

                            <p>
                                Your professional and contact information.
                            </p>

                        </div>

                        <div className="doctor-id-badge">
                            DOCTOR #{doctor.id}
                        </div>

                    </div>


                    <div className="doctor-profile-card">

                        <div className="doctor-profile-main">

                            <div className="doctor-profile-avatar">

                                {cleanDoctorName
                                    .charAt(0)
                                    .toUpperCase()
                                }

                            </div>

                            <div>

                                <h2>
                                    Dr. {cleanDoctorName}
                                </h2>

                                <span>
                                    {doctor.specialization ||
                                        "Medical Specialist"}
                                </span>

                            </div>

                        </div>

                        <div className="doctor-profile-details">

                            <div className="doctor-detail">
                                <span>
                                    EXPERIENCE
                                </span>

                                <strong>
                                    {doctor.experience ?? "--"} years
                                </strong>

                            </div>

                            <div className="doctor-detail">
                                <span>
                                    EMAIL
                                </span>

                                <strong>
                                    {doctor.email || "--"}
                                </strong>

                            </div>


                            <div className="doctor-detail">
                                <span>
                                    PHONE
                                </span>

                                <strong>
                                    {doctor.phone || "--"}
                                </strong>

                            </div>


                            <div className="doctor-detail">
                                <span>
                                    ADDRESS
                                </span>

                                <strong>
                                    {doctor.address || "--"}
                                </strong>

                            </div>

                            <div className="doctor-detail doctor-rating">
                                <span>
                                    PATIENT RATING
                                </span>

                                <strong>
                                    ⭐ 4.8 / 5.0
                                </strong>

                                <small>
                                    Highly rated by patients
                                </small>

                            </div>

                        </div>

                    </div>

                </section>

                <section className="doctor-section">

                    <div className="doctor-section-heading">

                        <div>

                            <span>
                                PATIENT CARE
                            </span>

                            <h2>
                                Appointments
                            </h2>

                            <p>
                                Review and manage appointments scheduled
                                with you.
                            </p>

                        </div>

                        <div className="doctor-appointment-count">
                            {appointments.length}
                            <span>
                                {appointments.length === 1
                                    ? " Appointment"
                                    : " Appointments"}
                            </span>
                        </div>

                    </div>


                    {appointments.length === 0 ? (

                        <div className="doctor-empty-card">

                            <div className="doctor-empty-icon">
                                📅
                            </div>

                            <h3>
                                No appointments yet
                            </h3>

                            <p>
                                You currently don't have any scheduled
                                appointments.
                            </p>

                        </div>

                    ) : (

                        <div className="doctor-appointment-list">

                            {appointments.map((appointment) => {

                                const status =
                                    appointment.status || "BOOKED";

                                return (

                                    <div
                                        className="doctor-appointment-card"
                                        key={appointment.id}
                                    >

                                        <div className="doctor-patient">

                                            <div className="doctor-patient-avatar">

                                                {appointment.patientName
                                                    ? appointment.patientName
                                                        .charAt(0)
                                                        .toUpperCase()
                                                    : "P"
                                                }

                                            </div>

                                            <div>

                                                <h3>
                                                    {appointment.patientName ||
                                                        `Patient #${appointment.patientId || ""}`
                                                    }
                                                </h3>

                                                <p>
                                                    Patient
                                                </p>

                                            </div>

                                        </div>


                                        <div className="doctor-appointment-info">

                                            <span>
                                                DATE
                                            </span>

                                            <strong>
                                                📅 {appointment.appointmentDate || "--"}
                                            </strong>

                                        </div>


                                        <div className="doctor-appointment-info">

                                            <span>
                                                TIME
                                            </span>

                                            <strong>
                                                🕐 {appointment.appointmentTime || "--"}
                                            </strong>

                                        </div>


                                        <div className="doctor-status-area">

                                            <span>
                                                STATUS
                                            </span>

                                            <span
                                                className={`doctor-status ${status.toLowerCase()}`}
                                            >
                                                {status}
                                            </span>

                                        </div>


                                        <div className="doctor-actions">

                                            {status !== "APPROVED" &&
                                                status !== "CANCELLED" && (

                                                    <>
                                                        <button
                                                            className="approve-button"
                                                            onClick={() =>
                                                                approveAppointment(
                                                                    appointment.id
                                                                )
                                                            }
                                                        >
                                                            ✓ Approve
                                                        </button>

                                                        <button
                                                            className="cancel-button"
                                                            onClick={() =>
                                                                cancelAppointment(
                                                                    appointment.id
                                                                )
                                                            }
                                                        >
                                                            × Cancel
                                                        </button>
                                                    </>

                                                )}

                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                    )}

                </section>

            </div>

        </div>
    );
}

export default Doctor;