const express = require('express');
const router = express.Router();
const Inquiry = require('../models/inquiry');
const { verifyAdminToken } = require('../middleware/auth');

// Get all inquiries (Admin only)
router.get('/', verifyAdminToken, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

// Delete an inquiry (Admin only)
router.delete('/:id', verifyAdminToken, async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({ error: 'Failed to delete inquiry' });
  }
});

// Create a new message
router.post('/', async (req, res) => {
  try {
    const { name, email, interest, message } = req.body;

    // Validate required fields
    if (!name || !email || !interest || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create new message
    const newInquiry = new Inquiry({
      name,
      email,
      interest,
      message
    });

    // Save message to database
    await newInquiry.save();

    res.status(201).json({ message: 'Inquiry sent successfully' });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(500).json({ error: 'Failed to send inquiry' });
  }
});

module.exports = router;