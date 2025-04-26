import React, { useEffect, useState } from "react";
import { fetchLeaderboard } from "../services/leaderboard";
import { Table, Tag, Spin, Alert, Avatar, Button } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined, CrownOutlined, LinkOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { fetchStreamerProfile } from "../services/StreamerProfile";
import StreamerModal from "../components/StreamerModal";
import useTagFilter from "../hooks/useTagFilter";
import TagFilterBar from "../components/TagFilterBar";

const LostarkLeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStreamer, setSelectedStreamer] = useState(null);
  const {
    allTags,
    selectedTags,
    toggleTag,
    filteredData,
  } = useTagFilter(leaderboard);

  const {gameType} = useParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchLeaderboard(gameType);
        console.log(data)
        setLeaderboard(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [gameType]);

  const handleStreamerClick = async (streamerName) => {
      try {
        const data = await fetchStreamerProfile(streamerName, 'lostark');
        setSelectedStreamer(data);
        setModalVisible(true);
      } catch (error) {
        console.error('스트리머 정보 조회 실패:', error);
        // 에러 처리 로직 추가
      }
    };

  const getRankChangeIcon = (change, newStreamer) => {
    if (newStreamer) {
      // NEW 태그를 반환
      return (
        <Tag color="orange" style={{ fontWeight: "bold", fontSize: "13px" }}>
          NEW
        </Tag>
      );
    }
    let color = "#ededed";
    if (change > 0) color = "green";
    if (change < 0) color = "red";

    return (
      <Tag color={color} style={{ display: "flex", alignItems: "left", gap: "4px", fontSize: "13px" }}>
        {change > 0 && <ArrowUpOutlined />}
        {change < 0 && <ArrowDownOutlined />}
        {change !== 0 ? Math.abs(change) : "-"}
      </Tag>
    );
  };
  
  const getClassImage = (className) => {
    try {
      // 클래스 이미지 경로
      return `/images/lostark/${className}.png`;
    } catch (error) {
      // 이미지가 없으면 기본 이미지 반환
      return `/images/lostark/default.png`;
    }
  };
  const columns = [
    {
      title: "순위",
      dataIndex: "rank",
      key: "rank",
      align: "center",
      render: (rank, record) => <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "left" }}>
      <strong style={{ fontSize: "16px" }}>#{rank}</strong>
      {getRankChangeIcon(record.rankChange, record.newStreamer)}
    </div>
    },
    {
      title: "스트리머",
      dataIndex: "streamerName",
      key: "streamerName",
      render: (text, record) => (
        <div 
          style={{ cursor: 'pointer', padding: '8px 0' }}
          onClick={() => handleStreamerClick(text)}>
          <Avatar src={record.streamerImageUrl}
            alt={text} 
            size={40}
            style={{ border: "1px solid #ddd" }} 
            />
          {text}
          <Button
            type="link"
            href={`https://chzzk.naver.com/live/${record.channelId}`}
            target="_blank"
            icon={<LinkOutlined />} // 아이콘 추가
            style={{ color: "#1890ff" }}
          >
        </Button>
        </div>
      ),
    },
    {
      title: "캐릭터명",
      dataIndex: "characterName",
      key: "characterName",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Avatar src={getClassImage(record.characterClassName)}
            alt={text} 
            size={40}
            style={{ border: "1px solid #ddd" }} 
            />
          {text}
          <Button
            type="link"
            href={`https://lostark.game.onstove.com/Profile/Character/${text}`}
            target="_blank"
            icon={<LinkOutlined />} // 아이콘 추가
            style={{ color: "#1890ff" }}
          >
        </Button>
        </div>
      ),
    },
    {
      title: "아이템 레벨",
      dataIndex: "rankingDetails",
      key: "itemLevel",
      align: "left",
      render: (rankingDetails, record) => {
        const parsedDetails = record.rankingDetails ? JSON.parse(record.rankingDetails) : {};
        const itemLevel = parsedDetails?.itemLevel?.toFixed(2) ?? "정보 없음";
        const levelChange = record.itemLevelChange?.toFixed(2);
        return (
          <div style={{ display: "flex", alignItems: "left", gap: 8, justifyContent: "left" }}>
            <div
              style={{
                backgroundColor: "#f0f5ff",
                padding: "6px 12px",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                minWidth: "80px",
              }}
            >
              <strong style={{ fontSize: "14px", color: "#722ed1" }}>{itemLevel}</strong>
            </div>
            {levelChange !== "0.00" && (
              <div
                style={{
                  backgroundColor: levelChange > 0 ? "#e6ffed" : "#fff1f0",
                  color: levelChange > 0 ? "green" : "red",
                  fontWeight: "bold",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  minWidth: "80px",
                }}
              >
                {levelChange > 0 ? `+${levelChange}` : levelChange}
              </div>
            )}
          </div>
        );
      }
    },
  ];

  if (isLoading) return <Spin tip="랭킹을 불러오는 중..."> <div style={{ display: "block", textAlign: "center", padding: "20px" }}/> </Spin>;
  if (error) return <Alert message="데이터를 불러오는 중 오류 발생" description={error} type="error" showIcon />;

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#722ed1", display: "flex", alignItems: "center", gap: "8px" }}>
        <CrownOutlined /> 로스트아크 스트리머 랭킹
      </h1>
      <TagFilterBar
        allTags={allTags}
        selectedTags={selectedTags}
        onToggle={toggleTag}
      />
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="rank"
        pagination={false}
        style={{ marginTop: "20px" }}
      />
      <StreamerModal 
      visible={modalVisible}
      data={selectedStreamer}
      onClose={() => setModalVisible(false)}
      gameType={gameType}
    />
    </div>
  );
};

export default LostarkLeaderboardPage;
