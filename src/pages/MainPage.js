// // src/pages/MainPage.js
// import React from "react";
// import { Link } from "react-router-dom";
// import { Button, Space } from "antd";
// import { useAuth } from "../context/AuthContext";

// function MainPage() {
//   const { isLoggedIn, user } = useAuth();

//   return (
//     <Space
//       direction="vertical"
//       size="large"
//       style={{ width: "100%", textAlign: "center", fontFamily: "Gungsuh" }}
//     >
//       <h1>임시 메인 페이지</h1>
//       {isLoggedIn ? (
//         <h2>{user?.user_name}님, 환영합니다!</h2>
//       ) : (
//         <h2>로그인하여 더 많은 기능을 이용해보세요.</h2>
//       )}
//       <Link to="/search">
//         <Button type="primary">검색</Button>
//       </Link>
//     </Space>
//   );
// }

// export default MainPage;

import React, { useEffect, useState } from "react";
import { Carousel, List, Grid } from "antd";
import CustomHeader from "../components/Header";
import Footer from "../components/Footer";
import "../css/MainPage.css";

function MainPage() {
  const [bannerImages, setBannerImages] = useState([]);
  const [works, setWorks] = useState([]);
  const [locations, setLocations] = useState([]);
  const [recentUpdates, setRecentUpdates] = useState([]);

  useEffect(() => {
    // 데이터 로딩 로직
  }, []);

  return (
    <div className="main-container">
      <CustomHeader /> {/* 헤더가 항상 상단에 표시됩니다 */}
      <main className="main-content">
        <section className="banner-section">{/* 배너 섹션 내용 */}</section>

        <section className="works-section">{/* 작품별 섹션 내용 */}</section>

        <section className="locations-section">
          {/* 지역별 섹션 내용 */}
        </section>

        <section className="recent-updates-section">
          {/* 최신 업데이트 섹션 내용 */}
        </section>
      </main>
      <Footer /> {/* 푸터가 항상 하단에 표시됩니다 */}
    </div>
  );
}

export default MainPage;
