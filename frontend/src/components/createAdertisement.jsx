import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import uploadFile from '../utils/uploadFile';
import { Camera, X, Upload, Image as ImageIcon } from 'lucide-react';

const CreateAdvertisement = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("You need to be logged in to create an advertisement.");
      window.location.href = '/signIn';
      return;
    }
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    categoryName: '',
    altCategory: { name: '' },
    brand: { name: '' },
    model: '',
    price: 0,
    isNegotiable: false,
    images: [],
    condition: 'used',
    location: { city: '', state: '' },
    contactInfo: { phone: '', email: '', whatsapp: '' },
    tags: [],
    adType: 'standard'
  });

  // Data for dropdowns
  const [categories, setCategories] = useState([]);
  const [altCategories, setAltCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/auth/category');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        toast.error('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  // Fetch altCategories when category changes
  useEffect(() => {
    if (formData.category) {
      const fetchAltCategories = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/auth/category/${formData.category}/altCategories`
          );
          setAltCategories(res.data);
          setBrands([]);
          setModels([]);
          setFormData(prev => ({
            ...prev,
            altCategory: { name: '' },
            brand: { name: '' },
            model: ''
          }));
        } catch (err) {
          console.error('Error fetching altCategories:', err);
          toast.error('Failed to load sub-categories');
        }
      };
      fetchAltCategories();
    }
  }, [formData.category]);

  // Fetch brands when altCategory changes
  useEffect(() => {
    if (formData.category && formData.altCategory.name) {
      const fetchBrands = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/auth/category/${formData.category}/altCategories/${formData.altCategory.name}/brands`
          );
          setBrands(res.data);
          setModels([]);
          setFormData(prev => ({ ...prev, brand: { name: '' }, model: '' }));
        } catch (err) {
          console.error('Error fetching brands:', err);
          toast.error('Failed to load brands');
        }
      };
      fetchBrands();
    }
  }, [formData.category, formData.altCategory.name]);

  // Fetch models when brand changes
  useEffect(() => {
    if (formData.category && formData.altCategory.name && formData.brand.name) {
      const fetchModels = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/auth/category/${formData.category}/altCategories/${formData.altCategory.name}/brands/${formData.brand.name}/models`
          );
          setModels(res.data);
          setFormData(prev => ({ ...prev, model: '' }));
        } catch (err) {
          console.error('Error fetching models:', err);
          toast.error('Failed to load models');
        }
      };
      fetchModels();
    }
  }, [formData.category, formData.altCategory.name, formData.brand.name]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  // Handle image file selection
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    
    // Check if adding these files would exceed the limit
    if (formData.images.length + files.length > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }

    // Validate file sizes and types
    const validFiles = [];
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error(`Image ${file.name} is too large. Maximum size is 5MB.`);
        continue;
      }
      
      if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.type)) {
        toast.error(`Image ${file.name} has invalid format. Only JPG, PNG, and GIF are allowed.`);
        continue;
      }
      
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...validFiles]
      }));
    }
  };

  // Remove image from selection
  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    if (formData.images.length > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }

    setIsLoading(true);
    setIsUploading(true);
    
    try {
      // Upload images first
      toast.loading('Uploading images...');
      const imageUrls = [];
      
      for (let i = 0; i < formData.images.length; i++) {
        const file = formData.images[i];
        try {
          const publicUrl = await uploadFile('advertising-images', file);
          imageUrls.push({
            url: publicUrl,
            altText: `${formData.title} - Image ${i + 1}`
          });
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          throw new Error(`Failed to upload image: ${file.name}`);
        }
      }
      
      toast.dismiss();
      toast.loading('Creating advertisement...');
  
      // Prepare advertisement data with image URLs
      const advertisementData = {
        ...formData,
        images: imageUrls
      };
  
      // Submit the advertisement data
      const token = localStorage.getItem('token');
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/api/auth/advertisement',
        advertisementData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      toast.dismiss();
      toast.success('Advertisement created successfully!');
      navigate('/user/userProfile');
      
    } catch (err) {
      console.error('Error creating advertisement:', err);
      toast.dismiss();
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error('Session expired. Please log in again.');
        navigate('/signIn');
      } else {
        toast.error(err.response?.data?.message || err.message || 'Failed to create advertisement');
      }
    } finally {
      setIsLoading(false);
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Create New Advertisement</h1>
                <p className="text-gray-600 mt-2">Fill in the details below to list your item</p>
              </div>
              <div className="hidden sm:block">
                <ImageIcon className="w-12 h-12 text-purple-600" />
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title*</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      required
                      maxLength="100"
                      placeholder="Enter a descriptive title"
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.title.length}/100 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price*</label>
                    <div className="flex">
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                        required
                        min="0"
                        placeholder="0.00"
                      />
                      <div className="flex items-center px-4 bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg">
                        <input
                          type="checkbox"
                          id="isNegotiable"
                          name="isNegotiable"
                          checked={formData.isNegotiable}
                          onChange={handleChange}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isNegotiable" className="ml-2 text-sm text-gray-700">
                          Negotiable
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description*</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    required
                    maxLength="2000"
                    placeholder="Describe your item in detail..."
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.description.length}/2000 characters</p>
                </div>
              </div>

              {/* Category Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Category Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category*</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type*</label>
                    <select
                      value={formData.altCategory.name}
                      onChange={(e) => handleNestedChange('altCategory', 'name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors disabled:bg-gray-100"
                      required
                      disabled={!formData.category}
                    >
                      <option value="">Select Type</option>
                      {altCategories.map(altCat => (
                        <option key={altCat._id} value={altCat.name}>{altCat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand*</label>
                    <select
                      value={formData.brand.name}
                      onChange={(e) => handleNestedChange('brand', 'name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors disabled:bg-gray-100"
                      required
                      disabled={!formData.altCategory.name}
                    >
                      <option value="">Select Brand</option>
                      {brands.map(brand => (
                        <option key={brand._id} value={brand.name}>{brand.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                    <select
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors disabled:bg-gray-100"
                      disabled={!formData.brand.name || models.length === 0}
                    >
                      <option value="">Select Model</option>
                      {models.map((model, index) => (
                        <option key={index} value={model}>{model}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Condition*</label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      required
                    >
                      <option value="new">New</option>
                      <option value="used">Used</option>
                      <option value="refurbished">Refurbished</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ad Type*</label>
                    <select
                      name="adType"
                      value={formData.adType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      required
                    >
                      <option value="free">Free</option>
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                      <option value="featured">Featured</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Images Upload */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Images*</h2>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif"
                      multiple
                      onChange={handleImageSelect}
                      className="hidden"
                      id="image-upload"
                      disabled={isUploading || formData.images.length >= 5}
                    />
                    
                    <label
                      htmlFor="image-upload"
                      className={`inline-flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                        formData.images.length >= 5 
                          ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
                          : 'border-purple-300 bg-purple-50 hover:bg-purple-100'
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className={`w-8 h-8 mb-2 ${formData.images.length >= 5 ? 'text-gray-400' : 'text-purple-600'}`} />
                        <p className={`text-sm ${formData.images.length >= 5 ? 'text-gray-500' : 'text-purple-600'}`}>
                          {formData.images.length >= 5 
                            ? 'Maximum 5 images reached' 
                            : 'Click to upload images or drag and drop'
                          }
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, GIF up to 5MB each ({formData.images.length}/5)
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Display uploaded images */}
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {formData.images.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Upload preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Remove button */}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm transition-colors group-hover:scale-110"
                            disabled={isUploading}
                          >
                            <X className="w-3 h-3" />
                          </button>
                          
                          {/* Primary image indicator */}
                          {index === 0 && (
                            <div className="absolute bottom-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                              Primary
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Location Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Location</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City*</label>
                    <input
                      type="text"
                      value={formData.location.city}
                      onChange={(e) => handleNestedChange('location', 'city', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      required
                      placeholder="Enter your city"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      value={formData.location.state}
                      onChange={(e) => handleNestedChange('location', 'state', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="Enter your state"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Contact Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone*</label>
                    <input
                      type="tel"
                      value={formData.contactInfo.phone}
                      onChange={(e) => handleNestedChange('contactInfo', 'phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      required
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.contactInfo.email}
                      onChange={(e) => handleNestedChange('contactInfo', 'email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                    <input
                      type="tel"
                      value={formData.contactInfo.whatsapp}
                      onChange={(e) => handleNestedChange('contactInfo', 'whatsapp', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="Enter WhatsApp number"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isLoading || isUploading}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all transform ${
                    isLoading || isUploading
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 hover:scale-105 shadow-lg'
                  }`}
                >
                  {isUploading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Uploading Images...</span>
                    </div>
                  ) : isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Creating Advertisement...</span>
                    </div>
                  ) : (
                    'Create Advertisement'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdvertisement;