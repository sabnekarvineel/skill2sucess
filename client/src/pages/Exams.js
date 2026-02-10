import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Exams.css';

function Exams() {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get('/api/career/exams');
        setExams(res.data);
        setFilteredExams(res.data);
      } catch (err) {
        console.log('Failed to load exams');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  useEffect(() => {
    if (filterType === 'all') {
      setFilteredExams(exams);
    } else {
      setFilteredExams(exams.filter(exam => exam.examType === filterType));
    }
  }, [filterType, exams]);

  if (loading) {
    return (
      <main className="exams-page">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading exams information...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="exams-page">
      <div className="container">
        <div className="page-header">
          <h1>Entrance & Competitive Exams</h1>
          <p>Complete information about exams for CS/IT students</p>
        </div>

        <div className="filter-section">
          <button
            className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All Exams ({exams.length})
          </button>
          <button
            className={`filter-btn ${filterType === 'Entrance' ? 'active' : ''}`}
            onClick={() => setFilterType('Entrance')}
          >
            Entrance Exams
          </button>
          <button
            className={`filter-btn ${filterType === 'Competitive' ? 'active' : ''}`}
            onClick={() => setFilterType('Competitive')}
          >
            Competitive Exams
          </button>
          <button
            className={`filter-btn ${filterType === 'Certification' ? 'active' : ''}`}
            onClick={() => setFilterType('Certification')}
          >
            Certifications
          </button>
        </div>

        <div className="exams-grid">
          {filteredExams.length > 0 ? (
            filteredExams.map((exam, index) => (
              <div key={index} className="exam-card">
                <div className="exam-header">
                  <h3>{exam.examName}</h3>
                  <span className={`exam-type-badge ${exam.examType}`}>
                    {exam.examType}
                  </span>
                </div>

                <div className="exam-details">
                  {exam.examDate && (
                    <div className="detail-item">
                      <strong>📅 Exam Date:</strong>
                      <p>{new Date(exam.examDate).toLocaleDateString()}</p>
                    </div>
                  )}

                  {exam.applicationDeadline && (
                    <div className="detail-item">
                      <strong>⏳ Application Deadline:</strong>
                      <p>{new Date(exam.applicationDeadline).toLocaleDateString()}</p>
                    </div>
                  )}

                  {exam.eligibility && (
                    <div className="detail-item">
                      <strong>✓ Eligibility:</strong>
                      <p>{exam.eligibility}</p>
                    </div>
                  )}

                  {exam.difficulty && (
                    <div className="detail-item">
                      <strong>⚡ Difficulty:</strong>
                      <p>{exam.difficulty}</p>
                    </div>
                  )}
                </div>

                {exam.syllabus && exam.syllabus.length > 0 && (
                  <div className="syllabus-section">
                    <h4>Syllabus Topics</h4>
                    <ul>
                      {exam.syllabus.map((topic, i) => (
                        <li key={i}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {exam.preparationResources && exam.preparationResources.length > 0 && (
                  <div className="resources-section">
                    <h4>Preparation Resources</h4>
                    <ul>
                      {exam.preparationResources.map((resource, i) => (
                        <li key={i}>{resource}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {exam.applicationLink && (
                  <a
                    href={exam.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-small"
                  >
                    Apply Now →
                  </a>
                )}
              </div>
            ))
          ) : (
            <div className="no-exams">
              <p>No exams found for this category</p>
            </div>
          )}
        </div>

        {filteredExams.length === 0 && (
          <div className="info-box">
            <h3>No exams added yet</h3>
            <p>Admin will add exam information soon. Check back later!</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Exams;
