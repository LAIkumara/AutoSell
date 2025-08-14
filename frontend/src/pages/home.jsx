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
  

  return (
    <div>
      <Header />
      <div className=" from-purple-100 via-purple-50 to-white bg-gradient-to-br">
        <HeroSection />

        <CategoryCards />
      </div>
    </div>
  );
}
