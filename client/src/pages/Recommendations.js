import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Recommendations.css';

function Recommendations({ user }) {
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterLevel, setFilterLevel] = useState('all'); // all, high, moderate, developing

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/career/recommendations', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRecommendations(res.data);
                setError('');
            } catch (err) {
                console.error('Error fetching recommendations:', err);
                setError(err.response?.data?.message || 'Failed to load recommendations');
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (loading) {
        return (
            <main className="recommendations-page">
                <div className="container">
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Loading your personalized recommendations...</p>
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="recommendations-page">
                <div className="container">
                    <div className="error-message">{error}</div>
                </div>
            </main>
        );
    }

    // Skill logos mapping
    const SKILL_LOGOS = {
        'JavaScript': '📜',
        'Java': '☕',
        'SQL': '🗄️',
        'Redis': '🔴',
        'Node.js': '🟢',
        'C++': '⚙️',
        'Django': '🎯',
        'Bash': '💻',
        'Docker': '🐳',
        'Kubernetes': '☸️',
        'Python': '🐍',
        'React': '⚛️',
        'Vue': '💚',
        'Angular': '🅰️',
        'TypeScript': '📘',
        'Express': '🚂',
        'Flask': '🍶',
        'MongoDB': '🍃',
        'PostgreSQL': '🐘',
        'AWS': '☁️',
        'Azure': '🔵',
        'GCP': '☁️',
        'Git': '🔀',
        'Jenkins': '🔨',
        'Linux': '🐧',
        'Postman': '📬',
        'VS Code': '📝',
        'Machine Learning': '🤖',
        'Data Science': '📊',
        'Deep Learning': '🧠',
        'DevOps': '🔧',
        'CI/CD': '🔄',
        'Terraform': '🏔️',
        'Kubernetes': '☸️',
        'Go': '🐹',
        'Rust': '🦀',
        'PHP': '🐘',
        'Ruby': '💎',
        'Swift': '🍎',
        'C#': '🔷',
        'Cassandra': '📦',
        'Firebase': '🔥',
        'REST APIs': '🌐',
        'GraphQL': '🔗',
        'Blockchain': '⛓️',
        'IoT': '📡',
        'Communication': '💬',
        'Leadership': '👑',
        'Problem Solving': '🧩',
        'Team Work': '👥',
        'Time Management': '⏰',
        'Creativity': '🎨',
        'Critical Thinking': '🧠'
    };

    const getSkillLogo = (skillName) => {
        return SKILL_LOGOS[skillName] || '📚';
    };

    // Filter jobs based on selected level
    const getFilteredJobs = () => {
        if (!recommendations?.jobRoles) return [];

        switch (filterLevel) {
            case 'high':
                return recommendations.jobRoles.filter(r => r.suitabilityScore >= 80);
            case 'moderate':
                return recommendations.jobRoles.filter(r => r.suitabilityScore >= 60 && r.suitabilityScore < 80);
            case 'developing':
                return recommendations.jobRoles.filter(r => r.suitabilityScore < 60);
            default:
                return recommendations.jobRoles;
        }
    };

    const filteredJobs = getFilteredJobs();

    return (
        <main className="recommendations-page">
            <div className="container">
                <div className="page-header">
                    <h1>Your Career Recommendations</h1>
                    <p>Personalized recommendations based on your skills and interests</p>
                </div>

                {/* Summary Section */}
                {recommendations?.summary && (
                    <section className="summary-section">
                        <div className="summary-grid">
                            <div className="summary-card">
                                <div className="summary-number">{recommendations.summary.totalRolesAnalyzed}</div>
                                <div className="summary-label">Roles Analyzed</div>
                            </div>
                            <div className="summary-card">
                                <div className="summary-number">{recommendations.summary.averageSuitabilityScore}%</div>
                                <div className="summary-label">Avg Suitability</div>
                            </div>
                            <div className="summary-card">
                                <div className="summary-number">{recommendations.summary.highlySelected?.length || 0}</div>
                                <div className="summary-label">Highly Suitable</div>
                            </div>
                            <div className="summary-card">
                                <div className="summary-number">{recommendations.summary.moderatelySelected?.length || 0}</div>
                                <div className="summary-label">Moderately Suitable</div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Job Roles Section */}
                <section className="recommendations-section">
                    <div className="section-header">
                        <h2>Recommended Job Roles</h2>
                        <div className="filter-buttons">
                            <button
                                className={`filter-btn ${filterLevel === 'all' ? 'active' : ''}`}
                                onClick={() => setFilterLevel('all')}
                            >
                                All Roles
                            </button>
                            <button
                                className={`filter-btn ${filterLevel === 'high' ? 'active' : ''}`}
                                onClick={() => setFilterLevel('high')}
                            >
                                Highly Suitable
                            </button>
                            <button
                                className={`filter-btn ${filterLevel === 'moderate' ? 'active' : ''}`}
                                onClick={() => setFilterLevel('moderate')}
                            >
                                Moderately Suitable
                            </button>
                            <button
                                className={`filter-btn ${filterLevel === 'developing' ? 'active' : ''}`}
                                onClick={() => setFilterLevel('developing')}
                            >
                                Developing
                            </button>
                        </div>
                    </div>

                    {filteredJobs.length > 0 ? (
                        <div className="roles-grid">
                            {filteredJobs.map((role, index) => (
                                <div key={index} className="role-card">
                                    <div className="role-header">
                                        <h3>{role.role}</h3>
                                        <div className={`score-badge ${role.suitabilityScore >= 80 ? 'high' : role.suitabilityScore >= 60 ? 'medium' : 'low'}`}>
                                            {role.suitabilityScore}%
                                        </div>
                                    </div>

                                    <div className="suitability-badge">
                                        {role.suitabilityCategory}
                                    </div>

                                    <p className="role-description">{role.description}</p>

                                    <div className="role-info">
                                        <div className="info-item">
                                            <strong>💰 Salary:</strong> {role.avgSalary}
                                        </div>
                                        <div className="info-item">
                                            <strong>📈 Market Demand:</strong>
                                            <span className={`demand-badge ${role.jobMarketDemand?.toLowerCase()}`}>
                                                {role.jobMarketDemand}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="skills-section">
                                        <h4>✓ Your Matching Skills ({role.matchingSkills.length})</h4>
                                        <div className="skills-list">
                                            {role.matchingSkills.length > 0 ? (
                                                role.matchingSkills.map((skill, i) => (
                                                    <span key={i} className="skill-badge matched">
                                                        ✓ {skill}
                                                    </span>
                                                ))
                                            ) : (
                                                <p className="no-skills">No matching skills yet - start learning!</p>
                                            )}
                                        </div>
                                    </div>

                                    {role.missingSkills.length > 0 && (
                                        <div className="skills-section">
                                            <h4>✗ Skills to Develop ({role.missingSkills.length})</h4>
                                            <div className="skills-list">
                                                {role.missingSkills.map((skill, i) => (
                                                    <span key={i} className="skill-badge missing">
                                                        ✗ {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {role.recommendations.length > 0 && (
                                        <div className="recommendations-box">
                                            <h4>💡 Improvement Tips</h4>
                                            <ul>
                                                {role.recommendations.map((rec, i) => (
                                                    <li key={i}>{rec}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {role.learningPath && role.learningPath.length > 0 && (
                                        <div className="learning-path">
                                            <h4>📚 Suggested Learning Path</h4>
                                            <ol>
                                                {role.learningPath.slice(0, 3).map((path, i) => (
                                                    <li key={i}>{path}</li>
                                                ))}
                                            </ol>
                                        </div>
                                    )}

                                    {role.companies && role.companies.length > 0 && (
                                        <div className="companies-list">
                                            <h4>🏢 Top Companies</h4>
                                            <div className="companies">
                                                {role.companies.slice(0, 4).map((company, i) => (
                                                    <span key={i} className="company-badge">{company}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <p>No roles match your selected filter. Try adjusting your filters.</p>
                        </div>
                    )}
                </section>

                {/* Higher Education Section */}
                {recommendations?.higherStudies?.length > 0 && (
                    <section className="recommendations-section">
                        <h2>🎓 Higher Education Options</h2>
                        <div className="education-grid">
                            {recommendations.higherStudies.map((course, index) => (
                                <div key={index} className="education-card">
                                    <div className="education-icon">🎓</div>
                                    <h3>{typeof course === 'string' ? course : course.name}</h3>
                                    {typeof course === 'object' && (
                                        <>
                                            <p className="education-duration">⏱️ Duration: {course.duration}</p>
                                            <p>{course.description}</p>
                                        </>
                                    )}
                                    {typeof course === 'string' && (
                                        <p>Advance your career with a postgraduate degree</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Entrance Exams & Certifications Section */}
                {recommendations?.entranceExams?.length > 0 && (
                    <section className="recommendations-section">
                        <h2>📝 Entrance Exams & Certifications</h2>
                        <div className="exams-grid">
                            {recommendations.entranceExams.map((exam, index) => (
                                <div key={index} className={`exam-card exam-${exam.type?.toLowerCase()}`}>
                                    <div className="exam-header">
                                        <h4>{exam.name}</h4>
                                        <span className="exam-type">{exam.type || 'Exam'}</span>
                                    </div>
                                    <div className="exam-details">
                                        {exam.date && (
                                            <div className="exam-detail-item">
                                                <strong>📅 Date:</strong> {new Date(exam.date).toLocaleDateString()}
                                            </div>
                                        )}
                                        {exam.difficulty && (
                                            <div className="exam-detail-item">
                                                <strong>🎯 Difficulty:</strong> {exam.difficulty}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skill Gaps Section */}
                {recommendations?.skillGaps?.length > 0 && (
                    <section className="recommendations-section">
                        <h2>📚 Key Skill Gaps to Address</h2>
                        <p className="section-description">These are the most important skills to develop across your desired career paths:</p>
                        <div className="skill-gaps-grid">
                            {recommendations.skillGaps.map((gap, index) => {
                                 // Extract skill name from "Learn X" format
                                 const skillName = gap.replace(/^Learn\s+/i, '').trim();
                                 const skillLogo = getSkillLogo(skillName);

                                 return (
                                     <div key={index} className="gap-card">
                                         <div className="gap-icon">
                                             {skillLogo}
                                         </div>
                                         <p className="gap-skill-name">{skillName}</p>
                                         <div className="gap-indicator">Priority #{index + 1}</div>
                                     </div>
                                 );
                             })}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}

export default Recommendations;
