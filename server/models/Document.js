const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: String,
  filename: String, // The actual file saved (e.g., signed-123abc.pdf)
  filePath: String, // Full server path to the file
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  signed: { type: Boolean, default: false },
  signedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  signedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
