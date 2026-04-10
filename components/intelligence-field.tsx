"use client"

import { useState, useRef, useEffect } from "react"

const questions = [
  { id: 1, text: "Write code", x: 15, y: 25 },
  { id: 2, text: "Summarize this", x: 80, y: 20 },
  { id: 3, text: "Plan a trip", x: 12, y: 70 },
  { id: 4, text: "Explain concepts", x: 85, y: 75 },
  { id: 5, text: "Generate ideas", x: 50, y: 10 },
]

const nodes = [
  { id: 1, x: 20, y: 30 },
  { id: 2, x: 35, y: 20 },
  { id: 3, x: 50, y: 35 },
  { id: 4, x: 65, y: 25 },
  { id: 5, x: 80, y: 30 },
  { id: 6, x: 25, y: 50 },
  { id: 7, x: 40, y: 45 },
  { id: 8, x: 50, y: 50 },
  { id: 9, x: 60, y: 55 },
  { id: 10, x: 75, y: 50 },
  { id: 11, x: 30, y: 70 },
  { id: 12, x: 45, y: 65 },
  { id: 13, x: 55, y: 70 },
  { id: 14, x: 70, y: 65 },
  { id: 15, x: 50, y: 50 }, // Center node
]

const connections = [
  [1, 2], [2, 3], [3, 4], [4, 5],
  [1, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 5],
  [6, 11], [11, 12], [12, 13], [13, 14], [14, 10],
  [2, 7], [4, 9], [7, 12], [9, 14],
  [3, 8], [8, 13], [8, 15],
  [1, 7], [5, 9], [11, 7], [14, 9],
]

export function IntelligenceField() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)
  const [flowingPaths, setFlowingPaths] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  // Get nodes near a question
  const getNearbyNodes = (questionId: number) => {
    const question = questions.find(q => q.id === questionId)
    if (!question) return []
    
    return nodes.filter(node => {
      const dx = Math.abs(node.x - question.x)
      const dy = Math.abs(node.y - question.y)
      return Math.sqrt(dx * dx + dy * dy) < 30
    }).map(n => n.id)
  }

  // Get path to center from nearby nodes
  const getPathToCenter = (nearbyNodeIds: number[]) => {
    const pathNodes = new Set<number>()
    const centerId = 15
    
    nearbyNodeIds.forEach(startId => {
      pathNodes.add(startId)
      // Simple path finding - add connected nodes toward center
      let current = startId
      for (let i = 0; i < 3; i++) {
        const connected = connections
          .filter(c => c[0] === current || c[1] === current)
          .map(c => c[0] === current ? c[1] : c[0])
        
        const nextNode = connected.find(n => {
          const node = nodes.find(nd => nd.id === n)
          const currentNode = nodes.find(nd => nd.id === current)
          const center = nodes.find(nd => nd.id === centerId)
          if (!node || !currentNode || !center) return false
          
          const currentDist = Math.sqrt(
            Math.pow(currentNode.x - center.x, 2) + 
            Math.pow(currentNode.y - center.y, 2)
          )
          const nextDist = Math.sqrt(
            Math.pow(node.x - center.x, 2) + 
            Math.pow(node.y - center.y, 2)
          )
          return nextDist < currentDist
        })
        
        if (nextNode) {
          pathNodes.add(nextNode)
          current = nextNode
        }
      }
      pathNodes.add(centerId)
    })
    
    return Array.from(pathNodes)
  }

  useEffect(() => {
    if (activeQuestion) {
      const nearby = getNearbyNodes(activeQuestion)
      const path = getPathToCenter(nearby)
      setFlowingPaths(path)
    } else {
      setFlowingPaths([])
    }
  }, [activeQuestion])

  const isNodeActive = (nodeId: number) => flowingPaths.includes(nodeId)
  
  const isConnectionActive = (conn: number[]) => {
    return flowingPaths.includes(conn[0]) && flowingPaths.includes(conn[1])
  }

  return (
    <section className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div 
          ref={containerRef}
          className="relative w-full aspect-[2/1] md:aspect-[3/1]"
        >
          {/* SVG for connections */}
          <svg 
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Connection lines */}
            {connections.map((conn, index) => {
              const node1 = nodes.find(n => n.id === conn[0])
              const node2 = nodes.find(n => n.id === conn[1])
              if (!node1 || !node2) return null
              
              const active = isConnectionActive(conn)
              
              return (
                <line
                  key={index}
                  x1={node1.x}
                  y1={node1.y}
                  x2={node2.x}
                  y2={node2.y}
                  stroke={active ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.08)"}
                  strokeWidth={active ? 0.3 : 0.15}
                  className="transition-all duration-500"
                />
              )
            })}
            
            {/* Nodes */}
            {nodes.map((node) => {
              const active = isNodeActive(node.id)
              const isCenter = node.id === 15
              
              return (
                <g key={node.id}>
                  {/* Glow for active/center nodes */}
                  {(active || isCenter) && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isCenter ? 2 : 1.5}
                      fill={isCenter ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.1)"}
                      className="transition-all duration-500"
                    />
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isCenter ? 1 : active ? 0.6 : 0.4}
                    fill={active || isCenter ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)"}
                    className="transition-all duration-300"
                  />
                </g>
              )
            })}
          </svg>
          
          {/* Question labels */}
          {questions.map((question) => (
            <button
              key={question.id}
              className={`absolute text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer px-3 py-1.5 rounded-full border ${
                activeQuestion === question.id
                  ? "text-white border-white/30 bg-white/5"
                  : "text-muted-foreground border-transparent hover:text-white hover:border-white/20"
              }`}
              style={{
                left: `${question.x}%`,
                top: `${question.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setActiveQuestion(question.id)}
              onMouseLeave={() => setActiveQuestion(null)}
              onClick={() => setActiveQuestion(activeQuestion === question.id ? null : question.id)}
            >
              {question.text}
            </button>
          ))}
          
          {/* Center label */}
          <div 
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs md:text-sm transition-all duration-500 ${
              activeQuestion ? "text-white/80" : "text-white/40"
            }`}
          >
            <span className="hidden md:inline">Beroqk AI</span>
          </div>
        </div>
      </div>
    </section>
  )
}
