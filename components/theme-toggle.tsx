"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`
        fixed bottom-6 left-6 z-50
        flex items-center justify-center
        w-12 h-12 rounded-full
        backdrop-blur-xl
        border transition-all duration-500 ease-out
        shadow-lg
        group
        ${isDark 
          ? "bg-white/[0.06] border-white/[0.1] hover:bg-white/[0.1] hover:border-white/[0.2]" 
          : "bg-black/[0.04] border-black/[0.08] hover:bg-black/[0.08] hover:border-black/[0.15]"
        }
      `}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-5 h-5">
        {/* Sun icon */}
        <Sun 
          size={20} 
          className={`
            absolute inset-0 transition-all duration-500 ease-out
            ${isDark 
              ? "opacity-0 rotate-90 scale-50 text-white/50" 
              : "opacity-100 rotate-0 scale-100 text-amber-500"
            }
          `}
        />
        {/* Moon icon */}
        <Moon 
          size={20} 
          className={`
            absolute inset-0 transition-all duration-500 ease-out
            ${isDark 
              ? "opacity-100 rotate-0 scale-100 text-white/70" 
              : "opacity-0 -rotate-90 scale-50 text-black/50"
            }
          `}
        />
      </div>
    </button>
  )
}
