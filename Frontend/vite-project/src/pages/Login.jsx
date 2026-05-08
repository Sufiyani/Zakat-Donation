// import { useState, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { authAPI } from '../services/api';
// import { motion, AnimatePresence } from 'framer-motion'; 
// import { toast, Toaster } from 'react-hot-toast';
// import { LogIn, Mail, Lock, Loader2, CheckCircle2 } from 'lucide-react';

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     const toastId = toast.loading('Authenticating...');

//     try {
//       const response = await authAPI.login(formData);
//       const { token, ...userData } = response.data;
      
//       toast.success('Login Successful! Redirecting...', { id: toastId });
      
//       login(userData, token);
      
//       setTimeout(() => {
//         navigate(userData.role === 'admin' ? '/admin' : '/dashboard');
//       }, 1200);

//     } catch (err) {
//       const errorMsg = err.response?.data?.message || 'Login failed';
//       setError(errorMsg);
//       toast.error(errorMsg, { id: toastId });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-emerald-50 flex items-center justify-center py-12 px-4">
//       <Toaster position="top-center" reverseOrder={false} />
      
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.4 }}
//         className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100"
//       >
//         <div className="bg-emerald-600 p-8 text-center text-white relative overflow-hidden">
//           {/* Background Decoration */}
//           <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          
//           <motion.div 
//             initial={{ y: -20 }}
//             animate={{ y: 0 }}
//             className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/30"
//           >
//             <LogIn size={30} />
//           </motion.div>
//           <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
//           <p className="text-emerald-100 mt-1">Sign in to your Zakat account</p>
//         </div>

//         <div className="p-8">
//           <AnimatePresence mode="wait">
//             {error && (
//               <motion.div 
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 text-sm flex items-center gap-2"
//               >
//                 <span>{error}</span>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-600 ml-1">Email Address</label>
//               <div className="relative group">
//                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
//                   placeholder="name@example.com"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-600 ml-1">Password</label>
//               <div className="relative group">
//                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
//                   placeholder="••••••••"
//                 />
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
//                   <span>Sign In</span>
//                   <CheckCircle2 size={18} />
//                 </>
//               )}
//             </motion.button>
//           </form>

//           <p className="text-center text-gray-500 mt-8 text-sm">
//             Don't have an account?{' '}
//             <Link to="/register" className="text-emerald-600 font-bold hover:text-emerald-700 underline-offset-4 hover:underline transition-all">
//               Register here
//             </Link>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;

// src/pages/Login.jsx
// import { useState, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { authAPI } from '../services/api';
// import { motion, AnimatePresence } from 'framer-motion'; 
// import { toast, Toaster } from 'react-hot-toast';
// import { LogIn, Mail, Lock, Loader2, CheckCircle2 } from 'lucide-react';

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [googleLoading, setGoogleLoading] = useState(false);
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     const toastId = toast.loading('Authenticating...');

//     try {
//       const response = await authAPI.login(formData);
//       const { token, ...userData } = response.data;
      
//       toast.success('Login Successful! Redirecting...', { id: toastId });
      
//       login(userData, token);
      
//       setTimeout(() => {
//         navigate(userData.role === 'admin' ? '/admin' : '/dashboard');
//       }, 1200);

//     } catch (err) {
//       const errorMsg = err.response?.data?.message || 'Login failed';
//       setError(errorMsg);
//       toast.error(errorMsg, { id: toastId });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = () => {
//     setGoogleLoading(true);
//     toast.loading('Redirecting to Google...');
    
//     // Redirect to backend Google OAuth endpoint
//     const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
//     window.location.href = `${API_URL}/auth/google`;
//   };

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
//             <LogIn size={30} />
//           </motion.div>
//           <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
//           <p className="text-emerald-100 mt-1">Sign in to your Zakat account</p>
//         </div>

//         <div className="p-8">
//           {/* Error Message */}
//           <AnimatePresence mode="wait">
//             {error && (
//               <motion.div 
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 text-sm flex items-center gap-2"
//               >
//                 <span>{error}</span>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Google Login Button */}
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={handleGoogleLogin}
//             disabled={googleLoading || loading}
//             type="button"
//             className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all flex items-center justify-center space-x-3 mb-6 disabled:opacity-70"
//           >
//             {googleLoading ? (
//               <Loader2 className="animate-spin" size={20} />
//             ) : (
//               <>
//                 <svg className="w-5 h-5" viewBox="0 0 24 24">
//                   <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                   <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                   <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                   <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                 </svg>
//                 <span>Continue with Google</span>
//               </>
//             )}
//           </motion.button>

//           {/* Divider */}
//           <div className="relative my-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-200"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-white text-gray-500 font-medium">Or continue with email</span>
//             </div>
//           </div>

//           {/* Email/Password Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-600 ml-1">Email Address</label>
//               <div className="relative group">
//                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
//                   placeholder="name@example.com"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <div className="flex justify-between items-center">
//                 <label className="text-sm font-semibold text-gray-600 ml-1">Password</label>
//                 <Link 
//                   to="/forgot-password" 
//                   className="text-xs text-emerald-600 font-semibold hover:text-emerald-700 hover:underline transition-all"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//               <div className="relative group">
//                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
//                   placeholder="••••••••"
//                 />
//               </div>
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.02, backgroundColor: '#047857' }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               disabled={loading || googleLoading}
//               className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
//             >
//               {loading ? (
//                 <Loader2 className="animate-spin" size={20} />
//               ) : (
//                 <>
//                   <span>Sign In</span>
//                   <CheckCircle2 size={18} />
//                 </>
//               )}
//             </motion.button>
//           </form>

//           <p className="text-center text-gray-500 mt-8 text-sm">
//             Don't have an account?{' '}
//             <Link to="/register" className="text-emerald-600 font-bold hover:text-emerald-700 underline-offset-4 hover:underline transition-all">
//               Register here
//             </Link>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;


// import { useState, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { authAPI } from '../services/api';
// import { motion, AnimatePresence } from 'framer-motion'; 
// import { toast, Toaster } from 'react-hot-toast';
// import { LogIn, Mail, Lock, Loader2, CheckCircle2 } from 'lucide-react';

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [googleLoading, setGoogleLoading] = useState(false);
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     const toastId = toast.loading('Authenticating...');

//     try {
//       const response = await authAPI.login(formData);
//       const { token, ...userData } = response.data;
      
//       toast.success('Login Successful! Redirecting...', { id: toastId });
      
//       login(userData, token);
      
//       setTimeout(() => {
//         navigate(userData.role === 'admin' ? '/admin' : '/dashboard');
//       }, 1200);

//     } catch (err) {
//       const errorMsg = err.response?.data?.message || 'Login failed';
//       setError(errorMsg);
//       toast.error(errorMsg, { id: toastId });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = () => {
//     setGoogleLoading(true);
//     toast.loading('Redirecting to Google...');
    
//     // Redirect to backend Google OAuth endpoint
//     const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
//     window.location.href = `${API_URL}/auth/google`;
//   };

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
//             <LogIn size={30} />
//           </motion.div>
//           <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
//           <p className="text-emerald-100 mt-1">Sign in to your Zakat account</p>
//         </div>

//         <div className="p-8">
//           {/* Error Message */}
//           <AnimatePresence mode="wait">
//             {error && (
//               <motion.div 
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 text-sm flex items-center gap-2"
//               >
//                 <span>{error}</span>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Google Login Button */}
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={handleGoogleLogin}
//             disabled={googleLoading || loading}
//             type="button"
//             className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all flex items-center justify-center space-x-3 mb-6 disabled:opacity-70"
//           >
//             {googleLoading ? (
//               <Loader2 className="animate-spin" size={20} />
//             ) : (
//               <>
//                 <svg className="w-5 h-5" viewBox="0 0 24 24">
//                   <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                   <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                   <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                   <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                 </svg>
//                 <span>Continue with Google</span>
//               </>
//             )}
//           </motion.button>

//           {/* Divider */}
//           <div className="relative my-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-200"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-white text-gray-500 font-medium">Or continue with email</span>
//             </div>
//           </div>

//           {/* Email/Password Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-600 ml-1">Email Address</label>
//               <div className="relative group">
//                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
//                   placeholder="name@example.com"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <div className="flex justify-between items-center">
//                 <label className="text-sm font-semibold text-gray-600 ml-1">Password</label>
//                 <Link 
//                   to="/forgot-password" 
//                   className="text-xs text-emerald-600 font-semibold hover:text-emerald-700 hover:underline transition-all"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//               <div className="relative group">
//                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
//                   placeholder="••••••••"
//                 />
//               </div>
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.02, backgroundColor: '#047857' }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               disabled={loading || googleLoading}
//               className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
//             >
//               {loading ? (
//                 <Loader2 className="animate-spin" size={20} />
//               ) : (
//                 <>
//                   <span>Sign In</span>
//                   <CheckCircle2 size={18} />
//                 </>
//               )}
//             </motion.button>
//           </form>

//           <p className="text-center text-gray-500 mt-8 text-sm">
//             Don't have an account?{' '}
//             <Link to="/register" className="text-emerald-600 font-bold hover:text-emerald-700 underline-offset-4 hover:underline transition-all">
//               Register here
//             </Link>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;


import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion'; 
import { toast, Toaster } from 'react-hot-toast';
import { LogIn, Mail, Lock, Loader2, CheckCircle2 } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const toastId = toast.loading('Checking credentials...');

    try {
      const response = await authAPI.login(formData);
      
      // Backend se response.data nikalna
      const { token, user } = response.data;

      if (token && user) {
        toast.success(`Welcome back, ${user.name}!`, { id: toastId });
        
        // AuthContext ka login call karna (Ye localStorage aur headers set karega)
        login(user, token);
        
        // Thora sa delay taake user ko success message dikh jaye
        setTimeout(() => {
          if (user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        }, 1000);
      } else {
        // Agar backend se token ya user missing ho
        throw new Error("Invalid server response. Please try again.");
      }

    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed. Please check your email and password.';
      setError(errorMsg);
      toast.error(errorMsg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    toast.loading('Redirecting to Google...');
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center py-12 px-4">
      <Toaster position="top-center" reverseOrder={false} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100"
      >
        {/* Header */}
        <div className="bg-emerald-600 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/30"
          >
            <LogIn size={30} />
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
          <p className="text-emerald-100 mt-1">Sign in to your Zakat account</p>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded-lg mb-6 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all flex items-center justify-center space-x-3 mb-6 disabled:opacity-70"
          >
            {googleLoading ? <Loader2 className="animate-spin" size={20} /> : "Continue with Google"}
          </button>

          <div className="relative my-6 text-center">
            <span className="bg-white px-4 text-sm text-gray-400 relative z-10">Or continue with email</span>
            <div className="absolute top-1/2 w-full border-t border-gray-100"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Password</label>
                <Link to="/forgot-password" size={18} className="text-xs text-emerald-600 font-bold hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-100 flex items-center justify-center space-x-2 disabled:bg-emerald-300"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <span>Sign In Now</span>}
            </motion.button>
          </form>

          <p className="text-center text-gray-500 mt-8 text-sm">
            New here? <Link to="/register" className="text-emerald-600 font-bold hover:underline">Create an account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;