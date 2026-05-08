// import { useState, useEffect } from 'react';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { toast, Toaster } from 'react-hot-toast';
// import { Lock, Eye, EyeOff, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
// import axios from 'axios';

// const ResetPassword = () => {
//   const [formData, setFormData] = useState({
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email;
//   const otp = location.state?.otp;

//   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

//   useEffect(() => {
//     if (!email || !otp) {
//       toast.error('Invalid access. Redirecting...');
//       setTimeout(() => navigate('/forgot-password'), 2000);
//     }
//   }, [email, otp, navigate]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validatePassword = () => {
//     if (formData.newPassword.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return false;
//     }
//     if (formData.newPassword !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!validatePassword()) return;

//     setLoading(true);
//     const toastId = toast.loading('Resetting password...');

//     try {
//       await axios.post(`${API_URL}/auth/reset-password`, {
//         email,
//         otp,
//         newPassword: formData.newPassword
//       });

//       toast.success('Password reset successfully!', { id: toastId });
      
//       setTimeout(() => {
//         navigate('/login');
//       }, 1500);

//     } catch (err) {
//       const errorMsg = err.response?.data?.message || 'Failed to reset password';
//       setError(errorMsg);
//       toast.error(errorMsg, { id: toastId });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!email || !otp) return null;

//   return (
//     <div className="min-h-screen bg-emerald-50 flex items-center justify-center py-12 px-4">
//       <Toaster position="top-center" reverseOrder={false} />
      
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.4 }}
//         className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100"
//       >
//         {/* Header Section */}
//         <div className="bg-emerald-600 p-8 text-center text-white relative overflow-hidden">
//           <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          
//           <motion.div 
//             initial={{ y: -20 }}
//             animate={{ y: 0 }}
//             className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/30"
//           >
//             <Lock size={30} />
//           </motion.div>
//           <h2 className="text-3xl font-bold tracking-tight">Reset Password</h2>
//           <p className="text-emerald-100 mt-1">Create a new password for your account</p>
//         </div>

//         <div className="p-8">
//           {/* Back Button */}
//           <Link 
//             to="/verify-otp"
//             state={{ email }}
//             className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold mb-6 transition-colors"
//           >
//             <ArrowLeft size={18} />
//             <span>Back</span>
//           </Link>

//           {/* Error Message */}
//           <AnimatePresence mode="wait">
//             {error && (
//               <motion.div 
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 text-sm"
//               >
//                 <span>{error}</span>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* New Password */}
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-600 ml-1">New Password</label>
//               <div className="relative group">
//                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="newPassword"
//                   value={formData.newPassword}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
//                   placeholder="Enter new password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               <p className="text-xs text-gray-500 ml-1">Must be at least 6 characters</p>
//             </div>

//             {/* Confirm Password */}
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-600 ml-1">Confirm Password</label>
//               <div className="relative group">
//                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
//                   placeholder="Confirm new password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
//                 >
//                   {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.02, backgroundColor: '#047857' }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               disabled={loading}
//               className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
//             >
//               {loading ? (
//                 <Loader2 className="animate-spin" size={20} />
//               ) : (
//                 <>
//                   <span>Reset Password</span>
//                   <CheckCircle2 size={18} />
//                 </>
//               )}
//             </motion.button>
//           </form>

//           <p className="text-center text-gray-500 mt-8 text-sm">
//             Remember your password?{' '}
//             <Link to="/login" className="text-emerald-600 font-bold hover:text-emerald-700 underline-offset-4 hover:underline transition-all">
//               Sign in here
//             </Link>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ResetPassword;


import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { Lock, Eye, EyeOff, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const otp = location.state?.otp;

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (!email || !otp) {
      toast.error('Invalid access. Redirecting...');
      setTimeout(() => navigate('/forgot-password'), 2000);
    }
  }, [email, otp, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validatePassword = () => {
    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validatePassword()) return;

    setLoading(true);
    const toastId = toast.loading('Resetting password...');

    try {
      console.log('Sending reset password request...', { 
        email, 
        otp: otp ? 'provided' : 'missing',
        password: '***' 
      });

      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        email,
        otp,
        newPassword: formData.newPassword
      });

      console.log('Reset response:', response.data);

      toast.success('Password reset successfully!', { id: toastId });
      
      // Clear form
      setFormData({ newPassword: '', confirmPassword: '' });
      
      setTimeout(() => {
        navigate('/login', { 
          state: { message: 'Password reset successful. Please login with your new password.' }
        });
      }, 1500);

    } catch (err) {
      console.error('Reset error:', err.response || err);
      
      const errorMsg = err.response?.data?.message || 'Failed to reset password. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (!email || !otp) return null;

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
            <Lock size={30} />
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tight">Reset Password</h2>
          <p className="text-emerald-100 mt-1">Create a new password for your account</p>
        </div>

        <div className="p-8">
          {/* Back Button */}
          <Link 
            to="/verify-otp"
            state={{ email }}
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
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

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 ml-1">New Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 ml-1">Must be at least 6 characters</p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 ml-1">Confirm Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#047857' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Resetting...</span>
                </>
              ) : (
                <>
                  <span>Reset Password</span>
                  <CheckCircle2 size={18} />
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

export default ResetPassword;