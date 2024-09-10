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
//         const response = await axios.get(`http://localhost:5000/api/work/${workKey}/${seasonKey}`);
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
//                         src={`http://localhost:5000${img.image_url}`}
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


import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';  // useNavigate 추가
import axios from 'axios';
import { Card, Typography, Spin, Alert, Image, List, Space, Divider, Button } from 'antd';

const { Title, Paragraph, Text } = Typography;

function SeasonDetailPage() {
  const { workKey, seasonKey } = useParams();
  const [seasonDetails, setSeasonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // 페이지 리다이렉트를 위한 훅

  const goBack = () => {
    navigate(-1);  // 이전 페이지로 이동
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/work/${workKey}/${seasonKey}`);
        setSeasonDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 404) {
          navigate('/notfound', { replace: true });  // 404 에러 시 히스토리 덮어쓰기
        } else {
          setError('데이터를 가져오는 데 실패했습니다.');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [workKey, seasonKey, navigate]);

  if (loading) return <Spin tip="로딩 중..." />;
  if (error) return <Alert message="에러" description={error} type="error" showIcon />;
  if (!seasonDetails) return <Alert message="시즌 정보를 찾을 수 없습니다." type="warning" showIcon />;

  const { seasonDetails: details, places } = seasonDetails;

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <button onClick={goBack} style={{marginBottom: '10px', padding: '8px 16px', cursor: 'pointer'}}>
        뒤로 가기
      </button>
      <Card style={{maxWidth: '800px', margin: '0 auto'}}>
        <Title level={2}>{details.work_name} - {details.work_season}기</Title>
        <Paragraph>{details.description}</Paragraph>
        {details.poster && (
          <Image
            src={details.poster}
            alt={details.work_name}
            style={{ maxWidth: '300px' }}
          />
        )}
        <Paragraph>
          <Text strong>방영 기간:</Text> {details.start_date} ~ {details.end_date}
        </Paragraph>
        <Paragraph>
          <Text strong>장르:</Text> {details.genre}
        </Paragraph>
        <Paragraph>
          <Text strong>감독:</Text> {details.director}
        </Paragraph>
        <Paragraph>
          <Text strong>각본:</Text> {details.series_writer}
        </Paragraph>
      </Card>

      <Card style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Title level={3}>관련 장소</Title>
        <List
          itemLayout="vertical"
          dataSource={places}
          renderItem={place => (
            <List.Item key={place.place_id}>
              <Title level={4}>{place.place_name}</Title>
              <Divider />
              <Link to={`/single-marker/${place.place_id}`}>
                {place.place_name} 상세보기
              </Link>
              {place.Images && place.Images.length > 0 && (
                <Space direction="vertical">
                  <Title level={5}>이미지</Title>
                  <Space>
                    {place.Images.map((img, index) => (
                      <Image
                        key={index}
                        width={200}
                        src={`http://localhost:5000${img.image_url}`}
                        alt={`장소 이미지 ${index + 1}`}
                      />
                    ))}
                  </Space>
                </Space>
              )}
            </List.Item>
          )}
        />
      </Card>
    </Space>
  );
}

export default SeasonDetailPage;
