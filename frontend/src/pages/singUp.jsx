import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Monitor, User, Mail, Phone, MapPin } from 'lucide-react';
import Button from '../components/buttons';
import Header from '../components/header';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userName.trim()) newErrors.userName = 'Username is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Signup data:', formData);
    }, 2000);
  };

  return (
    <>
      <Header/>
      <div className="flex h-screen bg-gray-50">
        {/* Fixed Left Side - Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-white p-12 flex-col justify-center sticky top-0 h-screen overflow-y-hidden">
          <div className="max-w-lg mx-auto space-y-12">
            <div className="text-center mb-8">
              <img src="/AUTOSELL(rounded).png" alt="AutoSell Logo" className="w-32 h-32 mx-auto mb-4"/>
              <h2 className="text-2xl font-bold text-gray-900">AutoSell</h2>
              <p className="text-gray-600">Your trusted classified ads platform</p>
            </div>
  
            {/* Feature 1 */}
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Monitor className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Manage Your Ads</h3>
                <p className="text-gray-600 leading-relaxed">
                  Create, edit, and manage all your classified ads from one dashboard. 
                  Track views, inquiries, and performance metrics.
                </p>
              </div>
            </div>
  
            {/* Feature 2 */}
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Post Ads for Free</h3>
                <p className="text-gray-600 leading-relaxed">
                  Start selling immediately with our free ad posting. 
                  No hidden fees, no subscription required - just post and sell.
                </p>
              </div>
            </div>
  
            {/* Feature 3 */}
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Safe & Secure Platform</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your safety is our priority. Advanced verification system 
                  and secure payment options protect both buyers and sellers.
                </p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Scrollable Right Side - Signup Form */}
        <div className="w-full lg:w-1/2 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-8 bg-white">
            <div className="w-full max-w-md">
              {/* Mobile Logo */}
              <div className="lg:hidden text-center mb-8">
                <img src="/AUTOSELL(rounded).png" alt="AutoSell Logo" className="w-20 h-20 mx-auto mb-4"/>
                <h2 className="text-2xl font-bold text-gray-900">AutoSell</h2>
              </div>
    
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                <p className="text-gray-600">Join AutoSell today</p>
              </div>
    
              {/* Social Signup Buttons */}
              <div className="space-y-4 mb-6">
                <button className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="w-5 h-5">
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Sign up with Google</span>
                </button>
    
                <button className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="w-5 h-5">
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Sign up with Facebook</span>
                </button>
              </div>
    
              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or Sign up with Email</span>
                </div>
              </div>
    
              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username Field */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      placeholder="Username"
                      className={`w-full pl-10 px-4 py-3 border ${errors.userName ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 placeholder-gray-400`}
                    />
                  </div>
                  {errors.userName && <p className="mt-1 text-sm text-red-600">{errors.userName}</p>}
                </div>
    
                {/* Email Field */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email address"
                      className={`w-full pl-10 px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 placeholder-gray-400`}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
    
                {/* Password Field */}
                <div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 placeholder-gray-400 pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>
    
                {/* Phone Field */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone number"
                      className={`w-full pl-10 px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 placeholder-gray-400`}
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
    
                {/* Address Field */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Address (optional)"
                      className="w-full pl-10 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    />
                  </div>
                </div>
    
                {/* Terms and Conditions */}
                <div className="flex items-start mt-4">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 bg-white border-gray-300 rounded focus:ring-purple-600 focus:ring-2"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-gray-600">
                      I agree to the <a href="#" className="text-purple-600 hover:text-purple-800">Terms and Conditions</a> and <a href="#" className="text-purple-600 hover:text-purple-800">Privacy Policy</a>
                    </label>
                  </div>
                </div>
    
                {/* Sign Up Button */}
                <div className="flex items-center justify-center pt-2">
                  <Button 
                    className="flex items-center justify-center gap-2 w-full" 
                    type="submit"
                    variant="primary" 
                    size="large" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Sign Up
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
    
                {/* Login Link */}
                <div className="text-center text-sm pt-4 pb-8">
                  <span className="text-gray-600">Already have an account? </span>
                  <Link to="/singIn" className="text-purple-600 hover:text-purple-800 font-semibold transition-colors duration-200">
                    Sign In
                </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}