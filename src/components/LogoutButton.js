// import React from "react";

// const LogoutButton = () => {
//   const handleLogout = async () => {
//     try {
//       // 백엔드의 로그아웃 엔드포인트 호출
//       const response = await fetch("http://localhost:3001/auth/logout", {
//         method: "GET",
//         credentials: "include", // 세션 쿠키를 포함시킴
//       });

//       if (response.ok) {
//         // 로그아웃 후 로컬 스토리지에서 토큰 제거
//         localStorage.removeItem("token");
//         // 홈으로 리디렉션
//         window.location.href = "/";
//       } else {
//         alert("Failed to log out."); // 로그아웃 실패 시 경고 메시지
//       }
//     } catch (error) {
//       console.error("Logout error:", error); // 로그아웃 중 오류 발생 시 로그 출력
//       alert("An error occurred during logout."); // 오류 발생 시 경고 메시지
//     }
//   };

//   return <button onClick={handleLogout}>로그아웃</button>;
// };

// export default LogoutButton;

// import React from "react";

// const LogoutButton = () => {
//   const handleLogout = async () => {
//     try {
//       // 백엔드의 로그아웃 엔드포인트 호출
//       const response = await fetch("http://localhost:5000/auth/logout", {
//         method: "GET",
//         credentials: "include", // 세션 쿠키를 포함시킴
//       });

//       if (response.ok) {
//         // 로그아웃 후 로컬 스토리지에서 토큰 제거
//         localStorage.removeItem("token");
//         // 홈으로 리디렉션
//         window.location.href = "/";
//       } else {
//         alert("Failed to log out."); // 로그아웃 실패 시 경고 메시지
//       }
//     } catch (error) {
//       console.error("Logout error:", error); // 로그아웃 중 오류 발생 시 로그 출력
//       alert("An error occurred during logout."); // 오류 발생 시 경고 메시지
//     }
//   };

//   return <button onClick={handleLogout}>로그아웃</button>;
// };

// export default LogoutButton;

// frontend/src/components/LogoutButton.js

// 'React' 라이브러리를 사용하기 위해 불러와. 이 라이브러리로 UI 컴포넌트를 만들 수 있어.
import React from "react";
// 'useNavigate'는 페이지 이동을 도와주는 함수야. 나중에 다른 페이지로 이동할 때 사용할 수 있어.
import { useNavigate } from "react-router-dom";

// 'LogoutButton'이라는 컴포넌트를 만드는 거야. 버튼을 누르면 로그아웃이 실행돼.
const LogoutButton = () => {
  // 'handleLogout'은 로그아웃을 처리하는 함수야. 버튼을 누르면 이 함수가 실행돼.
  const handleLogout = async () => {
    // 이 블록에서 서버에 로그아웃 요청을 보내는 걸 시도해.
    try {
      const response = await fetch(
        // 서버에 로그아웃 요청을 보낼 주소야. 여기서는 백엔드가 있는 주소로 로그아웃을 요청해.
        "http://localhost:5000/api/auth/googleLogout",
        {
          // 로그아웃 요청을 'POST' 방식으로 보내. POST는 주로 정보를 보내거나 서버에서 작업을 실행할 때 사용돼.
          method: "POST",
          // 서버에 보내는 데이터가 JSON 형식이라는 걸 알려주는 거야.
          headers: {
            "Content-Type": "application/json",
          },
          // 이 옵션을 통해 사용자의 쿠키(로그인 세션 정보)를 서버로 함께 보내. 로그아웃하려면 쿠키가 필요해.
          credentials: "include",
        }
      );
      // 서버 응답이 성공적이지 않을 경우(200번대가 아닌 경우) 오류를 발생시켜.
      if (!response.ok) {
        // 서버 응답이 성공적이지 않을 경우(200번대가 아닌 경우) 오류를 발생시켜.
        // 오류 메시지에 응답 상태 코드를 함께 출력해.
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 서버에서 보낸 데이터를 JSON 형식으로 변환해.
      const data = await response.json();
      console.log("서버 응답:", data);
      // 로그아웃 과정에서 오류가 발생하면 이 블록에서 처리해.
    } catch (error) {
      console.error("Logout failed", error);
      // 네트워크 오류가 발생했을 때, 즉 서버에 아예 연결되지 않았을 때 처리하는 부분이야.
      if (error.name === "TypeError" && error.message === "Failed to fetch") {
        console.error("네트워크 오류: 서버에 연결할 수 없습니다.");
      }
    }
  };

  // '로그아웃' 버튼을 화면에 보여줘. 이 버튼을 누르면 'handleLogout' 함수가 실행돼.
  return <button onClick={handleLogout}>로그아웃하기</button>;
};

export default LogoutButton;
