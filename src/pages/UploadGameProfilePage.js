import React, { useState } from "react";
import { Form, Input, Select, Button, Alert, Typography, message } from "antd";
import API from "../services/Api";
const { Title } = Typography;
const { Option } = Select;

const UploadGameProfilePage = () => {
  const [responseMsg, setResponseMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values) => {
    const token = localStorage.getItem("adminToken");
    setIsSubmitting(true);
    try {
      const response = await API.post("/admin/streamers/upload", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setResponseMsg(response.data);
      setErrorMsg(null);
      message.success("스트리머 등록 성공!");
    } catch (err) {
      const msg = err.response?.data || "등록 중 오류가 발생했습니다.";
      setErrorMsg(msg);
      setResponseMsg(null);
    } finally{
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 24 }}>
      <Title level={3}>스트리머 등록</Title>

      {responseMsg && (
        <Alert
          message="등록 완료"
          description={responseMsg}
          type="success"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      {errorMsg && (
        <Alert
          message="등록 실패"
          description={errorMsg}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="mainCharacter"
          label="메인 캐릭터명"
          rules={[{ required: true, message: "캐릭터명을 입력하세요" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="channelId"
          label="채널 ID"
          rules={[{ required: true, message: "채널 ID를 입력하세요" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gameType"
          label="게임 종류"
          rules={[{ required: true, message: "게임을 선택하세요" }]}
        >
          <Select placeholder="게임을 선택하세요">
            <Option value="vlrt">발로란트</Option>
            <Option value="lostark">로스트아크</Option>
            {/* 필요한 경우 게임 추가 */}
          </Select>
        </Form.Item>

        <Form.Item name="gameServer" label="서버명 (선택)">
          <Input placeholder="해당하는 경우 입력" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isSubmitting} disabled={isSubmitting}>
            등록
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadGameProfilePage;