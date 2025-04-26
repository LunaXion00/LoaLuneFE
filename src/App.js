import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LeaderboardPage from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/auth/login" element={<LoginPage />} />  
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/:gameType/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
export default App;