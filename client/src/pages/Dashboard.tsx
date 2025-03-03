import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NewsPost from "../components/NewsPost";

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login"); 
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-8 shadow-lg text-center">
        <h1 className="text-4xl font-semibold">Admin Dashboard</h1>
        <p className="text-lg mt-2">Manage News, Posts, and more.</p>
      </header>

      {/* Main Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* News Post Section */}
        <div className="bg-white shadow-xl rounded-lg p-8 mb-8 space-y-6">
          <NewsPost />
        </div>

        {/* View All News Link */}
        <div className="mt-8 text-center">
          <Link
            to="/news"
            className="text-blue-600 hover:text-blue-800 font-medium text-lg transition duration-200"
          >
            View All News
          </Link>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;

