
import axios from "axios";

const api = axios.create({
  baseURL: "https://findus-jp.link/api",
  withCredentials: true,
});

export const loginWithGoogle = async () => {
  try {
    const response = await axios.get("https://findus-jp.link/api/auth/callback");
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
