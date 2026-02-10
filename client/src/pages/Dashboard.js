import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ user }) {
  const cards = [
    {
      icon: '👤',
      title: 'My Profile',
      description: 'View your complete profile with all skills, interests, and recommendations',
      link: '/profile',
      color: '#d9a5d6'
    },
    {
      icon: '📋',
      title: 'My Skills',
      description: 'Add and manage your programming skills, tools, and competencies',
      link: '/skills',
      color: '#6366f1'
    },
    {
      icon: '🎯',
      title: 'Career Recommendations',
      description: 'Get personalized job roles and career path recommendations',
      link: '/recommendations',
      color: '#ec4899'
    },
    {
      icon: '🏆',
      title: 'Entrance Exams',
      description: 'Explore competitive exams and entrance requirements',
      link: '/exams',
      color: '#10b981'
    }
  ];

  return (
    <main className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome, {user.fullName}!</h1>
          <p>Your personalized career planning dashboard</p>
        </div>

        <div className="user-profile-summary">
          <div className="profile-card">
            <h3>Your Profile</h3>
            <div className="profile-info">
              <p><strong>Degree:</strong> {user.degree}</p>
              <p><strong>Semester:</strong> {user.semester}</p>
              <p><strong>CGPA:</strong> {user.cgpa}</p>
            </div>
          </div>
        </div>

        <h2 className="section-title">Get Started</h2>
        <div className="dashboard-grid">
          {cards.map((card, index) => (
            <Link key={index} to={card.link} className="dashboard-card">
              <div className="card-icon" style={{ color: card.color }}>
                {card.icon}
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span className="card-arrow">→</span>
            </Link>
          ))}
        </div>

        <div className="info-section">
          <div className="info-box">
            <h3>How Skill2Success Works</h3>
            <ol className="steps">
              <li>
                <span className="step-number">1</span>
                <div>
                  <strong>Add Your Skills</strong>
                  <p>Enter your programming languages, tools, frameworks, and soft skills</p>
                </div>
              </li>
              <li>
                <span className="step-number">2</span>
                <div>
                  <strong>Get Recommendations</strong>
                  <p>Receive personalized job roles and higher education suggestions</p>
                </div>
              </li>
              <li>
                <span className="step-number">3</span>
                <div>
                  <strong>Skill Gap Analysis</strong>
                  <p>Identify missing skills with a detailed suitability score</p>
                </div>
              </li>
              <li>
                <span className="step-number">4</span>
                <div>
                  <strong>Exam Preparation</strong>
                  <p>Get information about entrance exams with dates and resources</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
