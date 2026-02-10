import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DomainSuggestions.css';

function DomainSuggestions() {
    const [domains, setDomains] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState(null);
    const [suggestions, setSuggestions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchInput, setSearchInput] = useState('');

    // Fetch available domains on component mount
    useEffect(() => {
        fetchDomains();
    }, []);

    const fetchDomains = async () => {
        try {
            const res = await axios.get('/api/domain-suggestions/domains');
            setDomains(res.data.domains);
            setError('');
        } catch (err) {
            console.error('Error fetching domains:', err);
            setError('Failed to load domains');
        }
    };

    const handleDomainSelect = async (domain) => {
        setSelectedDomain(domain);
        setLoading(true);
        setError('');
        setSuggestions(null);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                '/api/domain-suggestions/suggest',
                { domain: domain.name },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setSuggestions(res.data);
        } catch (err) {
            console.error('Error fetching suggestions:', err);
            setError(err.response?.data?.message || 'Failed to load suggestions');
        } finally {
            setLoading(false);
        }
    };

    // Filter domains based on search
    const filteredDomains = domains.filter(domain =>
        domain.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Skill logos mapping
    const SKILL_LOGOS = {
        'JavaScript': '📜',
        'Python': '🐍',
        'SQL': '🗄️',
        'React': '⚛️',
        'Vue.js': '💚',
        'Angular': '🅰️',
        'Node.js': '🟢',
        'Express': '🚂',
        'Django': '🎯',
        'Flask': '🍶',
        'Docker': '🐳',
        'Kubernetes': '☸️',
        'AWS': '☁️',
        'Azure': '🔵',
        'GCP': '☁️',
        'MongoDB': '🍃',
        'PostgreSQL': '🐘',
        'MySQL': '🐬',
        'Linux': '🐧',
        'Git': '🔀',
        'Machine Learning': '🤖',
        'Deep Learning': '🧠',
        'TensorFlow': '🧠',
        'PyTorch': '🔥',
        'Pandas': '🐼',
        'NumPy': '📊',
        'Scikit-learn': '📈',
        'Blockchain': '⛓️',
        'Solidity': '💎',
        'Web3': '🌐',
        'Cryptography': '🔐',
        'Penetration Testing': '🎯',
        'Metasploit': '⚔️',
        'Wireshark': '🔍',
        'Terraform': '🏔️',
        'Jenkins': '🔨',
        'GitHub Actions': '⚙️',
        'Kafka': '📨',
        'Spark': '⚡',
        'Hadoop': '🐘',
        'Swift': '🍎',
        'Kotlin': '📱',
        'React Native': '📱',
        'Flutter': '🎨',
        'Firebase': '🔥',
        'Xcode': '🛠️',
        'Android Studio': '🤖',
        'Postman': '📬',
        'VS Code': '📝',
        'Jupyter Notebook': '📓',
        'Problem Solving': '🧩',
        'Communication': '💬',
        'Leadership': '👑',
        'Analytical Thinking': '🧠',
        'Creativity': '🎨',
        'Innovation': '💡',
        'System Design': '🏗️',
        'Automation': '🤖',
        'Mobile UI/UX': '📱',
        'UI/UX': '🎨',
        'Design Thinking': '💭',
        'Research Skills': '🔬',
        'Statistics': '📊',
        'Big Data': '🗂️',
        'Networking': '🌐',
        'Incident Response': '🚨',
        'OWASP': '🛡️',
        'Security Architecture': '🏰',
        'Stream Processing': '💧',
        'ETL': '🔄',
        'Data Pipelines': '📊',
        'C': '⚙️',
        'Java': '☕',
        'Scala': '🎯',
        'Go': '🐹',
        'Rust': '🦀',
        'C#': '🔷',
        'PHP': '🐘',
        'Ruby': '💎',
        'Hive': '🍯',
        'Cassandra': '📦',
        'Presto': '⚡',
        'Airflow': '✈️',
        'Nessus': '🛡️',
        'Burp Suite': '⚔️',
        'Remix IDE': '🎵',
        'Hardhat': '⛏️',
        'Truffle': '🔧',
        'MetaMask': '🦊',
        'REST APIs': '🌐',
        'GraphQL': '🔗',
        'Windows Security': '🪟'
    };

    const getSkillIcon = (skillName) => {
        return SKILL_LOGOS[skillName] || '📚';
    };

    return (
        <main className="domain-suggestions-page">
            <div className="container">
                {/* Header */}
                <div className="page-header">
                    <h1>🎯 Skill Recommendations by Domain</h1>
                    <p>Choose your area of interest and get a personalized roadmap to master it</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                {/* Domain Selection Section */}
                {!suggestions && (
                    <section className="domains-section">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search domains... (e.g., Web Development, AI, Cloud)"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="domain-search"
                            />
                        </div>

                        <div className="domains-grid">
                            {filteredDomains.map((domain, index) => (
                                <div
                                    key={index}
                                    className="domain-card"
                                    onClick={() => handleDomainSelect(domain)}
                                >
                                    <div className="domain-icon">
                                        {getDomainIcon(domain.name)}
                                    </div>
                                    <h3>{domain.name}</h3>
                                    <div className="domain-info">
                                        <span className="skill-count">
                                            {domain.skillCount} skills
                                        </span>
                                    </div>
                                    <div className="related-roles">
                                        {domain.relatedRoles.slice(0, 2).map((role, i) => (
                                            <span key={i} className="role-tag">{role}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredDomains.length === 0 && (
                            <div className="no-results">
                                <p>No domains found matching "{searchInput}"</p>
                            </div>
                        )}
                    </section>
                )}

                {/* Suggestions Display Section */}
                {loading && (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Generating your personalized roadmap...</p>
                    </div>
                )}

                {suggestions && !loading && (
                    <section className="suggestions-section">
                        <div className="back-button">
                            <button
                                onClick={() => {
                                    setSuggestions(null);
                                    setSearchInput('');
                                }}
                                className="btn-back"
                            >
                                ← Back to Domains
                            </button>
                        </div>

                        {/* Domain Header */}
                        <div className="suggestions-header">
                            <h2>{getDomainIcon(suggestions.domain)} {suggestions.domain}</h2>
                            <div className="domain-metrics">
                                <div className="metric-card">
                                    <div className="metric-label">Market Demand</div>
                                    <div className="metric-value demand-badge">
                                        {suggestions.marketDemand}
                                    </div>
                                </div>
                                <div className="metric-card">
                                    <div className="metric-label">Difficulty Level</div>
                                    <div className="metric-value difficulty-badge">
                                        {suggestions.difficulty}
                                    </div>
                                </div>
                                <div className="metric-card">
                                    <div className="metric-label">Time to Master</div>
                                    <div className="metric-value time-badge">
                                        {suggestions.estimatedMonths} months
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Related Roles */}
                        {suggestions.relatedRoles && suggestions.relatedRoles.length > 0 && (
                            <section className="section">
                                <h3>💼 Related Job Roles</h3>
                                <div className="roles-list">
                                    {suggestions.relatedRoles.map((role, index) => (
                                        <div key={index} className="role-item">
                                            <span className="role-badge">{role}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Top Companies */}
                        {suggestions.topCompanies && suggestions.topCompanies.length > 0 && (
                            <section className="section">
                                <h3>🏢 Top Companies Hiring</h3>
                                <div className="companies-grid">
                                    {suggestions.topCompanies.map((company, index) => (
                                        <div key={index} className="company-card">
                                            {company}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Learning Path */}
                        {suggestions.learningPath && (
                            <section className="section learning-path-section">
                                <h3>📚 Recommended Learning Path</h3>
                                <div className="learning-phases">
                                    {suggestions.learningPath.map((phase, index) => (
                                        <div key={index} className="phase-card">
                                            <div className="phase-header">
                                                <h4>{phase.phase}</h4>
                                                <p className="phase-description">
                                                    {phase.description}
                                                </p>
                                            </div>
                                            <div className="phase-skills">
                                                {phase.skills.map((skill, i) => (
                                                    <span key={i} className="skill-chip">
                                                        {getSkillIcon(skill)} {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Skill Priorities */}
                        {suggestions.skillPriorities && (
                            <section className="section">
                                <h3>🎯 Skill Breakdown by Priority</h3>
                                <div className="skills-priorities">
                                    {suggestions.skillPriorities.map((priority, index) => (
                                        <div key={index} className="priority-card">
                                            <div className="priority-header">
                                                <h4>
                                                    <span className="priority-badge">
                                                        P{priority.priority}
                                                    </span>
                                                    {priority.category}
                                                </h4>
                                                <p className="priority-description">
                                                    {priority.description}
                                                </p>
                                            </div>
                                            <div className="skills-grid">
                                                {priority.skills.map((skill, i) => (
                                                    <span key={i} className="skill-tag">
                                                        {getSkillIcon(skill)} {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Resources */}
                        {suggestions.resources && suggestions.resources.length > 0 && (
                            <section className="section resources-section">
                                <h3>📖 Recommended Learning Resources</h3>
                                <div className="resources-grid">
                                    {suggestions.resources.map((resource, index) => (
                                        <a
                                            key={index}
                                            href={resource.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="resource-card"
                                        >
                                            <div className="resource-type">
                                                {getResourceIcon(resource.type)}
                                            </div>
                                            <h4>{resource.title}</h4>
                                            <span className="resource-tag">{resource.type}</span>
                                        </a>
                                    ))}
                                </div>
                            </section>
                        )}
                    </section>
                )}
            </div>
        </main>
    );

    function getDomainIcon(domainName) {
        const iconMap = {
            'Web Development': '🌐',
            'Mobile Development': '📱',
            'Data Science': '📊',
            'Cloud Computing': '☁️',
            'DevOps': '🔧',
            'Cybersecurity': '🔐',
            'AI/Machine Learning': '🤖',
            'Blockchain': '⛓️',
            'Data Engineering': '🔄'
        };
        return iconMap[domainName] || '💻';
    }

    function getResourceIcon(type) {
        const iconMap = {
            'Course': '🎓',
            'Documentation': '📖',
            'YouTube Channel': '📺',
            'Platform': '🖥️',
            'Specialization': '🏆',
            'Research': '🔬',
            'Guide': '📋',
            'Certification': '🎖️'
        };
        return iconMap[type] || '📚';
    }
}

export default DomainSuggestions;
