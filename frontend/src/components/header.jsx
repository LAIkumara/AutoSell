import { BiCart, BiPlus, BiPlusCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import Button from "./buttons";

export default function Header(){

    
      
    return (
        <header className="h-[120px] bg-[#5D0599] flex justify-center items-center gap-[192px]">
            <Link to='/'  className="h-[90px] w-[90px] flex items-center justify-center">
                <img src="/logo.png" alt="logo" />
            </Link>

            <div className="flex gap-6">
                <Link to="/" className="text-white text-[20px] font-medium cursor-pointer hover:text-blue-300 font-airbnb ">
                    Home
                </Link>
                <Link to="/products" className="text-white text-[20px] font-mediu cursor-pointer hover:text-blue-300 font-airbnb ">
                    Products
                </Link>
                <Link to="/reviews" className="text-white text-[20px] font-mediu cursor-pointer hover:text-blue-300 font-airbnb">
                    Reviews
                </Link>
                <Link to="/aboutUs" className="text-white text-[20px] font-mediu cursor-pointer hover:text-blue-300 font-airbnb">
                    About Us
                </Link>
                <Link to="/contactUs" className="text-white text-[20px] font-mediu cursor-pointer hover:text-blue-300 font-airbnb">
                    Contact Us
                </Link>
            </div>

            <div className="flex gap-4">
                <Button variant="primary2" size="large">
                    Sign In
                </Button>
                <Button className=" flex justify-center items-center text-[16px] gap-2 " variant="secondary" size="large">
                    <BiPlusCircle className=" text-2xl"/>
                    Post Ads
                </Button>
            </div>
            
            
            
        </header>
    )
}