import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataAnalyticsRoadmap.css';

const DataAnalyticsRoadmap = () => {
  const [roadmap, setRoadmap] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataAnalyticsPath();
  }, []);

  const fetchDataAnalyticsPath = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/data-analytics/learning-path`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      setRoadmap(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching roadmap:', err);
      setError('Failed to load Data Analytics roadmap');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading Data Analytics Roadmap...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!roadmap) {
    return <div className="error-message">No roadmap data available</div>;
  }

  return (
    <div className="data-analytics-container">
      <header className="da-header">
        <h1>📊 Data Analytics Career Roadmap</h1>
        <p>Your personalized path to becoming a Data Analyst</p>
      </header>

      <nav className="da-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          Skills & Resources
        </button>
        <button
          className={`tab-btn ${activeTab === 'careers' ? 'active' : ''}`}
          onClick={() => setActiveTab('careers')}
        >
          Career Paths
        </button>
        <button
          className={`tab-btn ${activeTab === 'tools' ? 'active' : ''}`}
          onClick={() => setActiveTab('tools')}
        >
          Tools & Certifications
        </button>
        <button
          className={`tab-btn ${activeTab === 'personalized' ? 'active' : ''}`}
          onClick={() => setActiveTab('personalized')}
        >
          Your Path
        </button>
      </nav>

      <div className="da-content">
        {activeTab === 'overview' && <OverviewTab roadmap={roadmap} />}
        {activeTab === 'skills' && <SkillsTab roadmap={roadmap} />}
        {activeTab === 'careers' && <CareersTab roadmap={roadmap} />}
        {activeTab === 'tools' && <ToolsTab roadmap={roadmap} />}
        {activeTab === 'personalized' && <PersonalizedTab roadmap={roadmap} />}
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ roadmap }) => {
  const { overview } = roadmap;

  return (
    <section className="tab-content">
      <h2>📋 Field Overview</h2>
      
      <div className="overview-grid">
        <div className="overview-card">
          <h3>What is Data Analytics?</h3>
          <p>{overview.description}</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Timeline</div>
            <div className="stat-value">{overview.estimatedTimeline}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Job Market Demand</div>
            <div className="stat-value" style={{ color: '#10b981' }}>{overview.jobMarketDemand}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Starting Salary</div>
            <div className="stat-value">{overview.avgSalary?.split(',')[0]}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Growth Rate</div>
            <div className="stat-value" style={{ color: '#f59e0b' }}>{overview.growthRate}</div>
          </div>
        </div>
      </div>

      <div className="why-data-analytics">
        <h3>🎯 Why Data Analytics?</h3>
        <ul className="reasons-list">
          <li>🚀 High demand with rapid growth rate</li>
          <li>💼 Competitive salary packages</li>
          <li>🌍 Remote work opportunities</li>
          <li>📈 Multiple career progression paths</li>
          <li>🎓 Various learning resources available</li>
          <li>💡 Make data-driven business decisions</li>
        </ul>
      </div>
    </section>
  );
};

// Skills & Resources Tab Component
const SkillsTab = ({ roadmap }) => {
  const { skillLevels } = roadmap;
  const [expandedLevel, setExpandedLevel] = useState('beginner');

  return (
    <section className="tab-content">
      <h2>🎓 Learning Levels & Resources</h2>

      <div className="skill-levels">
        {Object.entries(skillLevels).map(([level, details]) => (
          <div key={level} className="level-card">
            <div
              className="level-header"
              onClick={() => setExpandedLevel(expandedLevel === level ? null : level)}
            >
              <h3 className="level-title">
                {level.charAt(0).toUpperCase() + level.slice(1)} Level
              </h3>
              <span className="duration">📅 {details.duration}</span>
              <span className="toggle-icon">
                {expandedLevel === level ? '−' : '+'}
              </span>
            </div>

            {expandedLevel === level && (
              <div className="level-content">
                <div className="skills-section">
                  <h4>Skills to Learn:</h4>
                  <div className="skills-grid">
                    {Object.entries(details.skills).map(([category, skills]) => (
                      <div key={category} className="skill-category">
                        <strong>{category.replace(/([A-Z])/g, ' $1')}</strong>
                        <ul>
                          {skills.map((skill, idx) => (
                            <li key={idx}>✓ {skill}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="resources-section">
                  <h4>Learning Resources:</h4>
                  <div className="resources-list">
                    {details.resources.map((resource, idx) => (
                      <div key={idx} className="resource-card">
                        <div className="resource-header">
                          <h5>{resource.name}</h5>
                          <span className="platform">{resource.platform}</span>
                        </div>
                        <div className="resource-details">
                          <span>⏱️ {resource.duration}</span>
                          <span>💰 {resource.cost}</span>
                        </div>
                        <a href={resource.link} target="_blank" rel="noopener noreferrer" className="resource-link">
                          View Course →
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="projects-section">
                  <h4>Project Ideas:</h4>
                  <ol className="projects-list">
                    {details.projects.map((project, idx) => (
                      <li key={idx}>{project}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Career Paths Tab Component
const CareersTab = ({ roadmap }) => {
  const { careerPaths } = roadmap;

  return (
    <section className="tab-content">
      <h2>💼 Career Progression Paths</h2>

      <div className="career-paths">
        {careerPaths.map((path, idx) => (
          <div key={idx} className="career-card">
            <div className="career-header">
              <h3>{path.role}</h3>
              <span className="salary-badge">{path.salary}</span>
            </div>

            <div className="career-info">
              <div className="info-item">
                <strong>Experience:</strong> {path.experience}
              </div>
              <div className="info-item">
                <strong>Key Responsibilities:</strong>
                <ul>
                  {path.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
              <div className="info-item">
                <strong>Required Skills:</strong>
                <div className="skills-tags">
                  {path.requiredSkills.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Tools & Certifications Tab Component
const ToolsTab = ({ roadmap }) => {
  const { tools, certifications } = roadmap;

  return (
    <section className="tab-content">
      <h2>🛠️ Tools & Certifications</h2>

      <div className="tools-section">
        <h3>Essential Tools by Category</h3>
        <div className="tools-grid">
          {tools.map((category, idx) => (
            <div key={idx} className="tool-category-card">
              <h4>{category.category}</h4>
              <div className="tools-list">
                {category.tools.map((tool, i) => (
                  <div key={i} className="tool-item">
                    <div className="tool-name">
                      <strong>{tool.name}</strong>
                      <span className={`importance ${tool.importance.toLowerCase()}`}>
                        {tool.importance}
                      </span>
                    </div>
                    <p className="tool-reason">{tool.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="certifications-section">
        <h3>Industry Certifications</h3>
        <div className="certifications-grid">
          {certifications.map((cert, idx) => (
            <div key={idx} className="certification-card">
              <h4>{cert.name}</h4>
              <div className="cert-details">
                <p><strong>Provider:</strong> {cert.provider}</p>
                <p><strong>Duration:</strong> {cert.duration}</p>
                <p><strong>Cost:</strong> {cert.cost}</p>
                <p><strong>Difficulty:</strong> {cert.difficulty}</p>
                <div className="cert-skills">
                  <strong>Skills:</strong>
                  <div className="skills-tags">
                    {cert.skills.map((skill, i) => (
                      <span key={i} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Personalized Tab Component
const PersonalizedTab = ({ roadmap }) => {
  const { personalized } = roadmap;

  if (!personalized) {
    return <div>Loading your personalized path...</div>;
  }

  return (
    <section className="tab-content">
      <h2>🎯 Your Personalized Learning Path</h2>

      <div className="personalized-assessment">
        <div className="assessment-card suitability">
          <h3>Your Data Analytics Suitability</h3>
          <div className="score-circle">
            <div className="score-value">{personalized.suitabilityScore}%</div>
            <div className="score-label">
              {personalized.suitabilityScore >= 80
                ? 'Highly Suitable'
                : personalized.suitabilityScore >= 60
                ? 'Moderately Suitable'
                : personalized.suitabilityScore >= 40
                ? 'Developing'
                : 'Needs Focus'}
            </div>
          </div>
          <div className="score-progress">
            <div
              className="progress-bar"
              style={{ width: `${personalized.suitabilityScore}%` }}
            ></div>
          </div>
        </div>

        <div className="assessment-card current-level">
          <h3>Current Level</h3>
          <div className="level-badge">{personalized.currentLevel.toUpperCase()}</div>
          <p>Based on your {personalized.matchingSkills.length} matching skills</p>
        </div>

        <div className="assessment-card timeline">
          <h3>Estimated Timeline</h3>
          <div className="timeline-value">{personalized.estimatedCompletionTime} months</div>
          <p>To reach Data Analyst proficiency</p>
        </div>
      </div>

      <div className="skills-analysis">
        <div className="matching-skills">
          <h3>✅ Your Existing Skills ({personalized.matchingSkills.length})</h3>
          <div className="skills-tags">
            {personalized.matchingSkills.length > 0 ? (
              personalized.matchingSkills.map((skill, idx) => (
                <span key={idx} className="skill-tag existing">{skill}</span>
              ))
            ) : (
              <p className="no-skills">No matching skills yet. Start learning!</p>
            )}
          </div>
        </div>

        <div className="missing-skills">
          <h3>📚 Skills to Learn ({personalized.missingSkills.length})</h3>
          <div className="skills-tags">
            {personalized.missingSkills.slice(0, 10).map((skill, idx) => (
              <span key={idx} className="skill-tag missing">{skill}</span>
            ))}
          </div>
          {personalized.missingSkills.length > 10 && (
            <p className="more-skills">+{personalized.missingSkills.length - 10} more skills</p>
          )}
        </div>
      </div>

      <div className="next-steps">
        <h3>🚀 Your Next Steps</h3>
        <ol className="steps-list">
          {personalized.nextSteps.map((step, idx) => (
            <li key={idx}>
              <div className="step-number">{idx + 1}</div>
              <div className="step-text">{step}</div>
            </li>
          ))}
        </ol>
      </div>

      <div className="roadmap-phases">
        <h3>📋 Learning Phases</h3>
        <div className="phases-timeline">
          {personalized.roadmapPhases.map((phase, idx) => (
            <div key={idx} className="phase-card">
              <div className="phase-number">Phase {phase.phase}</div>
              <h4>{phase.name}</h4>
              <p className="phase-duration">⏱️ {phase.duration}</p>
              <div className="phase-focus">
                <strong>Focus:</strong>
                <ul>
                  {phase.focus.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DataAnalyticsRoadmap;
