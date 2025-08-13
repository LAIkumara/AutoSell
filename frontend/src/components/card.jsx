import React from 'react';
import {
  Smartphone,
  Monitor,
  Car,
  Building2,
  Settings,
  Home,
  Handshake,
  GraduationCap,
  ArrowRight
} from 'lucide-react';

const CategoryCard = ({ icon: Icon, title, count, isActive = false, hasViewLink = false }) => {
  return (
    <div className="flex flex-col justify-center items-center hover:bg-white rounded-lg p-6 border-gray-100 hover:shadow-md transition-all duration-300 group cursor-pointer">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-[#E8C6F7] text-[#5D0599] group-hover:bg-[#5D0599] group-hover:text-white transition-all duration-300">
        <Icon />
      </div>
      
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      {/* Count or View Link with hover transition */}
      <div className="relative">
        {/* Default state - show count */}
        <p className={`text-gray-600 transition-all duration-300 ${
          hasViewLink 
            ? 'opacity-0 invisible' 
            : 'opacity-100 visible group-hover:opacity-0 group-hover:invisible'
        }`}>
          {count.toLocaleString()} Ads
        </p>
        
        {/* Hover state - show View Ads link */}
        <div className={`absolute top-0 left-0 flex items-center text-[#5D0599] font-medium hover:text-[#4A0480] transition-all duration-300 ${
          hasViewLink 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'
        }`}>
          <span>View </span>
          <span className="m-[4px] mr-2">Ads</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

const CategoryCards = () => {
  const categories = [
    {
      icon: Smartphone,
      title: "Mobiles",
      count: 69590,
      isActive: false
    },
    {
      icon: Monitor,
      title: "Electronics",
      count: 10002,
      isActive: false,
    },
    {
      icon: Car,
      title: "Vehicles",
      count: 24296,
      isActive: false
    },
    {
      icon: Building2,
      title: "Property",
      count: 15374,
      isActive: false
    },
    {
      icon: Settings,
      title: "Essentials",
      count: 4391,
      isActive: false
    },
    {
      icon: Home,
      title: "Home & Living",
      count: 39400,
      isActive: false
    },
    {
      icon: Handshake,
      title: "Business Industry",
      count: 2874,
      isActive: false
    },
    {
      icon: GraduationCap,
      title: "Education",
      count: 1888,
      isActive: false
    }
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
              title={category.title}
              count={category.count}
              isActive={category.isActive}
              hasViewLink={category.hasViewLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCards;