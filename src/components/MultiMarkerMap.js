import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import InfoPanel from "./InfoPanel";
import Footer from "./Footer";
import "../css/InfoPanel.css";

const apiUrl = process.env.REACT_APP_API_URL;

function MultiMarkerMap() {
  const { id } = useParams(); // URL에서 id 파라미터를 가져옴
  const [locations, setLocations] = useState([]); // 모든 위치 정보를 저장
  const [selectedLocation, setSelectedLocation] = useState(null); // 선택된 위치 정보
  const [center, setCenter] = useState({ lat: 35.627, lng: 139.7745 }); // 지도 중심 좌표 (도쿄)
  const [selectedMarkerId, setSelectedMarkerId] = useState(null); // 선택된 마커 ID
  const [panelHeight, setPanelHeight] = useState(8); // 패널의 초기 높이
  const [isDragging, setIsDragging] = useState(false); // 드래그 여부
  const [isContentScrollable, setIsContentScrollable] = useState(true); // 내용이 스크롤 가능한 상태인지
  const contentRef = useRef(null); // 패널 콘텐츠 스크롤 감지용 Ref
  const startY = useRef(0); // 드래그 시작 Y 좌표
  const startHeight = useRef(20); // 드래그 시작 높이
  const mapRef = useRef(null); // 지도 참조

  useEffect(() => {
    // 모든 장소 정보와 해당 장소에 연결된 이미지를 가져오는 API 호출
    axios
      .get(`${apiUrl}/api/place`)
      .then((response) => {
        setLocations(response.data); // 모든 위치 정보 저장
        // URL의 id와 일치하는 장소 찾기
        const foundLocation = response.data.find(
          (loc) => loc.place_id === parseInt(id)
        );
        if (foundLocation) {
          setSelectedLocation(foundLocation); // 선택된 위치 설정
          setCenter({
            lat: parseFloat(foundLocation.latitude),
            lng: parseFloat(foundLocation.longitude),
          }); // 선택된 위치로 지도 중심 설정
          setPanelHeight(40); // 패널의 높이를 40%로 설정
        }
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, [id]); // id가 변경될 때마다 useEffect 실행

  // 마커 클릭 시 패널을 확장하고 위치 정보를 설정하는 함수
  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    setSelectedMarkerId(location.place_id); // 클릭된 마커 ID 저장
    setCenter({
      lat: parseFloat(location.latitude),
      lng: parseFloat(location.longitude),
    });
    setPanelHeight(14); // 패널을 22% 높이로 설정
    if (mapRef.current) {
      // 패널이 22% 올라간 상태에서 마커를 화면 중간(60%)에 위치시키기
      const panOffsetY = window.innerHeight * -0.1; // 화면의 40% 만큼 Y 축 이동
      mapRef.current.panBy(0, -panOffsetY); // 지도의 뷰를 위쪽으로 이동 (마커가 화면 중앙에 오도록)
    }
  };

  // 패널의 높이를 클릭할 때 40% -> 90% -> 40%으로 전환하는 함수
  const handlePanelClick = () => {
    if (panelHeight === 55) {
      setPanelHeight(88); // 40%에서 90%로 확장
    } else if (panelHeight === 88 || panelHeight === 55) {
      setPanelHeight(14); // 90%에서 40% 또는 22%에서 40%로 조정
      if (contentRef.current) {
        contentRef.current.scrollTop = 0; // 패널 내용을 맨 위로 스크롤
      }
    }
  };

  // 드래그 시작 함수
  const handleDragStart = (e) => {
    // 내용이 최상단에 있을 때만 드래그 가능
    if (!isContentScrollable) {
      setIsDragging(true);
      startY.current = e.touches ? e.touches[0].clientY : e.clientY; // 터치 또는 마우스의 Y 좌표
      startHeight.current = panelHeight; // 현재 패널 높이 저장
    }
  };

  // 드래그 중 함수
  const handleDrag = (e) => {
    if (!isDragging) return;

    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = startY.current - currentY;
    const newHeight = Math.min(
      Math.max(startHeight.current + (deltaY / window.innerHeight) * 100, 15),
      90
    ); // 15% ~ 90% 사이로 제한
    setPanelHeight(newHeight); // 패널 높이를 실시간으로 업데이트
  };

  // 드래그 종료 시 패널 높이를 20% 또는 90%로 자동 조정
  const handleDragEnd = () => {
    setIsDragging(false);

    if (panelHeight < 40) {
      setPanelHeight(55); // 40% 미만이면 20%로 조정
    } else {
      setPanelHeight(88); // 40% 이상이면 90%로 확장
    }
  };

  // 패널 내용 스크롤 시 스크롤 위치에 따라 드래그 가능 여부를 설정
  const handleContentScroll = () => {
    const content = contentRef.current;
    // 패널 내용이 최상단까지 스크롤되었을 때만 드래그 가능하도록 설정
    setIsContentScrollable(content.scrollTop > 0);
  };

  // 기본 마커 아이콘 크기 및 클릭 시 크기를 40% 증가
  const getMarkerIcon = (location) => {
    const isSelected = selectedMarkerId === location.place_id;
    const scale = isSelected ? 1.4 : 1; // 선택된 마커는 1.4배로 크기 증가
    return {
      url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // 기본 마커 아이콘
      scaledSize: new window.google.maps.Size(32 * scale, 32 * scale), // 마커 크기 조정
    };
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100vh" }}
          center={center}
          zoom={15}
          onLoad={(map) => (mapRef.current = map)} // 지도가 로드되면 mapRef에 저장
          options={{
            fullscreenControl: false, // 전체 화면 컨트롤 비활성화
            zoomControl: false, // 줌 컨트롤 비활성화
            mapTypeControl: false, // 지도 타입 컨트롤 비활성화
            streetViewControl: false, // 스트리트 뷰 컨트롤 비활성화
            scaleControl: false, // 스케일 컨트롤 비활성화
            rotateControl: false, // 회전 컨트롤 비활성화
            gestureHandling: "greedy",
          }}
        >
          {locations.map((location) => (
            <Marker
              key={location.place_id}
              position={{
                lat: parseFloat(location.latitude),
                lng: parseFloat(location.longitude),
              }}
              icon={getMarkerIcon(location)} // 마커 아이콘 크기 설정
              onClick={() => handleMarkerClick(location)} // 마커 클릭 이벤트
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* 패널 */}
      <div
        className={`panel-container ${isDragging ? "panel-dragging" : ""}`}
        style={{ height: `${panelHeight}%` }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDrag}
        onTouchEnd={handleDragEnd}
      >
        <div className="panel-handle" onClick={handlePanelClick}></div>{" "}
        {/* 패널 핸들 */}
        <div className="panel-header">
          {selectedLocation
            ? selectedLocation.placename
            : "장소를 선택해주세요"}
        </div>
        <div
          className="panel-content"
          ref={contentRef}
          onScroll={handleContentScroll}
          style={{ overflowY: panelHeight === 88 ? "auto" : "hidden" }} // 패널이 90%일 때만 스크롤 가능
        >
          {selectedLocation && <InfoPanel selectedMarker={selectedLocation} />}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MultiMarkerMap;
