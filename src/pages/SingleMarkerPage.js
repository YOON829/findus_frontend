import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SingleMarkerMap from "../components/SingleMarkerMap";
import "../css/SingleMarker.css";

const apiUrl = process.env.REACT_APP_API_URL;

function SingleMarkerPage() {
  const { id } = useParams(); // URL 파라미터에서 id를 가져옴
  const [markerData, setMarkerData] = useState(null);

  useEffect(() => {
    const fetchMarkerData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/place/${id}`);
        setMarkerData(response.data);
      } catch (error) {
        console.error("Error fetching marker data:", error);
      }
    };

    fetchMarkerData();
  }, [id]);

  return (
    <div>
      <h2 className="SMP-Placename">
        {markerData ? `${markerData.place_name}` : "로딩중..."}
        <hr className="SMP-custom-divider" />
      </h2>
      <SingleMarkerMap markerId={id} /> {/* 가져온 id를 전달 */}
    </div>
  );
}

export default SingleMarkerPage;
