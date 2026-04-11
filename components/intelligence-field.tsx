"use client"

import { useState, useEffect } from "react"

const questions = [
  { id: 1, text: "Write code", x: 8, y: 40 },
  { id: 2, text: "Summarize this", x: 92, y: 35 },
  { id: 3, text: "Plan a trip", x: 10, y: 70 },
  { id: 4, text: "Explain concepts", x: 88, y: 65 },
  { id: 5, text: "Generate ideas", x: 50, y: 8 },
]

// Brain-shaped node arrangement (abstract, not literal)
const nodes = [
  // Left hemisphere - outer
  { id: 1, x: 22, y: 25 },
  { id: 2, x: 18, y: 40 },
  { id: 3, x: 20, y: 55 },
  { id: 4, x: 25, y: 70 },
  // Left hemisphere - inner
  { id: 5, x: 30, y: 32 },
  { id: 6, x: 28, y: 48 },
  { id: 7, x: 32, y: 62 },
  // Center top
  { id: 8, x: 40, y: 22 },
  { id: 9, x: 50, y: 18 },
  { id: 10, x: 60, y: 22 },
  // Center core
  { id: 11, x: 38, y: 38 },
  { id: 12, x: 50, y: 35 },
  { id: 13, x: 62, y: 38 },
  // Center middle
  { id: 14, x: 42, y: 52 },
  { id: 15, x: 50, y: 50 }, // True center
  { id: 16, x: 58, y: 52 },
  // Center bottom
  { id: 17, x: 45, y: 68 },
  { id: 18, x: 55, y: 68 },
  // Right hemisphere - inner
  { id: 19, x: 70, y: 32 },
  { id: 20, x: 72, y: 48 },
  { id: 21, x: 68, y: 62 },
  // Right hemisphere - outer
  { id: 22, x: 78, y: 25 },
  { id: 23, x: 82, y: 40 },
  { id: 24, x: 80, y: 55 },
  { id: 25, x: 75, y: 70 },
]

const connections = [
  // Left outer connections
  [1, 2], [2, 3], [3, 4],
  // Left inner connections
  [5, 6], [6, 7],
  // Left cross connections
  [1, 5], [2, 6], [3, 7], [4, 7],
  [5, 8], [5, 11],
  // Top arc
  [8, 9], [9, 10],
  // Center vertical spine
  [9, 12], [12, 15], [15, 17], [15, 18],
  // Center horizontal bands
  [11, 12], [12, 13],
  [14, 15], [15, 16],
  [17, 18],
  // Center cross connections
  [8, 11], [10, 13],
  [11, 14], [13, 16],
  [14, 17], [16, 18],
  // Right inner connections
  [19, 20], [20, 21],
  // Right outer connections
  [22, 23], [23, 24], [24, 25],
  // Right cross connections
  [22, 19], [23, 20], [24, 21], [25, 21],
  [19, 10], [19, 13],
  // Hemisphere bridges
  [6, 14], [7, 17],
  [20, 16], [21, 18],
]

export function IntelligenceField() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)
  const [flowingPaths, setFlowingPaths] = useState<number[]>([])
  const [animationPhase, setAnimationPhase] = useState(0)

  // Get starting nodes near a question
  const getStartNodes = (questionId: number): number[] => {
    switch (questionId) {
      case 1: return [2, 6] // Write code - left side
      case 2: return [23, 20] // Summarize - right side
      case 3: return [4, 7] // Plan a trip - bottom left
      case 4: return [24, 21] // Explain - bottom right
      case 5: return [9, 12] // Generate ideas - top center
      default: return []
    }
  }

  // Build path from start nodes to center
  const buildPathToCenter = (startNodes: number[]): number[] => {
    const pathNodes = new Set<number>()
    const centerId = 15

    const findPath = (startId: number, visited: Set<number> = new Set()): number[] => {
      if (startId === centerId) return [centerId]
      visited.add(startId)

      const currentNode = nodes.find(n => n.id === startId)
      const centerNode = nodes.find(n => n.id === centerId)
      if (!currentNode || !centerNode) return []

      const connected = connections
        .filter(c => c[0] === startId || c[1] === startId)
        .map(c => (c[0] === startId ? c[1] : c[0]))
        .filter(id => !visited.has(id))

      // Sort by distance to center
      const sorted = connected.sort((a, b) => {
        const nodeA = nodes.find(n => n.id === a)
        const nodeB = nodes.find(n => n.id === b)
        if (!nodeA || !nodeB) return 0

        const distA = Math.sqrt(
          Math.pow(nodeA.x - centerNode.x, 2) + Math.pow(nodeA.y - centerNode.y, 2)
        )
        const distB = Math.sqrt(
          Math.pow(nodeB.x - centerNode.x, 2) + Math.pow(nodeB.y - centerNode.y, 2)
        )
        return distA - distB
      })

      for (const nextId of sorted) {
        const path = findPath(nextId, new Set(visited))
        if (path.length > 0) {
          return [startId, ...path]
        }
      }

      return []
    }

    startNodes.forEach(startId => {
      const path = findPath(startId)
      path.forEach(id => pathNodes.add(id))
    })

    return Array.from(pathNodes)
  }

  useEffect(() => {
    if (activeQuestion) {
      const startNodes = getStartNodes(activeQuestion)
      const path = buildPathToCenter(startNodes)
      
      // Animate the path appearing
      setFlowingPaths([])
      let phase = 0
      const interval = setInterval(() => {
        phase++
        setAnimationPhase(phase)
        const visibleCount = Math.min(phase * 2, path.length)
        setFlowingPaths(path.slice(0, visibleCount))
        
        if (visibleCount >= path.length) {
          clearInterval(interval)
        }
      }, 80)
      
      return () => clearInterval(interval)
    } else {
      setFlowingPaths([])
      setAnimationPhase(0)
    }
  }, [activeQuestion])

  const isNodeActive = (nodeId: number) => flowingPaths.includes(nodeId)

  const isConnectionActive = (conn: number[]) => {
    return flowingPaths.includes(conn[0]) && flowingPaths.includes(conn[1])
  }

  return (
    <section className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="relative w-full aspect-[16/10] md:aspect-[2/1]">
          {/* SVG for connections and nodes */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 85"
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
                  stroke={active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.08)"}
                  strokeWidth={active ? 0.25 : 0.12}
                  className="transition-all duration-300"
                />
              )
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const active = isNodeActive(node.id)
              const isCenter = node.id === 15

              return (
                <g key={node.id}>
                  {/* Glow for active nodes */}
                  {(active || isCenter) && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isCenter ? 2.5 : 1.8}
                      fill={
                        isCenter
                          ? "rgba(255,255,255,0.12)"
                          : "rgba(255,255,255,0.08)"
                      }
                      className="transition-all duration-300"
                    />
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isCenter ? 1.2 : active ? 0.7 : 0.4}
                    fill={
                      active || isCenter
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.2)"
                    }
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
              className={`absolute text-xs md:text-sm font-normal transition-all duration-300 cursor-pointer px-3 py-1.5 rounded-full border whitespace-nowrap ${
                activeQuestion === question.id
                  ? "text-white border-white/25 bg-white/5"
                  : "text-white/40 border-white/10 hover:text-white/80 hover:border-white/20"
              }`}
              style={{
                left: `${question.x}%`,
                top: `${question.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setActiveQuestion(question.id)}
              onMouseLeave={() => setActiveQuestion(null)}
            >
              {question.text}
            </button>
          ))}

          {/* Center label */}
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-4 text-xs transition-all duration-500 pointer-events-none ${
              activeQuestion ? "text-white/70" : "text-white/30"
            }`}
          >
            Beroqk
          </div>
        </div>
      </div>
    </section>
  )
}
