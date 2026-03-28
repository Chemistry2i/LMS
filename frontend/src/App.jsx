import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Pages (will be created)
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import Dashboard from './pages/Dashboard';
import LibrarianDashboard from './pages/LibrarianDashboard';
import BrowseBooks from './pages/BrowseBooks';
import MyLibrary from './pages/MyLibrary';
import ManageBooks from './pages/ManageBooks';

// Components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/librarian" element={<ProtectedRoute><LibrarianDashboard /></ProtectedRoute>} />
            <Route path="/books" element={<ProtectedRoute><BrowseBooks /></ProtectedRoute>} />
            <Route path="/my-library" element={<ProtectedRoute><MyLibrary /></ProtectedRoute>} />
            
            {/* Librarian Only Routes */}
            <Route path="/manage-books" element={<ProtectedRoute><ManageBooks /></ProtectedRoute>} />
            <Route path="/manage-users" element={<ProtectedRoute><div className="p-8">Member Directory (Coming Soon)</div></ProtectedRoute>} />
            <Route path="/manage-categories" element={<ProtectedRoute><div className="p-8">Category Manager (Coming Soon)</div></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><div className="p-8">Institutional Reports (Coming Soon)</div></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><div className="p-8">Transaction History (Coming Soon)</div></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><div className="p-8">Account Settings (Coming Soon)</div></ProtectedRoute>} />

            {/* 404 Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
