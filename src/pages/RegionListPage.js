// // findus_frontend/src/pages/RegionListPage.js

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom"; // useNavigate 추가
// import axios from "axios";
// import { getMappedValue } from "../services/mapping"; // mappings.js 파일에서 함수 가져오기

// const apiUrl = process.env.REACT_APP_API_URL;

// function RegionListPage() {
//   const [regions, setRegions] = useState([]);
//   const navigate = useNavigate(); // useNavigate 훅 사용

//   // 뒤로 가기 함수
//   const goBack = () => {
//     navigate("/search"); // '/search' 경로로 이동
//   };

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/regions`)
//       .then((response) => setRegions(response.data))
//       .catch((error) => console.error("Error fetching regions:", error));
//   }, []);

//   return (
//     <div>
//       <button onClick={goBack}>뒤로 가기</button>

//       <h1>지역 목록</h1>

//       {regions.length === 0 ? (
//         <p>지역 목록을 불러오는 중입니다...</p>
//       ) : (
//         <ul>
//           {regions.map((region) => {
//             const regionKey = getMappedValue("region", region); // 한글을 영문으로 매핑
//             return (
//               <li key={regionKey}>
//                 <Link to={`/regions/${regionKey}`}>{region}</Link>
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default RegionListPage;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { getMappedValue } from "../services/mapping";
// import { Card, Typography } from "antd";
// import "../css/RegionListPage.css";

// const { Title } = Typography;

// const apiUrl = process.env.REACT_APP_API_URL;

// function RegionListPage() {
//   const [regions, setRegions] = useState([]);
//   const navigate = useNavigate();

//   // 뒤로 가기 함수
//   const goBack = () => {
//     navigate("/search");
//   };

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/regions`)
//       .then((response) => setRegions(response.data))
//       .catch((error) => console.error("Error fetching regions:", error));
//   }, []);

//   const gridStyle = {
//     width: "25%",
//     textAlign: "center",
//   };

//   return (
//     <div className="region-list-page-container">
//       <div className="region-list-title">
//         <Title level={2} className="search-type-title">
//           지역목록
//           <hr className="custom-dividerA" />
//         </Title>
//       </div>
//       <Card className="region-card">
//         {regions.length === 0 ? (
//           <p>지역 목록을 불러오는 중입니다...</p>
//         ) : (
//           regions.map((region) => {
//             const regionKey = getMappedValue("region", region);
//             return (
//               <Card.Grid key={regionKey} style={gridStyle} hoverable={true}>
//                 <Link to={`/regions/${regionKey}`}>{region}</Link>
//               </Card.Grid>
//             );
//           })
//         )}
//       </Card>
//     </div>
//   );
// }

// export default RegionListPage;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { getMappedValue } from "../services/mapping";
// import { Card, Typography } from "antd";
// import "../css/RegionListPage.css";

// const { Title } = Typography;

// const apiUrl = process.env.REACT_APP_API_URL;

// function RegionListPage() {
//   const [regions, setRegions] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/regions`)
//       .then((response) => setRegions(response.data))
//       .catch((error) => console.error("Error fetching regions:", error));
//   }, []);

//   const gridStyle = {
//     width: "25%",
//     textAlign: "center",
//   };

//   return (
//     <div className="region-list-page-container">
//       <div className="region-list-title">
//         <Title level={2} className="search-type-title">
//           지역목록
//           <hr className="custom-dividerA" />
//         </Title>
//       </div>
//       <Card className="region-card-contailner">
//         {regions.length === 0 ? (
//           <p>지역 목록을 불러오는 중입니다...</p>
//         ) : (
//           regions.map((region) => {
//             const regionKey = getMappedValue("region", region);
//             return (
//               <Link
//                 key={regionKey}
//                 to={`/regions/${regionKey}`}
//                 className="region-link"
//               >
//                 <Card.Grid
//                   className="region-card"
//                   style={gridStyle}
//                   hoverable={true}
//                 >
//                   {region}
//                 </Card.Grid>
//               </Link>
//             );
//           })
//         )}
//       </Card>
//     </div>
//   );
// }

// export default RegionListPage;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getMappedValue } from "../services/mapping";
import { Card, Typography } from "antd";
import "../css/RegionListPage.css";

const { Title } = Typography;

const apiUrl = process.env.REACT_APP_API_URL;

function RegionListPage() {
  const [regions, setRegions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/regions`)
      .then((response) => setRegions(response.data))
      .catch((error) => console.error("Error fetching regions:", error));
  }, []);

  return (
    <div className="findus-region-list-page-container">
      <div className="findus-region-list-title">
        <Title level={2} className="findus-search-type-title">
          지역목록
          <hr className="findus-custom-divider" />
        </Title>
      </div>
      <div className="findus-region-card-container">
        {regions.length === 0 ? (
          <p className="findus-loading-text">
            지역 목록을 불러오는 중입니다...
          </p>
        ) : (
          regions.map((region) => {
            const regionKey = getMappedValue("region", region);
            return (
              <Link
                key={regionKey}
                to={`/regions/${regionKey}`}
                className="findus-region-link"
              >
                <Card className="findus-region-card">
                  <p className="findus-region-name">{region}</p>
                </Card>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export default RegionListPage;
