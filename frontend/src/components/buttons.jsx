import React from 'react';
import { FaPlusCircle } from "react-icons/fa";

// Reusable Button Component
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  onClick, 
  className = '',
  type = 'button',
  ...props 
}) => {
  // Define color variants
  const variants = {
    primary: 'group relative px-6 py-3 bg-[#5D0599] text-white border-2 border-transparent hover:border-[#5D0599] hover:bg-white hover:text-[#5D0599] cursor-pointer break-inside-auto transition-all duration-700 ease-out',
    primary2: 'group relative px-6 py-3 bg-white/10 text-white border-2 border-transparent hover:border-[#5D0599] hover:bg-white hover:text-[#5D0599] cursor-pointer transition-all duration-700 ease-out',
    secondary: 'group relative px-6 py-3 bg-[#FFD500] text-[#5D0599] border-2 border-transparent hover:border-[#FFD500] hover:bg-[#FFD500]/40 hover:text-white cursor-pointer transition-all duration-700 ease-out',
  };
  

  // Define size variants
  const sizes = {
    medium: 'px-4 py-2 text-[16px] font-airbnb font-meduim ',
    large: 'px-6 py-3 text-[16px] font-airbnb font-bold  hover:text',
  };

  // Base classes
  const baseClasses = 'font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  
  // Disabled classes
  const disabledClasses = 'opacity-50 cursor-not-allowed';

  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.medium}
    ${disabled ? disabledClasses : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;

// // Demo component showing different button variations
// const ButtonDemo = () => {
//   const handleClick = (buttonName) => {
//     alert(`${buttonName} button clicked!`);
//   };

//   return (
//     <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Reusable Button Component Demo</h1>
        
//         {/* Color Variants */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">Color Variants</h2>
//           <div className="flex flex-wrap gap-3">
//             <Button variant="primary" onClick={() => handleClick('Primary')}>
//               Primary
//             </Button>
//             <Button className=' flex justify-center items-center gap-2' variant="secondary" onClick={() => handleClick('Secondary')}>
//               <FaPlusCircle/> Secondary
//             </Button>
//             <Button variant="success" onClick={() => handleClick('Success')}>
//               Success
//             </Button>
//             <Button variant="danger" onClick={() => handleClick('Danger')}>
//               Danger
//             </Button>
//             <Button variant="warning" onClick={() => handleClick('Warning')}>
//               Warning
//             </Button>
//             <Button variant="info" onClick={() => handleClick('Info')}>
//               Info
//             </Button>
//             <Button variant="outline" onClick={() => handleClick('Outline')}>
//               Outline
//             </Button>
//             <Button variant="ghost" onClick={() => handleClick('Ghost')}>
//               Ghost
//             </Button>
//           </div>
//         </div>

//         {/* Size Variants */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">Size Variants</h2>
//           <div className="flex flex-wrap items-center gap-3">
//             <Button size="small" onClick={() => handleClick('Small')}>
//               Small Button
//             </Button>
//             <Button size="medium" onClick={() => handleClick('Medium')}>
//               Medium Button
//             </Button>
//             <Button size="large" onClick={() => handleClick('Large')}>
//               Large Button
//             </Button>
//           </div>
//         </div>

//         {/* States */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">Button States</h2>
//           <div className="flex flex-wrap gap-3">
//             <Button onClick={() => handleClick('Active')}>
//               Active Button
//             </Button>
//             <Button disabled>
//               Disabled Button
//             </Button>
//           </div>
//         </div>

//         {/* Custom Examples */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">Custom Examples</h2>
//           <div className="flex flex-wrap gap-3">
//             <Button 
//               variant="success" 
//               size="large"
//               onClick={() => handleClick('Save')}
//             >
//               💾 Save Changes
//             </Button>
//             <Button 
//               variant="danger" 
//               size="small"
//               onClick={() => handleClick('Delete')}
//             >
//               🗑️ Delete
//             </Button>
//             <Button 
//               variant="outline" 
//               className="rounded-full"
//               onClick={() => handleClick('Custom')}
//             >
//               Custom Rounded
//             </Button>

            
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ButtonDemo;