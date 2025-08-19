import React, { useState } from 'react';
import { Edit2, Trash2, ChevronDown, ChevronRight, Tag, Package, Layers } from 'lucide-react';

const CategoryCard = ({ category, onEdit, onDelete,  isSelected }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalBrands = category.altCategories?.reduce((sum, alt) => sum + (alt.brands?.length || 0), 0) || 0;
  const totalModels = category.altCategories?.reduce((sum, alt) => sum + (alt.brands?.reduce((brandSum, brand) => brandSum + (brand.models?.length || 0), 0) || 0), 0) || 0;
  const totalSubmodels = category.altCategories?.reduce((sum, alt) => 
    sum + (alt.brands?.reduce((brandSum, brand) => brandSum + (brand.models?.reduce((modelSum, model) => modelSum + (model.submodels?.length || 0), 0) || 0), 0) || 0), 0) || 0;

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-2 ${
        isSelected ? 'border-purple-500 ring-2 ring-purple-200' : 'border-transparent hover:border-purple-200'
      }`}
      style={{ borderColor: isSelected ? '#5D0599' : undefined }}
    >
      {/* Card Header */}
      <div className="p-6 pb-4 ">
        <div className="flex items-start justify-between mb-4 ">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{category.category}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <span>{category.altCategories?.length || 0} Alt Categories</span>
              </div>
              <div className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                <span>{totalBrands} Brands</span>
              </div>
              <div className="flex items-center gap-1">
                <Layers className="h-4 w-4" />
                <span>{totalModels} Models</span>
              </div>
              {/* display submodels */}
              <div className="flex items-center gap-1">
                <Layers className="h-4 w-4" />
                <span>{totalSubmodels} Submodels</span>
              </div>

            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => onEdit(category)}
              className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(category._id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        {category.altCategories?.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
            style={{ color: '#5D0599' }}
          >
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            {isExpanded ? 'Hide Details' : 'Show Details'}
          </button>
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && category.altCategories?.length > 0 && (
        <div className="px-6 pb-6 border-t border-gray-100">
          <div className="pt-4 space-y-3">
            {category.altCategories.map((altCategory, altIndex) => (
              <div key={altIndex} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">{altCategory.name}</h4>
                {altCategory.brands?.length > 0 && (
                  <div className="space-y-2">
                    {altCategory.brands.map((brand, brandIndex) => (
                      <div key={brandIndex} className="ml-4 border-l-2 border-yellow-300 pl-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-700">{brand.name}</span>
                          <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                            {brand.models?.length || 0} models
                          </span>
                        </div>
                        {brand.models?.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {brand.models.slice(0, 3).map((model, modelIndex) => (
                              <span 
                                key={modelIndex}
                                className="inline-block text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
                                style={{ backgroundColor: '#FFD50020', color: '#B45309' }}
                              >
                                {model.name}
                              </span>
                            ))}
                            {brand.models.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{brand.models.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
