// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
// import axios from 'axios';
// import { getMappedValue } from '../services/mapping'; // 매핑 함수 가져오기

// const apiUrl = process.env.REACT_APP_API_URL;

// function CityListPage() {
//   const { regionKey } = useParams();  // URL에서 regionKey를 추출
//   const [data, setData] = useState({ region: '', cities: [] });  // 지역과 도시 데이터
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();  // useNavigate 훅 사용

//   // 뒤로 가기 함수
//   const goBack = () => {
//     navigate(`/regions`);  // 'regions' 경로로 이동
//   };

//   useEffect(() => {
//     axios.get(`${apiUrl}/api/regions/${regionKey}`)  // API 요청
//       .then(response => {
//         setData(response.data);  // 지역과 도시 목록을 상태에 저장
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching city details:', error);
//         setLoading(false);
//       });
//   }, [regionKey]);

//   if (loading) {
//     return <p>Loading city details...</p>;
//   }

//   if (data.cities.length === 0) {
//     return <p>No cities available for this region.</p>;
//   }

//   return (
//       <div>
//           <button onClick={goBack}>뒤로 가기</button>

//           <h1>{data.region} 지역의 도시 목록</h1>  {/* API로부터 받은 지역명 표시 */}

//           <ul>
//               {data.cities.map((city, index) => {
//                   const cityKey = getMappedValue('city', city);  // 도시명을 영문으로 매핑
//                   return (
//                       <li key={index}>
//                           <Link to={`/regions/${regionKey}/${cityKey}`}>
//                               {city} {/* 도시 이름 출력 */}
//                           </Link>
//                       </li>
//                   );
//               })}
//           </ul>
//       </div>
//   );
// }

// export default CityListPage;

// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { getMappedValue } from "../services/mapping";
// import { Card } from "antd";
// import "../css/CityListPage.css";

// const apiUrl = process.env.REACT_APP_API_URL;

// function CityListPage() {
//   const { regionKey } = useParams();
//   const [data, setData] = useState({ region: "", cities: [] });
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // 뒤로 가기 함수
//   const goBack = () => {
//     navigate(`/regions`);
//   };

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/regions/${regionKey}`)
//       .then((response) => {
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching city details:", error);
//         setLoading(false);
//       });
//   }, [regionKey]);

//   const gridStyle = {
//     width: "25%",
//     textAlign: "center",
//   };

//   if (loading) {
//     return (
//       <div className="city-list-page">
//         <p>도시 정보를 불러오는 중입니다...</p>
//       </div>
//     );
//   }

//   if (data.cities.length === 0) {
//     return (
//       <div className="city-list-page">
//         <p>이 지역에는 도시 정보가 없습니다.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="city-list-page">
//       <button onClick={goBack} className="back-button">
//         뒤로 가기
//       </button>

//       <Card title={`${data.region} 지역의 도시 목록`} className="city-card">
//         {data.cities.map((city, index) => {
//           const cityKey = getMappedValue("city", city);
//           return (
//             <Card.Grid key={index} style={gridStyle} hoverable={true}>
//               <Link to={`/regions/${regionKey}/${cityKey}`}>{city}</Link>
//             </Card.Grid>
//           );
//         })}
//       </Card>
//     </div>
//   );
// }

// export default CityListPage;

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getMappedValue } from "../services/mapping";
import { Card, Typography } from "antd";
import "../css/CityListPage.css";

const { Title } = Typography;

const apiUrl = process.env.REACT_APP_API_URL;

function CityListPage() {
  const { regionKey } = useParams();
  const [data, setData] = useState({ region: "", cities: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 뒤로 가기 함수
  const goBack = () => {
    navigate(`/regions`);
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/regions/${regionKey}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching city details:", error);
        setLoading(false);
      });
  }, [regionKey]);

  if (loading) {
    return (
      <div className="findus-city-list-page-container">
        <p className="findus-loading-text">도시 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (data.cities.length === 0) {
    return (
      <div className="findus-city-list-page-container">
        <p className="findus-loading-text">이 지역에는 도시 정보가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="findus-city-list-page-container">
      {/* <button onClick={goBack} className="back-button">
        뒤로 가기
      </button> */}

      <div className="findus-city-list-title">
        <Title level={2} className="findus-search-type-title">
          {data.region} 지역의 도시 목록
          <hr className="findus-custom-divider" />
        </Title>
      </div>
      <div className="findus-city-card-container">
        {data.cities.map((city) => {
          const cityKey = getMappedValue("city", city);
          return (
            <Link
              key={cityKey}
              to={`/regions/${regionKey}/${cityKey}`}
              className="findus-city-link"
            >
              <Card className="findus-city-card">
                <p className="findus-city-name">{city}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default CityListPage;
