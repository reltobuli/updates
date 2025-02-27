const express = require('express');
const router = express.Router();
const ManuscriptSubmission = require('../models/ManuscriptSubmission');
// const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const os = require('os');
const upload = multer({ storage: multer.memoryStorage() });
const convertapi = require('convertapi')('INSERT YOUR TOKEN HERE');
const nodemailer = require('nodemailer');
const mammoth = require('mammoth');

// Store verification codes temporarily (in production, use Redis or a database)
const verificationCodes = new Map();

// Email configuration for SendGrid
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 465,
  secure: true,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY 
  }
});

// Generate and send verification code
router.post('/send-verification', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Generate a 6-digit code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store the code with expiration (5 minutes)
    verificationCodes.set(email, {
      code: verificationCode,
      expiry: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    // Send email
    await transporter.sendMail({
      from: {
        name: 'Open Science Press',
        address: process.env.SENDGRID_VERIFIED_SENDER 
      },
      replyTo: 'contact@opensciencepress.com',
      to: email,
      subject: 'Open Science Press - Email Verification',
      headers: {
        'List-Unsubscribe': '<mailto:unsubscribe@opensciencepress.com>',
        'Precedence': 'bulk'
      },
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #2c3e50;">Open Science Press</h2>
          </div>
          <div style="background: #f9f9f9; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
            <p>Dear User,</p>
            <p>Thank you for registering with Open Science Press. Your verification code is:</p>
            <div style="background: #ffffff; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
              <h2 style="color: #2c3e50; margin: 0;">${verificationCode}</h2>
            </div>
            <p>This code will expire in 5 minutes.</p>
            <p>If you didn't request this verification, please ignore this email.</p>
          </div>
          <div style="font-size: 12px; color: #666; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
            <p>This is an automated message from Open Science Press. Please do not reply to this email.</p>
            <p> ${new Date().getFullYear()} Open Science Press. All rights reserved.</p>
            <p>To unsubscribe from these emails, <a href="mailto:unsubscribe@opensciencepress.com" style="color: #666;">click here</a></p>
          </div>
        </body>
        </html>
      `,
      text: `
        Open Science Press - Email Verification

        Your verification code is: ${verificationCode}

        This code will expire in 5 minutes.

        If you didn't request this verification, please ignore this email.

         ${new Date().getFullYear()} Open Science Press. All rights reserved.
      `
    });

    res.json({ message: 'Verification code sent successfully' });
  } catch (error) {
    console.error('Error sending verification code:', error);
    res.status(500).json({ error: 'Failed to send verification code' });
  }
});

// Verify the code
router.post('/verify-code', (req, res) => {
  const { email, code } = req.body;
  
  if (!email || !code) {
    return res.status(400).json({ error: 'Email and code are required' });
  }

  const storedData = verificationCodes.get(email);
  
  if (!storedData) {
    return res.status(400).json({ error: 'No verification code found for this email' });
  }

  if (Date.now() > storedData.expiry) {
    verificationCodes.delete(email);
    return res.status(400).json({ error: 'Verification code has expired' });
  }

  if (storedData.code !== code) {
    return res.status(400).json({ error: 'Invalid verification code' });
  }

  // Clean up the used code
  verificationCodes.delete(email);
  
  res.json({ message: 'Email verified successfully' });
});

// Get all submissions
router.get('/submissions', async (req, res) => {
  try {
    const submissions = await ManuscriptSubmission.find({}, {
      'metadata': 1,
      'authorInfo': 1,
      'journalSelection': 1,
      'submittedAt': 1,
      'createdAt': 1
    });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submissions', error: error.message });
  }
});

// Get submission by ID
router.get('/submissions/:id', async (req, res) => {
  try {
    const submission = await ManuscriptSubmission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submission', error: error.message });
  }
});

// Download manuscript file
router.get('/submissions/:id/manuscript', async (req, res) => {
  try {
    const submission = await ManuscriptSubmission.findById(req.params.id);
    if (!submission || !submission.manuscriptFile) {
      return res.status(404).json({ message: 'Manuscript file not found' });
    }
    
    res.set('Content-Type', submission.manuscriptFile.contentType);
    res.set('Content-Disposition', `attachment; filename="${submission.manuscriptFile.filename}"`);
    res.send(submission.manuscriptFile.data);
  } catch (error) {
    res.status(500).json({ message: 'Error downloading manuscript', error: error.message });
  }
});

// Get manuscript file content for PDF generation
router.get('/submissions/:id/manuscript-content', async (req, res) => {
  try {
    const submission = await ManuscriptSubmission.findById(req.params.id);
    if (!submission || !submission.manuscriptFile) {
      return res.status(404).json({ message: 'Manuscript file not found' });
    }
    
    res.set('Content-Type', submission.manuscriptFile.contentType);
    res.send(submission.manuscriptFile.data);
  } catch (error) {
    res.status(500).json({ message: 'Error getting manuscript content', error: error.message });
  }
});

// Download supporting file
router.get('/submissions/:id/supporting/:fileIndex', async (req, res) => {
  try {
    const submission = await ManuscriptSubmission.findById(req.params.id);
    const fileIndex = parseInt(req.params.fileIndex);
    
    if (!submission || !submission.supportingFiles || !submission.supportingFiles[fileIndex]) {
      return res.status(404).json({ message: 'Supporting file not found' });
    }
    
    const file = submission.supportingFiles[fileIndex];
    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', `attachment; filename="${file.filename}"`);
    res.send(file.data);
  } catch (error) {
    res.status(500).json({ message: 'Error downloading supporting file', error: error.message });
  }
});

// Convert DOCX to PDF endpoint
router.post('/convert-to-pdf', upload.single('file'), async (req, res) => {
  let tempFilePath = null;
  
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create a temporary file
    tempFilePath = path.join(os.tmpdir(), `document-${Date.now()}.docx`);
    await fs.promises.writeFile(tempFilePath, req.file.buffer);

    try {
      const result = await convertapi.convert('pdf', {
        File: tempFilePath
      }, 'docx');

      if (!result || !result.file || !result.file.url) {
        throw new Error("Conversion failed: No file returned");
      }

      res.json({ pdfUrl: result.file.url });
    } catch (error) {
      console.error('ConvertAPI error:', error);
      res.status(500).json({ error: 'Failed to convert file' });
    }
  } catch (error) {
    console.error('PDF conversion error:', error);
    res.status(500).json({ error: 'Failed to convert file' });
  } finally {
    // Clean up: delete the temporary file
    if (tempFilePath) {
      try {
        await fs.promises.unlink(tempFilePath);
      } catch (error) {
        console.error('Error deleting temporary file:', error);
      }
    }
  }
});

// Send manuscript submission notification email
async function sendSubmissionNotificationEmail(recipientEmail, recipientName, isMainAuthor, manuscriptTitle, journalSelection) {
  try {
    await transporter.sendMail({
      from: {
        name: 'Open Science Press',
        address: process.env.SENDGRID_VERIFIED_SENDER
      },
      replyTo: 'support@opensciencepress.com',
      to: recipientEmail,
      subject: 'Manuscript Submission Confirmation - Open Science Press',
      headers: {
        'List-Unsubscribe': '<mailto:unsubscribe@opensciencepress.com>',
        'Precedence': 'bulk'
      },
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Manuscript Submission Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #2c3e50;">Open Science Press</h2>
          </div>
          <div style="background: #f9f9f9; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
            <p>Dear ${recipientName},</p>
            <p>${isMainAuthor ? 
              `Your manuscript titled "${manuscriptTitle}" has been successfully submitted to ${journalSelection}.` :
              `You have been listed as a co-author on the manuscript titled "${manuscriptTitle}" which has been submitted to ${journalSelection}.`
            }</p>
            <p>Our editorial team will review your submission and contact you with further instructions. The review process typically takes 5-7 days.</p>
            <p>Best regards,<br>Open Science Press Editorial Team</p>
          </div>
          <div style="font-size: 12px; color: #666; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
            <p>This is an automated message from Open Science Press. Please do not reply to this email.</p>
            <p> ${new Date().getFullYear()} Open Science Press. All rights reserved.</p>
            <p>To unsubscribe from these emails, <a href="mailto:unsubscribe@opensciencepress.com" style="color: #666;">click here</a></p>
          </div>
        </body>
        </html>
      `,
      text: `
        Open Science Press - Manuscript Submission Confirmation

        Dear ${recipientName},

        ${isMainAuthor ? 
          `Your manuscript titled "${manuscriptTitle}" has been successfully submitted to ${journalSelection}.` :
          `You have been listed as a co-author on the manuscript titled "${manuscriptTitle}" which has been submitted to ${journalSelection}.`
        }

        Our editorial team will review your submission and contact you with further instructions. The review process typically takes 4-6 weeks.

        You can track the status of your submission by logging into your Open Science Press account.

        If you have any questions, please don't hesitate to contact our support team.

        Best regards,
        Open Science Press Editorial Team

        ${new Date().getFullYear()} Open Science Press. All rights reserved.
      `
    });
  } catch (error) {
    console.error('Error sending submission notification email:', error);
    // Don't throw the error - we don't want to fail the submission if email fails
  }
}

// Handle manuscript submission
router.post('/submit', upload.fields([
  { name: 'manuscriptFile', maxCount: 1 },
  { name: 'supportingFiles', maxCount: 10 }
]), async (req, res) => {
  try {
    const {
      journalSelection,
      authorInfo: authorInfoStr,
      coAuthors: coAuthorsStr,
      metadata: metadataStr,
      coverLetter,
    } = req.body;

    // Parse JSON strings
    const authorInfo = JSON.parse(authorInfoStr);
    const coAuthors = JSON.parse(coAuthorsStr);
    const metadata = JSON.parse(metadataStr);

    // Create new submission
    const submission = new ManuscriptSubmission({
      journalSelection,
      authorInfo,
      coAuthors,
      metadata,
      coverLetter,
      manuscriptFile: req.files?.manuscriptFile?.[0] ? {
        data: req.files.manuscriptFile[0].buffer,
        contentType: req.files.manuscriptFile[0].mimetype,
        filename: req.files.manuscriptFile[0].originalname
      } : null,
      supportingFiles: req.files?.supportingFiles?.map(file => ({
        data: file.buffer,
        contentType: file.mimetype,
        filename: file.originalname
      })) || []
    });

    await submission.save();

    // Send email notifications
    // Send to main author
    await sendSubmissionNotificationEmail(
      authorInfo.email,
      authorInfo.fullName,
      true,
      metadata.title,
      journalSelection
    );

    // Send to co-authors
    for (const coAuthor of coAuthors) {
      await sendSubmissionNotificationEmail(
        coAuthor.email,
        coAuthor.fullName,
        false,
        metadata.title,
        journalSelection
      );
    }

    res.status(201).json({ message: 'Manuscript submitted successfully' });
  } catch (error) {
    console.error('Error submitting manuscript:', error);
    res.status(500).json({ error: 'Failed to submit manuscript' });
  }
});

// Extract metadata from manuscript
router.post('/extract-metadata', upload.single('manuscriptFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload your manuscript file" });
    }
({


  // insert metadata extraction logic


    });
  } catch (error) {
    console.error("Metadata extraction error:", error);
    res.status(500).json({ error: "Failed to extract metadata" });
  }
});

module.exports = router;
