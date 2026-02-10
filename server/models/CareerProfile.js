const mongoose = require('mongoose');

const careerProfileSchema = new mongoose.Schema({
  jobRole: { type: String, required: true, unique: true },
  description: String,
  requiredSkills: {
    programming: [String],
    databases: [String],
    frameworks: [String],
    tools: [String]
  },
  softSkills: [String],
  avgSalary: String,
  jobMarketDemand: { type: String, enum: ['High', 'Medium', 'Low'] },
  learningPath: [String],
  companies: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CareerProfile', careerProfileSchema);
