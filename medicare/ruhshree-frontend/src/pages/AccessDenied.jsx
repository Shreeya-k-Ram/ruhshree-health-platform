import React from "react";
import { useNavigate } from "react-router-dom";
import "./AccessDenied.css";

const AccessDenied = () => {
    const navigate = useNavigate();

    return (
        <div className="access-denied-page">

            <div className="access-denied-card">

                <div className="access-denied-icon">
                    🔒
                </div>

                <span className="access-denied-brand">
                    RUHSHREE SECURITY
                </span>

                <h1>Access Denied</h1>

                <p>
                    You don't have permission to access this dashboard.
                    Please sign in with an authorized account to continue.
                </p>

                <div className="access-denied-actions">

                    <button
                        className="access-denied-primary"
                        onClick={() => navigate("/")}
                    >
                        Return to Home
                    </button>

                    <button
                        className="access-denied-secondary"
                        onClick={() => navigate("/login")}
                    >
                        Sign In Again
                    </button>

                </div>

                <div className="access-denied-footer">
                    <span>Protected Area</span>
                    <span>•</span>
                    <span>RuhShree Health Platform</span>
                </div>

            </div>

        </div>
    );
};

export default AccessDenied;