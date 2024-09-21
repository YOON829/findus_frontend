// import axios from 'axios';

// export const loginWithGoogle = async () => {
//     try {
//         const response = await axios.get('http://localhost:3001/auth/google');
//         return response.data;
//     } catch (error) {
//         console.error('Login failed', error);
//         return null;
//     }
// };

//findus_front_end/services/authService

// findus_front_end/services/authService.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const loginWithGoogle = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/auth/callback");
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    return null;
  }
};

export const checkLoginStatus = async () => {
  try {
    const response = await api.get("/auth/session-check");
    return response.data.loggedIn;
  } catch (error) {
    console.error("Session check failed:", error);
    return false;
  }
};
