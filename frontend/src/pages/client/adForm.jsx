import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    level: 0,
    parent: '',
    isLeaf: false
  });
  const [categories, setCategories] = useState([]);
  const [rootCategories, setRootCategories] = useState([]);
  const [selectedPath, setSelectedPath] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch root categories on mount
  useEffect(() => {
    fetchRootCategories();
  }, []);

  const fetchRootCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/auth/category');
      setRootCategories(response.data.data);
      setMessage({ text: '', type: '' });
    } catch (error) {
      setMessage({
        text: `Error: ${error.response?.data?.message || error.message}`,
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChildren = async (parentId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/category/${parentId}/children`);
      setMessage({ text: '', type: '' });
      return response.data.data;
    } catch (error) {
      setMessage({
        text: `Error: ${error.response?.data?.message || error.message}`,
        type: 'error'
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPath = async (categoryId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/category/${categoryId}/path`);
      setMessage({ text: '', type: '' });
      return response.data.data;
    } catch (error) {
      setMessage({
        text: `Error: ${error.response?.data?.message || error.message}`,
        type: 'error'
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/auth/category', formData);
      setMessage({
        text: `Success: ${response.data.message}`,
        type: 'success'
      });
      setFormData({
        name: '',
        slug: '',
        level: 0,
        parent: '',
        isLeaf: false
      });
      await fetchRootCategories();
    } catch (error) {
      setMessage({
        text: `Error: ${error.response?.data?.message || error.message}`,
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = async (category) => {
    const path = await fetchPath(category._id);
    setSelectedPath(path);
    
    if (!category.isLeaf) {
      const children = await fetchChildren(category._id);
      setCategories(children);
    } else {
      setCategories([]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Category Management</h1>
      
      {message.text && (
        <div className={`mb-6 p-4 rounded-md ${
          message.type === 'error' 
            ? 'bg-red-100 text-red-700' 
            : 'bg-green-100 text-green-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Category Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Create New Category</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slug">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
                Level
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="0">Root (0)</option>
                <option value="1">Subcategory (1)</option>
                <option value="2">Brand (2)</option>
                <option value="3">Model (3)</option>
              </select>
            </div>
            
            {formData.level > 0 && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="parent">
                  Parent ID
                </label>
                <input
                  type="text"
                  id="parent"
                  name="parent"
                  value={formData.parent}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}
            
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                id="isLeaf"
                name="isLeaf"
                checked={formData.isLeaf}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isLeaf" className="ml-2 block text-sm text-gray-700">
                Is Leaf Node (End category that can be used for ads)
              </label>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Creating...' : 'Create Category'}
            </button>
          </form>
        </div>

        {/* Category Browser */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Category Browser</h2>
          
          {isLoading && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Root Categories</h3>
            <div className="space-y-2">
              {rootCategories.map(category => (
                <button
                  key={category._id}
                  onClick={() => handleCategorySelect(category)}
                  className="w-full text-left px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 hover:border-blue-200 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span>{category.name}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                      Level {category.level}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {selectedPath.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Selected Path</h3>
              <div className="flex items-center text-sm text-gray-600 space-x-2">
                {selectedPath.map((cat, index) => (
                  <React.Fragment key={cat._id}>
                    <span className="font-medium">{cat.name}</span>
                    {index < selectedPath.length - 1 && (
                      <span className="text-gray-400">/</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
          
          {categories.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                {selectedPath.length > 0 ? `${selectedPath[selectedPath.length - 1].name} Subcategories` : 'Subcategories'}
              </h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category._id}
                    onClick={() => handleCategorySelect(category)}
                    className="w-full text-left px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <div className="flex items-center space-x-2">
                        {category.isLeaf && (
                          <span className="text-xs bg-green-100 px-2 py-1 rounded text-green-800">
                            Leaf
                          </span>
                        )}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                          Level {category.level}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;