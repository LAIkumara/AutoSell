import React, { useState, useEffect } from 'react';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Error caught by boundary:", error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

// Main Component with Error Handling
const CreateAdvertisement = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    altCategory: '',
    brand: '',
    model: '',
    submodel: '',
    price: 0,
    isNegotiable: false,
    images: [],
    condition: 'used',
    location: { city: '', state: '' },
    contactInfo: { phone: '', email: '', whatsapp: '' },
    tags: [],
    adType: 'standard'
  });

  const [categories, setCategories] = useState([]);
  const [altCategories, setAltCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [submodels, setSubmodels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        // Simulating API call - replace with your actual API endpoint
        const mockCategories = [
          { _id: '1', category: 'Electronics', altCategories: [] },
          { _id: '2', category: 'Vehicles', altCategories: [] },
          { _id: '3', category: 'Property', altCategories: [] },
        ];
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setCategories(mockCategories);
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  // Debug information
  useEffect(() => {
    console.log('Categories:', categories);
    console.log('Type of categories:', typeof categories);
    console.log('Is array:', Array.isArray(categories));
  }, [categories]);

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
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                <span className="ml-3 text-gray-600">Loading categories...</span>
              </div>
            ) : (
              <form className="space-y-8">
                {/* Category Information */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Category Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category*</label>
                      {categories && Array.isArray(categories) ? (
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.category}</option>
                          ))}
                        </select>
                      ) : (
                        <div className="text-red-500 text-sm">
                          Categories data is not available. Please check the console for details.
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type*</label>
                      <select
                        name="altCategory"
                        value={formData.altCategory}
                        onChange={handleChange}
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

                    <div className="lg:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Brand*</label>
                      <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors disabled:bg-gray-100"
                        required
                        disabled={!formData.altCategory}
                      >
                        <option value="">Select Brand</option>
                        {brands.map(brand => (
                          <option key={brand._id} value={brand.name}>{brand.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="lg:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                      <select
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors disabled:bg-gray-100"
                        disabled={!formData.brand || models.length === 0}
                      >
                        <option value="">Select Model</option>
                        {models.map((model) => (
                          <option key={model._id} value={model.name}>{model.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="lg:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Submodel</label>
                      <select
                        name="submodel"
                        value={formData.submodel}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors disabled:bg-gray-100"
                        disabled={!formData.model || submodels.length === 0}
                      >
                        <option value="">Select Submodel</option>
                        {submodels.map((submodel, index) => (
                          <option key={index} value={submodel.name}>{submodel.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Debug Information (for development only) */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Debug Info:</strong> Check browser console for detailed information about the categories data structure.
                        Categories type: {typeof categories}, Is array: {Array.isArray(categories) ? 'Yes' : 'No'}
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap the component with Error Boundary
const CreateAdvertisementWithErrorBoundary = () => (
  <ErrorBoundary>
    <CreateAdvertisement />
  </ErrorBoundary>
);

export default CreateAdvertisementWithErrorBoundary;