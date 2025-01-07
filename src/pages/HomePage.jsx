import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import TopDestination from "../components/TopDestination";
import MoreToExplore from "../components/MoreToExplore";
import TourPackages from "../components/TourPackages";

function Home() {
  const images = ["/src/images/image.png"];

  return (
    <div className= "p-2">
      <Navbar />
      <div className="relative w-full h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${images[0]})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10 h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
            <div className="space-y-6 text-white">
              <h1 className="text-4xl font-serif leading-tight">
                Travelers' Choice, Best of the Best
              </h1>
              <p className="text-lg font-serif mb-6">
                Among our top 1% of places, stays, and experiences—decided by you.
              </p>
              <button className="bg-black text-white px-6 py-2.5 rounded-lg hover:bg-blue-800 transition-colors">
                See the destinations
              </button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <TopDestination />
      <MoreToExplore />
      <TourPackages />
    </div>
  );
}

export default Home;