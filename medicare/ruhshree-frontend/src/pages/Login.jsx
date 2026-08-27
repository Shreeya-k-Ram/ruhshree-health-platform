import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import doctorImage from "../assets/doctor.jpg";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const data = await loginUser(username, password);

            console.log("Login successful:", data);

            localStorage.setItem("token", data.token);

            alert("Login successful!");

            const payload = JSON.parse(atob(data.token.split(".")[1]));

            if (payload.role === "PATIENT") {
                navigate("/patient");
            }
            else if (payload.role === "DOCTOR") {
                navigate("/doctor");
            }
            else if (payload.role === "ADMIN") {
                navigate("/admin");
            }
            else {
                navigate("/");
            }

        } catch (error) {
            console.error(error);
            setError("Invalid username or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-content">

                    <div className="login-brand">
                        <div className="login-logo">♡</div>

                        <div>
                            <h2>RuhShree Health</h2>
                            <p>Human-first care</p>
                        </div>
                    </div>

                    <div className="login-heading">
                        <p className="login-small-title">
                            Welcome back
                        </p>

                        <h1>
                            Care that starts
                            <br />
                            with <span>you.</span>
                        </h1>

                        <p className="login-description">
                            Sign in to continue your healthcare journey
                            with RuhShree Health.
                        </p>
                    </div>

                    <form onSubmit={handleLogin}>

                        <div className="form-group">
                            <label>Username</label>

                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="button"
                            className="forgot-password-link"
                            onClick={() => navigate("/forgot-password")}
                        >
                            Forgot password?
                        </button>

                        {error && (
                            <p className="login-error">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                            <span>→</span>
                        </button>

                    </form>

                    <p className="login-register">
                        Don't have an account?

                        <button
                            type="button"
                            onClick={() => navigate("/register")}
                        >
                            Create an account
                        </button>
                    </p>

                    <p className="login-footer">
                        Your care. Your story. Your health.
                    </p>

                </div>

                <div className="login-image">

                    <img
                        src={doctorImage}
                        alt="Doctor providing care"
                    />

                    <div className="image-overlay-card">
                        <span>♡</span>

                        <div>
                            <strong>Human-first care</strong>
                            <p>
                                Healthcare designed around you.
                            </p>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
