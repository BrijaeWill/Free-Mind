const API_URL = 'https://free-mind-2.onrender.com';

// Register User
export const registerUser = async (userData: { username: string; email: string; password: string }) => {
    const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return response.json();
};

// Login User
export const loginUser = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/users/login`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), 
    });
    return response.json();
};
