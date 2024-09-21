// import React from "react";
// import { Link } from "react-router-dom";
// import "../css/SearchTypePage.css';";

// function SearchTypePage() {
//   return (
//     <div>
//       <h1>검색 유형 선택</h1>
//       <Link to="/work">
//         <button>작품으로 검색</button>
//       </Link>
//       <Link to="/regions">
//         <button>지역으로 검색</button>
//       </Link>
//     </div>
//   );
// }import React from "react";

// import React, { useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Card, Button, Row, Col, Typography } from "antd";
// import { ReadOutlined, EnvironmentOutlined } from "@ant-design/icons";
// import "../css/SearchTypePage.css";

// const { Title } = Typography;

// const SearchTypePage = () => {
//   const titleRef = useRef(null);
//   const dividerRef = useRef(null);

//   useEffect(() => {
//     if (titleRef.current && dividerRef.current) {
//       const titleWidth = titleRef.current.offsetWidth;
//       const containerWidth = titleRef.current.parentNode.offsetWidth;
//       const percentage = (titleWidth / containerWidth) * 100;
//       dividerRef.current.style.background = `linear-gradient(to right, #1890ff 0%, #1890ff ${percentage}%, #f0f0f0 ${percentage}%, #f0f0f0 100%)`;
//     }
//   }, []);

//   return (
//     <div className="search-type-container">
//       <div className="title-container">
//         <Title level={2} className="search-type-title" ref={titleRef}>
//           검색 유형 선택
//         </Title>
//         <hr className="custom-divider" ref={dividerRef} />
//       </div>
//       <Row gutter={[0, 16]} className="search-type-options">
//         <Col span={24}>
//           <Link to="/work">
//             <Card
//               hoverable
//               className="search-type-card"
//               cover={<ReadOutlined className="search-type-icon" />}
//             >
//               <div className="search-type-card-content">
//                 <h3 className="search-type-card-title">작품으로 검색</h3>
//                 <p className="search-type-card-description">
//                   작품 이름이나 특징으로 검색합니다
//                 </p>
//               </div>
//               <Button type="primary" className="search-type-button">
//                 선택
//               </Button>
//             </Card>
//           </Link>
//         </Col>
//         <Col span={24}>
//           <Link to="/regions">
//             <Card
//               hoverable
//               className="search-type-card"
//               cover={<EnvironmentOutlined className="search-type-icon" />}
//             >
//               <div className="search-type-card-content">
//                 <h3 className="search-type-card-title">지역으로 검색</h3>
//                 <p className="search-type-card-description">
//                   지역 이름으로 작품을 검색합니다
//                 </p>
//               </div>
//               <Button type="primary" className="search-type-button">
//                 선택
//               </Button>
//             </Card>
//           </Link>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default SearchTypePage;

// import React, { useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Card, Button, Row, Col, Typography } from "antd";
// import { ReadOutlined, EnvironmentOutlined } from "@ant-design/icons";
// import "../css/SearchTypePage.css";

// const { Title } = Typography;

// const SearchTypePage = () => {
//   const titleRef = useRef(null);
//   const dividerRef = useRef(null);

//   useEffect(() => {
//     if (titleRef.current && dividerRef.current) {
//       const titleWidth = titleRef.current.offsetWidth;
//       const containerWidth = titleRef.current.parentNode.offsetWidth;
//       const percentage = (titleWidth / containerWidth) * 100;
//       dividerRef.current.style.background = `linear-gradient(to right, #1890ff 0%, #1890ff ${percentage}%, #f0f0f0 ${percentage}%, #f0f0f0 100%)`;
//     }
//   }, []);

//   return (
//     <div className="search-type-container">
//       <div className="title-container">
//         <Title level={2} className="search-type-title" ref={titleRef}>
//           검색 유형 선택
//         </Title>
//         <hr className="custom-divider" ref={dividerRef} />
//       </div>
//       <div className="search-type-options">
//         <Row gutter={[0, 16]}>
//           <Col span={24}>
//             <Link to="/work">
//               <Card
//                 hoverable
//                 className="search-type-card"
//                 cover={<ReadOutlined className="search-type-icon" />}
//               >
//                 <div className="search-type-card-content">
//                   <h3 className="search-type-card-title">작품으로 검색</h3>
//                   <p className="search-type-card-description">
//                     작품 이름이나 특징으로 검색합니다
//                   </p>
//                 </div>
//                 <Button type="primary" className="search-type-button">
//                   선택
//                 </Button>
//               </Card>
//             </Link>
//           </Col>
//           <Col span={24}>
//             <Link to="/regions">
//               <Card
//                 hoverable
//                 className="search-type-card"
//                 cover={<EnvironmentOutlined className="search-type-icon" />}
//               >
//                 <div className="search-type-card-content">
//                   <h3 className="search-type-card-title">지역으로 검색</h3>
//                   <p className="search-type-card-description">
//                     지역 이름으로 작품을 검색합니다
//                   </p>
//                 </div>
//                 <Button type="primary" className="search-type-button">
//                   선택
//                 </Button>
//               </Card>
//             </Link>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default SearchTypePage;

import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Typography } from "antd";
import { ReadOutlined, EnvironmentOutlined } from "@ant-design/icons";
import "../css/SearchTypePage.css";

const { Title } = Typography;

const SearchTypePage = () => {
  return (
    <div className="search-type-container">
      <div className="title-container">
        <Title level={2} className="search-type-title">
          조회 기준 선택
        </Title>
        <hr className="custom-divider" />
      </div>
      <div className="search-type-options">
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Link to="/work" className="search-type-link">
              <Card
                hoverable
                className="search-type-card"
                cover={<ReadOutlined className="search-type-icon" />}
              >
                <div className="search-type-card-content">
                  <h3 className="search-type-card-title">작품으로 조회</h3>
                  <p className="search-type-card-description">
                    작품을 기준으로 로케이션을 조회합니다
                  </p>
                  <div className="search-type-button-container">
                    <Button type="primary" className="search-type-button">
                      선택
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          </Col>
          <Col span={24}>
            <Link to="/regions" className="search-type-link">
              <Card
                hoverable
                className="search-type-card"
                cover={<EnvironmentOutlined className="search-type-icon" />}
              >
                <div className="search-type-card-content">
                  <h3 className="search-type-card-title">지역으로 조회</h3>
                  <p className="search-type-card-description">
                    지역을 기준으로 로케이션을 조회합니다
                  </p>
                  <div className="search-type-button-container">
                    <Button type="primary" className="search-type-button">
                      선택
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SearchTypePage;
