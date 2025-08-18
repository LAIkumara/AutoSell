import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Plus, 
  Edit, 
  Eye, 
  Heart,
  Share2,
  MoreVertical,
  Camera,
  CheckCircle,
  AlertCircle,
  Star,
  Settings,
  LogOut,
  Car,
  DollarSign,
  Clock,
  Filter,
  Search,
  X
} from 'lucide-react';
import Header from '../../components/header';
import uploadFile from '../../utils/uploadFile';
import { Navigate, useNavigate } from 'react-router-dom';

export default function UserProfile() {

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ads');
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Edit form state
  const [editFormData, setEditFormData] = useState({
    userID: '',
    userName: '',
    email: '',
    phone: '',
    address: '',
    profilePic: ''
  });

  // Sample ads data - you can replace this with actual API call later
  const userAds = [
    {
      id: 1,
      title: '2020 Toyota Camry XLE',
      price: '$24,500',
      category: 'Vehicles',
      image: null,
      status: 'Active',
      views: 245,
      likes: 18,
      postedDate: '2024-01-10',
      description: 'Excellent condition, low mileage, fully loaded with premium features.'
    },
    {
      id: 2,
      title: 'iPhone 14 Pro Max 256GB',
      price: '$899',
      category: 'Electronics',
      image: null,
      status: 'Sold',
      views: 156,
      likes: 12,
      postedDate: '2024-01-08',
      description: 'Like new condition, comes with original box and accessories.'
    },
    {
      id: 3,
      title: 'Modern 3BR Apartment for Rent',
      price: '$2,800/mo',
      category: 'Real Estate',
      image: null,
      status: 'Active',
      views: 89,
      likes: 7,
      postedDate: '2024-01-05',
      description: 'Beautiful apartment in downtown area with all amenities.'
    },
    {
      id: 4,
      title: 'Gaming Setup - RTX 3080',
      price: '$1,899',
      category: 'Electronics',
      image: null,
      status: 'Pending',
      views: 134,
      likes: 23,
      postedDate: '2024-01-03',
      description: 'High-end gaming PC with latest specifications.'
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'sold': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      axios.get(import.meta.env.VITE_BACKEND_URL + '/api/auth/user/userData', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setUserData(response.data);
        setEditFormData({
          userID: response.data.userID || '',
          userName: response.data.userName || '',
          email: response.data.email || '', // ADD THIS LINE
          phone: response.data.phone || '',
          address: response.data.address || '',
          profilePic: response.data.profilePic || ''
        });
        setIsLoading(false);
        console.log("User data fetched successfully:", response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching user data:", error.response || error.message);
  
        if (error.response && error.response.status === 403) {
          alert("Unauthorized access. Please log in again.");
        }
      });
    } else {
      setIsLoading(false);
      console.error("No token found, user is not authenticated.");
    }
  }, []);

  const handleEditProfile = () => {
    setEditFormData({
      userID: userData.userID || '',
      userName: userData.userName || '',
      email: userData.email || '',
      phone: userData.phone || '',
      address: userData.address || '',
      profilePic: userData.profilePic || ''
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    const token = localStorage.getItem("token");
  
    if (!token) {
      toast.error("You are not logged in. Please log in to update your profile.");
      navigate('/signIn');
      setIsUpdating(false);
      return;
    }
  
    try {
      let updatedProfilePic = editFormData.profilePic;
      
      // If profilePic is a file, upload it
      if (editFormData.profilePic && editFormData.profilePic instanceof File) {
        updatedProfilePic = await uploadFile( 'user-profile-images' ,editFormData.profilePic);
      }
  
      const updatedData = {
        userName: editFormData.userName,
        phone: editFormData.phone,
        address: editFormData.address,
        profilePic: updatedProfilePic
      };
  
      const response = await axios.put(
        import.meta.env.VITE_BACKEND_URL + '/api/auth/user/updateUserData/' + editFormData.userID, 
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      console.log("Profile updated successfully:", response.data);
      toast.success("Profile updated successfully!");
      
      // Update local userData state with the updated data
      setUserData(prev => ({
        ...prev,
        ...updatedData
      }));
  
      // Update editFormData to reflect the new values
      setEditFormData({
        userName: updatedData.userName,
        phone: updatedData.phone,
        address: updatedData.address,
        profilePic: updatedData.profilePic
      });
  
      // Close modal and stop loading
      setShowEditModal(false);
      setIsUpdating(false);
      
    } catch (error) {
      setIsUpdating(false);
      console.error("Error updating profile:", error.response || error.message);
      toast.error("Failed to update user details. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditFormData({
      userID: userData.userID || '',
      userName: userData.userName || '',
      email: userData.email || '',
      phone: userData.phone || '',
      address: userData.address || '',
      profilePic: userData.profilePic || ''
    });
  };

  const [isUploading, setIsUploading] = useState(false);

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
  
      setEditFormData(prev => ({
        ...prev,
        profilePic: file
      }));
  
      try {
        // Assuming uploadFile is a function that uploads the image
        const uploadedProfilePicUrl = await uploadFile( 'user-profile-images',file);
  
        // Now update the profile with the new image URL
        const updatedData = { profilePic: uploadedProfilePicUrl };
        const token = localStorage.getItem("token");
        if (token) {
          await axios.put(
            import.meta.env.VITE_BACKEND_URL + '/api/auth/user/updateUserData/' + userData.userID, 
            updatedData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
  
          // Update the userData state immediately with the new profile picture URL
          setUserData(prev => ({
            ...prev,
            profilePic: uploadedProfilePicUrl
          }));
  
          // Successfully updated profile picture
          toast.success("Profile picture updated successfully!");
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error.message);
        toast.error("Failed to upload profile picture. Please try again.");
      } finally {
        // Hide loading spinner once the process is complete
        setIsUploading(false);
      }
    }
  };
  
  const handleCreateAd = () => {
    // Navigate to the create ad page with authentication check
    const token = localStorage.getItem("token");
    if (token) {
      navigate('/createAdvertisment');
    } else {
      toast.error("You need to be logged in to create an ad.");
      navigate('/signIn');
    }
  }
  

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <div className="text-gray-900 text-xl font-semibold mb-2">Error loading user data</div>
          <div className="text-gray-600">Please try refreshing the page or log in again.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - Profile Info */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              
              {/* Profile Header */}
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-purple-600 to-purple-800"></div>
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="w-32 h-32 bg-white rounded-full p-2">
                      {isUploading ? (
                        // Show a loading spinner when uploading
                        <div className="w-full h-full backdrop-blur-lg flex items-center justify-center rounded-full">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                        </div>
                      ) : userData.profilePic && userData.profilePic !== "https://digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png" ? (
                        <img 
                          src={userData.profilePic} 
                          alt="Profile" 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                          <User className="w-12 h-12 text-purple-600" />
                        </div>
                      )}
                    </div>

                    {/* New Profile Picture Button */}
                    <button 
                      onClick={() => document.getElementById('file-input1').click()}
                      className="absolute bottom-2 right-2 w-8 h-8 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                    </button>

                    {/* Hidden File Input */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePicChange}
                      id="file-input1"
                      className="hidden"
                    />
                  </div>
                </div>
              </div>


              {/* Profile Details */}
              <div className="pt-20 pb-6 px-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {userData.userName === "No name" ? userData.email.split('@')[0] : userData.userName}
                    </h1>
                    {userData.isEmailVerified && (
                      <div className="relative group">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Email Verified
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600">ID: {userData.userID}</p>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="w-5 h-5 text-purple-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{userData.email}</p>
                      {userData.isEmailVerified ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Not Verified
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="w-5 h-5 text-purple-600" />
                    <span className="text-sm">{userData.phone || 'No Phone'}</span>
                  </div>

                  <div className="flex items-start space-x-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-purple-600 mt-0.5" />
                    <span className="text-sm">{userData.address}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-gray-600">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <div>
                      <span className="text-sm">Member since</span>
                      <p className="text-sm font-medium">{formatDate(userData.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{userAds.length}</div>
                    <div className="text-sm text-gray-600">Total Ads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {userAds.filter(ad => ad.status.toLowerCase() === 'active').length}
                    </div>
                    <div className="text-sm text-gray-600">Active Ads</div>
                  </div>
                </div>

                {/* Edit Profile Button */}
                <button 
                  onClick={handleEditProfile}
                  className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Ads */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
                  <button onClick={(handleCreateAd)} className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all transform hover:scale-105 shadow-lg">
                    <Plus className="w-5 h-5" />
                    <span>Create Ad</span>
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                  {['ads', 'active', 'sold'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors capitalize ${
                        activeTab === tab
                          ? 'bg-white text-purple-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      {tab === 'ads' ? 'All Ads' : tab}
                    </button>
                  ))}
                </div>

                {/* Search and Filter */}
                <div className="flex space-x-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search your ads..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              {/* Ads Grid */}
              <div className="p-6">
                {userAds.length === 0 ? (
                  <div className="text-center py-12">
                    <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No ads yet</h3>
                    <p className="text-gray-600 mb-6">Start selling by creating your first ad</p>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 mx-auto transition-colors">
                      <Plus className="w-5 h-5" />
                      <span>Create First Ad</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {userAds
                      .filter(ad => {
                        if (activeTab === 'active') return ad.status.toLowerCase() === 'active';
                        if (activeTab === 'sold') return ad.status.toLowerCase() === 'sold';
                        return true; // 'ads' tab shows all
                      })
                      .map((ad) => (
                      <div key={ad.id} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        
                        {/* Ad Image */}
                        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                          {ad.image ? (
                            <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Car className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
                          
                          {/* Status Badge */}
                          <div className="absolute top-3 left-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(ad.status)}`}>
                              {ad.status}
                            </span>
                          </div>

                          {/* Action Menu */}
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-colors">
                              <MoreVertical className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>

                        {/* Ad Content */}
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">{ad.title}</h3>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{ad.description}</p>
                          
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-2xl font-bold text-purple-600">{ad.price}</span>
                            <span className="text-sm text-gray-500">{ad.category}</span>
                          </div>

                          {/* Stats */}
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{ad.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Heart className="w-4 h-4" />
                                <span>{ad.likes}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{formatDate(ad.postedDate)}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-2">
                            <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>View</span>
                            </button>
                            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1">
                              <Edit className="w-4 h-4" />
                              <span>Edit</span>
                            </button>
                            <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Update User Details</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">User Name</label>
              <input
                type="text"
                name="userName"
                value={editFormData.userName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            {/* <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={editFormData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div> */}
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={editFormData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={editFormData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            {/* <div className="mb-6"> */}
              {/* <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label> */}
              
              {/* Hidden file input */}
              {/* <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                id="file-input"
                className="hidden"
              /> */}
              
              {/* Camera icon that triggers file input */}
              {/* <Camera
                className="w-8 h-8 p-1 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
                onClick={() => document.getElementById('file-input').click()}
              /> */}
              
              {/* <p className="text-xs text-gray-500 mt-1">Upload a new profile picture or leave empty to keep current</p> */}
            {/* </div> */}

            
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseModal}
                disabled={isUpdating}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                disabled={isUpdating}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {isUpdating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <span>Update</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}