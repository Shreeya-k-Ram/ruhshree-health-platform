export const API_BASE_URL = "https://ruhshree-health-platform-production-1d7d.up.railway.app";

export const loginUser = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    return response.json();
};