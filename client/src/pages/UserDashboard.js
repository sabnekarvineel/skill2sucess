import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDashboard.css';

function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
        
        // Fetch recommendations
        const recResponse = await axios.get('/api/recommendations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecommendations(recResponse.data);
      } catch (err) {
        setError('Failed to load user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="loading">Loading your dashboard...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!userData) return <div className="error">No user data found</div>;

  return (
    <div className="user-dashboard">
      <div className="dashboard-container">
        {/* Header Section */}
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Welcome, {userData.fullName}!</h1>
            <p className="header-subtitle">Your Career Development Dashboard</p>
          </div>
        </header>

        {/* Main Grid Layout */}
        <div className="dashboard-grid">
          {/* Left Column */}
          <div className="grid-left">
            {/* Personal Information Card */}
            <div className="card card-personal">
              <div className="card-header">
                <h2 className="card-title">
                  <span className="card-icon">👤</span>
                  Personal Information
                </h2>
              </div>
              <div className="card-content">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Full Name</span>
                    <span className="info-value">{userData.fullName}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{userData.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Degree</span>
                    <span className="info-value">{userData.degree}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Current Semester</span>
                    <span className="info-value">Sem {userData.semester}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">CGPA</span>
                    <span className="info-value">{userData.cgpa}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Member Since</span>
                    <span className="info-value">
                      {new Date(userData.registeredAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Programming Languages Card */}
            <div className="card card-skills">
              <div className="card-header">
                <h2 className="card-title">
                  <span className="card-icon">💻</span>
                  Programming Languages
                </h2>
              </div>
              <div className="card-content">
                {userData.skills?.programming && userData.skills.programming.length > 0 ? (
                  <div className="skills-container">
                    {userData.skills.programming.map((skill, idx) => (
                      <span key={idx} className="skill-tag skill-tag-programming">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="empty-state">No programming languages added yet</p>
                )}
              </div>
            </div>

            {/* Interests Card */}
            <div className="card card-interests">
              <div className="card-header">
                <h2 className="card-title">
                  <span className="card-icon">⭐</span>
                  Areas of Interest
                </h2>
              </div>
              <div className="card-content">
                {userData.interests && userData.interests.length > 0 ? (
                  <div className="skills-container">
                    {userData.interests.map((interest, idx) => (
                      <span key={idx} className="skill-tag skill-tag-interest">
                        {interest}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="empty-state">No interests added yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="grid-right">
            {/* Frameworks & Libraries Card */}
            <div className="card card-frameworks">
              <div className="card-header">
                <h2 className="card-title">
                  <span className="card-icon">🛠️</span>
                  Frameworks & Libraries
                </h2>
              </div>
              <div className="card-content">
                {userData.skills?.frameworks && userData.skills.frameworks.length > 0 ? (
                  <div className="skills-container">
                    {userData.skills.frameworks.map((framework, idx) => (
                      <span key={idx} className="skill-tag skill-tag-framework">
                        {framework}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="empty-state">No frameworks added yet</p>
                )}
              </div>
            </div>

            {/* Databases Card */}
            <div className="card card-databases">
              <div className="card-header">
                <h2 className="card-title">
                  <span className="card-icon">🗄️</span>
                  Databases
                </h2>
              </div>
              <div className="card-content">
                {userData.skills?.databases && userData.skills.databases.length > 0 ? (
                  <div className="skills-container">
                    {userData.skills.databases.map((db, idx) => (
                      <span key={idx} className="skill-tag skill-tag-database">
                        {db}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="empty-state">No databases added yet</p>
                )}
              </div>
            </div>

            {/* Tools & Technologies Card */}
            <div className="card card-tools">
              <div className="card-header">
                <h2 className="card-title">
                  <span className="card-icon">⚙️</span>
                  Tools & Technologies
                </h2>
              </div>
              <div className="card-content">
                {userData.skills?.tools && userData.skills.tools.length > 0 ? (
                  <div className="skills-container">
                    {userData.skills.tools.map((tool, idx) => (
                      <span key={idx} className="skill-tag skill-tag-tool">
                        {tool}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="empty-state">No tools added yet</p>
                )}
              </div>
            </div>

            {/* Soft Skills Card */}
            <div className="card card-softskills">
              <div className="card-header">
                <h2 className="card-title">
                  <span className="card-icon">🤝</span>
                  Soft Skills
                </h2>
              </div>
              <div className="card-content">
                {userData.skills?.softSkills && userData.skills.softSkills.length > 0 ? (
                  <div className="skills-container">
                    {userData.skills.softSkills.map((skill, idx) => (
                      <span key={idx} className="skill-tag skill-tag-soft">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="empty-state">No soft skills added yet</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        {recommendations && (
          <>
            {/* Career Recommendations */}
            <div className="card card-career-rec">
              <div className="card-header">
                <h2 className="card-title">
                  <span className="card-icon">🎯</span>
                  Recommended Career Paths
                </h2>
                <p className="card-subtitle">Based on your current skills and interests</p>
              </div>
              <div className="card-content">
                {recommendations.jobRoles && recommendations.jobRoles.length > 0 ? (
                  <div className="recommendations-list">
                    {recommendations.jobRoles.map((job, idx) => (
                      <div key={idx} className="recommendation-item">
                        <div className="rec-header">
                          <h3>{job.role}</h3>
                          <div className="suitability-score">
                            <span className="score-label">Suitability</span>
                            <span className="score-value">{Math.round(job.suitabilityScore)}%</span>
                          </div>
                        </div>
                        
                        {job.matchingSkills && job.matchingSkills.length > 0 && (
                          <div className="rec-section">
                            <p className="rec-section-title">✅ Matching Skills</p>
                            <div className="matching-skills">
                              {job.matchingSkills.map((skill, sidx) => (
                                <span key={sidx} className="matching-skill">{skill}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {job.missingSkills && job.missingSkills.length > 0 && (
                          <div className="rec-section">
                            <p className="rec-section-title">⚠️ Missing Skills to Develop</p>
                            <div className="missing-skills">
                              {job.missingSkills.map((skill, sidx) => (
                                <span key={sidx} className="missing-skill">{skill}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {job.recommendations && job.recommendations.length > 0 && (
                          <div className="rec-section">
                            <p className="rec-section-title">💡 Recommendations</p>
                            <ul className="recommendations">
                              {job.recommendations.map((rec, ridx) => (
                                <li key={ridx}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-state">No career recommendations yet. Update your skills to get started!</p>
                )}
              </div>
            </div>

            {/* Skill Gaps */}
            <div className="card card-skill-gaps">
              <div className="card-header">
                <h2 className="card-title">
                  <span className="card-icon">📊</span>
                  Identified Skill Gaps
                </h2>
              </div>
              <div className="card-content">
                {recommendations.skillGaps && recommendations.skillGaps.length > 0 ? (
                  <div className="gaps-list">
                    {recommendations.skillGaps.map((gap, idx) => (
                      <div key={idx} className="gap-item">
                        <span className="gap-icon">⚡</span>
                        <span className="gap-text">{gap}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-state">No skill gaps identified. Great job!</p>
                )}
              </div>
            </div>

            {/* Learning Resources */}
            <div className="card card-resources">
              <div className="card-header">
                <h2 className="card-title">
                  <span className="card-icon">📚</span>
                  Recommended Learning Resources
                </h2>
              </div>
              <div className="card-content">
                {recommendations.resources && recommendations.resources.length > 0 ? (
                  <div className="resources-list">
                    {recommendations.resources.map((resource, idx) => (
                      <div key={idx} className="resource-item">
                        <div className="resource-header">
                          <span className="resource-category">{resource.category}</span>
                          <span className="resource-level">{resource.level}</span>
                        </div>
                        <h4>{resource.title}</h4>
                        <p>{resource.description}</p>
                        {resource.link && (
                          <a href={resource.link} target="_blank" rel="noopener noreferrer" className="resource-link">
                            View Resource →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-state">Resources will be recommended based on your skill gaps</p>
                )}
              </div>
            </div>

            {/* Higher Education Options */}
            {recommendations.higherStudies && recommendations.higherStudies.length > 0 && (
              <div className="card card-higher-ed">
                <div className="card-header">
                  <h2 className="card-title">
                    <span className="card-icon">🎓</span>
                    Higher Education Options
                  </h2>
                </div>
                <div className="card-content">
                  <div className="higher-ed-list">
                    {recommendations.higherStudies.map((course, idx) => (
                      <div key={idx} className="ed-item">{course}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
