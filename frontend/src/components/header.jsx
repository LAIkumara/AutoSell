import React, { useState } from 'react';
import { BiCart, BiPlus, BiPlusCircle, BiMenu, BiX } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Button from "./buttons";

export default function Header() {
    const Navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-[#5D0599] relative">
            {/* Desktop Header */}
            <div className="hidden lg:flex h-[120px] justify-center items-center gap-[192px] px-4">
                <Link to='/' className="h-[90px] w-[90px] flex items-center justify-center">
                    <img src="/logo.png" alt="logo" className="w-full h-full object-contain" />
                </Link>

                <nav className="flex gap-6">
                    <Link to="/" className="text-white text-[20px] font-medium cursor-pointer hover:text-yellow-400 transition-colors duration-200 font-airbnb">
                        Home
                    </Link>
                    <Link to="/products" className="text-white text-[20px] font-medium cursor-pointer hover:text-yellow-400 transition-colors duration-200 font-airbnb">
                        Products
                    </Link>
                    <Link to="/reviews" className="text-white text-[20px] font-medium cursor-pointer hover:text-yellow-400 transition-colors duration-200 font-airbnb">
                        Reviews
                    </Link>
                    <Link to="/aboutUs" className="text-white text-[20px] font-medium cursor-pointer hover:text-yellow-400 transition-colors duration-200 font-airbnb">
                        About Us
                    </Link>
                    <Link to="/contactUs" className="text-white text-[20px] font-medium cursor-pointer hover:text-yellow-400 transition-colors duration-200 font-airbnb">
                        Contact Us
                    </Link>
                </nav>

                <div className="flex gap-4">
                    <Button onClick={() => Navigate('/singIn')} variant="primary2" size="large">
                        Sign In
                    </Button>
                    <Button className="flex justify-center items-center text-[16px] gap-2" variant="secondary" size="large">
                        <BiPlusCircle className="text-2xl"/>
                        Post Ads
                    </Button>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between h-[80px] px-4">
                {/* Logo */}
                <Link to='/' className="h-[50px] w-[50px] flex items-center justify-center">
                    <img src="/logo.png" alt="logo" className="w-full h-full object-contain" />
                </Link>

                {/* Mobile Actions */}
                <div className="flex items-center gap-3">
                    {/* Post Ads Button - Mobile */}
                    <Button className="flex justify-center items-center gap-1 px-3 py-2" variant="secondary" size="small">
                        <BiPlusCircle className="text-lg"/>
                        <span className="hidden sm:inline">Ads</span>
                    </Button>

                    {/* Hamburger Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="text-white p-2 hover:bg-purple-700 rounded-md transition-colors duration-200"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <BiX className="text-2xl" /> : <BiMenu className="text-2xl" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMenu}>
                </div>
            )}

            {/* Mobile Menu */}
            <div className={`lg:hidden fixed top-0 right-0 h-full w-[280px] bg-[#5D0599] z-50 transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-purple-400">
                    <Link to='/' onClick={closeMenu} className="h-[40px] w-[40px] flex items-center justify-center">
                        <img src="/logo.png" alt="logo" className="w-full h-full object-contain" />
                    </Link>
                    <button
                        onClick={closeMenu}
                        className="text-white p-2 hover:bg-purple-700 rounded-md transition-colors duration-200"
                        aria-label="Close menu"
                    >
                        <BiX className="text-2xl" />
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="flex flex-col p-4 space-y-2">
                    <Link 
                        to="/" 
                        onClick={closeMenu}
                        className="text-white text-[18px] font-medium py-3 px-4 hover:bg-purple-700 rounded-md transition-colors duration-200 font-airbnb"
                    >
                        Home
                    </Link>
                    <Link 
                        to="/products" 
                        onClick={closeMenu}
                        className="text-white text-[18px] font-medium py-3 px-4 hover:bg-purple-700 rounded-md transition-colors duration-200 font-airbnb"
                    >
                        Products
                    </Link>
                    <Link 
                        to="/reviews" 
                        onClick={closeMenu}
                        className="text-white text-[18px] font-medium py-3 px-4 hover:bg-purple-700 rounded-md transition-colors duration-200 font-airbnb"
                    >
                        Reviews
                    </Link>
                    <Link 
                        to="/aboutUs" 
                        onClick={closeMenu}
                        className="text-white text-[18px] font-medium py-3 px-4 hover:bg-purple-700 rounded-md transition-colors duration-200 font-airbnb"
                    >
                        About Us
                    </Link>
                    <Link 
                        to="/contactUs" 
                        onClick={closeMenu}
                        className="text-white text-[18px] font-medium py-3 px-4 hover:bg-purple-700 rounded-md transition-colors duration-200 font-airbnb"
                    >
                        Contact Us
                    </Link>
                </nav>

                {/* Mobile Menu Actions */}
                <div className="p-4 space-y-3 border-t border-purple-400 mt-4">
                    <Button 
                        onClick={() => {
                            Navigate('/singIn');
                            closeMenu();
                        }} 
                        variant="primary2" 
                        size="large"
                        className="w-full"
                    >
                        Sign In
                    </Button>
                    <Button 
                        className="w-full flex justify-center items-center text-[16px] gap-2" 
                        variant="secondary" 
                        size="large"
                        onClick={closeMenu}
                    >
                        <BiPlusCircle className="text-2xl"/>
                        Post Ads
                    </Button>
                </div>
            </div>
        </header>
    );
}