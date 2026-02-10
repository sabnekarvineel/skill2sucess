import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UserDashboard from './pages/UserDashboard';
import SkillsForm from './pages/SkillsForm';
import Recommendations from './pages/Recommendations';
import DomainSuggestions from './pages/DomainSuggestions';
import Exams from './pages/Exams';
import CareerReport from './pages/CareerReport';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios
        .get('/api/auth/me')
        .then(res => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching user:', err);
          localStorage.removeItem('token');
          setToken(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleLogin = (token, userData) => {
    localStorage.setItem('token', token);
    setToken(token);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
         <Route path="/" element={<Home user={user} />} />
         <Route
           path="/login"
           element={user ? <Navigate to="/profile" /> : <Login onLogin={handleLogin} />}
         />
         <Route
           path="/register"
           element={user ? <Navigate to="/profile" /> : <Register onRegister={handleLogin} />}
         />
         <Route
           path="/dashboard"
           element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
         />
         <Route
           path="/profile"
           element={user ? <UserDashboard /> : <Navigate to="/login" />}
         />
         <Route
           path="/skills"
           element={user ? <SkillsForm user={user} setUser={setUser} /> : <Navigate to="/login" />}
         />
         <Route
           path="/recommendations"
           element={user ? <Recommendations user={user} /> : <Navigate to="/login" />}
         />
         <Route
           path="/domain-suggestions"
           element={user ? <DomainSuggestions /> : <Navigate to="/login" />}
         />
         <Route
            path="/exams"
            element={user ? <Exams user={user} /> : <Navigate to="/login" />}
          />
         <Route
            path="/report"
            element={user ? <CareerReport /> : <Navigate to="/login" />}
          />
         </Routes>
    </Router>
  );
}

export default App;
