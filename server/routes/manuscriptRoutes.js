const express = require('express');
const router = express.Router();
const multer = require('multer');
// Use memory storage so we can later store file buffers in MongoDB
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const ManuscriptSubmission = require('../models/ManuscriptSubmission');

// Handle manuscript submission
router.post('/', upload.fields([
  { name: 'manuscriptFile', maxCount: 1 },
  { name: 'supportingFiles', maxCount: 10 }
]), async (req, res) => {
  try {
    const {
      requirements,
      journalSelection,
      fullName,
      email,
      orcid,
      phone,
      coAuthors: coAuthorsStr,
      title,
      shortTitle,
      abstract,
      keywords: keywordsStr,
      coverLetter,
      confirmed
    } = req.body;

    // Parse JSON strings
    const coAuthors = JSON.parse(coAuthorsStr || '[]');
    const keywords = JSON.parse(keywordsStr || '[]');

    // Prepare file data
    const manuscriptFile = req.files?.manuscriptFile?.[0] ? {
      filename: req.files.manuscriptFile[0].originalname,
      data: req.files.manuscriptFile[0].buffer,
      contentType: req.files.manuscriptFile[0].mimetype
    } : null;

    const supportingFiles = req.files?.supportingFiles?.map(file => ({
      filename: file.originalname,
      data: file.buffer,
      contentType: file.mimetype
    })) || [];

    // Create and save a new manuscript submission document
    const newSubmission = new ManuscriptSubmission({
      requirements: JSON.parse(requirements),
      journalSelection: journalSelection,
      authorInfo: {
        fullName,
        email,
        orcid,
        phone
      },
      coAuthors,
      manuscriptFile,
      supportingFiles,
      metadata: {
        title,
        shortTitle,
        abstract,
        keywords: keywords.join(', ')
      },
      coverLetter,
      confirmed: confirmed === 'true'
    });

    await newSubmission.save();
    res.status(201).json(newSubmission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error creating manuscript submission' });
  }
});

module.exports = router;