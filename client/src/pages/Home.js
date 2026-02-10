import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home({ user }) {
  const features = [
    {
      icon: '🎯',
      title: 'Career Guidance',
      description: 'Personalized job role recommendations based on your skills and interests'
    },
    {
      icon: '📚',
      title: 'Higher Education',
      description: 'Explore MCA, M.Tech, and other advanced degree options'
    },
    {
      icon: '🏆',
      title: 'Exam Preparation',
      description: 'Complete information about GATE, NIMCET, CUET and other competitive exams'
    },
    {
      icon: '📊',
      title: 'Skill Gap Analysis',
      description: 'Identify missing skills and get personalized improvement recommendations'
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Map Your Skills. <span className="highlight">Plan Your Future.</span>
            </h1>
            <p className="hero-description">
              Your comprehensive career advisor for CS/IT students. Get personalized recommendations
              for job roles, higher education, entrance exams, and skill development.
            </p>
            <div className="hero-buttons">
              {user ? (
                <Link to="/dashboard" className="btn btn-primary">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary">
                    Get Started
                  </Link>
                  <Link to="/login" className="btn btn-outline">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hero-image">
            <div className="illustration">
              <span className="illustration-text">🚀</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section section-light">
        <div className="container">
          <h2 className="text-center mb-30">Why Skill2Success?</h2>
          <div className="grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <h3>50+</h3>
              <p>Career Paths</p>
            </div>
            <div className="stat">
              <h3>100+</h3>
              <p>Job Roles</p>
            </div>
            <div className="stat">
              <h3>20+</h3>
              <p>Entrance Exams</p>
            </div>
            <div className="stat">
              <h3>1000+</h3>
              <p>Students Guided</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-light cta-section">
        <div className="container text-center">
          <h2>Ready to Plan Your Career?</h2>
          <p>Start your journey with Skill2Success today and get personalized career guidance</p>
          {!user && (
            <Link to="/register" className="btn btn-primary mt-20">
              Sign Up Now - It's Free
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;
