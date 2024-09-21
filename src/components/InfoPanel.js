// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
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
// import "../css/InfoPanel.css";

// const { Panel } = Collapse;
// const { Title } = Typography;

// // 구글 맵의 컨테이너 스타일을 정의
// const mapContainerStyle = {
//   width: "100%",
//   height: "40vh",
// };

// const InfoPanel = ({ selectedMarker }) => {
//   const [work, setWork] = useState(null);
//   const [images, setImages] = useState([]);
//   const [aniPlaceImages, setAniPlaceImages] = useState([]);
//   const [otherImages, setOtherImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (selectedMarker) {
//       // Place 데이터를 가져옵니다 (Work 및 Images 포함)
//       fetch(`${apiUrl}/api/place/${selectedMarker.place_id}`)
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.Work) {
//             setWork(data.Work); // Work 데이터를 상태로 저장
//           }
//           if (data.Images && Array.isArray(data.Images)) {
//             setImages(data.Images); // Images 데이터를 상태로 저장

//             const aniPlace = data.Images.filter((img) =>
//               img.image_url.includes("aniPlace")
//             );
//             const otherImages = data.Images.filter(
//               (img) =>
//                 img.image_url.includes("realPlace") ||
//                 img.image_url.includes("userUpload")
//             );

//             setAniPlaceImages(aniPlace);
//             setOtherImages(otherImages);
//           } else {
//             console.error("Unexpected image data structure:", data);
//           }
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching place data:", error);
//           setError("데이터를 가져오는 데 실패했습니다.");
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }, [selectedMarker]);

//   const handleImageError = (index, imageType) => {
//     if (imageType === "aniPlace") {
//       setAniPlaceImages((prevImages) =>
//         prevImages.filter((_, i) => i !== index)
//       );
//     } else {
//       setOtherImages((prevImages) => prevImages.filter((_, i) => i !== index));
//     }
//   };

//   const handleMapClick = () => {
//     if (selectedMarker) {
//       navigate(`/multi-marker/${selectedMarker.place_id}`);
//     }
//   };

//   const handleShareClick = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: selectedMarker.place_name,
//           text: `Check out this place: ${selectedMarker.place_name}`,
//           url: window.location.href,
//         });
//       } catch (error) {
//         console.error("Error sharing:", error);
//       }
//     } else {
//       console.log("Share not supported on this browser");
//     }
//   };

//   const formatOpeningHours = (hours) => {
//     if (hours === "nan") return "정보 없음";

//     return hours.split("\n").map((line, index) => (
//       <React.Fragment key={index}>
//         {line}
//         <br />
//       </React.Fragment>
//     ));
//   };

//   if (loading) return <Spin tip="로딩 중..." className="loading-spinner" />;

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

//   if (!selectedMarker) return null;

//   return (
//     <div className="info-panel-container">
//       <div className="info-panel-header">
//         <h2>{selectedMarker.place_name}</h2>
//         <Button onClick={handleShareClick}>공유</Button>
//       </div>

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

//       <div className="map-container">
//         <LoadScript
//           googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
//         >
//           <GoogleMap
//             mapContainerStyle={mapContainerStyle}
//             center={{
//               lat: parseFloat(selectedMarker.latitude),
//               lng: parseFloat(selectedMarker.longitude),
//             }}
//             zoom={15}
//             onClick={handleMapClick}
//           >
//             <Marker
//               position={{
//                 lat: parseFloat(selectedMarker.latitude),
//                 lng: parseFloat(selectedMarker.longitude),
//               }}
//             />
//           </GoogleMap>
//         </LoadScript>
//       </div>

//       <div className="info-panel-content">
//         <List
//           itemLayout="horizontal"
//           dataSource={[0]} // 데이터를 직접 렌더링하므로 placeholder로 0 사용
//           renderItem={() => (
//             <>
//               {work && (
//                 <>
//                   {/* 작품 이름 */}
//                   <List.Item>
//                     <List.Item.Meta
//                       title={<strong>작품 이름</strong>}
//                       description={work.work_name}
//                     />
//                   </List.Item>
//                   {/* 시즌과 에피소드 */}
//                   <Row gutter={16}>
//                     <Col span={12}>
//                       <List.Item>
//                         <List.Item.Meta
//                           title={<strong>시즌</strong>}
//                           description={work.work_season}
//                         />
//                       </List.Item>
//                     </Col>
//                     <Col span={12}>
//                       <List.Item>
//                         <List.Item.Meta
//                           title={<strong>에피소드</strong>}
//                           description={work.work_ep}
//                         />
//                       </List.Item>
//                     </Col>
//                   </Row>
//                   <Divider style={{ margin: "12px 0" }} />
//                 </>
//               )}
//               {/* 설명 */}
//               <List.Item>
//                 <List.Item.Meta
//                   title={<strong>설명</strong>}
//                   description={selectedMarker.description}
//                 />
//               </List.Item>
//               {/* 지역, 도시, 구역 */}
//               <Row gutter={16}>
//                 <Col span={8}>
//                   <List.Item>
//                     <List.Item.Meta
//                       title={<strong>지역</strong>}
//                       description={selectedMarker.address_region}
//                     />
//                   </List.Item>
//                 </Col>
//                 <Col span={8}>
//                   <List.Item>
//                     <List.Item.Meta
//                       title={<strong>도시</strong>}
//                       description={selectedMarker.address_city}
//                     />
//                   </List.Item>
//                 </Col>
//                 <Col span={8}>
//                   <List.Item>
//                     <List.Item.Meta
//                       title={<strong>구역</strong>}
//                       description={selectedMarker.address_district}
//                     />
//                   </List.Item>
//                 </Col>
//               </Row>
//               <Divider style={{ margin: "12px 0" }} />
//               {/* 상세 주소 */}
//               <List.Item>
//                 <List.Item.Meta
//                   title={<strong>상세 주소</strong>}
//                   description={selectedMarker.detailed_address}
//                 />
//               </List.Item>
//               {/* 최근 촬영일 */}
//               <List.Item>
//                 <List.Item.Meta
//                   title={<strong>최근 촬영일</strong>}
//                   description={selectedMarker.latestshot_date}
//                 />
//               </List.Item>
//             </>
//           )}
//         />

//         {/* 영업시간 */}
//         <Collapse accordion className="opening-hours-collapse">
//           <Panel header="영업시간" key="1">
//             <p>{formatOpeningHours(selectedMarker.opening_hours)}</p>
//           </Panel>
//         </Collapse>

//         <Link to={`/single-marker/${selectedMarker.place_id}`}>
//           <Button className="info-panel-button">로케이션 상세보기</Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default InfoPanel;

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
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
// import "../css/InfoPanel.css";

// const { Panel } = Collapse;
// const { Title } = Typography;

// // 구글 맵의 컨테이너 스타일을 정의
// const mapContainerStyle = {
//   width: "100%",
//   height: "40vh",
// };

// const InfoPanel = ({ selectedMarker }) => {
//   const [work, setWork] = useState(null);
//   const [images, setImages] = useState([]);
//   const [aniPlaceImages, setAniPlaceImages] = useState([]);
//   const [otherImages, setOtherImages] = useState([]);
//   const [error, setError] = useState(null);

//   const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

//   const navigate = useNavigate();

//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey:
//       process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY", // 여기에 실제 API 키를 넣어 테스트해 보세요.
//   });

//   useEffect(() => {
//     if (selectedMarker) {
//       // Place 데이터를 가져옵니다 (Work 및 Images 포함)
//       fetch(`${apiUrl}/api/place/${selectedMarker.place_id}`)
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.Work) {
//             setWork(data.Work); // Work 데이터를 상태로 저장
//           }
//           if (data.Images && Array.isArray(data.Images)) {
//             setImages(data.Images); // Images 데이터를 상태로 저장

//             const aniPlace = data.Images.filter((img) =>
//               img.image_url.includes("aniPlace")
//             );
//             const otherImages = data.Images.filter(
//               (img) =>
//                 img.image_url.includes("realPlace") ||
//                 img.image_url.includes("userUpload")
//             );

//             setAniPlaceImages(aniPlace);
//             setOtherImages(otherImages);
//           } else {
//             console.error("Unexpected image data structure:", data);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching place data:", error);
//           setError("데이터를 가져오는 데 실패했습니다.");
//         });
//     }
//   }, [selectedMarker]);

//   const handleImageError = (index, imageType) => {
//     if (imageType === "aniPlace") {
//       setAniPlaceImages((prevImages) =>
//         prevImages.filter((_, i) => i !== index)
//       );
//     } else {
//       setOtherImages((prevImages) => prevImages.filter((_, i) => i !== index));
//     }
//   };

//   const handleMapClick = () => {
//     if (selectedMarker) {
//       navigate(`/multi-marker/${selectedMarker.place_id}`);
//     }
//   };

//   const handleShareClick = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: selectedMarker.place_name,
//           text: `Check out this place: ${selectedMarker.place_name}`,
//           url: window.location.href,
//         });
//       } catch (error) {
//         console.error("Error sharing:", error);
//       }
//     } else {
//       console.log("Share not supported on this browser");
//     }
//   };

//   const formatOpeningHours = (hours) => {
//     if (hours === "nan") return "정보 없음";

//     return hours.split("\n").map((line, index) => (
//       <React.Fragment key={index}>
//         {line}
//         <br />
//       </React.Fragment>
//     ));
//   };

//   if (loadError) {
//     return <div>맵을 불러오는 중 에러가 발생했습니다.</div>;
//   }

//   if (!isLoaded) {
//     return <Spin tip="로딩 중..." className="loading-spinner" />;
//   }

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

//   if (!selectedMarker) return null;

//   return (
//     <div className="info-panel-container">
//       <div className="info-panel-header">
//         <h2>{selectedMarker.place_name}</h2>
//         <Button onClick={handleShareClick}>공유</Button>
//       </div>

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

//       <div className="map-container">
//         <GoogleMap
//           mapContainerStyle={mapContainerStyle}
//           center={{
//             lat: parseFloat(selectedMarker.latitude),
//             lng: parseFloat(selectedMarker.longitude),
//           }}
//           zoom={15}
//           onClick={handleMapClick}
//         >
//           <Marker
//             position={{
//               lat: parseFloat(selectedMarker.latitude),
//               lng: parseFloat(selectedMarker.longitude),
//             }}
//           />
//         </GoogleMap>
//       </div>

//       <div className="info-panel-content">
//         {/* ... 나머지 내용은 동일 ... */}
//         <List
//           itemLayout="horizontal"
//           dataSource={[0]} // 데이터를 직접 렌더링하므로 placeholder로 0 사용
//           renderItem={() => (
//             <>
//               {work && (
//                 <>
//                   {/* 작품 이름 */}
//                   <List.Item>
//                     <List.Item.Meta
//                       title={<strong>작품 이름</strong>}
//                       description={work.work_name}
//                     />
//                   </List.Item>
//                   {/* 시즌과 에피소드 */}
//                   <Row gutter={16}>
//                     <Col span={12}>
//                       <List.Item>
//                         <List.Item.Meta
//                           title={<strong>시즌</strong>}
//                           description={work.work_season}
//                         />
//                       </List.Item>
//                     </Col>
//                     <Col span={12}>
//                       <List.Item>
//                         <List.Item.Meta
//                           title={<strong>에피소드</strong>}
//                           description={work.work_ep}
//                         />
//                       </List.Item>
//                     </Col>
//                   </Row>
//                   <Divider style={{ margin: "12px 0" }} />
//                 </>
//               )}
//               {/* 설명 */}
//               <List.Item>
//                 <List.Item.Meta
//                   title={<strong>설명</strong>}
//                   description={selectedMarker.description}
//                 />
//               </List.Item>
//               {/* 지역, 도시, 구역 */}
//               <Row gutter={16}>
//                 <Col span={8}>
//                   <List.Item>
//                     <List.Item.Meta
//                       title={<strong>지역</strong>}
//                       description={selectedMarker.address_region}
//                     />
//                   </List.Item>
//                 </Col>
//                 <Col span={8}>
//                   <List.Item>
//                     <List.Item.Meta
//                       title={<strong>도시</strong>}
//                       description={selectedMarker.address_city}
//                     />
//                   </List.Item>
//                 </Col>
//                 <Col span={8}>
//                   <List.Item>
//                     <List.Item.Meta
//                       title={<strong>구역</strong>}
//                       description={selectedMarker.address_district}
//                     />
//                   </List.Item>
//                 </Col>
//               </Row>
//               <Divider style={{ margin: "12px 0" }} />
//               {/* 상세 주소 */}
//               <List.Item>
//                 <List.Item.Meta
//                   title={<strong>상세 주소</strong>}
//                   description={selectedMarker.detailed_address}
//                 />
//               </List.Item>
//               {/* 최근 촬영일 */}
//               <List.Item>
//                 <List.Item.Meta
//                   title={<strong>최근 촬영일</strong>}
//                   description={selectedMarker.latestshot_date}
//                 />
//               </List.Item>
//             </>
//           )}
//         />

//         {/* 영업시간 */}
//         <Collapse accordion className="opening-hours-collapse">
//           <Panel header="영업시간" key="1">
//             <p>{formatOpeningHours(selectedMarker.opening_hours)}</p>
//           </Panel>
//         </Collapse>

//         <Link to={`/single-marker/${selectedMarker.place_id}`}>
//           <Button className="info-panel-button">로케이션 상세보기</Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default InfoPanel;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
import "../css/InfoPanel.css";
import BookmarkButton from "./BookmarkButton";

const { Panel } = Collapse;
const { Title } = Typography;

// 구글 맵의 컨테이너 스타일을 정의
const mapContainerStyle = {
  width: "100%",
  height: "40vh",
};

const InfoPanel = ({ selectedMarker }) => {
  const [work, setWork] = useState(null);
  const [images, setImages] = useState([]);
  const [aniPlaceImages, setAniPlaceImages] = useState([]);
  const [otherImages, setOtherImages] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const navigate = useNavigate();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey:
      process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY",
  });

  useEffect(() => {
    if (selectedMarker) {
      fetch(`${apiUrl}/api/place/${selectedMarker.place_id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.Work) {
            setWork(data.Work);
          }
          if (data.Images && Array.isArray(data.Images)) {
            setImages(data.Images);

            const aniPlace = data.Images.filter((img) =>
              img.image_url.includes("aniPlace")
            );
            const otherImages = data.Images.filter(
              (img) =>
                img.image_url.includes("realPlace") ||
                img.image_url.includes("userUpload")
            );

            setAniPlaceImages(aniPlace);
            setOtherImages(otherImages);
          } else {
            console.error("Unexpected image data structure:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching place data:", error);
          setError("데이터를 가져오는 데 실패했습니다.");
        });
    }
  }, [selectedMarker]);

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
    if (selectedMarker) {
      navigate(`/multi-marker/${selectedMarker.place_id}`);
    }
  };

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedMarker.place_name,
          text: `Check out this place: ${selectedMarker.place_name}`,
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

  if (loadError) {
    return <div>맵을 불러오는 중 에러가 발생했습니다.</div>;
  }

  if (!isLoaded) {
    return <Spin tip="로딩 중..." className="loading-spinner" />;
  }

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

  if (!selectedMarker) return null;

  return (
    <div className="info-panel-container">
      <div className="info-panel-header">
        <h2>{selectedMarker.place_name}</h2>
      </div>
      <Divider className="info-divider" />
      <div className="info-panel-icon-Section">
        <Link to={`/single-marker/${selectedMarker.place_id}`}>
          <Button className="info-panel-button">로케이션 상세보기</Button>
        </Link>
        <BookmarkButton placeId={selectedMarker.place_id} />
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
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{
            lat: parseFloat(selectedMarker.latitude),
            lng: parseFloat(selectedMarker.longitude),
          }}
          zoom={15}
          onClick={handleMapClick}
        >
          <Marker
            position={{
              lat: parseFloat(selectedMarker.latitude),
              lng: parseFloat(selectedMarker.longitude),
            }}
          />
        </GoogleMap>
      </div>

      <div className="info-panel-content">
        <List
          itemLayout="horizontal"
          dataSource={[0]}
          renderItem={() => (
            <>
              {work && (
                <>
                  {" "}
                  <Divider className="info-divider" />
                  {/* 여기서부터 형식이 같음 */}
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
                  <Row gutter={0}>
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
                          title={
                            <strong className="info-title">에피소드</strong>
                          }
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
                      {selectedMarker.description}
                    </span>
                  }
                />
              </List.Item>
              <Row gutter={0}>
                <Col span={8}>
                  <List.Item className="info-section">
                    <List.Item.Meta
                      title={<strong className="info-title">지역</strong>}
                      description={
                        <span className="info-description">
                          {selectedMarker.address_region}
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
                          {selectedMarker.address_city}
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
                          {selectedMarker.address_district}
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
                      {selectedMarker.detailed_address}
                    </span>
                  }
                />
              </List.Item>
              {/*<List.Item className="info-section">*/}
              {/*  <List.Item.Meta*/}
              {/*    title={<strong className="info-title">최근 촬영일</strong>}*/}
              {/*    description={*/}
              {/*      <span className="info-description">*/}
              {/*        {selectedMarker.latestshot_date}*/}
              {/*      </span>*/}
              {/*    }*/}
              {/*  />*/}
              {/*</List.Item>*/}
            </>
          )}
        />
        {/*<Divider className="info-divider" />*/}
        {/*<Collapse accordion className="opening-hours-collapse">*/}
        {/*  <Panel header="영업시간" key="1">*/}
        {/*    <p>{formatOpeningHours(selectedMarker.opening_hours)}</p>*/}
        {/*  </Panel>*/}
        {/*</Collapse>*/}
      </div>
    </div>
  );
};

export default InfoPanel;
