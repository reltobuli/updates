import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5030/api/admin/login", { email, password });
      localStorage.setItem("adminToken", response.data.token);
      navigate("/DashboardPage"); 
    } catch (err) {
      setError("Invalid admin credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full"
      >
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ type: "spring", stiffness: 150 }}
          >
            <Shield className="w-12 h-12 text-gray-700 mx-auto" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-700 mt-4">Admin Panel</h2>
          <p className="text-gray-500">Login to manage the dashboard</p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Admin Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-red-500 text-center"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit" 
            className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 transition-all"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
