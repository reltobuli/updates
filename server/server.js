const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const waitlistRoutes = require('./routes/WaitlistRoutes');
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');
const newsRoutes = require('./routes/newsRoutes');
const manuscriptRoutes = require('./routes/manuscriptRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const messageRoutes = require('./routes/messageRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const adminRoutes = require('./routes/adminRoutes');  

const app = express();

const uri = "mongodb+srv://raghadelt:mVWUcCDZ49Dv2fLO@cluster0.vapu5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true, 
  tlsAllowInvalidCertificates: true 
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/job-applications', jobApplicationRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/manuscripts', manuscriptRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/admin', adminRoutes); 

// Start Server
const PORT = process.env.PORT || 5030;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
