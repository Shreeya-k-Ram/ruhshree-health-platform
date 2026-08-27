import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import doctorImage from "../assets/doctor.jpg";
import "./Register.css";
import { API_BASE_URL } from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Patient information
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [disease, setDisease] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {

            const response = await fetch(
                `${API_BASE_URL}/users/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password,
                        role: "PATIENT",

                        patient: {
                            name: name,
                            age: Number(age),
                            gender: gender,
                            phone: phone,
                            email: email,
                            address: address,
                            disease: disease
                        }
                    })
                }
            );

            if (!response.ok) {

                const message = await response.text();

                throw new Error(
                    message || "Registration failed."
                );
            }

            const data = await response.json();

            console.log("Registration successful:", data);

            alert("Account created successfully!");

            navigate("/login");

        } catch (error) {

            console.error(error);

            setError(
                error.message || "Unable to create account."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="register-page">

            <div className="register-card">

                <div className="register-content">

                    <div className="register-brand">

                        <div className="register-logo">
                            ♡
                        </div>

                        <div>
                            <h2>RuhShree Health</h2>
                            <p>Human-first care</p>
                        </div>

                    </div>

                    <div className="register-heading">

                        <p className="register-small-title">
                            Create your account
                        </p>

                        <h1>
                            Your health,
                            <br />
                            starts <span>here.</span>
                        </h1>

                        <p className="register-description">
                            Create your account and begin your
                            healthcare journey with RuhShree Health.
                        </p>

                    </div>

                    <form onSubmit={handleRegister}>

                        <div className="form-group">

                            <label>Full Name</label>

                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Username</label>

                            <input
                                type="text"
                                placeholder="Choose a username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Email</label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Age</label>

                            <input
                                type="number"
                                placeholder="Enter your age"
                                min="1"
                                max="100"
                                value={age}
                                onChange={(e) =>
                                    setAge(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Gender</label>

                            <select
                                value={gender}
                                onChange={(e) =>
                                    setGender(e.target.value)
                                }
                                required
                            >
                                <option value="">
                                    Select gender
                                </option>

                                <option value="Male">
                                    Male
                                </option>

                                <option value="Female">
                                    Female
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>Phone</label>

                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                value={phone}
                                onChange={(e) =>
                                    setPhone(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Address</label>

                            <input
                                type="text"
                                placeholder="Enter your address"
                                value={address}
                                onChange={(e) =>
                                    setAddress(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Medical Condition</label>

                            <input
                                type="text"
                                placeholder="Enter current condition or None"
                                value={disease}
                                onChange={(e) =>
                                    setDisease(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Password</label>

                            <input
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Confirm Password</label>

                            <input
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />

                        </div>

                        {error && (
                            <p className="register-error">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="register-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Creating account..."
                                : "Create account"
                            }

                            <span>→</span>

                        </button>

                    </form>

                    <p className="register-login">

                        Already have an account?

                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                        >
                            Sign in
                        </button>

                    </p>

                    <p className="register-footer">
                        Your care. Your story. Your health.
                    </p>

                </div>

                <div className="register-image">

                    <img
                        src={doctorImage}
                        alt="Doctor providing care"
                    />

                    <div className="image-overlay-card">

                        <span>♡</span>

                        <div>

                            <strong>
                                Human-first care
                            </strong>

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

export default Register;