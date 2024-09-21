//
// import React, { useState, useEffect } from 'react';
// import { useParams ,Link } from 'react-router-dom';
// import axios from 'axios';
// import { Card, Typography, Spin, Alert, Image, List, Space, Divider } from 'antd';
// import { EnvironmentOutlined } from '@ant-design/icons';
//
// const { Title, Paragraph, Text } = Typography;
//
// function SeasonDetailPage() {
//   const { workKey, seasonKey } = useParams();
//   const [seasonDetails, setSeasonDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`http://3.35.55.228:5000/api/work/${workKey}/${seasonKey}`);
//         setSeasonDetails(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('데이터를 가져오는 데 실패했습니다.');
//         setLoading(false);
//       }
//     };
//
//     fetchData();
//   }, [workKey, seasonKey]);
//
//   if (loading) return <Spin tip="로딩 중..." />;
//   if (error) return <Alert message="에러" description={error} type="error" showIcon />;
//   if (!seasonDetails) return <Alert message="시즌 정보를 찾을 수 없습니다." type="warning" showIcon />;
//
//   const { seasonDetails: details, places } = seasonDetails;
//
//   return (
//     <Space direction="vertical" size="large" style={{ width: '100%' }}>
//       <Card style={{ maxWidth: '800px', margin: '0 auto' }}>
//         <Title level={2}>{details.work_name} - {details.work_season}기</Title>
//         <Paragraph>{details.description}</Paragraph>
//         {details.poster && (
//           <Image
//             src={details.poster}
//             alt={details.work_name}
//             style={{ maxWidth: '300px' }}
//           />
//         )}
//         <Paragraph>
//           <Text strong>방영 기간:</Text> {details.start_date} ~ {details.end_date}
//         </Paragraph>
//         <Paragraph>
//           <Text strong>장르:</Text> {details.genre}
//         </Paragraph>
//         <Paragraph>
//           <Text strong>감독:</Text> {details.director}
//         </Paragraph>
//         <Paragraph>
//           <Text strong>각본:</Text> {details.series_writer}
//         </Paragraph>
//       </Card>
//
//       <Card style={{ maxWidth: '800px', margin: '0 auto' }}>
//         <Title level={3}>관련 장소</Title>
//         <List
//           itemLayout="vertical"
//           dataSource={places}
//           renderItem={place => (
//             <List.Item
//               key={place.place_id}
//             >
//               <Title level={4}>{place.place_name}</Title>
//               <Divider />
//               <Link to={`/single-marker/${place.place_id}`}>
//               {place.place_name} 상세보기
//               </Link>
//               {place.Images && place.Images.length > 0 && (
//                 <Space direction="vertical">
//                   <Title level={5}>이미지</Title>
//                   <Space>
//                     {place.Images.map((img, index) => (
//                       <Image
//                         key={index}
//                         width={200}
//                         src={`http://3.35.55.228:5000${img.image_url}`}
//                         alt={`장소 이미지 ${index + 1}`}
//                       />
//                     ))}
//                   </Space>
//                 </Space>
//               )}
//             </List.Item>
//           )}
//         />
//       </Card>
//     </Space>
//   );
// }
//
// export default SeasonDetailPage;

// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';  // useNavigate 추가
// import axios from 'axios';
// import { Card, Typography, Spin, Alert, Image, List, Space, Divider, Button } from 'antd';

// const { Title, Paragraph, Text } = Typography;

// const apiUrl = process.env.REACT_APP_API_URL;

// function SeasonDetailPage() {
//   const { workKey, seasonKey } = useParams();
//   const [seasonDetails, setSeasonDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();  // 페이지 리다이렉트를 위한 훅

//   const goBack = () => {
//     navigate(-1);  // 이전 페이지로 이동
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${apiUrl}/api/work/${workKey}/${seasonKey}`);
//         setSeasonDetails(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         if (error.response && error.response.status === 404) {
//           navigate('/notfound', { replace: true });  // 404 에러 시 히스토리 덮어쓰기
//         } else {
//           setError('데이터를 가져오는 데 실패했습니다.');
//         }
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [workKey, seasonKey, navigate]);

//   if (loading) return <Spin tip="로딩 중..." />;
//   if (error) return <Alert message="에러" description={error} type="error" showIcon />;
//   if (!seasonDetails) return <Alert message="시즌 정보를 찾을 수 없습니다." type="warning" showIcon />;

//   const { seasonDetails: details, places } = seasonDetails;

//   return (
//     <Space direction="vertical" size="large" style={{ width: '100%' }}>
//       <button onClick={goBack} style={{marginBottom: '10px', padding: '8px 16px', cursor: 'pointer'}}>
//         뒤로 가기
//       </button>
//       <Card style={{maxWidth: '800px', margin: '0 auto'}}>
//         <Title level={2}>{details.work_name} - {details.work_season}기</Title>
//         <Paragraph>{details.description}</Paragraph>
//         {details.poster && (
//           <Image
//             src={`${apiUrl}${details.poster}`}  // apiUrl과 poster 경로를 결합
//             alt={details.work_name}
//             style={{ maxWidth: '300px' }}
//           />
//         )}
//         <Paragraph>
//           <Text strong>방영 기간:</Text> {details.start_date} ~ {details.end_date}
//         </Paragraph>
//         <Paragraph>
//           <Text strong>장르:</Text> {details.genre}
//         </Paragraph>
//         <Paragraph>
//           <Text strong>감독:</Text> {details.director}
//         </Paragraph>
//         <Paragraph>
//           <Text strong>각본:</Text> {details.series_writer}
//         </Paragraph>
//       </Card>

//       <Card style={{ maxWidth: '800px', margin: '0 auto' }}>
//         <Title level={3}>관련 장소</Title>
//         <List
//           itemLayout="vertical"
//           dataSource={places}
//           renderItem={place => (
//             <List.Item key={place.place_id}>
//               <Title level={4}>{place.place_name}</Title>
//               <Divider />
//               <Link to={`/single-marker/${place.place_id}`}>
//                 {place.place_name} 상세보기
//               </Link>
//               {place.Images && place.Images.length > 0 && (
//                 <Space direction="vertical">
//                   <Title level={5}>이미지</Title>
//                   <Space>
//                     {place.Images.map((img, index) => (
//                       <Image
//                         key={index}
//                         width={200}
//                         src={`${apiUrl}${img.image_url}`}
//                         alt={`장소 이미지 ${index + 1}`}
//                       />
//                     ))}
//                   </Space>
//                 </Space>
//               )}
//             </List.Item>
//           )}
//         />
//       </Card>
//     </Space>
//   );
// }

// export default SeasonDetailPage;

// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Carousel,
//   Card,
//   Typography,
//   Spin,
//   Alert,
//   Image,
//   Button,
//   Space,
// } from "antd";
// import { LeftOutlined, RightOutlined } from "@ant-design/icons";
// import "../css/SeasonDetailPage.css";

// const { Title, Paragraph, Text } = Typography;

// const apiUrl = process.env.REACT_APP_API_URL;

// function SeasonDetailPage() {
//   const { workKey, seasonKey } = useParams();
//   const [seasonDetails, setSeasonDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const goBack = () => {
//     navigate(-1);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `${apiUrl}/api/work/${workKey}/${seasonKey}`
//         );
//         setSeasonDetails(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         if (error.response && error.response.status === 404) {
//           navigate("/notfound", { replace: true });
//         } else {
//           setError("데이터를 가져오는 데 실패했습니다.");
//         }
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [workKey, seasonKey, navigate]);

//   if (loading) return <Spin tip="로딩 중..." />;
//   if (error)
//     return <Alert message="에러" description={error} type="error" showIcon />;
//   if (!seasonDetails)
//     return (
//       <Alert message="시즌 정보를 찾을 수 없습니다." type="warning" showIcon />
//     );

//   const { seasonDetails: details, places } = seasonDetails;

//   return (
//     <div className="season-detail-container">
//       <Button onClick={goBack} className="back-button">
//         뒤로 가기
//       </Button>
//       <Card className="season-info-card">
//         <Title level={2}>
//           {details.work_name} - {details.work_season}기
//         </Title>
//         <Paragraph>{details.description}</Paragraph>
//         {details.poster && (
//           <Image
//             src={`${apiUrl}${details.poster}`}
//             alt={details.work_name}
//             className="season-poster"
//           />
//         )}
//         <Paragraph>
//           <Text strong>방영 기간:</Text> {details.start_date} ~{" "}
//           {details.end_date}
//         </Paragraph>
//         <Paragraph>
//           <Text strong>장르:</Text> {details.genre}
//         </Paragraph>
//         <Paragraph>
//           <Text strong>감독:</Text> {details.director}
//         </Paragraph>
//         <Paragraph>
//           <Text strong>각본:</Text> {details.series_writer}
//         </Paragraph>
//       </Card>

//       <Title level={3} style={{ marginTop: "20px" }}>
//         관련 장소
//       </Title>
//       <Carousel
//         arrows
//         prevArrow={<LeftOutlined />}
//         nextArrow={<RightOutlined />}
//         dotPosition="bottom"
//         infinite={false}
//       >
//         {places.map((place) => (
//           <div key={place.place_id}>
//             <Card className="place-card">
//               <Title level={4}>{place.place_name}</Title>
//               <Link to={`/single-marker/${place.place_id}`}>상세보기</Link>
//               {place.Images && place.Images.length > 0 && (
//                 <Space direction="vertical" className="place-images">
//                   <Title level={5}>이미지</Title>
//                   <Space>
//                     {place.Images.map((img, index) => (
//                       <Image
//                         key={index}
//                         width={200}
//                         src={`${apiUrl}${img.image_url}`}
//                         alt={`장소 이미지 ${index + 1}`}
//                       />
//                     ))}
//                   </Space>
//                 </Space>
//               )}
//             </Card>
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// }

// // SeasonDetailPage.js
// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Card, Typography, Spin, Alert, Image, Button } from "antd";
// import InfiniteScroll from "react-infinite-scroll-component";
// import "../css/SeasonDetailPage.css";

// const { Title, Paragraph, Text } = Typography;

// const apiUrl = process.env.REACT_APP_API_URL;

// function SeasonDetailPage() {
//   const { workKey, seasonKey } = useParams();
//   const [seasonDetails, setSeasonDetails] = useState(null);
//   const [places, setPlaces] = useState([]);
//   const [visiblePlaces, setVisiblePlaces] = useState([]);
//   const [itemsPerLoad] = useState(5); // 한 번에 로드할 항목 수
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   const goBack = () => {
//     navigate(-1);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `${apiUrl}/api/work/${workKey}/${seasonKey}`
//         );
//         setSeasonDetails(response.data.seasonDetails);
//         setPlaces(response.data.places);
//         setVisiblePlaces(response.data.places.slice(0, itemsPerLoad));
//         setHasMore(response.data.places.length > itemsPerLoad);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         if (error.response && error.response.status === 404) {
//           navigate("/notfound", { replace: true });
//         } else {
//           setError("데이터를 가져오는 데 실패했습니다.");
//         }
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [workKey, seasonKey, navigate, itemsPerLoad]);

//   const fetchMoreData = () => {
//     if (visiblePlaces.length >= places.length) {
//       setHasMore(false);
//       return;
//     }
//     const nextPlaces = places.slice(
//       visiblePlaces.length,
//       visiblePlaces.length + itemsPerLoad
//     );
//     setVisiblePlaces([...visiblePlaces, ...nextPlaces]);
//   };

//   if (loading) return <Spin tip="로딩 중..." />;
//   if (error)
//     return <Alert message="에러" description={error} type="error" showIcon />;
//   if (!seasonDetails)
//     return (
//       <Alert message="시즌 정보를 찾을 수 없습니다." type="warning" showIcon />
//     );

//   return (
//     <div className="season-detail-container">
//       <Button onClick={goBack} className="back-button">
//         뒤로 가기
//       </Button>
//       <Card className="season-info-card">
//         <Title level={2}>
//           {seasonDetails.work_name} - {seasonDetails.work_season}기
//         </Title>
//         <Paragraph>{seasonDetails.description}</Paragraph>
//         {seasonDetails.poster && (
//           <Image
//             src={`${apiUrl}${seasonDetails.poster}`}
//             alt={seasonDetails.work_name}
//             className="season-poster"
//           />
//         )}
//         <Paragraph>
//           <Text strong>방영 기간:</Text> {seasonDetails.start_date} ~{" "}
//           {seasonDetails.end_date}
//         </Paragraph>
//         <Paragraph>
//           <Text strong>장르:</Text> {seasonDetails.genre}
//         </Paragraph>
//         <Paragraph>
//           <Text strong>감독:</Text> {seasonDetails.director}
//         </Paragraph>
//         <Paragraph>
//           <Text strong>각본:</Text> {seasonDetails.series_writer}
//         </Paragraph>
//       </Card>

//       <Title level={3} style={{ marginTop: "20px" }}>
//         관련 장소
//       </Title>

//       <InfiniteScroll
//         dataLength={visiblePlaces.length}
//         next={fetchMoreData}
//         hasMore={hasMore}
//         loader={<Spin tip="로딩 중..." />}
//         endMessage={
//           <p style={{ textAlign: "center" }}>
//             <b>모든 장소를 불러왔습니다.</b>
//           </p>
//         }
//       >
//         <div className="cards-container">
//           {visiblePlaces.map((place) => (
//             <Card
//               key={place.place_id}
//               title={place.place_name}
//               style={{ width: 300, margin: "16px" }}
//               extra={
//                 <Link to={`/single-marker/${place.place_id}`}>상세보기</Link>
//               }
//             >
//               {place.description && <p>{place.description}</p>}
//               {place.Images && place.Images.length > 0 && (
//                 <div className="place-images">
//                   {place.Images.map((img, index) => (
//                     <Image
//                       key={index}
//                       width={200}
//                       src={`${apiUrl}${img.image_url}`}
//                       alt={`장소 이미지 ${index + 1}`}
//                     />
//                   ))}
//                 </div>
//               )}
//             </Card>
//           ))}
//         </div>
//       </InfiniteScroll>
//     </div>
//   );
// }

// export default SeasonDetailPage;

// SeasonDetailPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Typography, Spin, Alert, Image, Button } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import "../css/SeasonDetailPage.css";
import ScrollToTopButton from "../components/ScrollToTopButton"; // ScrollToTopButton 컴포넌트 임포트

const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

const apiUrl = process.env.REACT_APP_API_URL;

function SeasonDetailPage() {
  const { workKey, seasonKey } = useParams();
  const [seasonDetails, setSeasonDetails] = useState(null);
  const [places, setPlaces] = useState([]);
  const [visiblePlaces, setVisiblePlaces] = useState([]);
  const [itemsPerLoad] = useState(5); // 한 번에 로드할 항목 수
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/work/${workKey}/${seasonKey}`
        );
        setSeasonDetails(response.data.seasonDetails);
        setPlaces(response.data.places);
        setVisiblePlaces(response.data.places.slice(0, itemsPerLoad));
        setHasMore(response.data.places.length > itemsPerLoad);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response && error.response.status === 404) {
          navigate("/notfound", { replace: true });
        } else {
          setError("데이터를 가져오는 데 실패했습니다.");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [workKey, seasonKey, navigate, itemsPerLoad]);

  const fetchMoreData = () => {
    if (visiblePlaces.length >= places.length) {
      setHasMore(false);
      return;
    }
    const nextPlaces = places.slice(
      visiblePlaces.length,
      visiblePlaces.length + itemsPerLoad
    );
    setVisiblePlaces([...visiblePlaces, ...nextPlaces]);
  };

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
  if (!seasonDetails)
    return (
      <Alert
        message="시즌 정보를 찾을 수 없습니다."
        type="warning"
        showIcon
        className="warning-alert"
      />
    );

  return (
    <div className="season-detail-container">
      {/* <Button onClick={goBack} className="back-button">
        뒤로 가기
      </Button> */}
      <div className="SDP-Title-section">
        <Title level={2}>
          {seasonDetails.work_name} - {seasonDetails.work_season}기
        </Title>
        <hr className="SDP-custom-divider" />
      </div>
      <Card className="season-info-card">
        {seasonDetails.poster && (
          <Image
            src={`${apiUrl}${seasonDetails.poster}`}
            alt={seasonDetails.work_name}
            className="season-poster"
          />
        )}
        <Paragraph>
          <Paragraph>{seasonDetails.description}</Paragraph>
          <Text strong>방영 기간:</Text> {seasonDetails.start_date} ~{" "}
          {seasonDetails.end_date}
        </Paragraph>
        <Paragraph>
          <Text strong>장르:</Text> {seasonDetails.genre}
        </Paragraph>
        <Paragraph>
          <Text strong>감독:</Text> {seasonDetails.director}
        </Paragraph>
        <Paragraph>
          <Text strong>각본:</Text> {seasonDetails.series_writer}
        </Paragraph>
      </Card>
      <div className="SDP-Place-info">
        <Title level={3} style={{ marginTop: "20px" }}>
          관련 장소
        </Title>
        <hr className="SDP-custom-dividerB" />
      </div>
      <InfiniteScroll
        dataLength={visiblePlaces.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Spin tip="로딩 중..." />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>모든 장소를 불러왔습니다.</b>
          </p>
        }
      >
        <div className="cards-container">
          {visiblePlaces.map((place) => {
            // 이미지 URL 설정
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
              <Card
                key={place.place_id}
                hoverable
                className="place-card"
                cover={<img alt={place.place_name} src={imageUrl} />}
                onClick={() => navigate(`/single-marker/${place.place_id}`)}
              >
                <Meta title={place.place_name} />
              </Card>
            );
          })}
        </div>
      </InfiniteScroll>
      <ScrollToTopButton />
    </div>
  );
}

export default SeasonDetailPage;
