import React, { useEffect, useState } from "react";
import { fetchLeaderboard } from "../services/leaderboard";
import { Table, Tag, Spin, Alert, Avatar, Button } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined, MinusOutlined, CrownOutlined, LinkOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { VlrtTierBadge } from "../components/VlrtTierBadge";
import { fetchStreamerProfile } from "../services/StreamerProfile";
import StreamerModal from "../components/StreamerModal";

const VlrtLeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStreamer, setSelectedStreamer] = useState(null);

  const {gameType} = useParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchLeaderboard(gameType);
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
      const data = await fetchStreamerProfile(streamerName, 'vlrt');
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
          onClick={() => handleStreamerClick(text)}
        >
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
      title: "계정",
      dataIndex: "characterName",
      key: "characterName",
      render: (text, record) => {
        const encodedText = encodeURIComponent(text);
        return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {text}
          <Button
            type="link"
            href={`https://tracker.gg/valorant/profile/riot/${encodedText}/overview`}
            target="_blank"
            icon={<LinkOutlined />} // 아이콘 추가
            style={{ color: "#1890ff" }}
          >
        </Button>
        </div>
        );
      }
    },
    {
      title: "티어",
      dataIndex: "rankingDetails",
      key: "tier",
      align: "left",
      render: (rankingDetails, record) => {
        const parsedDetails = rankingDetails ? JSON.parse(rankingDetails) : {};
        const tier = parsedDetails?.tier;
        const rr = parsedDetails?.rr;
        const rrChange = record.rrChange;
        return (
          <div style={{ display: "flex", alignItems: "left", gap: 8, justifyContent: "left" }}>
            <VlrtTierBadge 
          tier={tier}
          rr={rr}
          style={{ 
            marginRight: 8,
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
          }}
        />
            {rrChange !== 0 && (
              <div
                style={{
                  backgroundColor: rrChange > 0 ? "#e6ffed" : "#fff1f0",
                  color: rrChange > 0 ? "green" : "red",
                  fontWeight: "bold",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  minWidth: "80px",
                }}
              >
                {rrChange > 0 ? `+${rrChange} RR` :`${rrChange} RR`}
              </div>
            )}
          </div>
        );
      }
    },
  ];

  if (isLoading) return <Spin tip="랭킹을 불러오는 중..." style={{ display: "block", textAlign: "center", padding: "20px" }} />;
  if (error) return <Alert message="데이터를 불러오는 중 오류 발생" description={error} type="error" showIcon />;

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#722ed1", display: "flex", alignItems: "center", gap: "8px" }}>
        <CrownOutlined /> 발로란트 스트리머 랭킹
      </h1>
      <Table
        dataSource={leaderboard}
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

export default VlrtLeaderboardPage;
