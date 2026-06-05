"use client"
import { useEffect, useRef, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"
import { motion } from "framer-motion"

interface ShaderShowcaseProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export default function ShaderShowcase({ children, disabled = false }: ShaderShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className={`min-h-screen relative overflow-hidden font-sans transition-colors duration-500 ${disabled ? 'bg-[#020617]' : 'bg-black'}`}>
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
          <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#fb923c" />
            <stop offset="70%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {!disabled && (
        <>
          {/* MeshGradient Backgrounds matching user preference */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <MeshGradient
              className="w-full h-full"
              colors={["#000000", "#fb923c", "#f97316", "#7c2d12", "#f97316"]}
              speed={0.3}
              backgroundColor="#000000"
            />
          </div>
          {/* Redundant wireframe MeshGradient removed to improve GPU/rendering performance */}

          {/* Dark vignette overlay for contrast & readability of text components */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_90%)] pointer-events-none z-[1]" />
          <div className="absolute inset-0 bg-black/45 pointer-events-none z-[1]" />
        </>
      )}

      {/* Render children wrapper or render showcase content based on presence of children */}
      {children ? (
        <div className="relative z-10 w-full min-h-screen">
          {children}
        </div>
      ) : (
        <div className="relative z-10 w-full min-h-screen flex flex-col justify-between">
          <header className="relative z-20 flex items-center justify-between p-6 w-full">
            <motion.div
              className="flex items-center group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.svg
                fill="currentColor"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="size-10 text-white group-hover:drop-shadow-lg transition-all duration-300"
                style={{
                  filter: "url(#logo-glow)",
                }}
                whileHover={{
                  fill: "url(#logo-gradient)",
                  rotate: [0, -2, 2, 0],
                  transition: {
                    fill: { duration: 0.3 },
                    rotate: { duration: 0.6, ease: "easeInOut" },
                  },
                }}
              >
                <motion.path
                  d="M15 85V15h12l18 35 18-35h12v70h-12V35L45 70h-10L17 35v50H15z"
                  initial={{ pathLength: 1 }}
                  whileHover={{
                    pathLength: [1, 0, 1],
                    transition: { duration: 1.2, ease: "easeInOut" },
                  }}
                />
              </motion.svg>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/60 rounded-full"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [-10, -20, -10],
                      x: [0, Math.random() * 20 - 10, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Navigation */}
            <nav className="flex items-center space-x-2">
              <a
                href="#"
                className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
              >
                Features
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
              >
                Docs
              </a>
            </nav>

            {/* Login Button Group with Arrow */}
            <div id="gooey-btn" className="relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
              <button className="absolute right-0 px-2.5 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-19 z-0">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </button>
              <button className="px-6 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center z-10">
                Login
              </button>
            </div>
          </header>

          <main className="flex-1 flex flex-col justify-end p-8 md:p-12 max-w-2xl select-none">
            <div className="text-left">
              {/* Announcement Badge - Glass filter omitted for high-contrast minimal aesthetic */}
              <motion.div
                className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 relative backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent rounded-full" />
                <span className="text-white/90 text-sm font-medium relative z-10 tracking-wide">
                  ✨ New Paper Shaders Experience
                </span>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-none tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.span
                  className="block font-light text-white/90 text-3xl md:text-5xl lg:text-6xl mb-2 tracking-wider"
                  style={{
                    background: "linear-gradient(135deg, #ffffff 0%, #fb923c 30%, #f97316 70%, #ffffff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "url(#text-glow)",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  Beautiful
                </motion.span>
                <span className="block font-black text-white drop-shadow-2xl">Shader</span>
                <span className="block font-light text-white/80 italic">Experiences</span>
              </motion.h1>

              <motion.p
                className="text-base md:text-lg font-light text-white/70 mb-8 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Create stunning visual experiences with our advanced shader technology. Interactive lighting, smooth
                animations, and beautiful effects that respond to your every move.
              </motion.p>

              <motion.div
                className="flex items-center gap-6 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <motion.button
                  className="px-8 py-3.5 rounded-full bg-transparent border border-white/30 text-white font-medium text-xs tracking-wider uppercase transition-all duration-300 hover:bg-white/10 hover:border-orange-400/50 hover:text-orange-100 cursor-pointer backdrop-blur-sm"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  View Pricing
                </motion.button>
                <motion.button
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:from-orange-400 hover:to-amber-400 cursor-pointer shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Get Started
                </motion.button>
              </motion.div>
            </div>
          </main>
        </div>
      )}

      {/* High-overhead rotating WebGL badge removed to eliminate CPU/GPU bottlenecks and clean up placeholder texts */}
    </div>
  )
}

