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

import axios from "axios";

export const loginWithGoogle = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/auth/callback");
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    return null;
  }
};
