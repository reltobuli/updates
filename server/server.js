require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const waitlistRoutes = require('./routes/WaitlistRoutes');
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');
// const adminRoutes = require('./routes/adminRoutes');
const newsRoutes = require('./routes/newsRoutes');
const manuscriptRoutes = require('./routes/manuscriptRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const messageRoutes = require('./routes/messageRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');

const app = express();
const uri = "INSERT MONGODB URI";
// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/job-applications', jobApplicationRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/admin', submissionRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/manuscripts', manuscriptRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/inquiries', inquiryRoutes);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
