import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import axios from 'axios';
import { Card, Image, Spin, Alert, Typography, Space, Button, Row, Col } from 'antd'; // Ant Design 컴포넌트 사용

const { Title } = Typography;

function DistrictDetailPage() {
  const { regionKey, cityKey, districtKey } = useParams();  // URL에서 파라미터 추출
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // useNavigate 훅 사용

  // 뒤로 가기 함수
  const goBack = () => {
    navigate(`/regions/${regionKey}/${cityKey}`);  // 뒤로가기 경로
  };

  useEffect(() => {
    axios.get(`http://3.35.55.228:5000/api/regions/${regionKey}/${cityKey}/${districtKey}`)  // 해당 구역의 API 요청
      .then(response => {
        setPlaces(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        setError('데이터를 가져오는 데 실패했습니다.');
        setLoading(false);
      });
  }, [regionKey, cityKey, districtKey]);

  if (loading) return <Spin tip="로딩 중..." />;
  if (error) return <Alert message="에러" description={error} type="error" showIcon />;
  if (places.length === 0) return <Alert message="해당 구역에 장소가 없습니다." type="warning" showIcon />;

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* 뒤로 가기 버튼 */}
      <Button onClick={goBack} type="default" style={{ marginBottom: '20px' }}>
        뒤로 가기
      </Button>

      {places.length > 0 && (
        <Card style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Title level={3}>{places[0].address_district}의 장소 이미지</Title>  {/* 첫 장소의 address_district를 제목에 사용 */}
          <Space direction="vertical" size="large">
            {places.map((place, index) => (
              <div key={index}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Title level={4}>{place.place_name}</Title>
                  </Col>
                  <Col>
                    <Link to={`/single-marker/${place.place_id}`}>
                      <Button type="primary">상세보기</Button>
                    </Link>
                  </Col>
                </Row>
                <Space>
                  {place.Images && place.Images.length > 0 ? (
                    place.Images.filter(img => img.image_url.includes('realPlace'))  // 'realPlace' 이미지 필터링
                      .map((img, imgIndex) => (
                        <Image
                          key={imgIndex}
                          width={200}
                          src={`http://3.35.55.228:5000${img.image_url}`}  // 서버 주소와 경로를 결합
                          alt={`장소 이미지 ${imgIndex + 1}`}
                        />
                      ))
                  ) : (
                    <Alert message="realPlace 이미지가 없습니다." type="info" />
                  )}
                </Space>
              </div>
            ))}
          </Space>
        </Card>
      )}
    </Space>
  );
}

export default DistrictDetailPage;
