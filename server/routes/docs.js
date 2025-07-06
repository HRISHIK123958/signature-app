const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb } = require('pdf-lib');

const upload = require('../middlewares/upload');
const authMiddleware = require('../middlewares/authMiddleware');
const roleCheck = require('../middlewares/roleCheck');
const Document = require('../models/Document');

// ✅ Upload PDF
router.post('/upload', authMiddleware, upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const doc = new Document({
      title: req.body.title,
      filename: req.file.filename,
      filePath: req.file.path,
      uploadedBy: req.user.id,
    });

    await doc.save();
    res.status(201).json({ message: 'File uploaded successfully', doc });
  } catch (err) {
    console.error('❌ Upload failed:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// ✅ List documents (Admin sees all, User sees their own)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const filter = req.user.role === 'Admin' ? {} : { uploadedBy: req.user.id };
    const docs = await Document.find(filter)
      .sort({ createdAt: -1 })
      .populate('signedBy', 'name');
    res.json(docs);
  } catch (err) {
    console.error('❌ Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// ✅ Sign PDF (Admin Only)
router.post('/sign/:id', authMiddleware, roleCheck('Admin'), async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Document not found' });

    // Read and modify the PDF
    const pdfBytes = fs.readFileSync(doc.filePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Embed signature image (JPEG)
    const signaturePath = path.join(__dirname, '../assets/signature.jpg');
    if (!fs.existsSync(signaturePath)) {
      return res.status(500).json({ error: 'Signature image not found' });
    }

    const signatureImage = fs.readFileSync(signaturePath);
    const jpgImage = await pdfDoc.embedJpg(signatureImage);

    firstPage.drawImage(jpgImage, {
      x: 50,
      y: 50,
      width: 150,
      height: 50,
    });

    firstPage.drawText(`Signed by ${req.user.name} on ${new Date().toLocaleString()}`, {
      x: 50,
      y: 40,
      size: 12,
      color: rgb(0, 0.53, 0.71),
    });

    // Save signed PDF
    const signedBytes = await pdfDoc.save();
    const signedFilename = `signed-${doc.filename}`;
    const signedPath = path.join('uploads', signedFilename);
    fs.writeFileSync(signedPath, signedBytes);

    // Update DB
    doc.signed = true;
    doc.signedBy = req.user.id;
    doc.signedAt = new Date();
    doc.filename = signedFilename;
    doc.filePath = signedPath;
    await doc.save();

    res.json({ message: 'Document signed successfully' });
  } catch (err) {
    console.error('❌ Signing error:', err);
    res.status(500).json({ error: 'Signing failed' });
  }
});

module.exports = router;
