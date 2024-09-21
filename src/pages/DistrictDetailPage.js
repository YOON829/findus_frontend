// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
// import axios from 'axios';
// import { Card, Image, Spin, Alert, Typography, Space, Button, Row, Col } from 'antd'; // Ant Design 컴포넌트 사용

// const { Title } = Typography;

// const apiUrl = process.env.REACT_APP_API_URL;

// function DistrictDetailPage() {
//   const { regionKey, cityKey, districtKey } = useParams();  // URL에서 파라미터 추출
//   const [places, setPlaces] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();  // useNavigate 훅 사용

//   // 뒤로 가기 함수
//   const goBack = () => {
//     navigate(`/regions/${regionKey}/${cityKey}`);  // 뒤로가기 경로
//   };

//   useEffect(() => {
//     axios.get(`${apiUrl}/api/regions/${regionKey}/${cityKey}/${districtKey}`)  // 해당 구역의 API 요청
//       .then(response => {
//         setPlaces(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching places:', error);
//         setError('데이터를 가져오는 데 실패했습니다.');
//         setLoading(false);
//       });
//   }, [regionKey, cityKey, districtKey]);

//   if (loading) return <Spin tip="로딩 중..." />;
//   if (error) return <Alert message="에러" description={error} type="error" showIcon />;
//   if (places.length === 0) return <Alert message="해당 구역에 장소가 없습니다." type="warning" showIcon />;

//   return (
//     <Space direction="vertical" size="large" style={{ width: '100%' }}>
//       {/* 뒤로 가기 버튼 */}
//       <Button onClick={goBack} type="default" style={{ marginBottom: '20px' }}>
//         뒤로 가기
//       </Button>

//       {places.length > 0 && (
//         <Card style={{ maxWidth: '800px', margin: '0 auto' }}>
//           <Title level={3}>{places[0].address_district}의 장소 이미지</Title>  {/* 첫 장소의 address_district를 제목에 사용 */}
//           <Space direction="vertical" size="large">
//             {places.map((place, index) => (
//               <div key={index}>
//                 <Row justify="space-between" align="middle">
//                   <Col>
//                     <Title level={4}>{place.place_name}</Title>
//                   </Col>
//                   <Col>
//                     <Link to={`/single-marker/${place.place_id}`}>
//                       <Button type="primary">상세보기</Button>
//                     </Link>
//                   </Col>
//                 </Row>
//                 <Space>
//                   {place.Images && place.Images.length > 0 ? (
//                     place.Images.filter(img => img.image_url.includes('realPlace'))  // 'realPlace' 이미지 필터링
//                       .map((img, imgIndex) => (
//                         <Image
//                           key={imgIndex}
//                           width={200}
//                           src={`${apiUrl}${img.image_url}`}  // 서버 주소와 경로를 결합
//                           alt={`장소 이미지 ${imgIndex + 1}`}
//                         />
//                       ))
//                   ) : (
//                     <Alert message="realPlace 이미지가 없습니다." type="info" />
//                   )}
//                 </Space>
//               </div>
//             ))}
//           </Space>
//         </Card>
//       )}
//     </Space>
//   );
// }

// export default DistrictDetailPage;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Spin, Alert, Typography, Button, Row, Col } from "antd";
import "../css/DistrictDetailPage.css";
import ScrollToTopButton from "../components/ScrollToTopButton"; // ScrollToTopButton 컴포넌트 임포트

const { Title } = Typography;
const { Meta } = Card;

const apiUrl = process.env.REACT_APP_API_URL;

function DistrictDetailPage() {
  const { regionKey, cityKey, districtKey } = useParams();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 뒤로 가기 함수
  const goBack = () => {
    navigate(`/regions/${regionKey}/${cityKey}`);
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/regions/${regionKey}/${cityKey}/${districtKey}`)
      .then((response) => {
        setPlaces(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
        setError("데이터를 가져오는 데 실패했습니다.");
        setLoading(false);
      });
  }, [regionKey, cityKey, districtKey]);

  if (loading) return <Spin tip="로딩 중..." className="loading-spinner" />;
  if (error)
    return (
      <Alert
        message="에러"
        description={error}
        type="error"
        showIcon
        className="error-alert"
      />
    );
  if (places.length === 0)
    return (
      <Alert
        message="해당 구역에 장소가 없습니다."
        type="warning"
        showIcon
        className="warning-alert"
      />
    );

  return (
    <div className="district-detail-container">
      {/* <Button onClick={goBack} className="back-button">
        뒤로 가기
      </Button> */}
      <div className="DDP-Title-section">
        <Title level={2}>{places[0].address_district}의 로케이션 이미지</Title>
        <hr className="DDP-custom-divider" />
      </div>

      <Row gutter={[0, 16]} justify="center">
        {places.map((place, index) => {
          // 'realPlace' 이미지 필터링
          let imageUrl = "https://via.placeholder.com/240x200?text=No+Image";

          if (place.Images && place.Images.length > 0) {
            const realPlaceImage = place.Images.find((img) =>
              img.image_url.includes("realPlace")
            );
            if (realPlaceImage) {
              imageUrl = `${apiUrl}${realPlaceImage.image_url}`;
            }
          }

          return (
            <Col key={index} xs={24} sm={24} md={24} lg={24} xl={24}>
              <Card
                hoverable
                cover={<img alt={place.place_name} src={imageUrl} />}
                className="place-card"
                onClick={() => navigate(`/single-marker/${place.place_id}`)}
              >
                <Meta title={place.place_name} />
              </Card>
            </Col>
          );
        })}
      </Row>
      <ScrollToTopButton />
    </div>
  );
}

export default DistrictDetailPage;
