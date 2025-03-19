"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/context/language-context"
import Image from "next/image"

interface ExportRoute {
  destination: string
  coordinates: [number, number]
  color?: string
}

const exportDestinations: ExportRoute[] = [
  { destination: "Germany", coordinates: [51.1657, 10.4515], color: "#e74c3c" },
  { destination: "China", coordinates: [35.8617, 104.1954], color: "#e67e22" },
  { destination: "Italy", coordinates: [41.8719, 12.5674], color: "#f1c40f" },
  { destination: "Morocco", coordinates: [31.7917, -7.0926], color: "#2ecc71" },
  { destination: "Sudan", coordinates: [12.8628, 30.2176], color: "#1abc9c" },
  { destination: "India", coordinates: [20.5937, 78.9629], color: "#3498db" },
  { destination: "Spain", coordinates: [40.4637, -3.7492], color: "#9b59b6" },
  { destination: "USA", coordinates: [37.0902, -95.7129], color: "#8e44ad" },
  { destination: "Greece", coordinates: [39.0742, 21.8243], color: "#2980b9" },
  { destination: "Switzerland", coordinates: [46.8182, 8.2275], color: "#16a085" },
  { destination: "Macedonia", coordinates: [41.6086, 21.7453], color: "#27ae60" },
  { destination: "Singapore", coordinates: [1.3521, 103.8198], color: "#d35400" },
  { destination: "Netherlands", coordinates: [52.1326, 5.2913], color: "#c0392b" },
  { destination: "Portugal", coordinates: [39.3999, -8.2245], color: "#7f8c8d" },
  { destination: "Sweden", coordinates: [60.1282, 18.6435], color: "#2c3e50" },
]

// Uganda coordinates
const ugandaCoordinates: [number, number] = [1.3733, 32.2903]

export default function WorldMapWithRoutes() {
  const { language } = useLanguage()
  const [animatedRoutes, setAnimatedRoutes] = useState<number[]>([])
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  const translations = {
    en: {
      title: "Our Global Export Network",
      subtitle: "Coffee Export Routes",
      description:
        "We export sorted and approved coffee beans to Europe & other markets. To ensure maximum benefits for our farmers, we have negotiated the best coffee rates in our overseas markets.",
      statistics: "Currently these are our statistics of exports from Uganda to the rest of the world",
      loading: "Loading map...",
      uganda: "Uganda",
    },
    zh: {
      title: "我们的全球出口网络",
      subtitle: "咖啡出口路线",
      description:
        "我们将分类和批准的咖啡豆出口到欧洲和其他市场。为了确保我们的农民获得最大利益，我们在海外市场上协商了最佳的咖啡价格。",
      statistics: "目前，这些是我们从乌干达到世界其他地区的出口统计数据",
      loading: "加载地图中...",
      uganda: "乌干达",
    },
    fr: {
      title: "Notre Réseau d'Exportation Mondial",
      subtitle: "Routes d'Exportation du Café",
      description:
        "Nous exportons des grains de café triés et approuvés vers l'Europe et d'autres marchés. Pour assurer un maximum d'avantages à nos agriculteurs, nous avons négocié les meilleurs tarifs de café sur nos marchés étrangers.",
      statistics: "Actuellement, voici nos statistiques d'exportations de l'Ouganda vers le reste du monde",
      loading: "Chargement de la carte...",
      uganda: "Ouganda",
    },
    it: {
      title: "La Nostra Rete di Esportazione Globale",
      subtitle: "Rotte di Esportazione del Caffè",
      description:
        "Esportiamo chicchi di caffè selezionati e approvati in Europa e altri mercati. Per garantire il massimo beneficio ai nostri agricoltori, abbiamo negoziato le migliori tariffe di caffè nei nostri mercati esteri.",
      statistics: "Attualmente queste sono le nostre statistiche di esportazione dall'Uganda al resto del mondo",
      loading: "Caricamento mappa...",
      uganda: "Uganda",
    },
  }

  const t = translations[language as keyof typeof translations]

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsMapLoaded(true)

      // Start animating routes after map loads
      startRouteAnimations()
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Start animating routes one by one
  const startRouteAnimations = () => {
    exportDestinations.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedRoutes((prev) => [...prev, index])
      }, index * 200) // Stagger the animations
    })
  }

  // Calculate route paths based on zoom level
  const getRoutePath = (destination: ExportRoute) => {
    // This is a simplified representation of curved routes
    // In a real implementation, this would use proper map projections
    const [destLat, destLng] = destination.coordinates

    // Calculate control point for curved line
    const midLat = (destLat + ugandaCoordinates[0]) / 2
    const midLng = (destLng + ugandaCoordinates[1]) / 2

    // Add some curvature based on distance
    const latDiff = destLat - ugandaCoordinates[0]
    const lngDiff = destLng - ugandaCoordinates[1]
    const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff)

    // Perpendicular offset for curve
    const curveFactor = distance * 0.2
    const perpLat = midLat + curveFactor * (lngDiff / distance)
    const perpLng = midLng - curveFactor * (latDiff / distance)

    return `M ${ugandaCoordinates[1] * 2 + 180} ${90 - ugandaCoordinates[0] * 2} Q ${perpLng * 2 + 180} ${90 - perpLat * 2} ${destLng * 2 + 180} ${90 - destLat * 2}`
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">{t.title}</h2>
        <p className="text-xl mb-4">{t.subtitle}</p>
        <p className="max-w-3xl mx-auto text-gray-700 mb-2">{t.description}</p>
        <p className="max-w-3xl mx-auto text-gray-700">{t.statistics}</p>
      </div>

      <div className="relative w-full h-[600px] mb-6 overflow-hidden rounded-lg border border-gray-200 shadow-md">
        {!isMapLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center">
              <svg
                className="animate-spin h-10 w-10 text-gray-500 mb-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="text-gray-600">{t.loading}</span>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {/* World map background */}
            <div className="absolute inset-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/world%20map.PNG-FLKFFX3vdOscC56oHaD0B2QYJC8Ofg.png"
                alt="World Map"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* SVG overlay for routes */}
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 360 180" preserveAspectRatio="xMidYMid meet">
              {/* Export routes with animation */}
              {exportDestinations.map((dest, index) => (
                <g key={index}>
                  {animatedRoutes.includes(index) && (
                    <>
                      <path
                        d={getRoutePath(dest)}
                        fill="none"
                        stroke={dest.color || "#e74c3c"}
                        strokeWidth="1.5"
                        strokeOpacity="0.8"
                        strokeDasharray="3,2"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          from="1000"
                          to="0"
                          dur="2s"
                          begin="0s"
                          fill="freeze"
                        />
                      </path>
                      <circle
                        cx={dest.coordinates[1] * 2 + 180}
                        cy={90 - dest.coordinates[0] * 2}
                        r="3"
                        fill={dest.color || "#e74c3c"}
                      >
                        <animate attributeName="r" values="0;3;2;3" dur="1s" begin="1s" fill="freeze" />
                      </circle>
                      <text
                        x={dest.coordinates[1] * 2 + 180 + 5}
                        y={90 - dest.coordinates[0] * 2 + 3}
                        fontSize="6"
                        fill="#333"
                      >
                        {dest.destination}
                      </text>
                    </>
                  )}
                </g>
              ))}

              {/* Uganda highlight with label */}
              <g>
                <circle
                  cx={ugandaCoordinates[1] * 2 + 180}
                  cy={90 - ugandaCoordinates[0] * 2}
                  r="4"
                  fill="#4285F4"
                  stroke="#3367D6"
                  strokeWidth="1.5"
                >
                  <animate attributeName="r" values="3;5;4" dur="1s" repeatCount="1" />
                </circle>
                <text
                  x={ugandaCoordinates[1] * 2 + 180 + 6}
                  y={90 - ugandaCoordinates[0] * 2 + 3}
                  fontSize="7"
                  fontWeight="bold"
                  fill="#333"
                >
                  {t.uganda}
                </text>
              </g>
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white p-3 rounded shadow-md max-w-[200px] text-sm">
              <div className="font-semibold mb-2">Export Destinations:</div>
              <ul className="text-xs space-y-1 max-h-[150px] overflow-y-auto">
                {exportDestinations.slice(0, 8).map((dest) => (
                  <li key={dest.destination} className="flex items-center">
                    <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: dest.color }}></span>
                    {dest.destination}
                  </li>
                ))}
                <li>...and more</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {exportDestinations.map((dest) => (
          <span key={dest.destination} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            {dest.destination}
          </span>
        ))}
      </div>
    </div>
  )
}

