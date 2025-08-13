import { useState } from "react";
import Header from "../components/header";
import HeroSection from "../components/homeHeroSection";
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
// import Card from "../components/card";
import CategoryCards from "../components/card";

export default function Home() {
  const [value, setValue] = useState("");

  const handleSearchChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", value);
  };

  return (
    <div>
      <Header />
      <div className=" from-purple-100 via-purple-50 to-white bg-gradient-to-br">
        <HeroSection />

        <div className=" relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[100px] flex justify-center items-center gap-6 ">
          <input
            type="text"
            value={value}
            onChange={handleSearchChange}
            className="flex p-2 text-sm outline-none w-[800px] border-2 border-[#AA66D9] rounded-md"
            placeholder="Search ads..."
          />
          <Button
            variant="primary"
            size="midum"
            onChange={handleSearchSubmit}
            className=" flex justify-center items-center gap-2"
          >
            <BiSearch className=" text-xl" /> Search
          </Button>
        </div>

        <CategoryCards />
      </div>
    </div>
  );
}
