import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LeaderboardPage from './pages/LeaderboardPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/:gameType/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
export default App;