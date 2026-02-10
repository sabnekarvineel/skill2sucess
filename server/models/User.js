const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  degree: { type: String, required: true }, // BCA, B.Tech CSE, etc
  semester: { type: Number, required: true },
  cgpa: { type: Number, required: true },
  
  skills: {
    programming: [String],
    databases: [String],
    frameworks: [String],
    tools: [String],
    softSkills: [String],
    other: [String]
  },
  
  interests: [String],
  hobbies: [String],
  
  careerRecommendations: {
    jobRoles: [{
      role: String,
      suitabilityScore: Number,
      matchingSkills: [String],
      missingSkills: [String],
      recommendations: [String]
    }],
    higherStudies: [String],
    entranceExams: [String],
    skillGaps: [String]
  },
  
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  registeredAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare passwords
userSchema.methods.comparePassword = async function(plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
