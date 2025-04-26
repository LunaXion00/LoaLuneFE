import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Spin , Button, Menu} from 'antd';
import UploadGameProfilePage from './UploadGameProfilePage';
import StreamerTagManager from '../components/StreamerTagManager';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(null); // null: 체크중, true/false: 결과
  const [showAlert, setShowAlert] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const menuItems = [
    {
      key: 'upload',
      label: '스트리머 등록',
    },
    {
      key: 'tags',
      label: '스트리머 태그 수정',
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setAuthorized(false);
      setShowAlert(true);
      setTimeout(() => navigate('/auth/login'), 2000);
    } else {
      setAuthorized(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/auth/login');
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'upload':
        return <UploadGameProfilePage />;
      case 'tags':
        return <StreamerTagManager />;
      default:
        return <p>기능을 선택해주세요.</p>;
    }
  };


  if (authorized === null) return <Spin tip="접근 권한 확인 중..."><div style={{ marginTop: '100px', display: 'block', textAlign: 'center'}}/> </Spin>;

  if (!authorized && showAlert) {
    return (
      <div style={{ maxWidth: 400, margin: '100px auto' }}>
        <Alert
          message="접근 권한 없음"
          description="이 페이지에 접근할 수 없습니다. 로그인 페이지로 이동합니다."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div style={{ padding: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
      <h2>Admin Dashboard</h2>
            <Button
                danger
                type="primary"
                onClick={handleLogout}
            >
                로그아웃
            </Button>
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={[selectedMenu]}
          onClick={(e) => setSelectedMenu(e.key)}
          items={menuItems}
          style={{ marginBottom: 24 }}
        >
        </Menu>
        <div style={{ maxWidth: 800, margin: 'auto' }}>
          {renderContent()}
        </div>
    </div>
  );
};

export default AdminDashboard;