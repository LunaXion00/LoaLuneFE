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
          <h2 className="text-xl font-bold flex items-center space-x-1">
            <img
            src="/images/chzzk/chzzk_icon_1.png"
            alt="채널 아이콘"
            className="inline-block align-middle"
            style={{ height: '1em', width: 'auto' , transform: 'translateY(3px)'}}
          />
            {data.streamerName}
          <a
            href={`https://chzzk.naver.com/${data.channelId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
          </h2>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label="태그">
          {data.tags && data.tags.length > 0 ? (
            data.tags.map((tag, index) => (
              <Tag key={index} color="blue">
                {tag.tagName}
              </Tag>
            ))
          ) : (
            <span>태그 없음</span>
          )}
          </Descriptions.Item>
        <Descriptions.Item label="메인 캐릭터">{data.mainCharacter}</Descriptions.Item>
        <Descriptions.Item label="게임 계정" span={2}>
          {renderGameDetails()}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default StreamerModal;