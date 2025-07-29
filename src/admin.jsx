import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './pages/AdminPage';
import Spinner from './components/Spinner';
import './App.css';

// This is the entry point for the admin section
// It wraps the AdminPage in the AuthProvider and ProtectedRoute
const AdminEntryPoint = () => {
    const { loading } = useAuth();

    if (loading) {
        return <Spinner />;
    }

    return (
        <ProtectedRoute>
            <AdminPage />
        </ProtectedRoute>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <Router>
                <AdminEntryPoint />
            </Router>
        </AuthProvider>
    </React.StrictMode>
);
