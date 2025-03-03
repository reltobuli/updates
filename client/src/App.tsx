import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Journals from './pages/Journals';
import Resources from './pages/Resources';
import News from './pages/News';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import ProductionAndEditorialProcess from './pages/prod_edit';
import AI from './pages/AI';
import WaitlistForm from './forms/WaitlistForm';
import JobApplicationForm from './forms/JobApplicationForm';
import NewsPost from './components/NewsPost';
import NewsManagement from './components/admin/NewsManagement';
import ManuscriptSubmissionForm from './forms/ManuscriptSubmissionForm';
import SubmissionManagement from './components/admin/SubmissionManagement';
import PickSub from './pages/PickSub';
import SubInquire from './forms/SubInquire';
import Advice from './pages/Advice';
import JBAEM from './pages/JBAEM';
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import DashboardPage from "./pages/Dashboard";
import EditNews from "./pages/Editnews"; 
import AddNews from "./pages/Addnews";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();
  
  const isAdminRoute = location.pathname.startsWith('/admin') || 
                       location.pathname.startsWith('/DashboardPage') || 
                       location.pathname.startsWith('/edit-news') || 
                       location.pathname.startsWith('/add-news');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Conditionally render Navbar and Footer */}
      {!isAdminRoute && <Navbar />}
      
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/journals" element={<Journals />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/news" element={<News />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/AI" element={<AI />} />
          <Route path="/prod" element={<ProductionAndEditorialProcess />} />
          <Route path="/job-application" element={<JobApplicationForm />} />
          <Route path="/admin/submissions" element={<SubmissionManagement />} />
          <Route path="/waitlist" element={<WaitlistForm />} />
          <Route path="/news/:id" element={<NewsPost />} />
          <Route path="/news-management" element={<NewsManagement />} />
          <Route path="/manuscript-submission" element={<ManuscriptSubmissionForm />} />
          <Route path="/pick-submission" element={<PickSub />} />
          <Route path="/sub-inquire" element={<SubInquire />} />
          <Route path="/advice" element={<Advice />} />
          <Route path="/JBAEM" element={<JBAEM />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/DashboardPage" element={<DashboardPage />} />
          <Route path="/edit-news/:id" element={<EditNews />} />
          <Route path="/add-news" element={<AddNews />} />
        </Routes>
      </main>

      {/* Conditionally render Footer */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;

