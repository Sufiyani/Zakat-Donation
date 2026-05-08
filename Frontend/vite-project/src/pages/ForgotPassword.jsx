import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { Mail, ArrowLeft, Loader2, Send } from 'lucide-react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const toastId = toast.loading('Sending OTP...');

    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      
      toast.success(response.data.message, { id: toastId });
      
      // Navigate to OTP verification page with email
      setTimeout(() => {
        navigate('/verify-otp', { state: { email } });
      }, 1000);

    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to send OTP';
      setError(errorMsg);
      toast.error(errorMsg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center py-12 px-4">
      <Toaster position="top-center" reverseOrder={false} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100"
      >
        {/* Header Section */}
        <div className="bg-emerald-600 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/30"
          >
            <Mail size={30} />
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tight">Forgot Password?</h2>
          <p className="text-emerald-100 mt-1">Enter your email to receive OTP</p>
        </div>

        <div className="p-8">
          {/* Back to Login Link */}
          <Link 
            to="/login"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Login</span>
          </Link>

          {/* Error Message */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 text-sm"
              >
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info Box */}
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-lg mb-6">
            <p className="text-emerald-800 text-sm leading-relaxed">
              Enter your registered email address and we'll send you a One-Time Password (OTP) to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#047857' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Send OTP</span>
                  <Send size={18} />
                </>
              )}
            </motion.button>
          </form>

          <p className="text-center text-gray-500 mt-8 text-sm">
            Remember your password?{' '}
            <Link to="/login" className="text-emerald-600 font-bold hover:text-emerald-700 underline-offset-4 hover:underline transition-all">
              Sign in here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;