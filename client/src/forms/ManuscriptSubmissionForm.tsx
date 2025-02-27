import React, { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';
import {
  CheckSquare,
  BookOpen,
  User,
  Users,
  UploadCloud,
  FileText,
  Check,
  Loader,
  AlertCircle
} from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import JSZip from 'jszip';

// Types for co-author and overall submission state
interface CoAuthor {
  fullName: string;
  email: string;
  orcid: string;
}

interface AuthorInfo {
  fullName: string;
  email: string;
  orcid: string;
  phone: string;
}

// Step indicator component (unchanged)
const StepIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const steps = [
    { id: 1, title: "Journal", icon: <BookOpen className="h-5 w-5" /> },
    { id: 2, title: "Requirements", icon: <CheckSquare className="h-5 w-5" /> },
    { id: 3, title: "Author Info", icon: <User className="h-5 w-5" /> },
    { id: 4, title: "Co-Authors", icon: <Users className="h-5 w-5" /> },
    { id: 5, title: "Uploads", icon: <UploadCloud className="h-5 w-5" /> },
    { id: 6, title: "Metadata", icon: <FileText className="h-5 w-5" /> },
    { id: 7, title: "Review", icon: <Check className="h-5 w-5" /> },
  ];

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex-1 flex items-center">
          <div className="flex flex-col items-center w-full">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center transition duration-200
                ${currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}
              `}
            >
              {step.icon}
            </div>
            <span
              className={`
                mt-2 text-xs text-center transition duration-200 
                ${currentStep >= step.id ? 'text-blue-600 font-semibold' : 'text-gray-500'}
              `}
            >
              {step.title}
            </span>
          </div>
          {index !== steps.length - 1 && (
            <div className="flex-1 h-1 bg-gray-200 mx-2">
              <div className={`h-1 ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ManuscriptSubmissionForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Journal selection
  const [journalSelection, setJournalSelection] = useState('');
  const journals = [
    {
      id: 1,
      name: 'Journal of Best Available Evidence in Medicine',
      description: 'Covering all aspects of medical research and clinical practice',
      disabled: false,
      link:'/JBAEM'
    },
    {
      id: 2,
      name: 'Engineering Sustainability and Green Technologies (ESGT) Journal',
      description: 'Coming Soon - A journal focused on engineering research and applications.',
      disabled: true,
      link:'#'
    },
    {
      id: 3,
      name: 'International University Journal- Humanities',
      description: 'Coming Soon - A journal exploring humanities and social sciences.',
      disabled: true,
      link:'#'
    }
  ];

  // Step 2: Requirements checkboxes
  const [requirements, setRequirements] = useState<string[]>([]);
  const submissionRequirements = [
    "This is original work and has not been published elsewhere.",
    "The manuscript is not currently under consideration by another journal.",
    "The submission follows the recommended formatting and style guidelines.",
    "The research meets all applicable ethical standards.",
    "I agree to the terms and conditions of submission."
  ];

  // Step 3: Author Information
  const [authorInfo, setAuthorInfo] = useState<AuthorInfo>({
    fullName: '',
    email: '',
    orcid: '',
    phone: ''
  });

  // Step 4: Co-Authors list
  const [coAuthors, setCoAuthors] = useState<CoAuthor[]>([]);
  const [coAuthorInput, setCoAuthorInput] = useState<CoAuthor>({
    fullName: '',
    email: '',
    orcid: ''
  });

  // Step 5: File Uploads and Cover Letter
  const [manuscriptFile, setManuscriptFile] = useState<File | null>(null);
  const [supportingFiles, setSupportingFiles] = useState<File[]>([]);
  const [coverLetter, setCoverLetter] = useState('');

  // Step 6: Metadata
  const [metadata, setMetadata] = useState({
    title: '',
    shortTitle: '',
    abstract: '',
    keywords: ''
  });

  // Step 7: Confirmation flag
  const [confirmed, setConfirmed] = useState(false);
  const [message, setMessage] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // New state for PDF generation
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // New state for ORCID and email verification
  const [hasOrcid, setHasOrcid] = useState<boolean | null>(null);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string | undefined>(undefined);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      currentStep === 6 &&
      manuscriptFile &&
      !metadata.title &&
      !metadata.abstract
    ) {
      setIsExtracting(true);
      handleExtractMetadata().finally(() => setIsExtracting(false));
    }
  }, [currentStep, manuscriptFile]);

  // Step validation
  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!journalSelection) {
          alert('Please select a journal to continue.');
          return false;
        }
        return true;
      case 2:
        if (requirements.length !== submissionRequirements.length) {
          alert('Please accept all requirements to continue.');
          return false;
        }
        return true;
      case 3:
        if (!authorInfo.fullName || !authorInfo.email) {
          alert('Please provide your full name and email to continue.');
          return false;
        }
        if (hasOrcid === null) {
          alert('Please indicate whether you have an ORCID ID.');
          return false;
        }
        if (hasOrcid && !authorInfo.orcid) {
          alert('Please provide your ORCID ID.');
          return false;
        }
        if (hasOrcid === false && !isEmailVerified) {
          return true; // Allow to proceed to verification
        }
        return true;
      case 4:
        return true; // Co-authors are optional
      case 5:
        if (!manuscriptFile) {
          alert('Please upload your manuscript file.');
          return false;
        }
        if (!coverLetter) {
          alert('Please provide a cover letter.');
          return false;
        }
        return true;
      case 6:
        if (!metadata.title || !metadata.abstract) {
          alert('Please provide manuscript title and abstract.');
          return false;
        }
        return true;
      case 7:
        if (!confirmed) {
          alert('Please confirm that all information is correct.');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  // Navigation helper functions
  const nextStep = () => {
    if (!validateStep()) {
      return;
    }
    if (currentStep === 3 && hasOrcid === false && !isEmailVerified) {
      setShowVerification(true);
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const previousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleRequirementChange = (req: string, checked: boolean) => {
    if (checked) {
      setRequirements(prev => [...prev, req]);
    } else {
      setRequirements(prev => prev.filter(item => item !== req));
    }
  };

  const addCoAuthor = () => {
    if (!coAuthorInput.fullName || !coAuthorInput.email) {
      alert('Co-author full name and email are required.');
      return;
    }
    setCoAuthors(prev => [...prev, coAuthorInput]);
    setCoAuthorInput({ fullName: '', email: '', orcid: '' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!confirmed) return;

    // Validate required fields
    if (!manuscriptFile) {
      alert('Please upload a manuscript file.');
      return;
    }

    if (!coverLetter) {
      alert('Please provide a cover letter.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('journalSelection', journalSelection);
      formData.append('authorInfo', JSON.stringify(authorInfo));
      formData.append('coAuthors', JSON.stringify(coAuthors));
      formData.append('metadata', JSON.stringify(metadata));
      formData.append('coverLetter', coverLetter);
      
      if (manuscriptFile) {
        formData.append('manuscriptFile', manuscriptFile);
      }
      
      if (supportingFiles.length > 0) {
        supportingFiles.forEach(file => formData.append('supportingFiles', file));
      }

      const response = await axios.post(
        'INSERT_BACKEND_ENDPOINT/api/submissions/submit',
        formData,
        { 
          headers: { 
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 201) {
        setIsSubmitted(true);
        setMessage('Manuscript submitted successfully!');
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      setMessage(error.response?.data?.error || 'Error submitting manuscript. Please try again.');
    }
  };

  // Helper to format ORCID
  const formatOrcid = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    const parts = [];
    for (let i = 0; i < digits.length; i += 4) {
      parts.push(digits.slice(i, i + 4));
    }
    return parts.join('-');
  };

  // Extract metadata using backend endpoint
  const handleExtractMetadata = async () => {
    if (!manuscriptFile) {
      alert("Please upload your manuscript file first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('manuscriptFile', manuscriptFile);

      const response = await axios.post('INSERT_BACKEND_ENDPOINT/api/submissions/extract-metadata', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMetadata(response.data);
    } catch (error) {
      console.error("Metadata extraction error:", error);
      alert("Failed to extract metadata. Please try again.");
    }
  };

  const handleGeneratePDF = async () => {
    if (!manuscriptFile) {
      alert("Please upload your manuscript file first.");
      return;
    }
    setIsGeneratingPdf(true);
    try {
      // Load the DOCX file using JSZip
      const arrayBuffer = await manuscriptFile.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);
      
      // Get the main document XML
      const documentXmlFile = zip.file("word/document.xml");
      if (!documentXmlFile) {
        throw new Error("document.xml not found in the DOCX file.");
      }
      let documentXml = await documentXmlFile.async("string");

      // Parse the XML so we can modify it
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(documentXml, "application/xml");

      // Look for the section properties element (w:sectPr) inside the body.
      const body = xmlDoc.getElementsByTagName("w:body")[0];
      if (body) {
        const sectPr = body.getElementsByTagName("w:sectPr")[0];
        if (sectPr) {
          // Add line numbering configuration
          const lineNumberingXml = `
            <w:lnNumType w:countBy="1" w:start="1" w:distance="720" w:restart="continuous"/>
          `.trim();

          // Create a temporary element to parse the XML string
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = lineNumberingXml;
          const lnNumTypeNode = tempDiv.firstChild;
          
          if (!lnNumTypeNode) {
            throw new Error("Failed to create line numbering element");
          }

          // Remove existing line numbering if present
          const existingLnNumType = sectPr.getElementsByTagName("w:lnNumType")[0];
          if (existingLnNumType) {
            sectPr.removeChild(existingLnNumType);
          }

          // Add the new line numbering configuration
          const importedNode = xmlDoc.importNode(lnNumTypeNode, true);
          sectPr.appendChild(importedNode);

          // Also need to update paragraph properties to enable line numbering
          const paragraphs = xmlDoc.getElementsByTagName("w:p");
          for (let i = 0; i < paragraphs.length; i++) {
            const paragraph = paragraphs[i];
            let pPr = paragraph.getElementsByTagName("w:pPr")[0];
            
            // Create paragraph properties if they don't exist
            if (!pPr) {
              pPr = xmlDoc.createElement("w:pPr");
              paragraph.insertBefore(pPr, paragraph.firstChild);
            }

            // Add suppressLineNumbers property (set to false)
            let suppressLines = pPr.getElementsByTagName("w:suppressLines")[0];
            if (!suppressLines) {
              suppressLines = xmlDoc.createElement("w:suppressLines");
              suppressLines.setAttribute("w:val", "false");
              pPr.appendChild(suppressLines);
            } else {
              suppressLines.setAttribute("w:val", "false");
            }
          }
        }
      }

      // Serialize the updated XML back to string
      const serializer = new XMLSerializer();
      const modifiedDocumentXml = serializer.serializeToString(xmlDoc);

      // Replace the document.xml file in the zip
      zip.file("word/document.xml", modifiedDocumentXml);

      // Generate a new DOCX Blob from the modified zip
      const newDocxBlob = await zip.generateAsync({ type: "blob" });

      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', newDocxBlob, 'document.docx');

      // Send the file to the backend for conversion
      const response = await fetch('INSERT_BACKEND_ENDPOINT/api/submissions/convert-to-pdf', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to convert file');
      }

      const { pdfUrl } = await response.json();
      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF.");
    }
    setIsGeneratingPdf(false);
  };

  // Function to send verification code
  const sendVerificationCode = async () => {
    try {
      const response = await fetch('INSERT_BACKEND_ENDPOINT/api/submissions/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: authorInfo.email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send verification code');
      }

      alert('Verification code has been sent to your email');
      setVerificationCode(''); // Set empty string to show input field
    } catch (error: any) {
      console.error('Error sending verification code:', error);
      alert(error?.message || 'Failed to send verification code');
    }
  };

  // Function to verify code
  const verifyCode = async () => {
    try {
      setIsVerifying(true);
      const response = await fetch('INSERT_BACKEND_ENDPOINT/api/submissions/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: authorInfo.email, code: verificationCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      setIsEmailVerified(true);
      setVerificationSuccess(true);
    } catch (error: any) {
      console.error('Error verifying code:', error);
      alert(error?.message || 'Failed to verify code');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerificationComplete = () => {
    setShowVerification(false);
    setVerificationCode(undefined);
    setVerificationSuccess(false);
    nextStep();
  };

  // Function to render verification modal
  const renderVerificationModal = () => {
    if (!showVerification) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Email Verification Required</h3>
          <p className="mb-4">Please verify your email address to continue.</p>
          
          {verificationSuccess ? (
            <div className="text-center">
              <div className="mb-4 text-green-600 font-medium text-lg">
                ✓ Email verified successfully!
              </div>
              <button
                onClick={handleVerificationComplete}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            </div>
          ) : (
            <>
              {verificationCode === undefined && (
                <button
                  onClick={sendVerificationCode}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mb-4"
                >
                  Send Verification Code
                </button>
              )}
              {verificationCode !== undefined && (
                <div>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter verification code"
                    className="w-full border rounded p-2 mb-4"
                  />
                  <button
                    onClick={verifyCode}
                    disabled={isVerifying}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {isVerifying ? "Verifying..." : "Verify Code"}
                  </button>
                </div>
              )}
            </>
          )}
          
          {!verificationSuccess && (
            <button
              onClick={() => {
                setShowVerification(false);
                setVerificationCode(undefined);
              }}
              className="w-full mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    );
  };

  // If submission is successful, show a success page
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="max-w-md text-center bg-white p-8 rounded shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Submission Successful!</h1>
          <p className="text-lg mb-8">
            Thank you for submitting your manuscript. Please wait for email updates regarding the status of your submission.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen  ">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-500 mb-4 sm:mb-6 pt-6 sm:pt-20">
          Manuscript Submission
        </h1>
        <StepIndicator currentStep={currentStep} />
        <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-8">
          {currentStep === 1 && (
            <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center">
              <BookOpen className="mr-2" /> Step 1: Journal Selection
            </h2>
            <div className="flex flex-col gap-4">
              {journals.map(journal => (
                <div
                  key={journal.name}
                  onClick={() => !journal.disabled && setJournalSelection(journal.name)}
                  className={`border rounded-lg p-3 sm:p-4 ${
                    journal.disabled 
                      ? 'cursor-not-allowed opacity-50 bg-gray-100 border-gray-300' 
                      : `cursor-pointer transition-colors hover:bg-blue-50 ${
                          journalSelection === journal.name 
                            ? 'border-blue-600 bg-blue-100' 
                            : 'border-gray-300'
                        }`
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <BookOpen className={`h-5 w-5 sm:h-6 sm:w-6 mr-2 ${
                      journal.disabled 
                        ? 'text-gray-400'
                        : journalSelection === journal.name 
                          ? 'text-blue-600' 
                          : 'text-gray-500'
                    }`} />
                    <span className={`font-semibold text-sm sm:text-base ${journal.disabled ? 'text-gray-500' : ''}`}>
                      {journal.name}
                      {/* Learn More button */}
                      <div className="relative group inline-block ml-2">
                        {journal.disabled ? (
                          <div>
                            <AlertCircle className="inline-block h-5 w-5 text-gray-400 cursor-not-allowed" />
                          </div>
                        ) : (
                          <a href={journal.link} target="_blank" rel="noopener noreferrer">
                            <AlertCircle className="inline-block h-5 w-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
                          </a>
                        )}
                        {!journal.disabled && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            Learn more about this journal
                          </div>
                        )}
                      </div>
                    </span>
                  </div>
                  <p className={`text-xs sm:text-sm ${journal.disabled ? 'text-gray-500' : 'text-gray-600'}`}>
                    {journal.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          
          )}

          {currentStep === 2 && (
            <div>
              <p className='text-xs sm:text-sm text-gray-500 italic pb-4'>
                *Our AI-Assisted Journal Systems are designed to facilitate submission and formatting of your manuscript upon uploading the full manuscript via this form.
              </p>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center">
                <CheckSquare className="mr-2 text-blue-600" /> Step 2: Submission Requirements
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {submissionRequirements.map(req => (
                  <div
                    key={req}
                    className="flex items-start"
                  >
                    <input
                      type="checkbox"
                      checked={requirements.includes(req)}
                      onChange={e => handleRequirementChange(req, e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm sm:text-base text-gray-700">{req}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center">
                <User className="mr-2" /> Step 3: Author Information
              </h2>
              <div className="mb-4">
                <label className="font-medium">Full Name *</label>
                <input
                  type="text"
                  value={authorInfo.fullName}
                  onChange={e => setAuthorInfo({ ...authorInfo, fullName: e.target.value })}
                  className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="font-medium">Institutional or Personal Email *</label>
                <input
                  type="email"
                  value={authorInfo.email}
                  onChange={e => setAuthorInfo({ ...authorInfo, email: e.target.value })}
                  className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Do you have an ORCID ID?</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={hasOrcid === true}
                      onChange={() => setHasOrcid(true)}
                      className="form-radio"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={hasOrcid === false}
                      onChange={() => setHasOrcid(false)}
                      className="form-radio"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
              {hasOrcid && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">ORCID ID</label>
                  <input
                    type="text"
                    value={authorInfo.orcid}
                    onChange={e => setAuthorInfo({ ...authorInfo, orcid: formatOrcid(e.target.value) })}
                    className="w-full p-2 border rounded"
                    placeholder="Enter your ORCID ID"
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="font-medium">Phone Number</label>
                <input
                  type="tel"
                  value={authorInfo.phone}
                  onChange={e => setAuthorInfo({ ...authorInfo, phone: e.target.value })}
                  className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center">
                <Users className="mr-2" /> Step 4: Add Co-Authors
              </h2>
              <div className="mb-6 border rounded p-4">
                <h3 className="font-medium mb-2">Add a Co-Author</h3>
                <div className="mb-4 space-y-2">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={coAuthorInput.fullName}
                    onChange={e => setCoAuthorInput({ ...coAuthorInput, fullName: e.target.value })}
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={coAuthorInput.email}
                    onChange={e => setCoAuthorInput({ ...coAuthorInput, email: e.target.value })}
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  />
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="ORCID ID (xxxx-xxxx-xxxx-xxxx)"
                      value={coAuthorInput.orcid}
                      onChange={e => setCoAuthorInput({ ...coAuthorInput, orcid: formatOrcid(e.target.value) })}
                      className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    />
                    <button
                      type="button"
                      onClick={() => window.open(`https://orcid.org/${coAuthorInput.orcid.replace(/-/g, '')}`, "_blank")}
                      className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors"
                      disabled={coAuthorInput.orcid.replace(/-/g, '').length !== 16}
                    >
                      Verify Account
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  onClick={addCoAuthor}
                >
                  Add Co-Author
                </button>
              </div>
              {coAuthors.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Co-Authors Added:</h3>
                  <ul className="list-disc pl-5">
                    {coAuthors.map((author, index) => (
                      <li key={index}>{author.fullName} ({author.email})</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center">
                <UploadCloud className="mr-2" /> Step 5: Upload Your Files & Cover Letter
              </h2>
              <div className="mb-6">
                <label className="font-medium block mb-1">Manuscript File (.docx)</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    accept=".docx"
                    onChange={e => setManuscriptFile(e.target.files ? e.target.files[0] : null)}
                    className="flex-1 border rounded p-2"
                  />
                  {manuscriptFile && (
                    <span className="text-green-600">✓ {manuscriptFile.name}</span>
                  )}
                </div>
              </div>
              <div className="mb-6">
                <label className="font-medium block mb-1">Supporting Files (optional)</label>
                <input
                  type="file"
                  multiple
                  onChange={e => {
                    if (e.target.files) {
                      setSupportingFiles(Array.from(e.target.files));
                    }
                  }}
                  className="w-full border rounded p-2"
                />
                {supportingFiles.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium">Selected files:</p>
                    <ul className="list-disc pl-5">
                      {supportingFiles.map((file, index) => (
                        <li key={index} className="text-sm">{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="mb-6">
                <label className="font-medium block mb-2">Cover Letter *</label>
                <p className="text-sm text-gray-600 mb-2">
                  Please provide a cover letter explaining why your manuscript should be published in our journal.
                </p>
                <ReactQuill
                  theme="snow"
                  value={coverLetter}
                  onChange={value => setCoverLetter(value)}
                  className="bg-white"
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, false] }],
                      ['bold', 'italic', 'underline'],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      ['clean']
                    ]
                  }}
                />
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center">
                <FileText className="mr-2" /> Step 6: Manuscript Metadata
              </h2>
              {isExtracting && (
                <div className="mb-4 p-4 bg-blue-100 border border-blue-300 rounded text-center font-medium flex items-center justify-center">
                  <Loader className='animate-spin mr-2 text-blue-600'/> 
                  <p className='text-blue-600'>Extracting metadata using AI...</p>
                </div>
              )}
              <div className="mb-6">
                <label className="font-medium">Title *</label>
                <input
                  type="text"
                  value={metadata.title}
                  onChange={e => setMetadata({ ...metadata, title: e.target.value })}
                  className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  required
                  disabled={isExtracting}
                />
              </div>
              <div className="mb-6">
                <label className="font-medium">Short Title</label>
                <input
                  type="text"
                  value={metadata.shortTitle}
                  onChange={e => setMetadata({ ...metadata, shortTitle: e.target.value })}
                  className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  disabled={isExtracting}
                />
              </div>
              <div className="mb-6">
                <label className="font-medium">Abstract *</label>
                <ReactQuill
                  theme="snow"
                  value={metadata.abstract}
                  onChange={value => setMetadata(prev => ({ ...prev, abstract: value }))}
                  readOnly={isExtracting}
                />
              </div>
              <div className="mb-6">
                <label className="font-medium">Keywords (comma separated)</label>
                <input
                  type="text"
                  value={metadata.keywords}
                  onChange={e => setMetadata({ ...metadata, keywords: e.target.value })}
                  className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  disabled={isExtracting}
                />
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center flex items-center justify-center">
                <Check className="mr-2" /> Step 7: Review Your Submission
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Journal Selection</h3>
                  <p className="text-gray-700">{journalSelection}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Author Information</h3>
                  <p className="text-gray-700"><strong>Name:</strong> {authorInfo.fullName}</p>
                  <p className="text-gray-700"><strong>Email:</strong> {authorInfo.email}</p>
                  <p className="text-gray-700"><strong>ORCID:</strong> {authorInfo.orcid || '-'}</p>
                  <p className="text-gray-700"><strong>Phone:</strong> {authorInfo.phone || '-'}</p>
                </div>
                {coAuthors.length > 0 && (
                  <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Co-Authors</h3>
                    <ul className="list-disc pl-5">
                      {coAuthors.map((author, index) => (
                        <li key={index}>
                          {author.fullName} ({author.email})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Manuscript Metadata</h3>
                  <p className="text-gray-700"><strong>Title:</strong> {metadata.title}</p>
                  <p className="text-gray-700"><strong>Short Title:</strong> {metadata.shortTitle}</p>
                  <div>
                    <strong className="text-gray-700">Abstract:</strong>
                    <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: metadata.abstract }} />
                  </div>
                  <p className="text-gray-700"><strong>Keywords:</strong> {metadata.keywords}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Cover Letter</h3>
                  <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: coverLetter }} />
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Uploaded Files</h3>
                  <p className="text-gray-700"><strong>Manuscript File:</strong> {manuscriptFile ? manuscriptFile.name : "None"}</p>
                  <div className="mt-2">
                    <p className="font-semibold text-gray-700">Supporting Files:</p>
                    {supportingFiles.length > 0 ? (
                      <ul className="list-disc pl-5 text-gray-700">
                        {supportingFiles.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700">None</p>
                    )}
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Manuscript PDF Preview</h3>
                  {pdfUrl ? (
                    <a
                      href={pdfUrl}
                      download="manuscript.pdf"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      Download PDF Preview
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={handleGeneratePDF}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                      disabled={isGeneratingPdf}
                    >
                      {isGeneratingPdf ? "Generating PDF..." : "Generate PDF Preview"}
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    onChange={e => setConfirmed(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    I confirm that all information is correct.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 sm:mt-8 space-x-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={previousStep}
                className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            <button
              type={currentStep === 7 ? "submit" : "button"}
              onClick={currentStep < 7 ? nextStep : undefined}
              disabled={
                (currentStep === 1 && !journalSelection) || 
                (currentStep === 2 && requirements.length !== submissionRequirements.length) ||
                (currentStep === 7 && !confirmed)
              }
              className="bg-blue-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-colors ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 7 ? "Submit" : "Next"}
            </button>
          </div>
        </form>
        {message && <p className="mt-6 text-center font-medium">{message}</p>}
      </div>
      {renderVerificationModal()}
    </div>
  );
};

export default ManuscriptSubmissionForm;
