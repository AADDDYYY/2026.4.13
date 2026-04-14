import { motion } from "motion/react";
import { useState } from "react";

const hotspots = [
  { id: "asia", name: "Asia Pacific", x: "75%", y: "40%", details: "Guangzhou HQ, 10+ R&D Centers" },
  { id: "europe", name: "Europe", x: "50%", y: "30%", details: "Strategic Sales & Tech Support" },
  { id: "americas", name: "Americas", x: "20%", y: "35%", details: "Regional Distribution Network" },
];

export const WorldMap = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <svg 
        viewBox="0 0 1000 500" 
        className="w-full h-auto text-brand-dark/5"
        fill="currentColor"
      >
        {/* Simplified World Map Path */}
        <path d="M150,150 L180,140 L220,160 L250,150 L280,180 L300,220 L280,260 L240,280 L200,270 L160,240 Z" /> {/* N. America */}
        <path d="M250,300 L280,320 L300,380 L280,450 L240,430 L220,380 Z" /> {/* S. America */}
        <path d="M450,100 L500,80 L550,100 L580,150 L550,200 L500,220 L450,180 Z" /> {/* Europe */}
        <path d="M480,250 L530,230 L580,250 L600,300 L580,380 L530,400 L480,350 Z" /> {/* Africa */}
        <path d="M600,100 L700,80 L850,100 L900,200 L850,350 L700,380 L600,300 Z" /> {/* Asia */}
        <path d="M750,400 L800,380 L850,400 L830,450 L780,440 Z" /> {/* Australia */}
      </svg>

      {/* Hotspots */}
      {hotspots.map((spot) => (
        <div 
          key={spot.id}
          className="absolute cursor-pointer group"
          style={{ left: spot.x, top: spot.y }}
          onMouseEnter={() => setHovered(spot.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <motion.div 
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-4 h-4 bg-brand-blue rounded-full shadow-[0_0_20px_rgba(0,102,255,0.8)]"
          ></motion.div>
          
          <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-brand-dark text-white p-6 rounded-2xl whitespace-nowrap transition-all duration-500 z-30 ${hovered === spot.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
            <div className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-2">{spot.name}</div>
            <div className="text-sm font-bold">{spot.details}</div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-brand-dark"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
