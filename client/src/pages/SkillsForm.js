import React, { useState } from 'react';
import axios from 'axios';
import './SkillsForm.css';

function SkillsForm({ user, setUser }) {
  const [skills, setSkills] = useState(user.skills || {
    programming: [],
    databases: [],
    frameworks: [],
    tools: [],
    softSkills: [],
    other: []
  });
  const [interests, setInterests] = useState(user.interests || []);
  const [hobbies, setHobbies] = useState(user.hobbies || []);
  const [newSkill, setNewSkill] = useState({ category: 'programming', value: '' });
  const [newInterest, setNewInterest] = useState('');
  const [newHobby, setNewHobby] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const programmingLanguages = ['Python', 'Java', 'JavaScript', 'C++', 'C', 'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'TypeScript', 'Swift'];
  const databasesList = ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle', 'SQL Server', 'Redis', 'Cassandra', 'Firebase'];
  const frameworksList = ['React', 'Vue', 'Angular', 'Django', 'Flask', 'Spring', 'Node.js', 'Express', 'Next.js', 'Laravel'];
  const toolsList = ['Git', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Jenkins', 'Linux', 'Postman', 'VS Code'];
  const softSkillsList = ['Communication', 'Problem Solving', 'Team Work', 'Leadership', 'Time Management', 'Creativity', 'Critical Thinking'];
  const otherSkillsList = ['REST APIs', 'GraphQL', 'Blockchain', 'IoT', 'Machine Learning', 'Data Analysis', 'UI/UX Design'];
  const hobbyList = ['Coding', 'Gaming', 'Reading', 'Music', 'Sports', 'Cooking', 'Traveling', 'Photography', 'Writing', 'Open Source Contribution'];
  const interestsList = ['Web Development', 'Mobile Development', 'Data Science', 'AI/ML', 'Cloud Computing', 'DevOps', 'Cybersecurity', 'Game Development', 'Blockchain'];

  const addSkill = () => {
    if (newSkill.value && !skills[newSkill.category].includes(newSkill.value)) {
      setSkills({
        ...skills,
        [newSkill.category]: [...skills[newSkill.category], newSkill.value]
      });
      setNewSkill({ category: 'programming', value: '' });
    }
  };

  const removeSkill = (category, skill) => {
    setSkills({
      ...skills,
      [category]: skills[category].filter(s => s !== skill)
    });
  };

  const addInterest = () => {
    if (newInterest && !interests.includes(newInterest)) {
      setInterests([...interests, newInterest]);
      setNewInterest('');
    }
  };

  const removeInterest = (interest) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const addHobby = () => {
    if (newHobby && !hobbies.includes(newHobby)) {
      setHobbies([...hobbies, newHobby]);
      setNewHobby('');
    }
  };

  const removeHobby = (hobby) => {
    setHobbies(hobbies.filter(h => h !== hobby));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.put('/api/users/skills', { ...skills });
      await axios.put('/api/users/interests', { interests });
      await axios.put('/api/users/hobbies', { hobbies });
      setUser({ ...user, skills, interests, hobbies });
      setMessage('Skills, interests and hobbies saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to save skills');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="skills-page">
      <div className="container">
        <div className="page-header">
          <h1>My Skills & Interests</h1>
          <p>Tell us about your technical skills and career interests</p>
        </div>

        <form onSubmit={handleSubmit} className="skills-form">
          {message && (
            <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          {/* Programming Skills */}
          <div className="form-section">
            <h3>Programming Languages</h3>
            <div className="skill-input-group">
              <select
                value={newSkill.category === 'programming' ? newSkill.value : ''}
                onChange={(e) => setNewSkill({ category: 'programming', value: e.target.value })}
              >
                <option value="">Select programming language</option>
                {programmingLanguages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  addSkill();
                }}
              >
                Add
              </button>
            </div>
            <div className="skills-chips">
              {skills.programming.map(skill => (
                <div key={skill} className="skill-chip">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill('programming', skill)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Frameworks */}
          <div className="form-section">
            <h3>Frameworks & Libraries</h3>
            <div className="skill-input-group">
              <select
                value={newSkill.category === 'frameworks' ? newSkill.value : ''}
                onChange={(e) => setNewSkill({ category: 'frameworks', value: e.target.value })}
              >
                <option value="">Select framework</option>
                {frameworksList.map(fw => (
                  <option key={fw} value={fw}>{fw}</option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  addSkill();
                }}
              >
                Add
              </button>
            </div>
            <div className="skills-chips">
              {skills.frameworks.map(skill => (
                <div key={skill} className="skill-chip">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill('frameworks', skill)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Databases */}
          <div className="form-section">
            <h3>Databases</h3>
            <div className="skill-input-group">
              <select
                value={newSkill.category === 'databases' ? newSkill.value : ''}
                onChange={(e) => setNewSkill({ category: 'databases', value: e.target.value })}
              >
                <option value="">Select database</option>
                {databasesList.map(db => (
                  <option key={db} value={db}>{db}</option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  addSkill();
                }}
              >
                Add
              </button>
            </div>
            <div className="skills-chips">
              {skills.databases.map(skill => (
                <div key={skill} className="skill-chip">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill('databases', skill)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="form-section">
            <h3>Tools & Technologies</h3>
            <div className="skill-input-group">
              <select
                value={newSkill.category === 'tools' ? newSkill.value : ''}
                onChange={(e) => setNewSkill({ category: 'tools', value: e.target.value })}
              >
                <option value="">Select tool</option>
                {toolsList.map(tool => (
                  <option key={tool} value={tool}>{tool}</option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  addSkill();
                }}
              >
                Add
              </button>
            </div>
            <div className="skills-chips">
              {skills.tools.map(skill => (
                <div key={skill} className="skill-chip">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill('tools', skill)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="form-section">
            <h3>Soft Skills</h3>
            <div className="skill-input-group">
              <select
                value={newSkill.category === 'softSkills' ? newSkill.value : ''}
                onChange={(e) => setNewSkill({ category: 'softSkills', value: e.target.value })}
              >
                <option value="">Select soft skill</option>
                {softSkillsList.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  addSkill();
                }}
              >
                Add
              </button>
            </div>
            <div className="skills-chips">
              {skills.softSkills.map(skill => (
                <div key={skill} className="skill-chip">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill('softSkills', skill)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Other Technical Skills */}
          <div className="form-section">
            <h3>Other Technical Skills</h3>
            <div className="skill-input-group">
              <select
                value={newSkill.category === 'other' ? newSkill.value : ''}
                onChange={(e) => setNewSkill({ category: 'other', value: e.target.value })}
              >
                <option value="">Select other skill</option>
                {otherSkillsList.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  addSkill();
                }}
              >
                Add
              </button>
            </div>
            <div className="skills-chips">
              {skills.other.map(skill => (
                <div key={skill} className="skill-chip">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill('other', skill)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="form-section">
            <h3>Career Interests</h3>
            <div className="skill-input-group">
              <select
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
              >
                <option value="">Select interest</option>
                {interestsList.map(interest => (
                  <option key={interest} value={interest}>{interest}</option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => { addInterest(); setNewInterest(''); }}
              >
                Add
              </button>
            </div>
            <div className="skills-chips">
              {interests.map(interest => (
                <div key={interest} className="skill-chip">
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Hobbies */}
          <div className="form-section">
            <h3>Hobbies & Interests</h3>
            <div className="skill-input-group">
              <select
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
              >
                <option value="">Select hobby</option>
                {hobbyList.map(hobby => (
                  <option key={hobby} value={hobby}>{hobby}</option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => { addHobby(); }}
              >
                Add
              </button>
            </div>
            <div className="skills-chips">
              {hobbies.map(hobby => (
                <div key={hobby} className="skill-chip">
                  {hobby}
                  <button
                    type="button"
                    onClick={() => removeHobby(hobby)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
             type="submit"
             className="btn btn-primary btn-large"
             disabled={loading}
           >
             {loading ? 'Saving...' : 'Save All Details'}
           </button>
        </form>
      </div>
    </main>
  );
}

export default SkillsForm;
