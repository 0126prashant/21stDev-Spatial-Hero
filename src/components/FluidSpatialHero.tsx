"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Generate a random number between min and max
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// 16 Premium, clean, light-theme images (Minimalist, Tech, Architecture, Abstract)
const initialImages = [
  {
    src: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2667",
    className: "w-[240px] h-[340px] md:w-[320px] md:h-[420px] rounded-[40px]",
    initialRotate: -4,
    duration: 3,
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564",
    className: "w-[260px] h-[220px] md:w-[340px] md:h-[280px] rounded-full",
    initialRotate: 3,
    duration: 4.5,
  },
  {
    src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2670",
    className: "w-[180px] h-[180px] md:w-[240px] md:h-[240px] rounded-[24px]",
    initialRotate: 6,
    duration: 3.5,
  },
  {
    src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2787",
    className: "w-[240px] h-[320px] md:w-[280px] md:h-[400px] rounded-[60px] md:rounded-[100px]",
    initialRotate: -3,
    duration: 4,
  },
  {
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2669",
    className: "w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-[30%_70%_70%_30%/30%_30%_70%_70%]",
    initialRotate: 8,
    duration: 3.8,
  },
  {
    src: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2832",
    className: "w-[260px] h-[180px] md:w-[320px] md:h-[220px] rounded-tl-[80px] rounded-br-[80px]",
    initialRotate: -5,
    duration: 3.2,
  },
  {
    src: "https://images.unsplash.com/photo-1491891523322-7541e2634e00?q=80&w=2670",
    className: "w-[220px] h-[280px] md:w-[280px] md:h-[360px] rounded-[50px]",
    initialRotate: 4,
    duration: 4.2,
  },
  {
    src: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2787",
    className: "w-[240px] h-[240px] md:w-[300px] md:h-[300px] rounded-full",
    initialRotate: -6,
    duration: 3.6,
  },
  {
    src: "https://images.unsplash.com/photo-1507149833265-60c372daea22?q=80&w=2676",
    className: "w-[200px] h-[300px] md:w-[260px] md:h-[380px] rounded-[30px]",
    initialRotate: 2,
    duration: 4.8,
  },
  {
    src: "https://images.unsplash.com/photo-1506744626753-1fa7603e4c62?q=80&w=2600",
    className: "w-[280px] h-[200px] md:w-[360px] md:h-[260px] rounded-tr-[60px] rounded-bl-[60px]",
    initialRotate: -2,
    duration: 3.4,
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670", // Robot/Tech light
    className: "w-[160px] h-[220px] md:w-[200px] md:h-[280px] rounded-[20px]",
    initialRotate: 7,
    duration: 4.1,
  },
  {
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670", // Robot hand
    className: "w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full",
    initialRotate: -4,
    duration: 3.9,
  },
  {
    src: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2670", // Data viz
    className: "w-[280px] h-[320px] md:w-[340px] md:h-[400px] rounded-[40px]",
    initialRotate: 5,
    duration: 4.6,
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670", // Circuit light
    className: "w-[260px] h-[260px] md:w-[300px] md:h-[300px] rounded-bl-[80px] rounded-tr-[80px]",
    initialRotate: -3,
    duration: 3.7,
  },
  {
    src: "https://images.unsplash.com/photo-1677442135136-760c813028c0?q=80&w=2670", // AI Brain
    className: "w-[220px] h-[180px] md:w-[280px] md:h-[240px] rounded-[30px]",
    initialRotate: 8,
    duration: 4.0,
  },
  {
    src: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2670", // AI Face
    className: "w-[240px] h-[300px] md:w-[280px] md:h-[360px] rounded-full",
    initialRotate: -7,
    duration: 4.3,
  }
];

export default function FluidSpatialHero() {
  const [mounted, setMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [images, setImages] = useState(initialImages.map(img => ({ ...img, style: { top: "0%", left: "0%" } })));

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 400, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 400, mass: 0.5 });
  
  // Aura follows mouse slightly slower
  const auraX = useSpring(mouseX, { damping: 40, stiffness: 200, mass: 1 });
  const auraY = useSpring(mouseY, { damping: 40, stiffness: 200, mass: 1 });

  const canvasX = useSpring(mouseX, { damping: 30, stiffness: 200, mass: 0.8 });
  const canvasY = useSpring(mouseY, { damping: 30, stiffness: 200, mass: 0.8 });

  useEffect(() => {
    setMounted(true);
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    // Exact 4x4 Grid over 250vw/250vh canvas guarantees ZERO overlap and even distribution.
    const rows = 4;
    const cols = 4;
    // Shuffle the cell assignments so images appear in different spots on refresh
    const cells = Array.from({ length: 16 }, (_, i) => i).sort(() => Math.random() - 0.5);
    
    const randomizedImages = initialImages.map((img, i) => {
      const cell = cells[i];
      const row = Math.floor(cell / cols);
      const col = cell % cols;
      
      const cellWidth = 100 / cols; // 25% of the 250vw canvas
      const cellHeight = 100 / rows; // 25% of the 250vh canvas
      
      // Pad deeply inside the cell to avoid touching adjacent cells
      const left = random(col * cellWidth + 2, (col + 1) * cellWidth - 12);
      const top = random(row * cellHeight + 2, (row + 1) * cellHeight - 12);
      
      return {
        ...img,
        style: { top: `${top}%`, left: `${left}%` }
      };
    });
    
    setImages(randomizedImages);
    
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [mouseX, mouseY]);

  const normalizedX = useTransform(canvasX, (x: number) => {
    if (windowSize.width === 0) return 0;
    return (x / windowSize.width - 0.5) * 2;
  });
  
  const normalizedY = useTransform(canvasY, (y: number) => {
    if (windowSize.height === 0) return 0;
    return (y / windowSize.height - 0.5) * 2;
  });

  const translateX = useTransform(normalizedX, [-1, 1], [350, -350]);
  const translateY = useTransform(normalizedY, [-1, 1], [350, -350]);
  
  // Search box parallax moves slightly opposite to the canvas to make it feel 3D and interactive
  const boxTranslateX = useTransform(normalizedX, [-1, 1], [-20, 20]);
  const boxTranslateY = useTransform(normalizedY, [-1, 1], [-20, 20]);

  if (!mounted) return null;

  return (
    <div className="h-screen w-full overflow-hidden relative cursor-none bg-[#FAFAFA]">
      
      {/* Animated and interactive gradient background layer (No grid, plain clean canvas) */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-violet-300 rounded-full blur-[140px] opacity-40 mix-blend-multiply" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] bg-sky-300 rounded-full blur-[140px] opacity-40 mix-blend-multiply" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] bg-amber-200 rounded-full blur-[160px] opacity-30 mix-blend-multiply" 
        />
        <motion.div 
          animate={{ scale: [1.1, 0.9, 1.1], rotate: [0, -45, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[10%] w-[40vw] h-[40vw] bg-rose-300 rounded-full blur-[120px] opacity-30 mix-blend-multiply" 
        />
      </motion.div>

      {/* Interactive Canvas - Exact 4x4 distribution ensuring zero overlap */}
      <motion.div
        className="absolute z-10 w-[250vw] h-[250vh] left-[-75vw] top-[-75vh]"
        style={{
          x: translateX,
          y: translateY,
        }}
      >
        {images.map((img, index) => (
          <motion.div
            key={index}
            className={`absolute shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-black/5 bg-white/50 backdrop-blur-sm ${img.className}`}
            style={{
              ...img.style,
            }}
            initial={{ rotate: img.initialRotate }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              rotate: [img.initialRotate, img.initialRotate + 5, img.initialRotate],
            }}
            transition={{
              duration: img.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.1,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent z-10 mix-blend-overlay pointer-events-none" />
            <img
              src={img.src}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Liquid Glass Search Box & Header */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none gap-8"
        style={{ x: boxTranslateX, y: boxTranslateY }}
      >
        {/* Header */}
        <div className="text-center flex flex-col items-center mt-[-10vh]">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-500 drop-shadow-sm mb-4">
            NEXUS
          </h1>
          <p className="text-gray-600 font-medium text-lg md:text-xl max-w-lg text-center leading-relaxed drop-shadow-sm">
            Design the future with AI-powered spatial generation. <br className="hidden md:block"/>
            Describe your vision and watch it come to life in real-time.
          </p>
        </div>

        {/* Search Box - Light Liquid Glass Effect */}
        <div className="pointer-events-auto relative w-[90vw] max-w-[800px] p-6 rounded-[2.5rem] bg-white/20 backdrop-blur-2xl border border-white/50 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1),inset_0_8px_20px_rgba(0,0,0,0.06),inset_0_-8px_24px_rgba(255,255,255,1),inset_0_1px_1px_rgba(0,0,0,0.1)] flex flex-col gap-4 group transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15),inset_0_8px_20px_rgba(0,0,0,0.04),inset_0_-8px_24px_rgba(255,255,255,1),inset_0_1px_1px_rgba(0,0,0,0.1)]">
          
          {/* Inner glossy highlight */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-white/60 to-transparent pointer-events-none opacity-50" />
          
          {/* Text Input */}
          <textarea 
            placeholder="Describe your design..."
            className="w-full bg-transparent text-gray-900 placeholder:text-gray-500 text-2xl font-medium outline-none resize-none min-h-[120px] relative z-10 pt-2 selection:bg-indigo-200"
            style={{ cursor: "none" }} // keep custom cursor vibe
          />

          {/* Bottom Controls */}
          <div className="flex items-center justify-between relative z-10">
            {/* Left Actions */}
            <div className="flex items-center gap-3">
              <button className="w-12 h-12 rounded-full bg-white/60 hover:bg-white border border-white/40 shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center justify-center transition-colors text-gray-700">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              </button>
              <button className="h-12 px-5 rounded-full bg-white/60 hover:bg-white border border-[#f472b6]/40 shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center gap-2 transition-colors text-gray-700">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                <span className="font-semibold text-sm">App</span>
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button className="h-12 px-5 rounded-full bg-gray-900 hover:bg-gray-800 border border-gray-700 flex items-center gap-2 transition-colors text-white shadow-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#sparkle-gradient)"/>
                  <defs>
                    <linearGradient id="sparkle-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#60a5fa" />
                      <stop offset="0.5" stopColor="#34d399" />
                      <stop offset="1" stopColor="#fbbf24" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="font-semibold text-sm tracking-wide">3.0 Flash</span>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 ml-1 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 ml-1"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <button className="w-12 h-12 rounded-full bg-gray-900 hover:bg-gray-800 border border-gray-700 flex items-center justify-center transition-colors text-white shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Custom Trailing Cursor Aura */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 bg-black/5 rounded-full z-40 pointer-events-none blur-xl"
        style={{
          x: auraX,
          y: auraY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Custom Trailing Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-indigo-950 rounded-full z-50 pointer-events-none shadow-lg"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}
