const API_BASE_URL = 'http://localhost:5000/api'; // Ensure this matches your backend URL

const api = async (endpoint, method = 'GET', body = null, token = null) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            // Handle specific error messages from the backend
            const errorMessage = data.message || 'Something went wrong';
            throw new Error(errorMessage);
        }

        return data;
    } catch (error) {
        console.error("API call failed:", error);
        throw error; // Re-throw to be caught by the component
    }
};

export default api;
