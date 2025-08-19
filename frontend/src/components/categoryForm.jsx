import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Save, ChevronDown } from 'lucide-react';

const CategoryForm = ({ category, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    category: '',
    altCategories: []
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (category) {
      setFormData({
        category: category.category || '',
        altCategories: category.altCategories || []
      });
    } else {
      setFormData({
        category: '',
        altCategories: []
      });
    }
  }, [category]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const addAltCategory = () => {
    setFormData({
      ...formData,
      altCategories: [...formData.altCategories, { name: '', brands: [] }]
    });
  };

  const removeAltCategory = (index) => {
    const newAltCategories = formData.altCategories.filter((_, i) => i !== index);
    setFormData({ ...formData, altCategories: newAltCategories });
  };

  const updateAltCategory = (index, field, value) => {
    const newAltCategories = [...formData.altCategories];
    newAltCategories[index] = { ...newAltCategories[index], [field]: value };
    setFormData({ ...formData, altCategories: newAltCategories });
  };

  const addBrand = (altIndex) => {
    const newAltCategories = [...formData.altCategories];
    newAltCategories[altIndex].brands.push({ name: '', models: [] });
    setFormData({ ...formData, altCategories: newAltCategories });
  };

  const removeBrand = (altIndex, brandIndex) => {
    const newAltCategories = [...formData.altCategories];
    newAltCategories[altIndex].brands = newAltCategories[altIndex].brands.filter((_, i) => i !== brandIndex);
    setFormData({ ...formData, altCategories: newAltCategories });
  };

  const updateBrand = (altIndex, brandIndex, field, value) => {
    const newAltCategories = [...formData.altCategories];
    newAltCategories[altIndex].brands[brandIndex] = {
      ...newAltCategories[altIndex].brands[brandIndex],
      [field]: value
    };
    setFormData({ ...formData, altCategories: newAltCategories });
  };

  const addModel = (altIndex, brandIndex) => {
    const newAltCategories = [...formData.altCategories];
    newAltCategories[altIndex].brands[brandIndex].models.push({ name: '', submodels: [] });
    setFormData({ ...formData, altCategories: newAltCategories });
  };

  const removeModel = (altIndex, brandIndex, modelIndex) => {
    const newAltCategories = [...formData.altCategories];
    newAltCategories[altIndex].brands[brandIndex].models = 
      newAltCategories[altIndex].brands[brandIndex].models.filter((_, i) => i !== modelIndex);
    setFormData({ ...formData, altCategories: newAltCategories });
  };

  const updateModel = (altIndex, brandIndex, modelIndex, field, value) => {
    const newAltCategories = [...formData.altCategories];
    newAltCategories[altIndex].brands[brandIndex].models[modelIndex] = {
      ...newAltCategories[altIndex].brands[brandIndex].models[modelIndex],
      [field]: value
    };
    setFormData({ ...formData, altCategories: newAltCategories });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-purple-700" style={{ background: 'linear-gradient(135deg, #5D0599 0%, #7C3AED 100%)' }}>
          <h2 className="text-2xl font-bold text-white">
            {category ? 'Edit Category' : 'Create New Category'}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Main Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.category ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Enter category name"
              />
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Alt Categories */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Alternative Categories</h3>
                <button
                  type="button"
                  onClick={addAltCategory}
                  className="inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-purple-900 rounded-lg font-medium transition-all duration-200"
                  style={{ backgroundColor: '#FFD500' }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Alt Category
                </button>
              </div>

              <div className="space-y-6">
                {formData.altCategories.map((altCategory, altIndex) => (
                  <div key={altIndex} className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <input
                        type="text"
                        value={altCategory.name}
                        onChange={(e) => updateAltCategory(altIndex, 'name', e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Alt category name"
                      />
                      <button
                        type="button"
                        onClick={() => removeAltCategory(altIndex)}
                        className="ml-3 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Brands */}
                    <div className="ml-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-700">Brands</h4>
                        <button
                          type="button"
                          onClick={() => addBrand(altIndex)}
                          className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all duration-200"
                        >
                          <Plus className="h-3 w-3 inline mr-1" />
                          Add Brand
                        </button>
                      </div>

                      <div className="space-y-4">
                        {altCategory.brands?.map((brand, brandIndex) => (
                          <div key={brandIndex} className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <input
                                type="text"
                                value={brand.name}
                                onChange={(e) => updateBrand(altIndex, brandIndex, 'name', e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Brand name"
                              />
                              <button
                                type="button"
                                onClick={() => removeBrand(altIndex, brandIndex)}
                                className="ml-3 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                            </div>

                            {/* Models */}
                            <div className="ml-4">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="text-sm font-medium text-gray-600">Models</h5>
                                <button
                                  type="button"
                                  onClick={() => addModel(altIndex, brandIndex)}
                                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-all duration-200"
                                >
                                  <Plus className="h-3 w-3 inline mr-1" />
                                  Add Model
                                </button>
                              </div>

                              <div className="space-y-2">
                                {brand.models?.map((model, modelIndex) => (
                                  <div key={modelIndex} className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={model.name}
                                      onChange={(e) => updateModel(altIndex, brandIndex, modelIndex, 'name', e.target.value)}
                                      className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                                      placeholder="Model name"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removeModel(altIndex, brandIndex, modelIndex)}
                                      className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-200"
                                    >
                                      <Minus className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              style={{ backgroundColor: '#5D0599' }}
            >
              <Save className="h-4 w-4 mr-2" />
              {category ? 'Update Category' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
