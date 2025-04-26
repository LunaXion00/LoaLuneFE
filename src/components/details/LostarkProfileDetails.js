import React from 'react';
import { Tag } from 'antd';
const getClassImage = (className) => {
    try {
      // 클래스 이미지 경로
      return `/images/lostark/${className}.png`;
    } catch (error) {
      // 이미지가 없으면 기본 이미지 반환
      return `/images/lostark/default.png`;
    }
  };
const LostarkProfileDetails = ({ characters }) => {
    return (
      <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', // 한 줄에 2개씩 고정
        gap: '16px', // 아이템 간 간격
        width: '100%', // 전체 너비 사용
      }}
    >
        {characters.map((char, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxSizing: 'border-box',
              backgroundColor: '#fff',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* 캐릭터 이미지 */}
            <img
              src={char.CharacterImage || getClassImage(char.CharacterClassName)}
              alt={char.CharacterClassName}
              style={{
                width: '96px',
                height: '96px',
                objectFit: 'cover',
                borderRadius: '50%',
                border: '1px solid #ccc',
                marginRight: '16px',
              }}
            />
  
            {/* 캐릭터 정보 */}
            <div style={{ flex: 1 }}>
              {/* 캐릭터 이름 */}
              <div style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '8px' }}>
                {char.CharacterName}
              </div>
  
              {/* 캐릭터 클래스 */}
              <Tag color="purple" style={{ fontSize: '0.875rem', marginBottom: '8px' }}>
                {char.CharacterClassName}
              </Tag>
  
              {/* 서버 정보 */}
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '8px' }}>
                서버: {char.ServerName}
              </div>
  
              {/* 아이템 레벨 */}
              <div style={{ fontSize: '0.875rem', color: '#4f46e5', fontWeight: 'bold' }}>
                {char.ItemMaxLevel?.toFixed(2)} 레벨
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default LostarkProfileDetails;