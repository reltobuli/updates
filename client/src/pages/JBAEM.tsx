import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  ShieldCheck,
  BarChart4,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Reusable collapsible card component
interface CollapsibleCardProps {
  title: string;
  children: React.ReactNode;
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div
        className="cursor-pointer p-4 flex items-center justify-between bg-blue-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-bold">{title}</h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="p-4 border-t"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const JBAEM: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero / Intro Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 to-gray-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-500 mb-6"
          >
            Journal of the Best Available Evidence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Advancing Evidence-Based Healthcare: Concise Summaries of High-Quality Medical Research to Support Informed Clinical Decisions and Interdisciplinary Collaboration.
          </motion.p>
        </div>
      </section>

      {/* Sticky Table of Contents */}
      <nav className="sticky top-0 bg-white shadow z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex space-x-6 overflow-x-auto">
          <a href="#scope" className="text-blue-600 hover:underline">Scope</a>
          <a href="#editorial" className="text-blue-600 hover:underline">Editorial Board</a>
          <a href="#guidelines" className="text-blue-600 hover:underline">Guidelines</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Scope of the Journal */}
          <section id="scope">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <Cpu className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold">Scope of the Journal</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Journal of the Best Available Evidence in Medicine (JBAEM) serves as a platform for scholarly exchange across health systems and publishes concise summaries of high-quality medical research across specialties. It distills complex evidence into accessible, practical insights for healthcare professionals, promoting evidence-based practice and interdisciplinary collaboration.
              </p>
            </motion.div>
          </section>

          {/* Editorial Board Members */}
          <section id="editorial">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-8">
                <ShieldCheck className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold">Editorial Board Members</h2>
              </div>
              <div className="space-y-4">
                <CollapsibleCard title="Co-Editors-in-Chief">
                  <ul className="space-y-3 text-gray-700">
                    <li>
                      <span className="font-medium">Mestres, Carlos, MD, Ph.D., FETCS</span>
                      <br /><span className="italic text-sm">Spain</span>
                    </li>
                    <li>
                      <span className="font-medium">El Oakley, Reida, MBBS, FRCS, MD</span>
                      <br /><span className="italic text-sm">Libya</span>
                    </li>
                  </ul>
                </CollapsibleCard>

                <CollapsibleCard title="Senior Editors">
                  <ul className="text-gray-700">
                    <li>
                      <span className="font-medium">Olavi, Kaarle, ELO, MD, DPH, Dr. Med. Sc. (PhD)</span>
                      <br /><span className="italic text-sm">Finland</span>
                    </li>
                  </ul>
                </CollapsibleCard>

                <CollapsibleCard title="Associate Editor">
                  <ul className="space-y-3 text-gray-700">
                    <li>
                      <span className="font-medium">El Taguri, Adel, MBBCh, MSc, PhD</span>
                      <br /><span className="italic text-sm">Libya</span>
                    </li>
                    <li>
                      <span className="font-medium">Smer, Aiman, MD, FACC, FASE, FESC</span>
                      <br /><span className="italic text-sm">United Arab Emirates</span>
                    </li>
                  </ul>
                </CollapsibleCard>

                <CollapsibleCard title="Managing Editor">
                  <ul className="text-gray-700">
                    <li>
                      <span className="font-medium">Madhi, Ibteisam MBBS, MPH, MS</span>
                      <br /><span className="italic text-sm">Libya</span>
                    </li>
                  </ul>
                </CollapsibleCard>

                <CollapsibleCard title="Editorial Office ">
                  <ul className="space-y-4 text-gray-700">
                  <li>
                      <span className="font-medium">Language Editors:</span>
                    </li>
                    <li>
                      <span className="font-medium">Buaroush K.</span>
                      <br /><span className="block text-sm">MEd: University of Pittsburgh</span>
                      <span className="block text-sm">BA: Clarion State College</span>
                    </li>
                    <li>
                      <span className="font-medium">Elhoudiri E. </span>
                      <br /><span className="block text-sm">MRes: University of Plymouth</span>
                      <span className="block text-sm">BA: University of Plymouth</span>
                      <span className="block text-sm">PGCE: University of Exeter</span>
                    </li>
                    <li>
                      <span className="font-medium">El-Shwehdi S.</span>
                      <br /><span className="block text-sm">JD: University of Dayton</span>
                      <span className="block text-sm">BA: Wright State University</span>
                      <br />
                    </li>
                    <li>
                      <span className="font-medium">Production Editors:</span>
                    </li>
                    <li>
                      <span className="font-medium">Elmuttardi K. </span>
                      <br /><span className="block text-sm">BS: American University in Cairo</span>
                    </li>
                    <li>
                      <span className="font-medium">Elmhdui S.</span>
                      <br /><span className="block text-sm">BArch: University of Petra</span>
                    </li>
                  </ul>
                </CollapsibleCard>

                <CollapsibleCard title="Editorial Board Members (in Alphabetical Order)">
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>
                      <span className="font-medium">Almatmed, Abdelsalam, MD, MS</span>
                      <br /><span className="italic">United States of America</span>
                    </li>
                    <li>
                      <span className="font-medium">Bader, Feras, MD, MS, FACC, FHFSA, FHFA</span>
                      <br /><span className="italic">United Arab Emirates</span>
                    </li>
                    <li>
                      <span className="font-medium">Bendardaf, Riyad, MD, PhD, FRCP-UK, DOCENT</span>
                      <br /><span className="italic">United Arab Emirates</span>
                    </li>
                    <li>
                      <span className="font-medium">Bodalal, Zuhir, MD, MSc (Oncology)</span>
                      <br /><span className="italic">United States of America</span>
                    </li>
                    <li>
                      <span className="font-medium">Bughrara, Nibras, MD, FASA, FCCM</span>
                      <br /><span className="italic">United States of America</span>
                    </li>
                    <li>
                      <span className="font-medium">Dyub, Adel, MB, BCh, MSc, FRCS(C)</span>
                      <br /><span className="italic">Canada</span>
                    </li>
                    <li>
                      <span className="font-medium">Elfituri, Abdulbaset, PhD, MSc, Bsc</span>
                      <br /><span className="italic">Libya</span>
                    </li>
                    <li>
                      <span className="font-medium">El-Mansoury, Abdulla, Phd, Msc, Bsc</span>
                      <br /><span className="italic">Libya</span>
                    </li>
                    <li>
                      <span className="font-medium">El-Muttardi, Naguib, MBBch, Msc, MD, FRCS, FRCS(plst) Ed</span>
                      <br /><span className="italic">United Kingdom</span>
                    </li>
                    <li>
                      <span className="font-medium">Ghrew, Murad, MB, ChB, MD, CCST, FRCP, FFICM</span>
                      <br /><span className="italic">United Kingdom</span>
                    </li>
                    <li>
                      <span className="font-medium">Hassan, Saber, MBBS, MRCP</span>
                      <br /><span className="italic">Ireland</span>
                    </li>
                    <li>
                      <span className="font-medium">Lentini, Salvatore, FESC, FACC, FICS</span>
                      <br /><span className="italic">Italy</span>
                    </li>
                    <li>
                      <span className="font-medium">Menesi, Wisam, MD, FRCSC</span>
                      <br /><span className="italic">Canada</span>
                    </li>
                    <li>
                      <span className="font-medium">Momenah, Tarek, MBBS, FAAP, FRCPC(C), FACC, FSCAI</span>
                      <br /><span className="italic">Saudi Arabia</span>
                    </li>
                    <li>
                      <span className="font-medium">Petrou, Mario, PhD, FRCS (C-Th)</span>
                      <br /><span className="italic">United Kingdom</span>
                    </li>
                    <li>
                      <span className="font-medium">Tagouri, Yahia, MD</span>
                      <br /><span className="italic">United States of America</span>
                    </li>
                    <li>
                      <span className="font-medium">Tash, Adel, MD</span>
                      <br /><span className="italic">Saudi Arabia</span>
                    </li>
                  </ul>
                </CollapsibleCard>
              </div>
            </motion.div>
          </section>

          {/* Guidelines and Related Sections */}
          <section id="guidelines">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-8">
                <BarChart4 className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold">Guidelines &amp; Policies</h2>
              </div>
              <div className="space-y-4">
                {/* Section 1: Guidelines to Authors */}
                <CollapsibleCard title="Guidelines to Authors">
                  <div className="text-gray-700 text-sm space-y-4">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">Manuscript Format and Structure</h3>
                      
                      <div className="space-y-2">
                        <div className="pl-4">
                          <p><strong>A. Research Reports:</strong> Up to 3000 words (including references, figures, and tables) to report on novel findings from systematic studies.</p>
                        </div>

                        <div className="pl-4 space-y-2">
                          <p><strong>B. Analysis of the Best Available Evidence in Medicine:</strong></p>
                          <ul className="list-none pl-6 space-y-2">
                            <li>a. <strong>Systematic Reviews and Meta-Analyses:</strong> Comprehensive assessments that synthesize existing research and data. Up to 3000 words, including references, figures and/or tables.</li>
                            <li>b. <strong>Clinical Practice Guidelines:</strong> Evidence-based recommendations aimed at guiding clinical decisions and practices. Up to 2500 words, including references, figures and/or tables.</li>
                            <li>c. <strong>Experts Analysis of the Best Available Evidence:</strong> Focused review articles, commentaries, and viewpoints. Up to 2000 words, including references, figures and/or tables.</li>
                            <li>d. <strong>Editorials:</strong> By invitation only.</li>
                            <li>e. <strong>Post-Publication Peer Review:</strong> High-quality, relevant unsolicited post-publication peer review are welcome. Up to 500 words.</li>
                          </ul>
                        </div>

                        <div className="pl-4">
                          <p><strong>C. Special Articles:</strong> Important articles that may not fulfil the required format, and/or word count – subject to pre-submission approval.</p>
                        </div>

                        <div className="pl-4">
                          <p><strong>D. Case Reports and Images in Medicine:</strong> In-depth analyses of individual clinical cases, images, and short videos that enrich understanding in medical practice. Up to 1500 words, including references, figures and/or tables.</p>
                        </div>

                        <div className="pl-4">
                          <p><strong>E. Letter to the Editor:</strong> Up to 250 words, including references, figures and/or tables.</p>
                        </div>
                      </div>
                    </div>

                    <div className="italic text-gray-600 border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                      While preparing your manuscript for submission to JBAEM, adherence to the following formatting guidelines is advisable to facilitate the review process and enhance readability.
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">1. General Requirements</h3>
                        <p>All submissions must be in English language, using either American or British spelling conventions. Authors for whom English is a second language are advised to have their manuscript professionally edited for high-quality language prior to submission.</p>
                        <ul className="list-none pl-6 space-y-2">
                          <li>a. <strong>File Format:</strong> Manuscripts should be submitted in Microsoft Word format (.doc or .docx).</li>
                          <li>b. <strong>Figure Format:</strong> JPEG, PNG, TIFF, MP4 (in case of a video)</li>
                          <li>c. <strong>Font and Size:</strong> Use Times New Roman, Calibri, or Arial, formatted in 12-point size.</li>
                          <li>d. <strong>Line Spacing:</strong> Use double spacing throughout, including references and footnotes, for clarity in review.</li>
                          <li>e. <strong>Margins:</strong> 1 inch (2.54 cm) on all sides.</li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">2. Title Page</h3>
                        <p>The title page should consist of:</p>
                        <ul className="list-none pl-6 space-y-2">
                          <li>a. A concise title (maximum 50 words) that reflects the content and findings</li>
                          <li>b. Names of all authors along with their affiliations</li>
                          <li>c. Corresponding author's contact information</li>
                          <li>d. A short running title (no more than 50 characters)</li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">3. Abstract</h3>
                        <ul className="list-none pl-6 space-y-2">
                          <li>a. No more than 250 words, clearly structured with headings</li>
                          <li>b. Non-research report articles must be less than 2000 words</li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">4. Main Text Structure</h3>
                        <ul className="list-none pl-6 space-y-4">
                          <li>
                            <p><strong>a. Introduction:</strong></p>
                            <p className="pl-4">Clearly outline the historical or logical basis of the study without summarizing results. Extensive literature reviews are not appropriate. Conclude with a clear statement of the research aims.</p>
                          </li>
                          <li>
                            <p><strong>b. Materials and Methods:</strong></p>
                            <p className="pl-4">Provide enough detail, along with cited references, to allow full replication of the study. Authors must make materials and methods freely available to academic researchers as a condition of submission.</p>
                          </li>
                          <li>
                            <p><strong>c. Results:</strong></p>
                            <p className="pl-4">Present key findings objectively and concisely, using tables and figures as needed. Avoid interpretation or discussion of the data in this section.</p>
                          </li>
                          <li>
                            <p><strong>d. Discussion:</strong></p>
                            <p className="pl-4">Begin with a brief summary of major findings without repeating the abstract or results. Conclude with a concise interpretation of the study's relevance, including potential clinical, programmatic, or policy implications.</p>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">5. Document Formatting</h3>
                        <ul className="list-none pl-6 space-y-2">
                          <li>a. <strong>Headings and Subheadings:</strong> Use clear and informative headings and subheadings to organize content. Main section headings should be bold and title case.</li>
                          <li>b. <strong>Paragraphs:</strong> Start each paragraph with a new line, and ensure that paragraphs are not indented.</li>
                          <li>c. <strong>Numbering:</strong> Number each page in the top right corner.</li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">6. Figures and Tables</h3>
                        <ul className="list-none pl-6 space-y-2">
                          <li>a. Figures and tables can be placed at the end of the manuscript or included as separate files.</li>
                          <li>b. Each figure or table should be numbered and accompanied by a descriptive caption.</li>
                          <li>c. Ensure that figures are of high resolution (at least 300 dpi) and in JPEG, PNG, or TIFF format.</li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">7. References</h3>
                        <ul className="list-none pl-6 space-y-2">
                          <li>a. References may follow the citation style specified by the journal (Vancouver or APA style).</li>
                          <li>b. Our AI system automatically formats references upon submission if a DOI is provided.</li>
                          <li>c. List all authors in the reference list (up to six authors). For more than six authors, list the first six followed by "et al."</li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">8. Additional Requirements</h3>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium">Supplementary Materials</h4>
                            <p className="pl-4">Any supplementary materials should be clearly labeled and referenced in the text. Provide these materials in separate files.</p>
                          </div>

                          <div>
                            <h4 className="font-medium">Ethical Considerations</h4>
                            <ul className="list-none pl-6 space-y-2">
                              <li>• Provide informed written consent statements</li>
                              <li>• Include review board details and approval numbers</li>
                              <li>• State compliance with Declaration of Helsinki (2013)</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium">List of Abbreviations</h4>
                            <p className="pl-4">Include a list of abbreviations used in the text.</p>
                          </div>

                          <div>
                            <h4 className="font-medium">Acknowledgements</h4>
                            <p className="pl-4">Details of non-author contributors and their contributions should be specified with written permission.</p>
                          </div>

                          <div>
                            <h4 className="font-medium">Financial Disclosure</h4>
                            <p className="pl-4">Include statements about funding sources, grant numbers, and funder roles.</p>
                          </div>

                          <div>
                            <h4 className="font-medium">Conflict-of-interest</h4>
                            <p className="pl-4">Provide a conflict-of-interest disclosure statement or declaration of no conflicts.</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">Author Contributions</h3>
                        <p>Pertaining to the ICMJE guidelines, authors must disclose their contributions to:</p>
                        <ul className="list-disc pl-8 space-y-1">
                          <li>Study conception</li>
                          <li>Data collection</li>
                          <li>Analysis and interpretation</li>
                          <li>Manuscript writing</li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">Data Availability Statement</h3>
                        <p>The statement should include applicable data set information:</p>
                        <ul className="list-none pl-6 space-y-2">
                          <li>a) Repository name</li>
                          <li>b) Public domain resource name</li>
                          <li>c) Availability within article/supplementary materials</li>
                          <li>d) Available upon request (include contact details)</li>
                          <li>e) Available after embargo period</li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">Permissions</h3>
                        <p className="pl-4">Permission must be obtained for previously published illustrations. Authors must obtain and provide written copies to publishers.</p>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">Protection of Patients' Right to Privacy</h3>
                        <p className="pl-4">Identifying information should not be published in written descriptions, photographs, sonograms, CT scans, pedigrees, etc., unless the information is essential for scientific purposes and the patient or legal guardian gives informed consent for publication. Authors should remove patients' names from figures unless they have obtained informed consent from the patients. The journal abides by ICMJE guidelines:</p>
                        <ul className="list-decimal pl-8 space-y-2">
                          <li>Authors, not journals nor publishers, need to obtain the patient consent form before the publication and have the form properly archived. The consent forms are not to be uploaded with the cover letter or sent through email to editorial or publisher offices.</li>
                          <li>If the manuscript contains patient images that preclude anonymity, or a description that has obvious indication to the identity of the patient, a statement about obtaining informed patient consent should be indicated in the manuscript.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CollapsibleCard>

                {/* Section 2: Ethical Guidelines */}
                <CollapsibleCard title="Ethical Guidelines">
                  <div className="text-gray-700 text-sm space-y-4">
                    <p className="font-medium">
                      JBAEM adheres to the below ethical guidelines for publication and research.
                    </p>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-base">Authorship</h4>
                      <p>
                        Authors submitting a manuscript do so on the understanding that the manuscript has been read and approved by all authors and that all authors agree to the submission of the manuscript to the Journal. JBAEM adheres to the definition of authorship set up by the International Committee of Medical Journal Editors (ICMJE). According to the ICMJE criteria, authorship should be based on:
                      </p>
                      <ul className="list-decimal pl-6 space-y-2">
                        <li>Substantial contributions to the conception or design, data acquisition or analysis, and interpretation of data</li>
                        <li>Drafting or revising the article critically for important intellectual content</li>
                        <li>Final approval of the version to be published</li>
                      </ul>
                      <p>
                        Authors should meet all conditions stated above. It is a requirement that all authors have been accredited as appropriate upon submission of the manuscript. Contributors who do not qualify as authors should be mentioned under "Acknowledgements."
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-base">Acknowledgements</h4>
                      <p>
                        In this section please specify contributors to the article other than the authors accredited and all sources of financial support for the research conducted.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-base">Ethical Approvals</h4>
                      <p>
                        Authors of original studies conducted with human subjects should specifically state the ethical review and clearance of the protocol. Informed consent must be obtained from all participants. Studies involving subjects such as institutionalized children or intellectually challenged individuals, may need additional details of ethical clearance.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-base">Experimental Subjects</h4>
                      <p>
                        Experimentation involving human subjects will only be published if research has been conducted in full accordance with ethical principles, including the World Medical Association Declaration of Helsinki (2002, http://www.wma.net/e/policy/b3.htm) and any additional requirements of the country where the research was carried out. Manuscripts must be accompanied by a statement that the experiments were undertaken with the understanding and written consent of each subject and according to the principles mentioned above. All studies should include an explicit statement in the "Material and Methods" section identifying the review and ethics committee approval for each study, if applicable. Editors reserve the right to reject papers if there is doubt as to whether appropriate procedures were used.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-base">Ethics of Investigation</h4>
                      <p>
                        Manuscripts not in agreement with the guidelines of the Declaration of Helsinki will not be accepted for publication.
                      </p>
                    </div>
                  </div>
                </CollapsibleCard>

                {/* Section 3: Copyright */}
                <CollapsibleCard title="Copyright">
                  <div className="text-gray-700 text-sm space-y-2">
                    <p>
                      Authors submitting a manuscript do so on the understanding that the work and its essential substance have not been published before and is not being considered for publication elsewhere. The submission of the manuscript by the authors means that the authors automatically agree to assign exclusive copyright to the publisher. The work shall not be published elsewhere in any language without the written consent of the publisher. The articles published in this journal are protected by copyright, which covers translation rights and the exclusive right to reproduce and distribute all the articles printed in the journal. No material published in the journal may be stored, reproduced, or distributed in any form, including microfilm, videocassettes, or electronic databases, without prior written permission from the publisher. Authors must assign copyright upon acceptance of their manuscript for publication.
                    </p>
                   
                  </div>
                </CollapsibleCard>

                {/* Section 4: Peer-Review Policy */}
                <CollapsibleCard title="Peer-Review Policy">
                  <div className="text-gray-700 text-sm space-y-4">
                    <h3 className="text-xl font-semibold">Peer-Review Policy</h3>
                    <p className="mb-3">Characteristics of the peer-review process are:</p>
                    <ul className="list-disc pl-6 space-y-3">
                      <li>
                        All manuscripts are reviewed on the basis of a double-blind peer review process by at least two suitably qualified reviewers. Editors and reviewers involved in the review process are asked to disclose conflicts of interest resulting from direct competitive, collaborative, or other relationships with any of the authors, and remove oneself from cases in which such conflicts preclude an objective evaluation.
                      </li>
                      <li>
                        All publication decisions are made by the journal's editors-in-chief based on the reviews received from the reviewers. Members of the editorial board lend insight, advice, and guidance to the editors-in-chief and assist in decision-making on specific submissions. Additionally, editors will have the option of seeking additional reviews when needed. Authors will be informed when editors decide further review is required. Authors of papers that are not accepted are notified promptly.
                      </li>
                      <li>
                        The editorial team provides efficient administrative support for authors, reviewers, editors that allows JBAEM to maintain the integrity of peer-review with a rapid turnaround.
                      </li>
                      <li>
                        Our peer-review process is confidential as the identities of reviewers cannot be revealed. Reviewers are requested not to discuss any manuscript received for review from JBAEM, with anyone not directly involved in the review process.
                      </li>
                    </ul>
                  </div>
                </CollapsibleCard>
              </div>
            </motion.div>
          </section>
        </div>
      </main>

      {/* Optional CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Experience the Future of Research Publishing
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Embrace AI-driven solutions without compromising on quality and integrity.
            </p>
            <Link to="/pick-submission">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 
                transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Publish Now
            </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default JBAEM;
