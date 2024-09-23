

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
