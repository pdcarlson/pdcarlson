import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { trackEvent } from './lib/analytics';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackEvent('pageview', { path: location.pathname });
  }, [location]);

  return null;
};


function App() {
  return (
    <Router>
      <PageTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;