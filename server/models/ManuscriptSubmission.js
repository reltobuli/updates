const mongoose = require('mongoose');

const manuscriptSubmissionSchema = new mongoose.Schema({
  // Step 1: Requirements (an array of strings that the user has checked)
  requirements: { type: [String], required: true },

  // Step 2: Journal selection (one of three options)
  journalSelection: { type: String, required: true },

  // Step 3: Author Information
  authorInfo: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    orcid: { type: String },
    phone: { type: String }
  },

  // Step 4: Co-Authors (each with full name, email, ORCID)
  coAuthors: [
    {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      orcid: { type: String }
    }
  ],

  // Step 5: Files – we store the main manuscript file and any supporting files
  manuscriptFile: {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    filename: { type: String, required: true }
  },
  supportingFiles: [
    {
      data: { type: Buffer, required: true },
      contentType: { type: String, required: true },
      filename: { type: String, required: true }
    }
  ],

  // Step 6: Metadata – title, short title, abstract, keywords
  metadata: {
    title: { type: String, required: true },
    shortTitle: { type: String },
    abstract: { type: String },
    keywords: { type: [String] }
  },

  // Step 7: Final confirmation flag (from review step)
  confirmed: { type: Boolean, default: false },

  // Cover Letter
  coverLetter: { type: String, required: true },

  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ManuscriptSubmission', manuscriptSubmissionSchema);