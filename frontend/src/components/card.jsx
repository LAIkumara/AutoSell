import React, { useState } from 'react';
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

import Button from "../components/buttons";
import { BiSearch } from "react-icons/bi";
import {
  FaMobileAlt,
  FaTv,
  FaCar,
  FaHome,
  FaBox,
  FaIndustry,
  FaGraduationCap,
} from "react-icons/fa";

const CategoryCard = ({ icon: Icon, title, count,  hasViewLink = false }) => {

  

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


  const [value, setValue] = useState("");
  
    const handleSearchChange = (e) => {
      setValue(e.target.value);
    };
  
    const handleSearchSubmit = (e) => {
      e.preventDefault();
      console.log("Search submitted:", value);
    };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 ">

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
            <div className="w-full sm:flex-1 max-w-[800px]">
              <input
                type="text"
                value={value}
                onChange={handleSearchChange}
                className="w-full text-sm outline-none pl-3 h-12 sm:h-[45px] border-2 border-[#AA66D9] rounded-md"
                placeholder="Search ads..."
              />
            </div>
            <Button
              variant="primary"
              size="large"
              onClick={handleSearchSubmit}  // Changed from onChange to onClick
              className="w-full sm:w-auto px-6 flex justify-center items-center gap-2"
            >
              <BiSearch className="text-xl" /> 
              <span>Search</span>
            </Button>
          </div>
        </div>
        
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