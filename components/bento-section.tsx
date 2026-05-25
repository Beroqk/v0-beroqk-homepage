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
                {/* Live Shopify Product Grid */}
                <div className="absolute inset-4 inset-b-20">
                  <div className="grid grid-cols-4 gap-3 h-full">
                    {/* Product 1 - Hat */}
                    <div className={`rounded-2xl overflow-hidden flex flex-col ${
                      isDark ? "bg-white/[0.03]" : "bg-black/[0.02]"
                    }`}>
                      <div className="flex-1 flex items-center justify-center p-3">
                        <div className={`w-full aspect-square rounded-xl flex items-center justify-center ${
                          isDark ? "bg-white/[0.05]" : "bg-black/[0.04]"
                        }`}>
                          <svg viewBox="0 0 24 24" className={`w-10 h-10 ${isDark ? "text-white/30" : "text-black/30"}`} fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M12 4C8 4 4 6 4 10v2c0 2 1 4 3 5v3h10v-3c2-1 3-3 3-5v-2c0-4-4-6-8-6z" />
                            <path d="M8 10c0-2 2-3 4-3s4 1 4 3" />
                          </svg>
                        </div>
                      </div>
                      <div className="px-2 pb-2">
                        <p className={`text-[10px] font-medium truncate ${isDark ? "text-white/60" : "text-black/60"}`}>Classic Cap</p>
                        <p className={`text-[9px] ${isDark ? "text-white/30" : "text-black/30"}`}>$32</p>
                      </div>
                    </div>

                    {/* Product 2 - Tee */}
                    <div className={`rounded-2xl overflow-hidden flex flex-col ${
                      isDark ? "bg-white/[0.03]" : "bg-black/[0.02]"
                    }`}>
                      <div className="flex-1 flex items-center justify-center p-3">
                        <div className={`w-full aspect-square rounded-xl flex items-center justify-center ${
                          isDark ? "bg-white/[0.05]" : "bg-black/[0.04]"
                        }`}>
                          <svg viewBox="0 0 24 24" className={`w-10 h-10 ${isDark ? "text-white/30" : "text-black/30"}`} fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M6 4l-3 4v2l3-1v11h12V9l3 1V6l-3-4h-4l-2 2-2-2H6z" />
                          </svg>
                        </div>
                      </div>
                      <div className="px-2 pb-2">
                        <p className={`text-[10px] font-medium truncate ${isDark ? "text-white/60" : "text-black/60"}`}>Logo Tee</p>
                        <p className={`text-[9px] ${isDark ? "text-white/30" : "text-black/30"}`}>$45</p>
                      </div>
                    </div>

                    {/* Product 3 - Hoodie */}
                    <div className={`rounded-2xl overflow-hidden flex flex-col ${
                      isDark ? "bg-white/[0.03]" : "bg-black/[0.02]"
                    }`}>
                      <div className="flex-1 flex items-center justify-center p-3">
                        <div className={`w-full aspect-square rounded-xl flex items-center justify-center ${
                          isDark ? "bg-white/[0.05]" : "bg-black/[0.04]"
                        }`}>
                          <svg viewBox="0 0 24 24" className={`w-10 h-10 ${isDark ? "text-white/30" : "text-black/30"}`} fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M6 4l-3 5v3l3-1v9h12v-9l3 1V9l-3-5h-3c0 2-2 3-3 3s-3-1-3-3H6z" />
                            <path d="M9 7c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5" />
                          </svg>
                        </div>
                      </div>
                      <div className="px-2 pb-2">
                        <p className={`text-[10px] font-medium truncate ${isDark ? "text-white/60" : "text-black/60"}`}>Hoodie</p>
                        <p className={`text-[9px] ${isDark ? "text-white/30" : "text-black/30"}`}>$85</p>
                      </div>
                    </div>

                    {/* Product 4 - Sticker */}
                    <div className={`rounded-2xl overflow-hidden flex flex-col ${
                      isDark ? "bg-white/[0.03]" : "bg-black/[0.02]"
                    }`}>
                      <div className="flex-1 flex items-center justify-center p-3">
                        <div className={`w-full aspect-square rounded-xl flex items-center justify-center ${
                          isDark ? "bg-white/[0.05]" : "bg-black/[0.04]"
                        }`}>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isDark ? "bg-white/10" : "bg-black/10"
                          }`}>
                            <span className={`text-[6px] font-bold tracking-wider ${
                              isDark ? "text-white/50" : "text-black/50"
                            }`}>B</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-2 pb-2">
                        <p className={`text-[10px] font-medium truncate ${isDark ? "text-white/60" : "text-black/60"}`}>Sticker Pack</p>
                        <p className={`text-[9px] ${isDark ? "text-white/30" : "text-black/30"}`}>$12</p>
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
                      Wear the future of efficient intelligence.
                    </p>
                  </div>
                  <div className={`flex items-center gap-1.5 text-sm transition-all duration-300 ${
                    isDark 
                      ? "text-white/50 group-hover:text-white" 
                      : "text-black/50 group-hover:text-black"
                  }`}>
                    <span>Shop Collection</span>
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
