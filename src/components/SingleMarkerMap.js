// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// // import { Carousel } from "react-responsive-carousel";
// // import "react-responsive-carousel/lib/styles/carousel.min.css";
// // import axios from "axios";
// // import {
// //   Button,
// //   List,
// //   Row,
// //   Col,
// //   Divider,
// //   Collapse,
// //   Spin,
// //   Alert,
// //   Typography,
// // } from "antd";
// // import { ArrowLeftOutlined } from "@ant-design/icons";
// // import "../css/SingleMarker.css";
// // import ScrollToTopButton from "../components/ScrollToTopButton";
// // import BookmarkButton from "./BookmarkButton";
// // import ReviewForm from "./ReviewForm";
// //
// //
// // const { Panel } = Collapse;
// // const { Title } = Typography;
// //
// // const mapContainerStyle = {
// //   width: "100%",
// //   height: "40vh",
// // };
// //
// // const apiUrl = process.env.REACT_APP_API_URL;
// //
// // function SingleMarkerMap({ markerId }) {
// //   const [markerData, setMarkerData] = useState(null);
// //   const [aniPlaceImages, setAniPlaceImages] = useState([]);
// //   const [otherImages, setOtherImages] = useState([]);
// //   const [work, setWork] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [reviews, setReviews] = useState([]);
// //   const navigate = useNavigate();
// //
// //   const goBack = () => {
// //     window.history.back();
// //   };
// //
// //   useEffect(() => {
// //     const fetchMarkerData = async () => {
// //       try {
// //         const markerResponse = await axios.get(
// //           `${apiUrl}/api/place/${markerId}`
// //         );
// //         setMarkerData(markerResponse.data);
// //
// //         const images = markerResponse.data.Images;
// //
// //         const aniPlace = images.filter((img) =>
// //           img.image_url.includes("aniPlace")
// //         );
// //         const otherImages = images.filter(
// //           (img) =>
// //             img.image_url.includes("realPlace") ||
// //             img.image_url.includes("userUpload")
// //         );
// //
// //         setAniPlaceImages(aniPlace);
// //         setOtherImages(otherImages);
// //
// //         if (markerResponse.data.Work) {
// //           setWork(markerResponse.data.Work);
// //         }
// //
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching marker data:", error);
// //         setError("데이터를 가져오는 데 실패했습니다.");
// //         setLoading(false);
// //       }
// //     };
// //
// //     fetchMarkerData();
// //   }, [markerId]);
// //
// //   const handleImageError = (index, imageType) => {
// //     if (imageType === "aniPlace") {
// //       setAniPlaceImages((prevImages) =>
// //         prevImages.filter((_, i) => i !== index)
// //       );
// //     } else {
// //       setOtherImages((prevImages) => prevImages.filter((_, i) => i !== index));
// //     }
// //   };
// //
// //   const handleMapClick = () => {
// //     if (markerData) {
// //       navigate(`/multi-marker/${markerData.place_id}`);
// //     }
// //   };
// //
// //   const handleShareClick = async () => {
// //     if (navigator.share) {
// //       try {
// //         await navigator.share({
// //           title: markerData.place_name,
// //           text: `Check out this place: ${markerData.place_name}`,
// //           url: window.location.href,
// //         });
// //       } catch (error) {
// //         console.error("Error sharing:", error);
// //       }
// //     } else {
// //       console.log("Share not supported on this browser");
// //     }
// //   };
// //
// //   const formatOpeningHours = (hours) => {
// //     if (hours === "nan") return "정보 없음";
// //
// //     return hours.split("\n").map((line, index) => (
// //       <React.Fragment key={index}>
// //         {line}
// //         <br />
// //       </React.Fragment>
// //     ));
// //   };
// //
// //   if (loading) return <Spin tip="로딩 중..." className="loading-spinner" />;
// //
// //   if (error)
// //     return (
// //       <Alert
// //         message="에러"
// //         description={error}
// //         type="error"
// //         showIcon
// //         className="error-alert"
// //       />
// //     );
// //
// //   if (!markerData) {
// //     return <div>Loading...</div>;
// //   }
// //
// //   return (
// //     <div className="single-marker-container">
// //       <div className="marker-header">
// //         <BookmarkButton placeId={markerId} />
// //         <button onClick={handleShareClick} className="icon-button">
// //           <span className="material-icons share-icon">share</span>
// //         </button>
// //       </div>
// //
// //       {aniPlaceImages.length > 0 && (
// //         <div className="image-slider">
// //           <Title level={3}>애니메이션 장소</Title>
// //           <Carousel
// //             showThumbs={false}
// //             showStatus={false}
// //             infiniteLoop={true}
// //             emulateTouch={true}
// //           >
// //             {aniPlaceImages.map((image, index) => (
// //               <div key={index}>
// //                 <img
// //                   src={`${apiUrl}${image.image_url}`}
// //                   alt={`Location ${index + 1}`}
// //                   onError={() => handleImageError(index, "aniPlace")}
// //                 />
// //               </div>
// //             ))}
// //           </Carousel>
// //         </div>
// //       )}
// //
// //       {otherImages.length > 0 && (
// //         <div className="image-slider">
// //           <Title level={3}>실제 장소 및 사용자 업로드</Title>
// //           <Carousel
// //             showThumbs={false}
// //             showStatus={false}
// //             infiniteLoop={true}
// //             emulateTouch={true}
// //           >
// //             {otherImages.map((image, index) => (
// //               <div key={index}>
// //                 <img
// //                   src={`${apiUrl}${image.image_url}`}
// //                   alt={`Location ${index + 1}`}
// //                   onError={() => handleImageError(index, "other")}
// //                 />
// //               </div>
// //             ))}
// //           </Carousel>
// //         </div>
// //       )}
// //
// //       <div className="map-container">
// //         <LoadScript
// //           googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
// //         >
// //           <GoogleMap
// //             mapContainerStyle={mapContainerStyle}
// //             center={{
// //               lat: parseFloat(markerData.latitude),
// //               lng: parseFloat(markerData.longitude),
// //             }}
// //             zoom={15}
// //             onClick={handleMapClick}
// //             options={{
// //               fullscreenControl: true,
// //               zoomControl: false,
// //               mapTypeControl: false,
// //               streetViewControl: false,
// //               scaleControl: false,
// //               rotateControl: false,
// //             }}
// //           >
// //             <Marker
// //               position={{
// //                 lat: parseFloat(markerData.latitude),
// //                 lng: parseFloat(markerData.longitude),
// //               }}
// //             />
// //           </GoogleMap>
// //         </LoadScript>
// //       </div>
// //
// //       <div className="info-panel-content">
// //         <List
// //           itemLayout="horizontal"
// //           dataSource={[0]}
// //           renderItem={() => (
// //             <>
// //               {work && (
// //                 <>
// //                   <Divider className="info-divider" />
// //                   <List.Item className="info-section">
// //                     <List.Item.Meta
// //                       title={<strong className="info-title">작품 이름</strong>}
// //                       description={
// //                         <span className="info-description">
// //                           {work.work_name}
// //                         </span>
// //                       }
// //                     />
// //                   </List.Item>
// //                   <Row gutter={16}>
// //                     <Col span={12}>
// //                       <List.Item className="info-section">
// //                         <List.Item.Meta
// //                           title={<strong className="info-title">시즌</strong>}
// //                           description={
// //                             <span className="info-description">
// //                               {work.work_season}
// //                             </span>
// //                           }
// //                         />
// //                       </List.Item>
// //                     </Col>
// //                     <Col span={12}>
// //                       <List.Item className="info-section">
// //                         <List.Item.Meta
// //                           title={
// //                             <strong className="info-title">에피소드</strong>
// //                           }
// //                           description={
// //                             <span className="info-description">
// //                               {work.work_ep}
// //                             </span>
// //                           }
// //                         />
// //                       </List.Item>
// //                     </Col>
// //                   </Row>
// //                   <Divider className="info-divider" />
// //                 </>
// //               )}
// //               <List.Item className="info-section">
// //                 <List.Item.Meta
// //                   title={<strong className="info-title">설명</strong>}
// //                   description={
// //                     <span className="info-description">
// //                       {markerData.description}
// //                     </span>
// //                   }
// //                 />
// //               </List.Item>
// //               <Row gutter={16}>
// //                 <Col span={8}>
// //                   <List.Item className="info-section">
// //                     <List.Item.Meta
// //                       title={<strong className="info-title">지역</strong>}
// //                       description={
// //                         <span className="info-description">
// //                           {markerData.address_region}
// //                         </span>
// //                       }
// //                     />
// //                   </List.Item>
// //                 </Col>
// //                 <Col span={8}>
// //                   <List.Item className="info-section">
// //                     <List.Item.Meta
// //                       title={<strong className="info-title">도시</strong>}
// //                       description={
// //                         <span className="info-description">
// //                           {markerData.address_city}
// //                         </span>
// //                       }
// //                     />
// //                   </List.Item>
// //                 </Col>
// //                 <Col span={8}>
// //                   <List.Item className="info-section">
// //                     <List.Item.Meta
// //                       title={<strong className="info-title">구역</strong>}
// //                       description={
// //                         <span className="info-description">
// //                           {markerData.address_district}
// //                         </span>
// //                       }
// //                     />
// //                   </List.Item>
// //                 </Col>
// //               </Row>
// //               <Divider className="info-divider" />
// //               <List.Item className="info-section">
// //                 <List.Item.Meta
// //                   title={<strong className="info-title">상세 주소</strong>}
// //                   description={
// //                     <span className="info-description">
// //                       {markerData.detailed_address}
// //                     </span>
// //                   }
// //                 />
// //               </List.Item>
// //               <List.Item className="info-section">
// //                 <List.Item.Meta
// //                   title={<strong className="info-title">최근 촬영일</strong>}
// //                   description={
// //                     <span className="info-description">
// //                       {markerData.latestshot_date}
// //                     </span>
// //                   }
// //                 />
// //               </List.Item>
// //             </>
// //           )}
// //         />
// //         <Divider className="info-divider" />
// //         <Collapse accordion className="opening-hours-collapse">
// //           <Panel header="영업시간" key="1">
// //             <p>{formatOpeningHours(markerData.opening_hours)}</p>
// //           </Panel>
// //         </Collapse>
// //         <Divider className="info-divider" />
// //         <ReviewForm placeId={markerId} />
// //       </div>
// //       <ScrollToTopButton />
// //     </div>
// //   );
// // }
// //
// // export default SingleMarkerMap;
//
//
//
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import axios from "axios";
// import {
//   Button,
//   List,
//   Row,
//   Col,
//   Divider,
//   Collapse,
//   Spin,
//   Alert,
//   Typography,
// } from "antd";
// import { ArrowLeftOutlined } from "@ant-design/icons";
// import "../css/SingleMarker.css";
// import ScrollToTopButton from "../components/ScrollToTopButton";
// import BookmarkButton from "./BookmarkButton";
// import ReviewForm from "./ReviewForm";
// import ReviewList from "./ReviewList";
//
// const { Panel } = Collapse;
// const { Title } = Typography;
//
// const mapContainerStyle = {
//   width: "100%",
//   height: "40vh",
// };
//
// const apiUrl = process.env.REACT_APP_API_URL;
//
// function SingleMarkerMap({ markerId }) {
//   const [markerData, setMarkerData] = useState(null);
//   const [aniPlaceImages, setAniPlaceImages] = useState([]);
//   const [otherImages, setOtherImages] = useState([]);
//   const [work, setWork] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [user, setUser] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const navigate = useNavigate();
//
//   useEffect(() => {
//     const fetchMarkerData = async () => {
//       try {
//         const markerResponse = await axios.get(
//           `${apiUrl}/api/place/${markerId}`
//         );
//         setMarkerData(markerResponse.data);
//
//         const images = markerResponse.data.Images;
//
//         const aniPlace = images.filter((img) =>
//           img.image_url.includes("aniPlace")
//         );
//         const otherImages = images.filter(
//           (img) =>
//             img.image_url.includes("realPlace") ||
//             img.image_url.includes("userUpload")
//         );
//
//         setAniPlaceImages(aniPlace);
//         setOtherImages(otherImages);
//
//         if (markerResponse.data.Work) {
//           setWork(markerResponse.data.Work);
//         }
//
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching marker data:", error);
//         setError("데이터를 가져오는 데 실패했습니다.");
//         setLoading(false);
//       }
//     };
//
//     const checkLoginStatus = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/api/auth/session-check`, {
//           withCredentials: true,
//         });
//         console.log("Login check response:", response.data);
//         setUser(response.data.user);
//       } catch (error) {
//         console.error("로그인 상태 확인 실패:", error);
//         setUser(null);
//       }
//     };
//
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/api/reviews/place/${markerId}`);
//         setReviews(response.data);
//       } catch (error) {
//         console.error('리뷰를 가져오는 데 실패했습니다:', error);
//       }
//     };
//
//     fetchMarkerData();
//     checkLoginStatus();
//     fetchReviews();
//   }, [markerId]);
//
//   const handleImageError = (index, imageType) => {
//     if (imageType === "aniPlace") {
//       setAniPlaceImages((prevImages) =>
//         prevImages.filter((_, i) => i !== index)
//       );
//     } else {
//       setOtherImages((prevImages) => prevImages.filter((_, i) => i !== index));
//     }
//   };
//
//   const handleMapClick = () => {
//     if (markerData) {
//       navigate(`/multi-marker/${markerData.place_id}`);
//     }
//   };
//
//   const handleShareClick = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: markerData.place_name,
//           text: `Check out this place: ${markerData.place_name}`,
//           url: window.location.href,
//         });
//       } catch (error) {
//         console.error("Error sharing:", error);
//       }
//     } else {
//       console.log("Share not supported on this browser");
//     }
//   };
//
//   const formatOpeningHours = (hours) => {
//     if (hours === "nan") return "정보 없음";
//
//     return hours.split("\n").map((line, index) => (
//       <React.Fragment key={index}>
//         {line}
//         <br />
//       </React.Fragment>
//     ));
//   };
//
//   const handleReviewSubmitted = (newReview) => {
//     setReviews(prevReviews => [newReview, ...prevReviews]);
//   };
//
//   if (loading) return <Spin tip="로딩 중..." className="loading-spinner" />;
//
//   if (error)
//     return (
//       <Alert
//         message="에러"
//         description={error}
//         type="error"
//         showIcon
//         className="error-alert"
//       />
//     );
//
//   if (!markerData) {
//     return <div>Loading...</div>;
//   }
//
//   return (
//     <div className="single-marker-container">
//       <div className="marker-header">
//         <BookmarkButton placeId={markerId} />
//         <button onClick={handleShareClick} className="icon-button">
//           <span className="material-icons share-icon">share</span>
//         </button>
//       </div>
//
//       {aniPlaceImages.length > 0 && (
//         <div className="image-slider">
//           <Title level={3}>애니메이션 장소</Title>
//           <Carousel
//             showThumbs={false}
//             showStatus={false}
//             infiniteLoop={true}
//             emulateTouch={true}
//           >
//             {aniPlaceImages.map((image, index) => (
//               <div key={index}>
//                 <img
//                   src={`${apiUrl}${image.image_url}`}
//                   alt={`Location ${index + 1}`}
//                   onError={() => handleImageError(index, "aniPlace")}
//                 />
//               </div>
//             ))}
//           </Carousel>
//         </div>
//       )}
//
//       {otherImages.length > 0 && (
//         <div className="image-slider">
//           <Title level={3}>실제 장소 및 사용자 업로드</Title>
//           <Carousel
//             showThumbs={false}
//             showStatus={false}
//             infiniteLoop={true}
//             emulateTouch={true}
//           >
//             {otherImages.map((image, index) => (
//               <div key={index}>
//                 <img
//                   src={`${apiUrl}${image.image_url}`}
//                   alt={`Location ${index + 1}`}
//                   onError={() => handleImageError(index, "other")}
//                 />
//               </div>
//             ))}
//           </Carousel>
//         </div>
//       )}
//
//       <div className="map-container">
//         <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
//           <GoogleMap
//             mapContainerStyle={mapContainerStyle}
//             center={{
//               lat: parseFloat(markerData.latitude),
//               lng: parseFloat(markerData.longitude),
//             }}
//             zoom={15}
//             onClick={handleMapClick}
//             options={{
//               fullscreenControl: true,
//               zoomControl: false,
//               mapTypeControl: false,
//               streetViewControl: false,
//               scaleControl: false,
//               rotateControl: false,
//             }}
//           >
//             <Marker
//               position={{
//                 lat: parseFloat(markerData.latitude),
//                 lng: parseFloat(markerData.longitude),
//               }}
//             />
//           </GoogleMap>
//         </LoadScript>
//       </div>
//
//       <div className="info-panel-content">
//         <List
//           itemLayout="horizontal"
//           dataSource={[0]}
//           renderItem={() => (
//             <>
//               {work && (
//                 <>
//                   <Divider className="info-divider" />
//                   <List.Item className="info-section">
//                     <List.Item.Meta
//                       title={<strong className="info-title">작품 이름</strong>}
//                       description={
//                         <span className="info-description">
//                           {work.work_name}
//                         </span>
//                       }
//                     />
//                   </List.Item>
//                   <Row gutter={16}>
//                     <Col span={12}>
//                       <List.Item className="info-section">
//                         <List.Item.Meta
//                           title={<strong className="info-title">시즌</strong>}
//                           description={
//                             <span className="info-description">
//                               {work.work_season}
//                             </span>
//                           }
//                         />
//                       </List.Item>
//                     </Col>
//                     <Col span={12}>
//                       <List.Item className="info-section">
//                         <List.Item.Meta
//                           title={<strong className="info-title">에피소드</strong>}
//                           description={
//                             <span className="info-description">
//                               {work.work_ep}
//                             </span>
//                           }
//                         />
//                       </List.Item>
//                     </Col>
//                   </Row>
//                   <Divider className="info-divider" />
//                 </>
//               )}
//               <List.Item className="info-section">
//                 <List.Item.Meta
//                   title={<strong className="info-title">설명</strong>}
//                   description={
//                     <span className="info-description">
//                       {markerData.description}
//                     </span>
//                   }
//                 />
//               </List.Item>
//               <Row gutter={16}>
//                 <Col span={8}>
//                   <List.Item className="info-section">
//                     <List.Item.Meta
//                       title={<strong className="info-title">지역</strong>}
//                       description={
//                         <span className="info-description">
//                           {markerData.address_region}
//                         </span>
//                       }
//                     />
//                   </List.Item>
//                 </Col>
//                 <Col span={8}>
//                   <List.Item className="info-section">
//                     <List.Item.Meta
//                       title={<strong className="info-title">도시</strong>}
//                       description={
//                         <span className="info-description">
//                           {markerData.address_city}
//                         </span>
//                       }
//                     />
//                   </List.Item>
//                 </Col>
//                 <Col span={8}>
//                   <List.Item className="info-section">
//                     <List.Item.Meta
//                       title={<strong className="info-title">구역</strong>}
//                       description={
//                         <span className="info-description">
//                           {markerData.address_district}
//                         </span>
//                       }
//                     />
//                   </List.Item>
//                 </Col>
//               </Row>
//               <Divider className="info-divider" />
//               <List.Item className="info-section">
//                 <List.Item.Meta
//                   title={<strong className="info-title">상세 주소</strong>}
//                   description={
//                     <span className="info-description">
//                       {markerData.detailed_address}
//                     </span>
//                   }
//                 />
//               </List.Item>
//               <List.Item className="info-section">
//                 <List.Item.Meta
//                   title={<strong className="info-title">최근 촬영일</strong>}
//                   description={
//                     <span className="info-description">
//                       {markerData.latestshot_date}
//                     </span>
//                   }
//                 />
//               </List.Item>
//             </>
//           )}
//         />
//         <Divider className="info-divider" />
//         <Collapse accordion className="opening-hours-collapse">
//           <Panel header="영업시간" key="1">
//             <p>{formatOpeningHours(markerData.opening_hours)}</p>
//           </Panel>
//         </Collapse>
//         <Divider className="info-divider" />
//
//         <ReviewForm
//           placeId={markerId}
//           user={user}
//           onReviewSubmitted={handleReviewSubmitted}
//         />
//         <ReviewList reviews={reviews} />
//       </div>
//       <ScrollToTopButton />
//     </div>
//   );
// }
//
// export default SingleMarkerMap;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import {
  Button,
  List,
  Row,
  Col,
  Divider,
  Collapse,
  Spin,
  Alert,
  Typography,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "../css/SingleMarker.css";
import ScrollToTopButton from "../components/ScrollToTopButton";
import BookmarkButton from "./BookmarkButton";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

const { Panel } = Collapse;
const { Title } = Typography;

const mapContainerStyle = {
  width: "100%",
  height: "40vh",
};

const apiUrl = process.env.REACT_APP_API_URL;

function SingleMarkerMap({ markerId }) {
  const [markerData, setMarkerData] = useState(null);
  const [aniPlaceImages, setAniPlaceImages] = useState([]);
  const [otherImages, setOtherImages] = useState([]);
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/reviews/place/${markerId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('리뷰를 가져오는 데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    const fetchMarkerData = async () => {
      try {
        const markerResponse = await axios.get(
          `${apiUrl}/api/place/${markerId}`
        );
        setMarkerData(markerResponse.data);

        const images = markerResponse.data.Images;

        const aniPlace = images.filter((img) =>
          img.image_url.includes("aniPlace")
        );
        const otherImages = images.filter(
          (img) =>
            img.image_url.includes("realPlace") ||
            img.image_url.includes("userUpload")
        );

        setAniPlaceImages(aniPlace);
        setOtherImages(otherImages);

        if (markerResponse.data.Work) {
          setWork(markerResponse.data.Work);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching marker data:", error);
        setError("데이터를 가져오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/auth/session-check`, {
          withCredentials: true,
        });
        console.log("Login check response:", response.data);
        setUser(response.data.user);
      } catch (error) {
        console.error("로그인 상태 확인 실패:", error);
        setUser(null);
      }
    };

    fetchMarkerData();
    checkLoginStatus();
    fetchReviews();
  }, [markerId]);

  const handleImageError = (index, imageType) => {
    if (imageType === "aniPlace") {
      setAniPlaceImages((prevImages) =>
        prevImages.filter((_, i) => i !== index)
      );
    } else {
      setOtherImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }
  };

  const handleMapClick = () => {
    if (markerData) {
      navigate(`/multi-marker/${markerData.place_id}`);
    }
  };

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: markerData.place_name,
          text: `Check out this place: ${markerData.place_name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.log("Share not supported on this browser");
    }
  };

  const formatOpeningHours = (hours) => {
    if (hours === "nan") return "정보 없음";

    return hours.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const handleReviewSubmitted = (newReview) => {
    setReviews(prevReviews => [newReview, ...prevReviews]);
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

  if (!markerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-marker-container">
      <div className="marker-header">
        <BookmarkButton placeId={markerId} />
        <button onClick={handleShareClick} className="icon-button">
          <span className="material-icons share-icon">share</span>
        </button>
      </div>

      {aniPlaceImages.length > 0 && (
        <div className="image-slider">
          <Title level={3}>애니메이션 장소</Title>
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            emulateTouch={true}
          >
            {aniPlaceImages.map((image, index) => (
              <div key={index}>
                <img
                  src={`${apiUrl}${image.image_url}`}
                  alt={`Location ${index + 1}`}
                  onError={() => handleImageError(index, "aniPlace")}
                />
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {otherImages.length > 0 && (
        <div className="image-slider">
          <Title level={3}>실제 장소 및 사용자 업로드</Title>
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            emulateTouch={true}
          >
            {otherImages.map((image, index) => (
              <div key={index}>
                <img
                  src={`${apiUrl}${image.image_url}`}
                  alt={`Location ${index + 1}`}
                  onError={() => handleImageError(index, "other")}
                />
              </div>
            ))}
          </Carousel>
        </div>
      )}

      <div className="map-container">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={{
              lat: parseFloat(markerData.latitude),
              lng: parseFloat(markerData.longitude),
            }}
            zoom={15}
            onClick={handleMapClick}
            options={{
              fullscreenControl: true,
              zoomControl: false,
              mapTypeControl: false,
              streetViewControl: false,
              scaleControl: false,
              rotateControl: false,
            }}
          >
            <Marker
              position={{
                lat: parseFloat(markerData.latitude),
                lng: parseFloat(markerData.longitude),
              }}
            />
          </GoogleMap>
        </LoadScript>
      </div>

      <div className="info-panel-content">
        <List
          itemLayout="horizontal"
          dataSource={[0]}
          renderItem={() => (
            <>
              {work && (
                <>
                  <Divider className="info-divider" />
                  <List.Item className="info-section">
                    <List.Item.Meta
                      title={<strong className="info-title">작품 이름</strong>}
                      description={
                        <span className="info-description">
                          {work.work_name}
                        </span>
                      }
                    />
                  </List.Item>
                  <Row gutter={16}>
                    <Col span={12}>
                      <List.Item className="info-section">
                        <List.Item.Meta
                          title={<strong className="info-title">시즌</strong>}
                          description={
                            <span className="info-description">
                              {work.work_season}
                            </span>
                          }
                        />
                      </List.Item>
                    </Col>
                    <Col span={12}>
                      <List.Item className="info-section">
                        <List.Item.Meta
                          title={<strong className="info-title">에피소드</strong>}
                          description={
                            <span className="info-description">
                              {work.work_ep}
                            </span>
                          }
                        />
                      </List.Item>
                    </Col>
                  </Row>
                  <Divider className="info-divider" />
                </>
              )}
              <List.Item className="info-section">
                <List.Item.Meta
                  title={<strong className="info-title">설명</strong>}
                  description={
                    <span className="info-description">
                      {markerData.description}
                    </span>
                  }
                />
              </List.Item>
              <Row gutter={16}>
                <Col span={8}>
                  <List.Item className="info-section">
                    <List.Item.Meta
                      title={<strong className="info-title">지역</strong>}
                      description={
                        <span className="info-description">
                          {markerData.address_region}
                        </span>
                      }
                    />
                  </List.Item>
                </Col>
                <Col span={8}>
                  <List.Item className="info-section">
                    <List.Item.Meta
                      title={<strong className="info-title">도시</strong>}
                      description={
                        <span className="info-description">
                          {markerData.address_city}
                        </span>
                      }
                    />
                  </List.Item>
                </Col>
                <Col span={8}>
                  <List.Item className="info-section">
                    <List.Item.Meta
                      title={<strong className="info-title">구역</strong>}
                      description={
                        <span className="info-description">
                          {markerData.address_district}
                        </span>
                      }
                    />
                  </List.Item>
                </Col>
              </Row>
              <Divider className="info-divider" />
              <List.Item className="info-section">
                <List.Item.Meta
                  title={<strong className="info-title">상세 주소</strong>}
                  description={
                    <span className="info-description">
                      {markerData.detailed_address}
                    </span>
                  }
                />
              </List.Item>
              <List.Item className="info-section">
                <List.Item.Meta
                  title={<strong className="info-title">최근 촬영일</strong>}
                  description={
                    <span className="info-description">
                      {markerData.latestshot_date}
                    </span>
                  }
                />
              </List.Item>
            </>
          )}
        />
        <Divider className="info-divider" />
        <Collapse accordion className="opening-hours-collapse">
          <Panel header="영업시간" key="1">
            <p>{formatOpeningHours(markerData.opening_hours)}</p>
          </Panel>
        </Collapse>
        <Divider className="info-divider" />

        <ReviewForm
          placeId={markerId}
          user={user}
          onReviewSubmitted={handleReviewSubmitted}
        />
        <ReviewList reviews={reviews} />
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default SingleMarkerMap;