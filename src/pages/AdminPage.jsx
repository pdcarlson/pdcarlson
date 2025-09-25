// src/pages/adminpage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProjectManager from '../components/admin/ProjectManager';
import SiteContentEditor from '../components/admin/SiteContentEditor';

const AdminPage = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'content'

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("failed to log out:", error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectManager />;
      case 'content':
        return <SiteContentEditor />;
      default:
        return <ProjectManager />;
    }
  };

  return (
    <div className="auth-page" style={{ maxWidth: '1024px' }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
        <h2>Admin Panel</h2>
        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
      </div>

      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Manage Projects
        </button>
        <button 
          className={`admin-tab ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          Edit Site Content
        </button>
      </div>

      <div className="admin-tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminPage;