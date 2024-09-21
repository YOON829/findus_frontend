// import React from "react";

// const LoginButton = () => {
//   const handleLogin = () => {
//     window.open("http://localhost:3001/auth/google", "_self");
//   };

//   return <button onClick={handleLogin}>구글계정으로 로그인하기</button>;
// };

// export default LoginButton;

// import React from "react";

// const LoginButton = () => {
//   const handleLogin = () => {
//     console.log(handleLogin);
//     window.open("http://localhost:5000/login/google", "_self"); //  //_self는 새 창이 아닌 현재 창에서 진행.
//   };

//   return <button onClick={handleLogin}>구글계정으로 로그인하기</button>;
// };

// export default LoginButton;

// // window.open("http://localhost:5000/api/auth/google", "_self")

// LoginButton.js:

// --------

// [흐름도]
// 1. 로그인 요청 (Frontend → Google): 사용자가 Google 계정으로 로그인하겠다고 선언.
// 예시)방문자가 학교 정문 앞에 서서 "안녕하세요, ㅇㅇ중학교에 볼일이 있어 들어가려고 합니다"라고 말하는것.

// 여기서 URL은 사용자가 "구글로 로그인" 버튼을 클릭했을 때 이동하는 URL
// 백엔드에서 구글 OAuth 프로세스를 시작하게함
// 따라서 리다이렉트 URL과는 달라야함.
// [흐름도]의 1번에 해당함.

// src/components/LoginButton.js
import React from "react";
import { Button } from "antd"; // Ant Design의 Button 컴포넌트 import
import { LoginOutlined } from "@ant-design/icons"; // Ant Design의 LoginOutlined 아이콘 import

const LoginButton = () => {
  const handleLogin = () => {
    const loginUrl = "http://findus-jp.link/api/auth/google";
    window.open(loginUrl, "_self");
  };

  return (
    <Button
      icon={<LoginOutlined />} // 로그인 아이콘 사용
      type="link"
      className="header-icon"
      onClick={handleLogin}
    />
  );
};

export default LoginButton;

// 로그인 시작 URL과 리다이렉트URL의 차이.
// 로그인 시작 URL:
// 이는 사용자가 "구글로 로그인" 버튼을 클릭했을 때 이동하는 URL입니다.
// 보통 /api/auth/google과 같은 형태를 가집니다.
// 이 URL은 백엔드에서 구글 OAuth 프로세스를 시작하도록 합니다.

// 리다이렉트 URL:
// 이는 구글이 인증 과정을 완료한 후 사용자를 다시 여러분의 애플리케이션으로 돌려보내는 URL입니다.
// 보통 /api/auth/callback과 같은 형태를 가집니다.
// 이 URL에서 백엔드는 구글로부터 받은 정보를 처리하고 로그인 프로세스를 완료합니다.

{
  /* <BellOutlined /> */
}
