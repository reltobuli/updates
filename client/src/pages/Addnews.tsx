import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddNews = () => {
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState({
    title: "",
    date: "Coming Soon",
    description: "",
    image: "",
    link: "#",
    isBlogPost: false,
    blogContent: "",
    hasSpecificDate: false,
  });
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";

    setNewsItem((prevState) => ({
      ...prevState,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setError("Unauthorized: Admin login required.");
      navigate("/admin/login");
      return;
    }

    try {
      console.log("Submitting data:", newsItem);
      const response = await axios.post("http://localhost:5030/api/news", newsItem, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response:", response.data);
      alert("News added successfully!");
      navigate("/DashboardPage");
    } catch (err: any) {
      console.error("Error response:", err.response?.data);
      setError(err.response?.data?.message || "Failed to add news.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Add News</h2>
      {error && <p className="text-red-500 text-center mb-6">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <label className="block font-medium mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={newsItem.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />

        {/* Description */}
        <label className="block font-medium mb-2">Description</label>
        <textarea
          name="description"
          value={newsItem.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />

        {/* Image URL */}
        <label className="block font-medium mb-2">Image URL</label>
        <input
          type="text"
          name="image"
          value={newsItem.image}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />

        {/* Link (Optional) */}
        <label className="block font-medium mb-2">Link (optional)</label>
        <input
          type="text"
          name="link"
          value={newsItem.link}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        {/* Checkbox: Is Blog Post */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isBlogPost"
            checked={newsItem.isBlogPost}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-lg font-medium">Is Blog Post?</label>
        </div>

        {/* Blog Content (if Blog Post) */}
        {newsItem.isBlogPost && (
          <>
            <label className="block font-medium mb-2">Blog Content</label>
            <textarea
              name="blogContent"
              value={newsItem.blogContent}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add News
        </button>
      </form>
    </div>
  );
};

export default AddNews;

