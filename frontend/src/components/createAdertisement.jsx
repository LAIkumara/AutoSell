import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import uploadFile from '../utils/uploadFile';
import { Camera } from 'lucide-react';

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


useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/auth/category');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
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

  const handleSubmit = async (e) => {

    //set image data if needed
    const promiseArray = [];
    for (let i = 0; i < formData.images.length; i++) {

      const promise = uploadFile('advertising-images' ,formData.images[i])
      promiseArray[i] = promise;
    }

    const imageUrls = await Promise.all(promiseArray);
    const advertisementData = {
      ...formData,
      images: imageUrls
    }

    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/api/auth/advertisement',
        advertisementData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success('Advertisement created successfully!');
      //redirect
      navigate('/user/userProfile');

    } catch (err) {
      console.error('Error creating advertisement:', err);
      toast.error(err.response?.data?.message || 'Failed to create advertisement');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Create New Advertisement</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              maxLength="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
            <div className="flex">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="0"
              />
              <div className="flex items-center px-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md">
                <input
                  type="checkbox"
                  id="isNegotiable"
                  name="isNegotiable"
                  checked={formData.isNegotiable}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isNegotiable" className="ml-2 text-sm text-gray-700">
                  Negotiable
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            maxLength="2000"
          />
        </div>

        {/* Category Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
              ))}
            </select>
          </div>

          {/* Alt Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type*</label>
            <select
              value={formData.altCategory.name}
              onChange={(e) => handleNestedChange('altCategory', 'name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={!formData.category}
            >
              <option value="">Select Type</option>
              {altCategories.map(altCat => (
                <option key={altCat._id} value={altCat.name}>{altCat.name}</option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand*</label>
            <select
              value={formData.brand.name}
              onChange={(e) => handleNestedChange('brand', 'name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={!formData.altCategory.name}
            >
              <option value="">Select Brand</option>
              {brands.map(brand => (
                <option key={brand._id} value={brand.name}>{brand.name}</option>
              ))}
            </select>
          </div>

          {/* Model */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
            <select
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!formData.brand.name || models.length === 0}
            >
              <option value="">Select Model</option>
              {models.map((model, index) => (
                <option key={index} value={model}>{model}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Condition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Condition*</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="new">New</option>
              <option value="used">Used</option>
              <option value="refurbished">Refurbished</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ad Type*</label>
            <select
              name="adType"
              value={formData.adType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
            <input
              type="text"
              name="location.city"
              value={formData.location.city}
              onChange={(e) => handleNestedChange('location', 'city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              type="text"
              name="location.state"
              value={formData.location.state}
              onChange={(e) => handleNestedChange('location', 'state', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
            <input
              type="tel"
              name="contactInfo.phone"
              value={formData.contactInfo.phone}
              onChange={(e) => handleNestedChange('contactInfo', 'phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="contactInfo.email"
              value={formData.contactInfo.email}
              onChange={(e) => handleNestedChange('contactInfo', 'email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
            <input
              type="tel"
              name="contactInfo.whatsapp"
              value={formData.contactInfo.whatsapp}
              onChange={(e) => handleNestedChange('contactInfo', 'whatsapp', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className='relative'>
          <label className="  block text-sm font-medium text-gray-700 mb-1">Images*</label>
          <button
            type="button"
            onClick={() => {
              const fileInput = document.createElement('input');
              fileInput.type = 'file';
              fileInput.accept = 'image/*';
              fileInput.multiple = true;
              fileInput.onchange = (e) => {
                const files = Array.from(e.target.files);
                setFormData(prev => ({
                  ...prev,
                  images: [...prev.images, ...files]
                }));
              };
              fileInput.click();
            }}
            className="absolute w-20 h-20 bg-purple-600 hover:bg-purple-700 rounded-2xl flex items-center justify-center text-white transition-colors"
          >
            <Camera className="w-10 h-10" />

          </button>
          <div className="mt-25">
            <p className="text-sm text-gray-500 mt-1">You can upload multiple images. Max 5 images allowed.</p>
            <p className="text-sm text-gray-500 mt-1">Image size should not exceed 5MB each.</p>
            <p className="text-sm text-gray-500 mt-1">Accepted formats: JPG, PNG, GIF.</p>
          </div>
          
          
          {/* Display uploaded images */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {formData.images.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded ${index + 1}`}
                  className="w-50 h-50 object-cover rounded-md border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== index)
                    }));
                  }}
                  className=" w-6 h-6 absolute top-2 left-1 text-red-500 bg-white rounded-full p-2 hover:bg-red-600 hover:text-white focus:outline-none flex items-center justify-center "
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-2">
            {formData.images.length > 0 && (
              <ul className="list-disc pl-5">
                {formData.images.map((file, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Tags */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <input
            type="text"
            placeholder="comma separated tags"
            value={formData.tags.join(',')}
            onChange={(e) => {
              const tags = e.target.value.split(',').map(tag => tag.trim());
              setFormData(prev => ({ ...prev, tags }));
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Creating...' : 'Create Advertisement'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAdvertisement;