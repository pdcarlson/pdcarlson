import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { trackEvent } from './lib/analytics';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  const location = useLocation();

  // This effect runs every time the page URL changes
  useEffect(() => {
    // We track the pageview, sending the event type and the current path
    trackEvent('pageview', location.pathname);
  }, [location]); // The dependency array ensures it runs on location change

  return (
    <Router>
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