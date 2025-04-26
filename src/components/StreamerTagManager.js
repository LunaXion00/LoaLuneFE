import React, { useEffect, useState } from 'react';
import { Select, Tag, Input, Button, message, Typography, Space } from 'antd';
import API from '../services/Api';

const { Title } = Typography;
const { Option } = Select;

const StreamerTagManager = () => {
  const [streamers, setStreamers] = useState([]);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const [tagsByGameType, setTagsByGameType] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [inputGameType, setInputGameType] = useState('');

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchAllStreamers = async () => {
      try {
        const response = await API.get("/streamers/all");
        setStreamers(response.data);
      } catch (error) {
        message.error("스트리머 목록을 불러오지 못했습니다.");
      }
    };
    fetchAllStreamers();
  }, []);

  const handleStreamerSelect = (channelId) => {
    setSelectedChannelId(channelId);
    const selected = streamers.find(s => s.channelId === channelId);

    const grouped = {};
    if (selected && Array.isArray(selected.tags)) {
      selected.tags.forEach(tag => {
        const gameType = tag.gameType || 'common';
        if (!grouped[gameType]) grouped[gameType] = new Set();
        grouped[gameType].add(tag.tagName);
      });
    }
    setTagsByGameType(grouped);
  };

  const handleTagClose = (gameType, tag) => {
    const updated = new Set(tagsByGameType[gameType]);
    updated.delete(tag);
    setTagsByGameType(prev => ({ ...prev, [gameType]: updated }));
  };

  const handleAddTag = () => {
    if (!inputValue || !inputGameType) return;
    const updated = new Set(tagsByGameType[inputGameType] || []);
    updated.add(inputValue);
    setTagsByGameType(prev => ({ ...prev, [inputGameType]: updated }));
    setInputValue('');
  };

  const handleSave = async () => {
    if (!selectedChannelId) return;

    const tagsList = Object.entries(tagsByGameType).flatMap(([gameType, tagSet]) =>
      Array.from(tagSet).map(tag => ({
        tagName: tag,
        gameType: gameType
      }))
    );

    try {
      await API.put(`/admin/${selectedChannelId}/tags`, {
        tags: tagsList
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      message.success("태그가 성공적으로 저장되었습니다!");
    } catch (error) {
      message.error("태그 저장에 실패했습니다.");
    }
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <Title level={4}>스트리머 태그 관리</Title>

      <Select
        placeholder="스트리머 선택"
        onChange={handleStreamerSelect}
        style={{ width: '100%', marginBottom: 24 }}
        showSearch
        optionFilterProp="children"
      >
        {streamers.map((s) => (
          <Option key={s.channelId} value={s.channelId}>
            {s.channelName}
          </Option>
        ))}
      </Select>

      {Object.keys(tagsByGameType).map((gameType) => (
        <div key={gameType} style={{ marginBottom: 16 }}>
          <strong>{gameType.toUpperCase()}</strong>
          <div style={{ margin: '8px 0' }}>
            {[...tagsByGameType[gameType]].map(tag => (
              <Tag
                key={tag}
                closable
                onClose={() => handleTagClose(gameType, tag)}
              >
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      ))}

      <Space style={{ marginBottom: 24 }}>
        <Select
          placeholder="게임 타입"
          value={inputGameType}
          onChange={setInputGameType}
          style={{ width: 120 }}
        >
          <Option value="vlrt">vlrt</Option>
          <Option value="lostark">lostark</Option>
          <Option value="common">common</Option>
        </Select>
        <Input
          placeholder="새 태그"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleAddTag}
          style={{ width: 200 }}
        />
        <Button onClick={handleAddTag}>추가</Button>
      </Space>

      {selectedChannelId && (
        <Button type="primary" onClick={handleSave}>
          태그 저장
        </Button>
      )}
    </div>
  );
};

export default StreamerTagManager;