import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Rate, message } from 'antd';
import '../css/ReviewForm.css';


const apiUrl = process.env.REACT_APP_API_URL;

const ReviewForm = ({ placeId, user, onReviewSubmitted }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    if (!user) {
      message.error('로그인이 필요합니다.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(`${apiUrl}/api/reviews`, {
        place_id: placeId,
        rating: Number(values.rating), // 확실하게 숫자로 변환
        comment: values.comment,
      }, { withCredentials: true });

      if (response.status === 201 || response.status === 200) {
        message.success('리뷰가 성공적으로 제출되었습니다.');
        form.resetFields();

        const newReview = {
          ...response.data,
          rating: Number(values.rating), // 확실하게 숫자로 변환
          comment: values.comment,
          User: { user_name: user.user_name }
        };

        onReviewSubmitted(newReview);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('리뷰 제출 실패:', error.response || error);
      message.error('리뷰 제출에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item name="rating" label="평점" rules={[{ required: true, message: '평점을 선택해주세요' }]}>
        <Rate />
      </Form.Item>
      <Form.Item name="comment" label="리뷰" rules={[{ required: true, message: '리뷰 내용을 입력해주세요' }]}>
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={submitting}>
          리뷰 제출
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReviewForm;