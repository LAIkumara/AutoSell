import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Car, 
  DollarSign, 
  TrendingUp, 
  Bell, 
  Search,
  Menu,
  X,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download,
  MoreVertical,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Tag,
  Layers
} from 'lucide-react';

import CategoryManagement from './CategoryManagement';
import axios from 'axios';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState({
    totalCategories: 0,
    totalBrands: 0,
    totalModels: 0
  });

  // Enhanced stats with category data
  const stats = [
    { title: 'Total Users', value: '2,847', change: '+12%', icon: Users, color: 'bg-blue-500' },
    { title: 'Active Listings', value: '1,234', change: '+8%', icon: Car, color: 'bg-green-500' },
    { title: 'Categories', value: dashboardData.totalCategories.toString(), change: '+3%', icon: Tag, color: 'bg-purple-500' },
    { title: 'Revenue', value: '$34,290', change: '+23%', icon: DollarSign, color: 'bg-yellow-500' },
  ];

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'Active' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Customer', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Customer', status: 'Pending' },
    { id: 4, name: 'Emma Davis', email: 'emma@example.com', role: 'Customer', status: 'Active' },
  ];

  const recentListings = [
    { id: 1, title: '2020 Toyota Camry', user: 'John Doe', price: '$24,500', status: 'Active' },
    { id: 2, title: '2019 Honda Civic', user: 'Sarah Wilson', price: '$19,900', status: 'Pending' },
    { id: 3, title: '2021 BMW X5', user: 'Mike Johnson', price: '$45,000', status: 'Active' },
    { id: 4, title: '2018 Ford F-150', user: 'Emma Davis', price: '$32,000', status: 'Approved' },
  ];

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'listings', label: 'Listings', icon: Car },
    { id: 'revenue', label: 'Revenue', icon: DollarSign }
  ];

  // Fetch category statistics
  useEffect(() => {
    const fetchCategoryStats = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + '/api/auth/category')
        const data = await response.data;
        if (data.data) {
          const categories = data.data;
          const totalBrands = categories.reduce((sum, cat) => 
            sum + (cat.altCategories?.reduce((brandSum, alt) => 
              brandSum + (alt.brands?.length || 0), 0) || 0), 0);
          const totalModels = categories.reduce((sum, cat) => 
            sum + (cat.altCategories?.reduce((brandSum, alt) => 
              brandSum + (alt.brands?.reduce((modelSum, brand) => 
                modelSum + (brand.models?.length || 0), 0) || 0), 0) || 0), 0);

          setDashboardData({
            totalCategories: categories.length,
            totalBrands,
            totalModels
          });
        }
      } catch (error) {
        console.error('Error fetching category stats:', error);
      }
    };

    fetchCategoryStats();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderOverview = () => (
    <div className="p-6 space-y-6">
      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color} text-white`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Overview Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Category Overview</h3>
          <button 
            onClick={() => setActiveTab('categories')}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            style={{ color: '#5D0599' }}
          >
            View all categories →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <Tag className="h-8 w-8 text-purple-600" style={{ color: '#5D0599' }} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{dashboardData.totalCategories}</p>
            <p className="text-sm text-gray-600">Total Categories</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <Layers className="h-8 w-8 text-yellow-600" style={{ color: '#B45309' }} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{dashboardData.totalBrands}</p>
            <p className="text-sm text-gray-600">Total Brands</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <Car className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{dashboardData.totalModels}</p>
            <p className="text-sm text-gray-600">Total Models</p>
          </div>
        </div>
      </div>

      {/* Rest of your existing overview content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Users</h3>
          </div>
          <div className="p-0">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-6 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-purple-600">{user.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Listings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Listings</h3>
          </div>
          <div className="p-0">
            {recentListings.map((listing) => (
              <div key={listing.id} className="flex items-center justify-between p-6 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{listing.title}</p>
                  <p className="text-sm text-gray-500">by {listing.user}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{listing.price}</p>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(listing.status)}`}>
                    {listing.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add User</span>
            </button>
          </div>
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-purple-600">{user.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-purple-600 hover:text-purple-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'users':
        return renderUsers();
      case 'categories':
        return <CategoryManagement />; // Your category component
      case 'listings':
        return <div className="p-6"><h2 className="text-xl font-semibold">Listings Management</h2></div>;
      case 'revenue':
        return <div className="p-6"><h2 className="text-xl font-semibold">Revenue Analytics</h2></div>;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 z-30 w-64`}>
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
        </div>
        <nav className="mt-8">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                style={activeTab === item.id ? { color: '#5D0599', backgroundColor: '#5D059910' } : {}}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
            <div className="w-6" /> {/* Spacer */}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
