"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/context/language-context"
import { MapPin, ZoomIn, ZoomOut, RefreshCw, Navigation } from "lucide-react"

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
// Sena Indo Uganda Ltd office coordinates (Plot 15/17, 1st Street Industrial Area, Kampala)
const senaIndoOfficeCoordinates: [number, number] = [0.3136, 32.5811]

export default function ExportRouteMap() {
  const { language } = useLanguage()
  const mapRef = useRef<HTMLDivElement>(null)
  const [zoomLevel, setZoomLevel] = useState(2)
  const [centerPoint, setCenterPoint] = useState<[number, number]>(ugandaCoordinates)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [animatedRoutes, setAnimatedRoutes] = useState<number[]>([])

  const translations = {
    en: {
      title: "Our Global Export Network",
      subtitle: "Coffee Export Routes",
      description:
        "We export sorted and approved coffee beans to Europe & other markets. To ensure maximum benefits for our farmers, we have negotiated the best coffee rates in our overseas markets.",
      statistics: "Currently these are our statistics of exports from Uganda to the rest of the world",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      resetView: "Reset View",
      viewOffice: "View Our Office",
      office: "Plot 15/17, 1st Street Industrial Area, Kampala, Uganda, Next to New Vision",
      loading: "Loading map...",
      googleMaps: "Google Maps",
      satellite: "Satellite",
      terrain: "Terrain",
      map: "Map",
      uganda: "Uganda",
    },
    zh: {
      title: "我们的全球出口网络",
      subtitle: "咖啡出口路线",
      description:
        "我们将分类和批准的咖啡豆出口到欧洲和其他市场。为了确保我们的农民获得最大利益，我们在海外市场上协商了���佳的咖啡价格。",
      statistics: "目前，这些是我们从乌干达到世界其他地区的出口统计数据",
      zoomIn: "放大",
      zoomOut: "缩小",
      resetView: "重置视图",
      viewOffice: "查看我们的办公室",
      office: "乌干达坎帕拉工业区一街15/17号，新愿景旁",
      loading: "加载地图中...",
      googleMaps: "谷歌地图",
      satellite: "卫星",
      terrain: "地形",
      map: "地图",
      uganda: "乌干达",
    },
    fr: {
      title: "Notre Réseau d'Exportation Mondial",
      subtitle: "Routes d'Exportation du Café",
      description:
        "Nous exportons des grains de café triés et approuvés vers l'Europe et d'autres marchés. Pour assurer un maximum d'avantages à nos agriculteurs, nous avons négocié les meilleurs tarifs de café sur nos marchés étrangers.",
      statistics: "Actuellement, voici nos statistiques d'exportations de l'Ouganda vers le reste du monde",
      zoomIn: "Zoom Avant",
      zoomOut: "Zoom Arrière",
      resetView: "Réinitialiser la Vue",
      viewOffice: "Voir Notre Bureau",
      office: "Parcelle 15/17, 1ère Rue Zone Industrielle, Kampala, Ouganda, À côté de New Vision",
      loading: "Chargement de la carte...",
      googleMaps: "Google Maps",
      satellite: "Satellite",
      terrain: "Carte",
      map: "Carte",
      uganda: "Ouganda",
    },
    it: {
      title: "La Nostra Rete di Esportazione Globale",
      subtitle: "Rotte di Esportazione del Caffè",
      description:
        "Esportiamo chicchi di caffè selezionati e approvati in Europa e altri mercati. Per garantire il massimo beneficio ai nostri agricoltori, abbiamo negoziato le migliori tariffe di caffè nei nostri mercati esteri.",
      statistics: "Attualmente queste sono le nostre statistiche di esportazione dall'Uganda al resto del mondo",
      zoomIn: "Ingrandisci",
      zoomOut: "Rimpicciolisci",
      resetView: "Reimposta Vista",
      viewOffice: "Visualizza il Nostro Ufficio",
      office: "Lotto 15/17, 1a Strada Zona Industriale, Kampala, Uganda, Accanto a New Vision",
      loading: "Caricamento mappa...",
      googleMaps: "Google Maps",
      satellite: "Satellite",
      terrain: "Terreno",
      map: "Mappa",
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

  const handleZoomIn = () => {
    if (zoomLevel < 18) {
      setZoomLevel((prev) => prev + 1)
    }
  }

  const handleZoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel((prev) => prev - 1)
    }
  }

  const handleResetView = () => {
    setZoomLevel(2)
    setCenterPoint(ugandaCoordinates)
  }

  const handleViewOffice = () => {
    setZoomLevel(16)
    setCenterPoint(senaIndoOfficeCoordinates)
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
        {/* Google Maps header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 p-2 flex justify-between items-center">
          <div className="flex items-center">
            <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.527 4.799c1.212 2.608.937 5.678-.405 8.173-1.101 2.047-2.744 3.74-4.098 5.614-.619.858-1.244 1.75-1.669 2.727-.141.325-.263.658-.383.992-.121.333-.224.673-.34 1.008-.109.314-.236.684-.627.687h-.007c-.385-.003-.506-.368-.618-.686-.109-.334-.22-.672-.334-1.008-.127-.333-.242-.667-.39-.992-.439-.977-1.044-1.868-1.667-2.727-1.354-1.875-2.998-3.567-4.1-5.614-1.318-2.496-1.576-5.566-.368-8.173 1.355-2.923 4.503-4.701 7.778-4.708 3.275.007 6.415 1.785 7.775 4.708zm-7.425 14.701c.18-.414.366-.827.545-1.241 1.437-3.363 2.793-6.543 2.212-10.325-.334-2.149-1.18-4.101-2.618-5.622C10.802.816 8.348-.003 5.965 0 3.574.003 1.125.825.676 2.311c-.76 2.521-.342 5.187.916 7.39.928 1.633 2.074 3.005 3.286 4.324 1.015 1.1 2.068 2.238 2.818 3.507.345.58.664 1.172.955 1.968h.007z"
                fill="#34A853"
              />
              <path
                d="M5.965 2.311c1.677 0 3.034 1.378 3.034 3.081 0 1.704-1.357 3.081-3.034 3.081-1.677 0-3.034-1.378-3.034-3.081 0-1.704 1.357-3.081 3.034-3.081z"
                fill="#FBBC05"
              />
              <path
                d="M5.965 15.931c-2.916-.004-5.32-2.42-5.324-5.361V10.57c0 2.941 2.405 5.357 5.324 5.361h.008z"
                fill="#4285F4"
              />
              <path
                d="M5.965 15.931c2.916-.004 5.32-2.42 5.324-5.361V10.57c0 2.941-2.405 5.357-5.324 5.361h-.008z"
                fill="#EA4335"
              />
            </svg>
            <span className="font-medium">{t.googleMaps}</span>
          </div>
          <div className="flex space-x-2">
            <button className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50">
              {t.satellite}
            </button>
            <button className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50">
              {t.terrain}
            </button>
            <button className="px-2 py-1 text-xs bg-blue-500 text-white border border-blue-600 rounded">{t.map}</button>
          </div>
        </div>

        {/* Map container */}
        <div
          ref={mapRef}
          className="w-full h-full relative"
          style={{
            backgroundImage: "url('/placeholder.svg?height=600&width=1200')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#e8f0f9",
            transition: "transform 0.5s ease",
          }}
        >
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
            <>
              {/* World map SVG overlay */}
              <svg className="w-full h-full absolute inset-0" viewBox="0 0 360 180" preserveAspectRatio="xMidYMid meet">
                {/* Export routes with animation */}
                {zoomLevel < 10 &&
                  exportDestinations.map((dest, index) => (
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

                {/* Office location (only visible at high zoom) */}
                {zoomLevel >= 10 && (
                  <circle
                    cx={senaIndoOfficeCoordinates[1] * 2 + 180}
                    cy={90 - senaIndoOfficeCoordinates[0] * 2}
                    r={zoomLevel === 16 ? 5 : 2}
                    fill="#EA4335"
                    stroke="#C5221F"
                    strokeWidth="1"
                  />
                )}
              </svg>

              {/* Office info window (only visible at high zoom) */}
              {zoomLevel >= 14 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-lg shadow-lg max-w-xs">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-sm">SENA INDO UGANDA LIMITED</h3>
                      <p className="text-xs text-gray-600 mt-1">{t.office}</p>
                      <div className="mt-2 flex justify-between">
                        <button className="text-blue-600 text-xs hover:text-blue-800">Directions</button>
                        <button className="text-blue-600 text-xs hover:text-blue-800">Save</button>
                        <button className="text-blue-600 text-xs hover:text-blue-800">Share</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Map controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label={t.zoomIn}
          >
            <ZoomIn className="h-5 w-5 text-gray-700" />
          </button>
          <button
            onClick={handleZoomOut}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label={t.zoomOut}
          >
            <ZoomOut className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Additional map controls */}
        <div className="absolute top-16 right-4 flex flex-col gap-2">
          <button
            onClick={handleResetView}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center"
            aria-label={t.resetView}
          >
            <RefreshCw className="h-5 w-5 text-gray-700" />
          </button>
          <button
            onClick={handleViewOffice}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center"
            aria-label={t.viewOffice}
          >
            <Navigation className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Legend */}
        {zoomLevel < 10 && (
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

