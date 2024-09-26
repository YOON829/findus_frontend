

import React from "react";
import Modal from "react-modal";
import "../css/LoginModal.css"; // CSS 파일 import

Modal.setAppElement("#root"); // 접근성을 위해 애플리케이션 루트 요소를 설정

const LoginModal = ({ isOpen, onRequestClose }) => {
  const handleLogin = () => {
    window.location.href = "https://findus-jp.link/api/auth/google"; // 로그인 페이지로 리디렉션
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      contentLabel="Login Modal"
    >
      <h2 className="modal-title">로그인하세요</h2>
      <p className="modal-description">
        마이페이지에 접근하려면 로그인이 필요합니다.
      </p>
      <button className="login-button-Modal" onClick={handleLogin}>
        로그인
      </button>
    </Modal>
  );
};

export default LoginModal;
