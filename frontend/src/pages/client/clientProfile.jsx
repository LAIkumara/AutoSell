import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  Search
} from 'lucide-react';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('ads');

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null)

//   const [userID, setUserID] = useState();
//   const [userName, setUserName] = useState(email);
//   const [email, setEmail] = useState()
//   const [phone, setPhone] = useState('No Phone');
//   const [address, setAddress] = useState('No Address');
//   const [profilePic, setProfilePic] = useState(null);
//   const [isEmailVerified, setIsEmailVerified] = useState(false);
//   const [createdAt, setCreatedAt] = useState();

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
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Error loading user data</div>;
  }


//   // Sample ads data
//   const userAds = [
//     {
//       id: 1,
//       title: '2020 Toyota Camry XLE',
//       price: '$24,500',
//       category: 'Vehicles',
//       image: null,
//       status: 'Active',
//       views: 245,
//       likes: 18,
//       postedDate: '2024-01-10',
//       description: 'Excellent condition, low mileage, fully loaded with premium features.'
//     },
//     {
//       id: 2,
//       title: 'iPhone 14 Pro Max 256GB',
//       price: '$899',
//       category: 'Electronics',
//       image: null,
//       status: 'Sold',
//       views: 156,
//       likes: 12,
//       postedDate: '2024-01-08',
//       description: 'Like new condition, comes with original box and accessories.'
//     },
//     {
//       id: 3,
//       title: 'Modern 3BR Apartment for Rent',
//       price: '$2,800/mo',
//       category: 'Real Estate',
//       image: null,
//       status: 'Active',
//       views: 89,
//       likes: 7,
//       postedDate: '2024-01-05',
//       description: 'Beautiful apartment in downtown area with all amenities.'
//     },
//     {
//       id: 4,
//       title: 'Gaming Setup - RTX 3080',
//       price: '$1,899',
//       category: 'Electronics',
//       image: null,
//       status: 'Pending',
//       views: 134,
//       likes: 23,
//       postedDate: '2024-01-03',
//       description: 'High-end gaming PC with latest specifications.'
//     }
//   ];

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'active': return 'bg-green-100 text-green-800 border-green-200';
//       case 'sold': return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'expired': return 'bg-red-100 text-red-800 border-red-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

  return (

    <div className='min-h-screen bg-black text-white'>
        <h1>aysguaysg </h1>
    </div>
    // <div className="min-h-screen bg-gray-50">
    //   {/* Header */}
    //   <header className="bg-white shadow-sm border-b">
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="flex items-center justify-between h-16">
    //         <div className="flex items-center space-x-3">
    //           <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-yellow-400 rounded-lg flex items-center justify-center">
    //             <span className="text-white font-bold text-sm">A</span>
    //           </div>
    //           <span className="text-xl font-bold text-gray-900">AutoSell</span>
    //         </div>
            
    //         <div className="flex items-center space-x-4">
    //           <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
    //             <Settings className="w-5 h-5" />
    //           </button>
    //           <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
    //             <LogOut className="w-5 h-5" />
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </header>

    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    //     <div className="grid lg:grid-cols-12 gap-8">
          
    //       {/* Left Sidebar - Profile Info */}
    //       <div className="lg:col-span-4">
    //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              
    //           {/* Profile Header */}
    //           {/* <div className="relative">
    //             <div className="h-32 bg-gradient-to-r from-purple-600 to-purple-800"></div>
    //             <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
    //               <div className="relative">
    //                 <div className="w-32 h-32 bg-white rounded-full p-2">
    //                   {userData.profilePic ? (
    //                     <img 
    //                       src={userData.profilePic} 
    //                       alt="Profile" 
    //                       className="w-full h-full rounded-full object-cover"
    //                     />
    //                   ) : (
    //                     <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
    //                       <User className="w-12 h-12 text-purple-600" />
    //                     </div>
    //                   )}
    //                 </div>
    //                 <button className="absolute bottom-2 right-2 w-8 h-8 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center text-white transition-colors">
    //                   <Camera className="w-4 h-4" />
    //                 </button>
    //               </div>
    //             </div>
    //           </div> */}

    //           {/* Profile Details */}
    //           <div className="pt-20 pb-6 px-6">
    //             <div className="text-center mb-6">
    //               <div className="flex items-center justify-center space-x-2 mb-2">
    //                 <h1 className="text-2xl font-bold text-gray-900">{userData.email}</h1>
    //                 {userData.isEmailVerified && (
    //                   <div className="relative group">
    //                     <CheckCircle className="w-6 h-6 text-green-500" />
    //                     <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
    //                       Email Verified
    //                     </div>
    //                   </div>
    //                 )}
    //               </div>
    //               {/* <p className="text-gray-600">ID: {userData.userID}</p>
    //               <div className="flex items-center justify-center space-x-1 mt-2">
    //                 <Star className="w-4 h-4 text-yellow-400 fill-current" />
    //                 <span className="text-sm font-semibold text-gray-700">{userData.stats.rating}</span>
    //                 <span className="text-sm text-gray-500">({userData.stats.soldItems} sales)</span>
    //               </div> */}
    //             </div>

    //             {/* Contact Info */}
    //             <div className="space-y-4 mb-6">
    //               <div className="flex items-center space-x-3 text-gray-600">
    //                 <Mail className="w-5 h-5 text-purple-600" />
    //                 <div className="flex-1">
    //                   <p className="text-sm font-medium">{userData.email}</p>
    //                   {userData.isEmailVerified ? (
    //                     <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
    //                       <CheckCircle className="w-3 h-3 mr-1" />
    //                       Verified
    //                     </span>
    //                   ) : (
    //                     <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
    //                       <AlertCircle className="w-3 h-3 mr-1" />
    //                       Not Verified
    //                     </span>
    //                   )}
    //                 </div>
    //               </div>

    //               <div className="flex items-center space-x-3 text-gray-600">
    //                 <Phone className="w-5 h-5 text-purple-600" />
    //                 <span className="text-sm">{userData.phone}</span>
    //               </div>

    //               <div className="flex items-start space-x-3 text-gray-600">
    //                 <MapPin className="w-5 h-5 text-purple-600 mt-0.5" />
    //                 <span className="text-sm">{userData.address}</span>
    //               </div>

    //               <div className="flex items-center space-x-3 text-gray-600">
    //                 <Calendar className="w-5 h-5 text-purple-600" />
    //                 <div>
    //                   <span className="text-sm">Member since</span>
    //                   <p className="text-sm font-medium">{formatDate(userData.createdAt)}</p>
    //                 </div>
    //               </div>
    //             </div>

    //             {/* Stats */}
    //             <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
    //               <div className="text-center">
    //                 <div className="text-2xl font-bold text-purple-600">{userData.stats.totalAds}</div>
    //                 <div className="text-sm text-gray-600">Total Ads</div>
    //               </div>
    //               <div className="text-center">
    //                 <div className="text-2xl font-bold text-green-600">{userData.stats.activeAds}</div>
    //                 <div className="text-sm text-gray-600">Active Ads</div>
    //               </div>
    //             </div>

    //             {/* Edit Profile Button */}
    //             <button className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors">
    //               <Edit className="w-4 h-4" />
    //               <span>Edit Profile</span>
    //             </button>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Right Content - Ads */}
    //       <div className="lg:col-span-8">
    //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              
    //           {/* Header */}
    //           <div className="p-6 border-b border-gray-200">
    //             <div className="flex items-center justify-between mb-4">
    //               <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
    //               <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all transform hover:scale-105 shadow-lg">
    //                 <Plus className="w-5 h-5" />
    //                 <span>Create Ad</span>
    //               </button>
    //             </div>

    //             {/* Tabs */}
    //             <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
    //               {['ads', 'active', 'sold'].map((tab) => (
    //                 <button
    //                   key={tab}
    //                   onClick={() => setActiveTab(tab)}
    //                   className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors capitalize ${
    //                     activeTab === tab
    //                       ? 'bg-white text-purple-600 shadow-sm'
    //                       : 'text-gray-600 hover:text-gray-800'
    //                   }`}
    //                 >
    //                   {tab === 'ads' ? 'All Ads' : tab}
    //                 </button>
    //               ))}
    //             </div>

    //             {/* Search and Filter */}
    //             <div className="flex space-x-4 mt-4">
    //               <div className="relative flex-1">
    //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    //                 <input
    //                   type="text"
    //                   placeholder="Search your ads..."
    //                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
    //                 />
    //               </div>
    //               <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
    //                 <Filter className="w-4 h-4" />
    //                 <span>Filter</span>
    //               </button>
    //             </div>
    //           </div>

    //           {/* Ads Grid */}
    //           <div className="p-6">
    //             {userAds.length === 0 ? (
    //               <div className="text-center py-12">
    //                 <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    //                 <h3 className="text-lg font-semibold text-gray-900 mb-2">No ads yet</h3>
    //                 <p className="text-gray-600 mb-6">Start selling by creating your first ad</p>
    //                 <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 mx-auto transition-colors">
    //                   <Plus className="w-5 h-5" />
    //                   <span>Create First Ad</span>
    //                 </button>
    //               </div>
    //             ) : (
    //               <div className="grid md:grid-cols-2 gap-6">
    //                 {userAds.map((ad) => (
    //                   <div key={ad.id} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        
    //                     {/* Ad Image */}
    //                     <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
    //                       {ad.image ? (
    //                         <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
    //                       ) : (
    //                         <div className="w-full h-full flex items-center justify-center">
    //                           <Car className="w-12 h-12 text-gray-400" />
    //                         </div>
    //                       )}
                          
    //                       {/* Status Badge */}
    //                       <div className="absolute top-3 left-3">
    //                         <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(ad.status)}`}>
    //                           {ad.status}
    //                         </span>
    //                       </div>

    //                       {/* Action Menu */}
    //                       <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
    //                         <button className="w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-colors">
    //                           <MoreVertical className="w-4 h-4 text-gray-600" />
    //                         </button>
    //                       </div>
    //                     </div>

    //                     {/* Ad Content */}
    //                     <div className="p-4">
    //                       <div className="flex items-start justify-between mb-2">
    //                         <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">{ad.title}</h3>
    //                       </div>
                          
    //                       <p className="text-gray-600 text-sm mb-3 line-clamp-2">{ad.description}</p>
                          
    //                       <div className="flex items-center justify-between mb-3">
    //                         <span className="text-2xl font-bold text-purple-600">{ad.price}</span>
    //                         <span className="text-sm text-gray-500">{ad.category}</span>
    //                       </div>

    //                       {/* Stats */}
    //                       <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
    //                         <div className="flex items-center space-x-4">
    //                           <div className="flex items-center space-x-1">
    //                             <Eye className="w-4 h-4" />
    //                             <span>{ad.views}</span>
    //                           </div>
    //                           <div className="flex items-center space-x-1">
    //                             <Heart className="w-4 h-4" />
    //                             <span>{ad.likes}</span>
    //                           </div>
    //                         </div>
    //                         <div className="flex items-center space-x-1">
    //                           <Clock className="w-4 h-4" />
    //                           <span>{formatDate(ad.postedDate)}</span>
    //                         </div>
    //                       </div>

    //                       {/* Action Buttons */}
    //                       <div className="flex space-x-2">
    //                         <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1">
    //                           <Eye className="w-4 h-4" />
    //                           <span>View</span>
    //                         </button>
    //                         <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1">
    //                           <Edit className="w-4 h-4" />
    //                           <span>Edit</span>
    //                         </button>
    //                         <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
    //                           <Share2 className="w-4 h-4" />
    //                         </button>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 ))}
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       </div>

    //     </div>
    //   </div>
    // </div>
  );
}