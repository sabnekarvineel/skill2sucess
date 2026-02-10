const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  examName: { type: String, required: true, unique: true },
  examType: { type: String, enum: ['Entrance', 'Competitive', 'Certification'], required: true },
  eligibility: String,
  examDate: Date,
  applicationDeadline: Date,
  resultDate: Date,
  syllabus: [String],
  applicationLink: String,
  preparationResources: [String],
  averageScore: String,
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exam', examSchema);
