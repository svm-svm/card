import { motion } from 'motion/react';

interface VintageRoomProps {
  onRecordClick: () => void;
  onCameraClick: () => void;
  onPenClick: () => void;
  onClockClick: () => void;
}

export function VintageRoom({ onRecordClick, onCameraClick, onPenClick, onClockClick }: VintageRoomProps) {
  return (
    <div className="relative w-full max-w-5xl mx-auto aspect-[16/10] bg-gradient-to-b from-[#f5e6d3] to-[#e8d4bc] rounded-lg shadow-2xl overflow-hidden">
      {/* Wall background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#d9c8b0] to-[#c9b89f]" />
      
      {/* Wallpaper pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="wallpaper" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="2" fill="#8b6f47" />
            <circle cx="0" cy="0" r="1" fill="#8b6f47" />
            <circle cx="40" cy="40" r="1" fill="#8b6f47" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wallpaper)" />
      </svg>

      {/* Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-b from-[#8b6f47] to-[#6b5437]">
        {/* Wood grain effect */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute h-full bg-gradient-to-r from-transparent via-black/20 to-transparent"
              style={{
                left: `${i * 8.33}%`,
                width: '8.33%'
              }}
            />
          ))}
        </div>
      </div>

      {/* Wall Clock - Interactive */}
      <motion.g
        whileHover={{ scale: 1.05 }}
        className="cursor-pointer"
        onClick={onClockClick}
      >
        <svg className="absolute top-[8%] left-[42%] w-[16%] h-auto" viewBox="0 0 120 120">
          {/* Clock outer circle */}
          <circle cx="60" cy="60" r="55" fill="#5a4a3a" />
          <circle cx="60" cy="60" r="50" fill="#f5f1e8" stroke="#8b6f47" strokeWidth="3" />
          
          {/* Clock numbers */}
          <text x="60" y="30" textAnchor="middle" fill="#5a4a3a" fontSize="12" fontFamily="Georgia, serif">12</text>
          <text x="90" y="65" textAnchor="middle" fill="#5a4a3a" fontSize="12" fontFamily="Georgia, serif">3</text>
          <text x="60" y="95" textAnchor="middle" fill="#5a4a3a" fontSize="12" fontFamily="Georgia, serif">6</text>
          <text x="30" y="65" textAnchor="middle" fill="#5a4a3a" fontSize="12" fontFamily="Georgia, serif">9</text>
          
          {/* Clock hands */}
          <motion.line
            x1="60" y1="60" x2="60" y2="35"
            stroke="#5a4a3a" strokeWidth="3" strokeLinecap="round"
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '60px 60px' }}
          />
          <motion.line
            x1="60" y1="60" x2="60" y2="25"
            stroke="#8b6f47" strokeWidth="2" strokeLinecap="round"
            animate={{ rotate: 360 }}
            transition={{ duration: 3600, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '60px 60px' }}
          />
          <circle cx="60" cy="60" r="4" fill="#5a4a3a" />
        </svg>
      </motion.g>

      {/* Vinyl Record on Wall - Interactive */}
      <motion.g
        whileHover={{ scale: 1.05, rotate: 5 }}
        className="cursor-pointer"
        onClick={onRecordClick}
      >
        <svg className="absolute top-[12%] right-[15%] w-[14%] h-auto" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="#1a1a1a" />
          <circle cx="50" cy="50" r="45" fill="#2a2a2a" stroke="#1a1a1a" strokeWidth="1" />
          
          {/* Grooves */}
          {[...Array(15)].map((_, i) => (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={35 - i * 2}
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="0.5"
            />
          ))}
          
          {/* Center label */}
          <circle cx="50" cy="50" r="15" fill="#8b6f47" />
          <circle cx="50" cy="50" r="12" fill="#d4c4a8" />
          <circle cx="50" cy="50" r="3" fill="#5a4a3a" />
        </svg>
      </motion.g>

      {/* Framed Picture */}
      <svg className="absolute top-[15%] left-[15%] w-[18%] h-auto" viewBox="0 0 120 140">
        <rect x="0" y="0" width="120" height="140" fill="#5a4a3a" />
        <rect x="8" y="8" width="104" height="124" fill="#f5f1e8" />
        <rect x="15" y="15" width="90" height="110" fill="#a8957d" />
        
        {/* Simple landscape */}
        <ellipse cx="60" cy="90" rx="35" ry="15" fill="#8b6f47" opacity="0.6" />
        <circle cx="60" cy="50" r="20" fill="#d4a574" opacity="0.7" />
      </svg>

      {/* Table */}
      <div className="absolute bottom-[28%] left-0 right-0 h-[2%] bg-[#6b5437]" />
      <div className="absolute bottom-[10%] left-[5%] right-[5%] h-[18%] bg-gradient-to-b from-[#8b6f47] to-[#6b5437] rounded-t-lg">
        {/* Table legs */}
        <div className="absolute top-full left-[10%] w-[3%] h-[40px] bg-gradient-to-b from-[#6b5437] to-[#5a4a3a]" />
        <div className="absolute top-full right-[10%] w-[3%] h-[40px] bg-gradient-to-b from-[#6b5437] to-[#5a4a3a]" />
      </div>

      {/* Vintage Camera on Table - Interactive */}
      <motion.g
        whileHover={{ scale: 1.1 }}
        className="cursor-pointer"
        onClick={onCameraClick}
      >
        <svg className="absolute bottom-[30%] left-[12%] w-[12%] h-auto" viewBox="0 0 100 80">
          {/* Camera body */}
          <rect x="15" y="25" width="70" height="45" fill="#3a3a3a" rx="3" />
          <rect x="20" y="30" width="60" height="35" fill="#5a5a5a" rx="2" />
          
          {/* Lens */}
          <circle cx="50" cy="47" r="18" fill="#2a2a2a" />
          <circle cx="50" cy="47" r="15" fill="#4a4a4a" />
          <circle cx="50" cy="47" r="10" fill="#1a1a1a" />
          <circle cx="45" cy="43" r="3" fill="#6a6a6a" opacity="0.5" />
          
          {/* Viewfinder */}
          <rect x="70" y="20" width="12" height="8" fill="#3a3a3a" />
          <rect x="72" y="22" width="8" height="4" fill="#8b6f47" />
          
          {/* Flash */}
          <circle cx="25" cy="22" r="4" fill="#d4c4a8" />
          
          {/* Shutter button */}
          <circle cx="75" cy="32" r="3" fill="#8b6f47" />
        </svg>
      </motion.g>

      {/* Fountain Pen - Interactive */}
      <motion.g
        whileHover={{ scale: 1.1, rotate: -5 }}
        className="cursor-pointer"
        onClick={onPenClick}
      >
        <svg className="absolute bottom-[32%] left-[30%] w-[15%] h-auto" viewBox="0 0 150 30">
          {/* Pen cap */}
          <rect x="0" y="8" width="40" height="14" fill="#5a4a3a" rx="2" />
          <rect x="2" y="10" width="36" height="10" fill="#6b5437" rx="1" />
          <circle cx="5" cy="15" r="2" fill="#d4c4a8" />
          
          {/* Pen body */}
          <rect x="38" y="10" width="80" height="10" fill="#8b6f47" rx="1" />
          <rect x="40" y="11" width="76" height="8" fill="#a8825f" rx="1" />
          
          {/* Pen nib */}
          <polygon points="118,12 130,15 118,18" fill="#3a3a3a" />
          <polygon points="118,13 128,15 118,17" fill="#5a5a5a" />
          
          {/* Gold band */}
          <rect x="38" y="10" width="4" height="10" fill="#d4a574" />
        </svg>
      </motion.g>

      {/* Books stack */}
      <svg className="absolute bottom-[30%] right-[15%] w-[10%] h-auto" viewBox="0 0 80 70">
        <rect x="10" y="45" width="60" height="10" fill="#8b6f47" rx="1" />
        <rect x="12" y="46" width="56" height="8" fill="#a8825f" />
        
        <rect x="8" y="33" width="64" height="12" fill="#6b5437" rx="1" />
        <rect x="10" y="34" width="60" height="10" fill="#8b6f47" />
        
        <rect x="12" y="20" width="56" height="13" fill="#5a4a3a" rx="1" />
        <rect x="14" y="21" width="52" height="11" fill="#6b5437" />
      </svg>

      {/* Pocket Watch on Table - Interactive */}
      <motion.g
        whileHover={{ scale: 1.1 }}
        className="cursor-pointer"
        onClick={onClockClick}
      >
        <svg className="absolute bottom-[31%] left-[48%] w-[8%] h-auto" viewBox="0 0 60 70">
          {/* Chain */}
          <line x1="30" y1="0" x2="30" y2="12" stroke="#a8825f" strokeWidth="1.5" />
          <circle cx="30" cy="2" r="2" fill="#a8825f" />
          
          {/* Watch body */}
          <circle cx="30" cy="40" r="22" fill="#d4a574" />
          <circle cx="30" cy="40" r="20" fill="#f5f1e8" stroke="#8b6f47" strokeWidth="2" />
          
          {/* Watch face numbers */}
          <text x="30" y="27" textAnchor="middle" fill="#5a4a3a" fontSize="6" fontFamily="Georgia, serif">12</text>
          <text x="42" y="42" textAnchor="middle" fill="#5a4a3a" fontSize="6" fontFamily="Georgia, serif">3</text>
          <text x="30" y="53" textAnchor="middle" fill="#5a4a3a" fontSize="6" fontFamily="Georgia, serif">6</text>
          <text x="18" y="42" textAnchor="middle" fill="#5a4a3a" fontSize="6" fontFamily="Georgia, serif">9</text>
          
          {/* Watch hands */}
          <line x1="30" y1="40" x2="30" y2="30" stroke="#5a4a3a" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="30" y1="40" x2="35" y2="40" stroke="#8b6f47" strokeWidth="1" strokeLinecap="round" />
          <circle cx="30" cy="40" r="2" fill="#5a4a3a" />
          
          {/* Crown */}
          <circle cx="30" cy="18" r="3" fill="#d4a574" />
        </svg>
      </motion.g>

      {/* Plant in corner */}
      <svg className="absolute bottom-[28%] right-[8%] w-[10%] h-auto" viewBox="0 0 60 90">
        {/* Pot */}
        <path d="M 20 70 L 15 90 L 45 90 L 40 70 Z" fill="#8b6f47" />
        <ellipse cx="30" cy="70" rx="10" ry="4" fill="#6b5437" />
        
        {/* Plant leaves */}
        <ellipse cx="25" cy="55" rx="8" ry="18" fill="#7a9b6f" transform="rotate(-20 25 55)" />
        <ellipse cx="35" cy="50" rx="8" ry="20" fill="#6a8b5f" transform="rotate(15 35 50)" />
        <ellipse cx="30" cy="45" rx="7" ry="22" fill="#7a9b6f" />
        <ellipse cx="22" cy="48" rx="6" ry="16" fill="#8aab7f" transform="rotate(-35 22 48)" />
        <ellipse cx="38" cy="55" rx="7" ry="17" fill="#6a8b5f" transform="rotate(25 38 55)" />
      </svg>

      {/* Rug */}
      <svg className="absolute bottom-[8%] left-[20%] w-[60%] h-auto opacity-60" viewBox="0 0 300 40">
        <ellipse cx="150" cy="20" rx="145" ry="18" fill="#8b6f47" />
        <ellipse cx="150" cy="20" rx="140" ry="16" fill="#a8825f" />
        
        {/* Rug pattern */}
        {[...Array(8)].map((_, i) => (
          <circle key={i} cx={50 + i * 25} cy="20" r="3" fill="#6b5437" opacity="0.5" />
        ))}
      </svg>

      {/* Hover hint overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
        <p className="text-[#5a4a3a] text-sm bg-[#f5f1e8]/80 px-4 py-2 rounded-lg" style={{ fontFamily: 'Georgia, serif' }}>
          Click on objects to interact
        </p>
      </div>
    </div>
  );
}
