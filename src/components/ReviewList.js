
import React, { useState } from 'react';
import { List, Rate, Button, Typography } from 'antd';
import moment from 'moment';

const { Text } = Typography;

const ReviewList = ({ reviews = [], loadMore, hasMore }) => {
  const [displayCount, setDisplayCount] = useState(5);

  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 5);
    if (loadMore) {
      loadMore();
    }
  };

  const displayedReviews = reviews.slice(0, displayCount);

  return (
    <div>
      <h2>로케이션 리뷰 ({reviews.length})</h2>
      <List
        itemLayout="vertical"
        dataSource={displayedReviews}
        renderItem={(review) => (
          <List.Item key={review.review_id}>
            <Text strong>{review.User?.user_name || 'Anonymous'}</Text>
            <br />
            <Text type="secondary">
              {moment(review.created_at).format('YYYY-MM-DD HH:mm')}
            </Text>
            <p>{review.comment}</p>
            <Rate disabled value={review.rating} />
          </List.Item>
        )}
      />
      {(reviews.length > displayCount || hasMore) && (
        <Button onClick={handleLoadMore} style={{ width: '100%', marginTop: '20px' }}>
          더보기
        </Button>
      )}
    </div>
  );
};

export default ReviewList;