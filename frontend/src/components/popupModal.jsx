import React from 'react';
import { X, User, UserPlus, ArrowRight, Car, Shield, Zap, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Auth Modal Component
const AuthModal = ({ isOpen, onClose }) => {

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSignIn = () => {
    // Add your sign in navigation logic here
    navigate('/singIn');
    onClose();
  };

  const handleSignUp = () => {
    // Add your sign up navigation logic here
    navigate('/singUp');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Background Overlay */}
      <div 
        className="fixed inset-0 backdrop-blur-lg bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 overflow-hidden transform transition-all">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors group"
          >
            <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
          </button>

          {/* Modal Content */}
          <div className="grid md:grid-cols-2 min-h-[500px]">
            
            {/* Left Side - Branding & Benefits */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-8 md:p-12 text-white relative overflow-hidden hidden justify-center md:flex">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400 rounded-full -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-yellow-400 rounded-full translate-x-12 translate-y-12"></div>
                <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-yellow-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              
              <div className="relative z-10 h-full flex flex-col justify-center">
                {/* Logo & Brand */}
                <div className="text-center mb-8">
                <img src="/AUTOSELL(rounded).png" alt="AutoSell Logo" className="w-40 h-40 mx-auto mb-4"/>
                  <h2 className="text-3xl font-bold mb-2">Welcome to AutoSell</h2>
                  <p className="text-purple-100 text-lg">Your trusted classified ads platform</p>
                </div>

                {/* Benefits */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Car className="w-5 h-5 text-purple-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Easy Listing</h3>
                      <p className="text-purple-100">Post your ads in minutes with our simple interface</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-purple-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Safe & Secure</h3>
                      <p className="text-purple-100">Advanced verification and secure transactions</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-purple-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Quick Results</h3>
                      <p className="text-purple-100">Connect with buyers instantly</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Options */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="max-w-sm mx-auto w-full">
                
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Started Today</h3>
                  <p className="text-gray-600">Choose how you'd like to continue</p>
                </div>

                {/* Auth Cards */}
                <div className="space-y-4">
                  
                  {/* Sign In Card */}
                  <div 
                    onClick={handleSignIn}
                    className="group cursor-pointer transform hover:scale-105 transition-all duration-200"
                  >
                    <div className="bg-white border-2 border-gray-200 hover:border-purple-300 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-200 rounded-lg flex items-center justify-center transition-colors">
                            <User className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg text-gray-900">Sign In</h4>
                            <p className="text-sm text-gray-600">Already have an account?</p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                      </div>
                      
                      {/* Benefits */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Access your saved ads</li>
                          <li>• Manage your listings</li>
                          <li>• View messages & inquiries</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Sign Up Card */}
                  <div 
                    onClick={handleSignUp}
                    className="group cursor-pointer transform hover:scale-105 transition-all duration-200"
                  >
                    <div className="bg-gradient-to-r from-purple-50 to-yellow-50 border-2 border-purple-200 hover:border-purple-400 rounded-xl p-6 hover:shadow-lg transition-all duration-200 relative overflow-hidden">
                      
                      {/* Popular Badge */}
                      {/* <div className="absolute -top-1 -right-1">
                        <div className="bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                          POPULAR
                        </div>
                      </div> */}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <UserPlus className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg text-gray-900">Sign Up</h4>
                            <p className="text-sm text-gray-600">New to AutoSell?</p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                      </div>
                      
                      {/* Benefits */}
                      <div className="mt-4 pt-4 border-t border-purple-100">
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Free account setup</li>
                          <li>• Post unlimited ads</li>
                          <li>• Connect with buyers instantly</li>
                          <li>• Get verified seller badge</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer */}
                <div className="text-center mt-8 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    By continuing, you agree to our 
                    <a href="#" className="text-purple-600 hover:text-purple-800 font-medium ml-1">Terms</a> and 
                    <a href="#" className="text-purple-600 hover:text-purple-800 font-medium ml-1">Privacy Policy</a>
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthModal;