"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export function BentoSection() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <section className={`py-24 md:py-32 px-6 transition-colors duration-300 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className="mx-auto max-w-7xl">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Chat Card - Large Left */}
          <Link href="/chat" className="group block">
            <div 
              className={`
                relative overflow-hidden rounded-3xl border h-[500px] lg:h-[620px]
                transition-all duration-500 ease-out
                ${isDark 
                  ? "bg-neutral-950 border-white/[0.08] hover:border-white/[0.15]" 
                  : "bg-neutral-50 border-black/[0.06] hover:border-black/[0.12]"
                }
                group-hover:-translate-y-1 group-hover:shadow-2xl
              `}
            >
              {/* Chat UI Mockup */}
              <div className="absolute inset-6 flex flex-col">
                {/* Mock Chat Interface */}
                <div className={`flex-1 rounded-2xl border overflow-hidden ${
                  isDark ? "bg-black border-white/[0.06]" : "bg-white border-black/[0.06]"
                }`}>
                  {/* Chat Header */}
                  <div className={`px-5 py-4 border-b ${isDark ? "border-white/[0.06]" : "border-black/[0.06]"}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${isDark ? "bg-white/10" : "bg-black/10"}`} />
                      <div>
                        <div className={`text-sm font-medium ${isDark ? "text-white" : "text-black"}`}>Beroqk</div>
                        <div className={`text-xs ${isDark ? "text-white/40" : "text-black/40"}`}>AI Assistant</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chat Messages */}
                  <div className="p-5 space-y-4">
                    {/* User Message */}
                    <div className="flex justify-end">
                      <div className={`max-w-[80%] px-4 py-3 rounded-2xl rounded-br-md text-sm ${
                        isDark ? "bg-white/10 text-white" : "bg-black/10 text-black"
                      }`}>
                        Help me write a marketing email
                      </div>
                    </div>
                    
                    {/* AI Message */}
                    <div className="flex justify-start">
                      <div className={`max-w-[85%] px-4 py-3 rounded-2xl rounded-bl-md text-sm ${
                        isDark ? "bg-white/[0.05] text-white/80" : "bg-black/[0.05] text-black/80"
                      }`}>
                        I&apos;d be happy to help you craft a compelling marketing email. What product or service would you like to promote?
                      </div>
                    </div>

                    {/* Typing Indicator */}
                    <div className="flex justify-start">
                      <div className={`px-4 py-3 rounded-2xl rounded-bl-md ${
                        isDark ? "bg-white/[0.05]" : "bg-black/[0.05]"
                      }`}>
                        <div className="flex gap-1.5">
                          <div className={`w-2 h-2 rounded-full animate-pulse ${isDark ? "bg-white/40" : "bg-black/40"}`} />
                          <div className={`w-2 h-2 rounded-full animate-pulse delay-75 ${isDark ? "bg-white/40" : "bg-black/40"}`} />
                          <div className={`w-2 h-2 rounded-full animate-pulse delay-150 ${isDark ? "bg-white/40" : "bg-black/40"}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <span className={`text-xs font-medium uppercase tracking-[0.15em] ${
                    isDark ? "text-white/40" : "text-black/40"
                  }`}>
                    Chat
                  </span>
                  <p className={`mt-2 text-lg font-light ${isDark ? "text-white/70" : "text-black/70"}`}>
                    Intelligent conversations, instantly.
                  </p>
                </div>
                <div className={`flex items-center gap-1.5 text-sm transition-all duration-300 ${
                  isDark 
                    ? "text-white/50 group-hover:text-white" 
                    : "text-black/50 group-hover:text-black"
                }`}>
                  <span>Explore</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Right Column - Stacked Cards */}
          <div className="flex flex-col gap-5">
            {/* Build Card */}
            <Link href="/api-info" className="group block flex-1">
              <div 
                className={`
                  relative overflow-hidden rounded-3xl border h-[300px]
                  transition-all duration-500 ease-out
                  ${isDark 
                    ? "bg-neutral-950 border-white/[0.08] hover:border-white/[0.15]" 
                    : "bg-neutral-50 border-black/[0.06] hover:border-black/[0.12]"
                  }
                  group-hover:-translate-y-1 group-hover:shadow-2xl
                `}
              >
                {/* Code/Routing Visual */}
                <div className="absolute inset-6 flex items-center justify-center">
                  <div className={`w-full max-w-sm rounded-xl border overflow-hidden font-mono text-xs ${
                    isDark ? "bg-black border-white/[0.06]" : "bg-neutral-900 border-black/[0.06]"
                  }`}>
                    {/* Code Header */}
                    <div className="px-4 py-2 border-b border-white/[0.06] flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                      </div>
                      <span className="text-white/30 text-[10px]">route.ts</span>
                    </div>
                    {/* Code Content */}
                    <div className="p-4 space-y-1.5 text-[11px]">
                      <div>
                        <span className="text-purple-400">import</span>
                        <span className="text-white/70"> {"{"} beroqk {"}"} </span>
                        <span className="text-purple-400">from</span>
                        <span className="text-green-400"> &apos;@beroqk/ai&apos;</span>
                      </div>
                      <div className="text-white/30">{"// Route to optimal model"}</div>
                      <div>
                        <span className="text-blue-400">const</span>
                        <span className="text-white/70"> response = </span>
                        <span className="text-purple-400">await</span>
                        <span className="text-yellow-400"> beroqk</span>
                        <span className="text-white/70">.chat({"{"}</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-white/70">model: </span>
                        <span className="text-green-400">&apos;auto&apos;</span>
                        <span className="text-white/70">,</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-white/70">message: prompt</span>
                      </div>
                      <div>
                        <span className="text-white/70">{"}"})</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <div>
                    <span className={`text-xs font-medium uppercase tracking-[0.15em] ${
                      isDark ? "text-white/40" : "text-black/40"
                    }`}>
                      Build
                    </span>
                    <p className={`mt-2 text-lg font-light ${isDark ? "text-white/70" : "text-black/70"}`}>
                      Integrate AI into your apps.
                    </p>
                  </div>
                  <div className={`flex items-center gap-1.5 text-sm transition-all duration-300 ${
                    isDark 
                      ? "text-white/50 group-hover:text-white" 
                      : "text-black/50 group-hover:text-black"
                  }`}>
                    <span>Explore</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Shop Card */}
            <a href="https://beroqk.store" target="_blank" rel="noopener noreferrer" className="group block flex-1">
              <div 
                className={`
                  relative overflow-hidden rounded-3xl border h-[300px]
                  transition-all duration-500 ease-out
                  ${isDark 
                    ? "bg-neutral-950 border-white/[0.08] hover:border-white/[0.15]" 
                    : "bg-neutral-50 border-black/[0.06] hover:border-black/[0.12]"
                  }
                  group-hover:-translate-y-1 group-hover:shadow-2xl
                `}
              >
                {/* Shop Visual - Premium Product Display */}
                <div className="absolute inset-6 flex items-center justify-center">
                  <div className="relative">
                    {/* Product Mockup - Minimalist */}
                    <div className="flex items-center gap-6">
                      {/* T-Shirt Mockup */}
                      <div className={`w-28 h-32 rounded-xl flex items-center justify-center ${
                        isDark ? "bg-white/[0.05]" : "bg-black/[0.05]"
                      }`}>
                        <div className={`w-16 h-20 rounded-lg ${isDark ? "bg-white/10" : "bg-black/10"}`}>
                          <div className="flex items-center justify-center h-full">
                            <span className={`text-[8px] font-bold tracking-wider ${
                              isDark ? "text-white/40" : "text-black/40"
                            }`}>BEROQK</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Cap Mockup */}
                      <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
                        isDark ? "bg-white/[0.05]" : "bg-black/[0.05]"
                      }`}>
                        <div className={`w-14 h-10 rounded-t-full ${isDark ? "bg-white/10" : "bg-black/10"}`} />
                      </div>

                      {/* Mug Mockup */}
                      <div className={`w-20 h-24 rounded-xl flex items-center justify-center ${
                        isDark ? "bg-white/[0.05]" : "bg-black/[0.05]"
                      }`}>
                        <div className={`w-12 h-14 rounded-lg relative ${isDark ? "bg-white/10" : "bg-black/10"}`}>
                          <div className={`absolute -right-2 top-3 w-3 h-6 rounded-r-full border-2 ${
                            isDark ? "border-white/10" : "border-black/10"
                          }`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <div>
                    <span className={`text-xs font-medium uppercase tracking-[0.15em] ${
                      isDark ? "text-white/40" : "text-black/40"
                    }`}>
                      Shop
                    </span>
                    <p className={`mt-2 text-lg font-light ${isDark ? "text-white/70" : "text-black/70"}`}>
                      Premium gear for builders.
                    </p>
                  </div>
                  <div className={`flex items-center gap-1.5 text-sm transition-all duration-300 ${
                    isDark 
                      ? "text-white/50 group-hover:text-white" 
                      : "text-black/50 group-hover:text-black"
                  }`}>
                    <span>Explore</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
