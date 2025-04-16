import React from 'react';
import { Modal, Avatar, Descriptions, Tag } from 'antd';
import VlrtProfileDetails from './details/VlrtProfileDetails';
import LostarkProfileDetails from './details/LostarkProfileDetails';

const StreamerModal = ({ visible, data, onClose, gameType}) => {
  if (!data) return null;

  const renderGameDetails = () => {
    switch (gameType) {
      case 'vlrt':
        return <VlrtProfileDetails characters={data.characters} />;
      case 'lostark':
        return <LostarkProfileDetails characters={data.characters} />;
      default:
        return <p>지원하지 않는 게임입니다.</p>;
    }
  };
  return (
    <Modal
      title={
        <div className="flex items-center gap-4">
          <Avatar src={data.channelImageUrl} size={64} />
          <h2 className="text-xl font-bold">{data.streamerName}</h2>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label="채널 ID">{data.channelId}</Descriptions.Item>
        <Descriptions.Item label="메인 캐릭터">{data.mainCharacter}</Descriptions.Item>
        <Descriptions.Item label="게임 계정" span={2}>
          {renderGameDetails()}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default StreamerModal;