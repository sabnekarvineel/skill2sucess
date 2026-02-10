import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CareerReport.css';

const CareerReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('/api/report/generate', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setReport(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate report');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Generating your career report...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!report) return <div className="error">No report data available</div>;

  const {
    studentProfile,
    overallSkillAnalysis,
    careerRolesSuitability,
    skillGapAnalysis,
    learningRoadmap,
    higherStudiesOptions,
    entranceExams
  } = report;

  const getSuitabilityColor = (score) => {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 60) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  const downloadReport = () => {
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `career-report-${new Date().getTime()}.json`;
    link.click();
  };

  return (
    <div className="report-container">
      <div className="report-header">
        <h1>Career Suitability Report</h1>
        <p>Personalized Career Guidance Based on Your Skills</p>
        <button className="download-btn" onClick={downloadReport}>
          📥 Download Report
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'careers' ? 'active' : ''}`}
          onClick={() => setActiveTab('careers')}
        >
          Career Roles
        </button>
        <button 
          className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          Skill Gap
        </button>
        <button 
          className={`tab ${activeTab === 'learning' ? 'active' : ''}`}
          onClick={() => setActiveTab('learning')}
        >
          Learning Path
        </button>
        <button 
          className={`tab ${activeTab === 'studies' ? 'active' : ''}`}
          onClick={() => setActiveTab('studies')}
        >
          Higher Studies
        </button>
        <button 
          className={`tab ${activeTab === 'exams' ? 'active' : ''}`}
          onClick={() => setActiveTab('exams')}
        >
          Entrance Exams
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="tab-content">
          <div className="student-profile">
            <h2>Student Profile</h2>
            <div className="profile-grid">
              <div className="profile-item">
                <span className="label">Name:</span>
                <span className="value">{studentProfile.name}</span>
              </div>
              <div className="profile-item">
                <span className="label">Degree:</span>
                <span className="value">{studentProfile.degree}</span>
              </div>
              <div className="profile-item">
                <span className="label">Semester:</span>
                <span className="value">{studentProfile.semester}</span>
              </div>
              <div className="profile-item">
                <span className="label">CGPA:</span>
                <span className="value">{studentProfile.cgpa}</span>
              </div>
            </div>
          </div>

          <div className="overall-stats">
            <h2>Overall Assessment</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{overallSkillAnalysis.totalSkillsAcquired}</div>
                <div className="stat-label">Skills Acquired</div>
              </div>
              <div className="stat-card">
                <div 
                  className="stat-value" 
                  style={{ color: getSuitabilityColor(overallSkillAnalysis.averageSuitabilityScore) }}
                >
                  {overallSkillAnalysis.averageSuitabilityScore}%
                </div>
                <div className="stat-label">Avg Suitability Score</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{skillGapAnalysis.averageGapPercentage}%</div>
                <div className="stat-label">Avg Skill Gap</div>
              </div>
            </div>
          </div>

          <div className="skill-breakdown">
            <h2>Skill Breakdown by Category</h2>
            <div className="breakdown-grid">
              {Object.entries(overallSkillAnalysis.skillBreakdown).map(([category, count]) => (
                <div key={category} className="breakdown-item">
                  <div className="category-name">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </div>
                  <div className="category-count">{count}</div>
                  <div className="category-bar">
                    <div 
                      className="category-fill" 
                      style={{ width: `${(count / Math.max(...Object.values(overallSkillAnalysis.skillBreakdown))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="top-careers">
            <h2>Top 3 Career Opportunities</h2>
            <div className="careers-list">
              {overallSkillAnalysis.topRoles.map((role, idx) => (
                <div key={idx} className="career-item">
                  <div className="career-rank">#{idx + 1}</div>
                  <div className="career-info">
                    <h3>{role.jobRole}</h3>
                    <p>{role.description}</p>
                  </div>
                  <div className="career-score">
                    <div 
                      className="score-circle" 
                      style={{ 
                        background: `conic-gradient(${getSuitabilityColor(role.suitabilityScore)} 0deg ${(role.suitabilityScore / 100) * 360}deg, #e5e7eb ${(role.suitabilityScore / 100) * 360}deg 360deg)`
                      }}
                    >
                      <span>{role.suitabilityScore}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Career Roles Tab */}
      {activeTab === 'careers' && (
        <div className="tab-content">
          <h2>Career Roles Suitability Analysis</h2>
          <div className="careers-detailed">
            {careerRolesSuitability.map((role, idx) => (
              <div key={idx} className="career-card">
                <div className="career-header">
                  <h3>{role.jobRole}</h3>
                  <span 
                    className="suitability-badge"
                    style={{ backgroundColor: getSuitabilityColor(role.suitabilityScore) }}
                  >
                    {role.category}
                  </span>
                </div>
                <p className="career-description">{role.description}</p>
                
                <div className="career-metrics">
                  <div className="metric">
                    <span className="metric-label">Suitability Score:</span>
                    <span className="metric-value" style={{ color: getSuitabilityColor(role.suitabilityScore) }}>
                      {role.suitabilityScore}%
                    </span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Market Demand:</span>
                    <span className="metric-value">{role.marketDemand}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Learning Priority:</span>
                    <span className="metric-value" style={{ color: '#6366f1' }}>
                      {role.learningImportance}%
                    </span>
                  </div>
                </div>

                <div className="skill-gap-summary">
                  <strong>Skill Gap:</strong> {role.skillGap.skillGapRatio} 
                  ({role.skillGap.completionPercentage}% Complete)
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${role.skillGap.completionPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="missing-skills">
                  <strong>Top Missing Skills:</strong>
                  <div className="skills-list">
                    {role.skillGap.missingSkills.slice(0, 5).map((skill, i) => (
                      <span key={i} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="salary-info">
                  <strong>Average Salary:</strong> {role.avgSalary}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skill Gap Tab */}
      {activeTab === 'skills' && (
        <div className="tab-content">
          <h2>Skill Gap Analysis</h2>
          <div className="gap-summary">
            <p>Average Skill Gap Across All Roles: <strong>{skillGapAnalysis.averageGapPercentage}%</strong></p>
            <p>Focus Areas: {skillGapAnalysis.focusAreas.join(', ') || 'None'}</p>
          </div>

          <div className="gap-details">
            {careerRolesSuitability.map((role, idx) => (
              <div key={idx} className="gap-item">
                <div className="gap-role-name">{role.jobRole}</div>
                <div className="gap-stats">
                  <span>Missing: {role.skillGap.totalMissing}</span>
                  <span>Required: {role.skillGap.totalRequired}</span>
                  <span>Completion: {role.skillGap.completionPercentage}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${role.skillGap.completionPercentage}%` }}
                  ></div>
                </div>
                {role.skillGap.missingSkills.length > 0 && (
                  <div className="missing-list">
                    <strong>Missing Skills:</strong>
                    {role.skillGap.missingSkills.map((skill, i) => (
                      <span key={i} className="skill-tag-small">{skill}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learning Path Tab */}
      {activeTab === 'learning' && (
        <div className="tab-content">
          <h2>Personalized Learning Roadmap</h2>
          <div className="learning-roadmap">
            {learningRoadmap.length > 0 ? (
              learningRoadmap.map((item, idx) => (
                <div key={idx} className="roadmap-item">
                  <div className="roadmap-priority">
                    Priority: <strong>{item.priority}%</strong>
                  </div>
                  <h3>{item.targetRole}</h3>
                  <div className="roadmap-details">
                    <p><strong>Estimated Time:</strong> {item.estimatedTimeMonths} months</p>
                    <p><strong>Key Skills to Learn:</strong></p>
                    <div className="skills-grid">
                      {item.topMissingSkills.map((skill, i) => (
                        <span key={i} className="skill-card">{skill}</span>
                      ))}
                    </div>
                    <p><strong>Learning Path:</strong></p>
                    <ol className="learning-steps">
                      {item.learningPath.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))
            ) : (
              <p>No learning path recommended at this time.</p>
            )}
          </div>
        </div>
      )}

      {/* Higher Studies Tab */}
      {activeTab === 'studies' && (
        <div className="tab-content">
          <h2>Higher Studies Options</h2>
          <div className="studies-grid">
            {higherStudiesOptions.map((program, idx) => (
              <div key={idx} className="study-card">
                <h3>{program.program}</h3>
                <div className="study-details">
                  <div className="detail-row">
                    <span className="label">Duration:</span>
                    <span className="value">{program.duration}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Eligibility:</span>
                    <span className="value">{program.eligibility}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Suitability:</span>
                    <span className="value" style={{ color: '#6366f1', fontWeight: 'bold' }}>
                      {program.suitability}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Expected Percentile:</span>
                    <span className="value">{program.expectedPercentile}%</span>
                  </div>
                </div>
                <div className="colleges-section">
                  <strong>Top Colleges:</strong>
                  <ul>
                    {program.topColleges.map((college, i) => (
                      <li key={i}>{college}</li>
                    ))}
                  </ul>
                </div>
                <div className="outcome">
                  <strong>Career Outcome:</strong> {program.careerOutcome}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Entrance Exams Tab */}
      {activeTab === 'exams' && (
        <div className="tab-content">
          <h2>Recommended Entrance Exams</h2>
          <div className="exams-grid">
            {entranceExams.map((exam, idx) => (
              <div key={idx} className="exam-card">
                <div className="exam-header">
                  <h3>{exam.examName}</h3>
                  <span className="exam-type">{exam.examType}</span>
                </div>
                <div className="exam-details">
                  <div className="detail">
                    <span className="label">Target Program:</span>
                    <span className="value">{exam.targetProgram}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Difficulty:</span>
                    <span className="value">{exam.difficulty} ({exam.difficulty_percentage}%)</span>
                  </div>
                  <div className="detail">
                    <span className="label">Preparation Time:</span>
                    <span className="value">{exam.preparations_months}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Expected Percentile:</span>
                    <span className="value">{exam.expectedPercentile}%</span>
                  </div>
                </div>
                <div className="syllabus-section">
                  <strong>Syllabus Topics:</strong>
                  <div className="syllabus-items">
                    {exam.syllabus.map((topic, i) => (
                      <span key={i} className="topic-badge">{topic}</span>
                    ))}
                  </div>
                </div>
                <div className="resources-section">
                  <strong>Preparation Resources:</strong>
                  <ul>
                    {exam.resources.map((resource, i) => (
                      <li key={i}>{resource}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerReport;
