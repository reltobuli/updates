import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FileDown, Eye, ArrowLeft, Search, FileText } from 'lucide-react';
import mammoth from 'mammoth';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

interface Submission {
  _id: string;
  metadata: {
    title: string;
    shortTitle?: string;
    abstract?: string;
    keywords?: string[];
  };
  authorInfo: {
    fullName: string;
    email: string;
    orcid?: string;
    phone?: string;
  };
  journalSelection: string;
  submittedAt: string;
  coAuthors?: {
    fullName: string;
    email: string;
    orcid?: string;
  }[];
  requirements?: string[];
  manuscriptFile?: {
    filename: string;
  };
  supportingFiles?: {
    filename: string;
  }[];
}

const SubmissionManagement: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get('INSERT_BACKEND_ENDPOINT/api/admin/submissions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubmissions(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching submissions');
      setLoading(false);
    }
  };

  const viewSubmission = async (id: string) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await axios.get(`INSERT_BACKEND_ENDPOINT/api/admin/submissions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedSubmission(response.data);
    } catch (error) {
      setError('Error fetching submission details');
    }
  };

  const downloadFile = async (submissionId: string, type: 'manuscript' | 'supporting', fileIndex?: number) => {
    const token = localStorage.getItem('adminToken');
    try {
      const url = type === 'manuscript' 
        ? `INSERT_BACKEND_ENDPOINT/api/admin/submissions/${submissionId}/manuscript`
        : `INSERT_BACKEND_ENDPOINT/api/admin/submissions/${submissionId}/supporting/${fileIndex}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = type === 'manuscript' 
        ? selectedSubmission?.manuscriptFile?.filename || 'manuscript'
        : selectedSubmission?.supportingFiles?.[fileIndex || 0]?.filename || 'supporting-file';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setError('Error downloading file');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  const filteredSubmissions = submissions.filter(submission =>
    submission.metadata.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.authorInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.journalSelection.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateReviewReadyPdf = async (submissionId: string) => {
    setIsGeneratingPdf(true);
    try {
      // Fetch the manuscript file content
      const response = await axios.get(`INSERT_BACKEND_ENDPOINT/api/admin/submissions/${submissionId}/manuscript-content`, {
        responseType: 'arraybuffer'
      });

      // Extract text from DOCX
      const { value: extractedText } = await mammoth.extractRawText({ arrayBuffer: response.data });

      // Create a new PDF document and register fontkit
      const pdfDoc = await PDFDocument.create();
      pdfDoc.registerFontkit(fontkit);

      // Load Ubuntu font
      const fontUrl = 'https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf';
      const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());
      const font = await pdfDoc.embedFont(fontBytes);

      // Layout settings
      const fontSize = 12;
      const margin = 50;
      const lineNumberWidth = 30;
      const spacing = 10;
      const firstLineIndent = 20;

      // Add the first page
      let page = pdfDoc.addPage();
      let { width, height } = page.getSize();
      let yPosition = height - margin;
      const availableWidth = width - margin - (lineNumberWidth + spacing) - margin;
      let globalLineCounter = 1;

      // Split text into paragraphs and remove the first page
      const paragraphs = extractedText.split(/\n\s*\n/).filter(para => para.trim() !== '');
      // Find the index where the main content starts (after title, authors, abstract)
      let startIndex = 0;
      for (let i = 0; i < paragraphs.length; i++) {
        if (paragraphs[i].toLowerCase().includes('introduction') || 
            paragraphs[i].toLowerCase().includes('background') ||
            paragraphs[i].match(/^\d+\.\s*introduction/i)) {
          startIndex = i;
          break;
        }
      }
      const contentParagraphs = paragraphs.slice(startIndex);

      // Helper function to wrap text
      function wrapParagraph(text: string, firstLineMaxWidth: number, lineMaxWidth: number): string[] {
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = '';
        let currentMax = firstLineMaxWidth;
        
        for (const word of words) {
          const testLine = currentLine ? currentLine + ' ' + word : word;
          if (font.widthOfTextAtSize(testLine, fontSize) > currentMax) {
            if (currentLine === '') {
              lines.push(word);
              currentMax = lineMaxWidth;
              currentLine = '';
            } else {
              lines.push(currentLine);
              currentLine = word;
              currentMax = lineMaxWidth;
            }
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) {
          lines.push(currentLine);
        }
        return lines;
      }

      // Process each paragraph
      for (const para of contentParagraphs) {
        const lines = wrapParagraph(para, availableWidth - firstLineIndent, availableWidth);
        
        for (let i = 0; i < lines.length; i++) {
          if (yPosition < margin + fontSize) {
            page = pdfDoc.addPage();
            ({ width, height } = page.getSize());
            yPosition = height - margin;
          }

          const textXPos = i === 0 ? 
            margin + lineNumberWidth + spacing + firstLineIndent : 
            margin + lineNumberWidth + spacing;

          // Draw line number
          page.drawText(globalLineCounter.toString(), {
            x: margin,
            y: yPosition,
            size: fontSize,
            font,
            color: rgb(0.5, 0.5, 0.5),
          });

          // Draw text
          page.drawText(lines[i], {
            x: textXPos,
            y: yPosition,
            size: fontSize,
            font,
            color: rgb(0, 0, 0),
          });

          // Double spacing: fontSize * 2 for the line height
          yPosition -= fontSize * 2;
          globalLineCounter++;
        }
        // Add extra space between paragraphs (double-spaced)
        yPosition -= fontSize * 2;
      }

      // Generate and download the PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'review-ready-manuscript.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Failed to generate review-ready PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10">
        <button 
          onClick={() => navigate('/admin')}
          className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Dashboard
        </button>

        {!selectedSubmission ? (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Manuscript Submissions</h1>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search submissions..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Journal
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submission Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubmissions.map((submission) => (
                    <tr key={submission._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 max-w-md" title={submission.metadata.title}>
                          {truncateText(submission.metadata.title, 50)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{truncateText(submission.authorInfo.fullName, 30)}</div>
                        <div className="text-sm text-gray-500">{truncateText(submission.authorInfo.email, 30)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {submission.journalSelection}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(submission.submittedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => viewSubmission(submission._id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Eye size={16} className="mr-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="">
              <button
                  onClick={() => setSelectedSubmission(null)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back to List
                </button>
                <h1 className="text-2xl font-bold text-gray-900 mt-10">Submission Details</h1>
                
              </div>
            </div>

            <div className="px-6 py-6 grid grid-cols-1 gap-6">
              <section className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Manuscript Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedSubmission.metadata.title}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Journal</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedSubmission.journalSelection}</p>
                  </div>
                  {selectedSubmission.metadata.abstract && (
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Abstract</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedSubmission.metadata.abstract}</p>
                    </div>
                  )}
                  {selectedSubmission.metadata.keywords && (
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Keywords</label>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {selectedSubmission.metadata.keywords.map((keyword, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <section className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Author Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedSubmission.authorInfo.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedSubmission.authorInfo.email}</p>
                  </div>
                  {selectedSubmission.authorInfo.orcid && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">ORCID</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedSubmission.authorInfo.orcid}</p>
                    </div>
                  )}
                  {selectedSubmission.authorInfo.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedSubmission.authorInfo.phone}</p>
                    </div>
                  )}
                </div>
              </section>

              {selectedSubmission.coAuthors && selectedSubmission.coAuthors.length > 0 && (
                <section className="border-b border-gray-200 pb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Co-Authors</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {selectedSubmission.coAuthors.map((coAuthor, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <p className="mt-1 text-sm text-gray-900">{coAuthor.fullName}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <p className="mt-1 text-sm text-gray-900">{coAuthor.email}</p>
                          </div>
                          {coAuthor.orcid && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700">ORCID</label>
                              <p className="mt-1 text-sm text-gray-900">{coAuthor.orcid}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Files</h2>
                <div className="space-y-4">
                  {selectedSubmission.manuscriptFile && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FileText size={20} className="text-gray-500 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            {selectedSubmission.manuscriptFile.filename}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => downloadFile(selectedSubmission._id, 'manuscript')}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <FileDown size={16} className="mr-2" />
                            Download Original
                          </button>
                          <button
                            onClick={() => generateReviewReadyPdf(selectedSubmission._id)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={isGeneratingPdf}
                          >
                            <FileDown size={16} className="mr-2" />
                            {isGeneratingPdf ? 'Generating...' : 'Download Review Ready'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedSubmission.supportingFiles && selectedSubmission.supportingFiles.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-md font-medium text-gray-900">Supporting Files</h3>
                      {selectedSubmission.supportingFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <FileText size={20} className="text-gray-500 mr-2" />
                            <span className="text-sm font-medium text-gray-900">
                              {file.filename}
                            </span>
                          </div>
                          <button
                            onClick={() => downloadFile(selectedSubmission._id, 'supporting', index)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <FileDown size={16} className="mr-2" />
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionManagement;
