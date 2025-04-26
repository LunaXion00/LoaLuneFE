import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert, Typography } from 'antd';
import API from '../services/Api';
const { Title } = Typography;


const LoginPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await API.post('/api/auth/login', values);
      const { token } = response.data;
      localStorage.setItem('adminToken', token); // 토큰 저장
      setError(null);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 24, boxShadow: '0 0 12px rgba(0,0,0,0.1)', borderRadius: 8 }}>
      <Title level={3} style={{ textAlign: 'center' }}>관리자 로그인</Title>

      {error && <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />}

      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ username: '', password: '' }}
      >
        <Form.Item name="username" label="아이디" rules={[{ required: true, message: '아이디를 입력하세요' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="password" label="비밀번호" rules={[{ required: true, message: '비밀번호를 입력하세요' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            로그인
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;