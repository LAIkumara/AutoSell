import React, { useState, useEffect } from 'react';
import { ChevronDown, Upload, X } from 'lucide-react';

const DynamicAdForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    price: '',
    isNegotiable: false,
    attributes: {},
    location: {
      city: '',
      state: '',
      zipCode: ''
    },
    contact: {
      phone: '',
      email: '',
      preferredContact: 'phone'
    },
    condition: 'good',
    tags: []
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [attributeFields, setAttributeFields] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock category data - in real app, fetch from API
  const mockCategories = [
    {
      value: 'electronics',
      label: 'Electronics',
      subcategories: [
        { value: 'mobile_phones', label: 'Mobile Phones' },
        { value: 'laptops', label: 'Laptops' }
      ]
    },
    {
      value: 'vehicles',
      label: 'Vehicles',
      subcategories: [
        { value: 'cars', label: 'Cars' },
        { value: 'motorcycles', label: 'Motorcycles' }
      ]
    }
  ];

  // Mock attribute configurations
  const mockAttributes = {
    'electronics-mobile_phones': {
      brand: {
        type: 'select',
        required: true,
        options: ['Apple', 'Samsung', 'OnePlus', 'Google', 'Xiaomi', 'Other']
      },
      model: {
        type: 'dependent_select',
        required: true,
        dependsOn: 'brand',
        options: {
          'Apple': ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro Max'],
          'Samsung': ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy S23 Ultra'],
          'OnePlus': ['OnePlus 12', 'OnePlus 11', 'OnePlus Nord 3'],
          'Other': []
        }
      },
      storage: {
        type: 'select',
        required: true,
        options: ['64GB', '128GB', '256GB', '512GB', '1TB']
      },
      color: {
        type: 'select',
        required: false,
        options: ['Black', 'White', 'Blue', 'Red', 'Green', 'Purple', 'Gold', 'Silver']
      }
    }
  };

  useEffect(() => {
    setCategories(mockCategories);
  }, []);

  useEffect(() => {
    if (formData.category) {
      const selectedCategory = categories.find(cat => cat.value === formData.category);
      setSubcategories(selectedCategory?.subcategories || []);
      setFormData(prev => ({ ...prev, subcategory: '', attributes: {} }));
    }
  }, [formData.category, categories]);

  useEffect(() => {
    if (formData.category && formData.subcategory) {
      const attributeKey = `${formData.category}-${formData.subcategory}`;
      setAttributeFields(mockAttributes[attributeKey] || {});
      setFormData(prev => ({ ...prev, attributes: {} }));
    }
  }, [formData.category, formData.subcategory]);

  const handleInputChange = (name, value) => {
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAttributeChange = (attrName, value) => {
    setFormData(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attrName]: value
      }
    }));

    // Clear dependent fields when parent changes
    const attrConfig = attributeFields[attrName];
    if (attrConfig?.type === 'select') {
      Object.keys(attributeFields).forEach(fieldName => {
        const fieldConfig = attributeFields[fieldName];
        if (fieldConfig.dependsOn === attrName) {
          setFormData(prev => ({
            ...prev,
            attributes: {
              ...prev.attributes,
              [fieldName]: ''
            }
          }));
        }
      });
    }
  };

  const renderAttributeField = (attrName, config) => {
    const { type, required, options, dependsOn } = config;
    const value = formData.attributes[attrName] || '';

    switch (type) {
      case 'select':
        return (
          <div key={attrName} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
              {attrName.replace('_', ' ')} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <select
                value={value}
                onChange={(e) => handleAttributeChange(attrName, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                required={required}
              >
                <option value="">Select {attrName.replace('_', ' ')}</option>
                {options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        );

      case 'dependent_select':
        const parentValue = formData.attributes[dependsOn];
        const availableOptions = parentValue ? (options[parentValue] || []) : [];
        
        return (
          <div key={attrName} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
              {attrName.replace('_', ' ')} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              {parentValue === 'Other' ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleAttributeChange(attrName, e.target.value)}
                  placeholder={`Enter ${attrName.replace('_', ' ')}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={required}
                />
              ) : (
                <select
                  value={value}
                  onChange={(e) => handleAttributeChange(attrName, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  required={required}
                  disabled={!parentValue}
                >
                  <option value="">
                    {!parentValue 
                      ? `First select ${dependsOn.replace('_', ' ')}`
                      : `Select ${attrName.replace('_', ' ')}`
                    }
                  </option>
                  {availableOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}
              {parentValue !== 'Other' && (
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              )}
            </div>
          </div>
        );

      case 'text':
        return (
          <div key={attrName} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
              {attrName.replace('_', ' ')} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleAttributeChange(attrName, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={required}
            />
          </div>
        );

      case 'number':
        return (
          <div key={attrName} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
              {attrName.replace('_', ' ')} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => handleAttributeChange(attrName, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={required}
              min={config.min}
              max={config.max}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In real app, upload to cloud storage and get URLs
    const newImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In real app, make API call to create ad
      console.log('Form data:', formData);
      console.log('Images:', images);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Ad created successfully!');
    } catch (error) {
      alert('Error creating ad: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Post Your Ad</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a catchy title for your ad"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {formData.category && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategory <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.subcategory}
                    onChange={(e) => handleInputChange('subcategory', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                    required
                  >
                    <option value="">Select Subcategory</option>
                    {subcategories.map(sub => (
                      <option key={sub.value} value={sub.value}>
                        {sub.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.condition}
                  onChange={(e) => handleInputChange('condition', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  required
                >
                  <option value="new">New</option>
                  <option value="like_new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your item in detail..."
              required
            />
          </div>
        </div>

        {/* Dynamic Category-Specific Fields */}
        {Object.keys(attributeFields).length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(attributeFields).map(([attrName, config]) => 
                renderAttributeField(attrName, config)
              )}
            </div>
          </div>
        )}

        {/* Price Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Price Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="negotiable"
                checked={formData.isNegotiable}
                onChange={(e) => handleInputChange('isNegotiable', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="negotiable" className="ml-2 text-sm text-gray-700">
                Price is negotiable
              </label>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Images</h2>
          
          <div className="mb-4">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Images
            </label>
            <p className="text-sm text-gray-500 mt-1">
              You can upload multiple images (JPG, PNG, GIF)
            </p>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Location */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.location.city}
                onChange={(e) => handleInputChange('location.city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.location.state}
                onChange={(e) => handleInputChange('location.state', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                value={formData.location.zipCode}
                onChange={(e) => handleInputChange('location.zipCode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.contact.phone}
                onChange={(e) => handleInputChange('contact.phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.contact.email}
                onChange={(e) => handleInputChange('contact.email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Ad...' : 'Create Ad'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicAdForm;