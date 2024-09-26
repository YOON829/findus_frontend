import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(
        "https://findus-jp.link/api/auth/session-check",
        { withCredentials: true }
      );
      setIsLoggedIn(response.data.loggedIn);
      setUser(response.data.user);

      // 콘솔 로그 주석 처리
      // console.log(
      //   "🔐 로그인 상태:",
      //   response.data.loggedIn ? "로그인됨 ✅" : "로그아웃 상태 ❌"
      // );
      // console.log("👤 사용자 정보:", response.data.user);

      if (response.data.user) {
        // console.log("🆔 사용자 ID:", response.data.user.user_id);
        // console.log("🌐 Google ID:", response.data.user.google_id);
        // console.log("📛 사용자 이름:", response.data.user.user_name);
        // console.log("📧 이메일:", response.data.user.email);
        // console.log(
        //   "🔑 비밀번호 해시:",
        //   response.data.user.password_hash ? "설정됨 ✅" : "설정되지 않음 ❌"
        // );
        // console.log(
        //   "🏷️ 토큰:",
        //   response.data.user.token ? "있음 ✅" : "없음 ❌"
        // );
        // console.log(
        //   "🚦 활성 상태:",
        //   response.data.user.is_active ? "활성화 ✅" : "비활성화 ❌"
        // );
        // console.log("📅 생성일:", response.data.user.created_at);
        // console.log("🔄 업데이트일:", response.data.user.updated_at);
      }
    } catch (error) {
      console.error("❌ 인증 상태 확인 오류:", error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const login = async () => {
    window.location.href = "https://findus-jp.link/api/auth/google";
  };

  const logout = async () => {
    try {
      await axios.post(
        "https://findus-jp.link/api/auth/googleLogout",
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, checkAuthStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};
