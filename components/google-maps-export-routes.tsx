"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/context/language-context"
import { MapPin, ZoomIn, ZoomOut, RefreshCw, Navigation, Layers } from "lucide-react"

interface ExportDestination {
  name: string
  country: string
  coordinates: [number, number]
  color: string
}

// Uganda coordinates (origin)
const UGANDA_COORDINATES: [number, number] = [1.3733, 32.2903]
const KAMPALA_COORDINATES: [number, number] = [0.3476, 32.5825]

// Export destinations
const exportDestinations: ExportDestination[] = [
  { name: "Berlin", country: "Germany", coordinates: [52.52, 13.405], color: "#e74c3c" },
  { name: "Beijing", country: "China", coordinates: [39.9042, 116.4074], color: "#e67e22" },
  { name: "Rome", country: "Italy", coordinates: [41.9028, 12.4964], color: "#f1c40f" },
  { name: "Casablanca", country: "Morocco", coordinates: [33.5731, -7.5898], color: "#2ecc71" },
  { name: "Khartoum", country: "Sudan", coordinates: [15.5007, 32.5599], color: "#1abc9c" },
  { name: "Mumbai", country: "India", coordinates: [19.076, 72.8777], color: "#3498db" },
  { name: "Madrid", country: "Spain", coordinates: [40.4168, -3.7038], color: "#9b59b6" },
  { name: "New York", country: "USA", coordinates: [40.7128, -74.006], color: "#8e44ad" },
  { name: "Athens", country: "Greece", coordinates: [37.9838, 23.7275], color: "#2980b9" },
  { name: "Zurich", country: "Switzerland", coordinates: [47.3769, 8.5417], color: "#16a085" },
  { name: "Skopje", country: "Macedonia", coordinates: [41.9981, 21.4254], color: "#27ae60" },
  { name: "Singapore", country: "Singapore", coordinates: [1.3521, 103.8198], color: "#d35400" },
  { name: "Amsterdam", country: "Netherlands", coordinates: [52.3676, 4.9041], color: "#c0392b" },
  { name: "Lisbon", country: "Portugal", coordinates: [38.7223, -9.1393], color: "#7f8c8d" },
  { name: "Stockholm", country: "Sweden", coordinates: [59.3293, 18.0686], color: "#2c3e50" },
]

export default function GoogleMapsExportRoutes() {
  const { language } = useLanguage()
  const mapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [zoom, setZoom] = useState(2)
  const [center, setCenter] = useState<[number, number]>(UGANDA_COORDINATES)
  const [mapType, setMapType] = useState<"roadmap" | "satellite" | "terrain">("roadmap")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDestination, setSelectedDestination] = useState<ExportDestination | null>(null)
  const [showAllRoutes, setShowAllRoutes] = useState(true)
  const [animationProgress, setAnimationProgress] = useState(0)

  const translations = {
    en: {
      title: "Our Global Export Network",
      subtitle: "Coffee Export Routes from Uganda",
      description:
        "We export sorted and approved coffee beans to Europe & other markets. To ensure maximum benefits for our farmers, we have negotiated the best coffee rates in our overseas markets.",
      statistics: "Currently these are our statistics of exports from Uganda to the rest of the world",
      loading: "Loading map...",
      roadmap: "Map",
      satellite: "Satellite",
      terrain: "Terrain",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      resetView: "Reset view",
      viewOffice: "View our office",
      showAllRoutes: "Show all routes",
      hideAllRoutes: "Hide all routes",
      exportDestinations: "Export Destinations",
      office: "SENA INDO UGANDA LIMITED Office",
      officeAddress: "Plot 15/17, 1st Street Industrial Area, Kampala, Uganda",
    },
    zh: {
      title: "我们的全球出口网络",
      subtitle: "从乌干达出发的咖啡出口路线",
      description:
        "我们将分类和批准的咖啡豆出口到欧洲和其他市场。为了确保我们的农民获得最大利益，我们在海外市场上协商了最佳的咖啡价格。",
      statistics: "目前，这些是我们从乌干达到世界其他地区的出口统计数据",
      loading: "加载地图中...",
      roadmap: "地图",
      satellite: "卫星",
      terrain: "地形",
      zoomIn: "放大",
      zoomOut: "缩小",
      resetView: "重置视图",
      viewOffice: "查看我们的办公室",
      showAllRoutes: "显示所有路线",
      hideAllRoutes: "隐藏所有路线",
      exportDestinations: "出口目的地",
      office: "SENA INDO 乌干达有限公司办公室",
      officeAddress: "乌干达坎帕拉工业区一街15/17号",
    },
    fr: {
      title: "Notre Réseau d'Exportation Mondial",
      subtitle: "Routes d'Exportation de Café depuis l'Ouganda",
      description:
        "Nous exportons des grains de café triés et approuvés vers l'Europe et d'autres marchés. Pour assurer un maximum d'avantages à nos agriculteurs, nous avons négocié les meilleurs tarifs de café sur nos marchés étrangers.",
      statistics: "Actuellement, voici nos statistiques d'exportations de l'Ouganda vers le reste du monde",
      loading: "Chargement de la carte...",
      roadmap: "Carte",
      satellite: "Satellite",
      terrain: "Terrain",
      zoomIn: "Zoom avant",
      zoomOut: "Zoom arrière",
      resetView: "Réinitialiser la vue",
      viewOffice: "Voir notre bureau",
      showAllRoutes: "Afficher toutes les routes",
      hideAllRoutes: "Masquer toutes les routes",
      exportDestinations: "Destinations d'Exportation",
      office: "Bureau de SENA INDO UGANDA LIMITED",
      officeAddress: "Parcelle 15/17, 1ère Rue Zone Industrielle, Kampala, Ouganda",
    },
    it: {
      title: "La Nostra Rete di Esportazione Globale",
      subtitle: "Rotte di Esportazione del Caffè dall'Uganda",
      description:
        "Esportiamo chicchi di caffè selezionati e approvati in Europa e altri mercati. Per garantire il massimo beneficio ai nostri agricoltori, abbiamo negoziato le migliori tariffe di caffè nei nostri mercati esteri.",
      statistics: "Attualmente queste sono le nostre statistiche di esportazione dall'Uganda al resto del mondo",
      loading: "Caricamento mappa...",
      roadmap: "Mappa",
      satellite: "Satellite",
      terrain: "Terreno",
      zoomIn: "Ingrandisci",
      zoomOut: "Rimpicciolisci",
      resetView: "Reimposta vista",
      viewOffice: "Visualizza il nostro ufficio",
      showAllRoutes: "Mostra tutte le rotte",
      hideAllRoutes: "Nascondi tutte le rotte",
      exportDestinations: "Destinazioni di Esportazione",
      office: "Ufficio SENA INDO UGANDA LIMITED",
      officeAddress: "Lotto 15/17, 1a Strada Zona Industriale, Kampala, Uganda",
    },
    de: {
      title: "Unser Globales Exportnetzwerk",
      subtitle: "Kaffee-Exportrouten aus Uganda",
      description:
        "Wir exportieren sortierte und zugelassene Kaffeebohnen nach Europa und andere Märkte. Um maximale Vorteile für unsere Bauern zu gewährleisten, haben wir die besten Kaffeepreise auf unseren Überseemärkten ausgehandelt.",
      statistics: "Derzeit sind dies unsere Exportstatistiken von Uganda in die restliche Welt",
      loading: "Karte wird geladen...",
      roadmap: "Karte",
      satellite: "Satellit",
      terrain: "Gelände",
      zoomIn: "Vergrößern",
      zoomOut: "Verkleinern",
      resetView: "Ansicht zurücksetzen",
      viewOffice: "Unser Büro anzeigen",
      showAllRoutes: "Alle Routen anzeigen",
      hideAllRoutes: "Alle Routen ausblenden",
      exportDestinations: "Exportziele",
      office: "SENA INDO UGANDA LIMITED Büro",
      officeAddress: "Grundstück 15/17, 1. Straße Industriegebiet, Kampala, Uganda",
    },
    es: {
      title: "Nuestra Red Global de Exportación",
      subtitle: "Rutas de Exportación de Café desde Uganda",
      description:
        "Exportamos granos de café seleccionados y aprobados a Europa y otros mercados. Para garantizar el máximo beneficio para nuestros agricultores, hemos negociado las mejores tarifas de café en nuestros mercados extranjeros.",
      statistics: "Actualmente estas son nuestras estadísticas de exportaciones desde Uganda al resto del mundo",
      loading: "Cargando mapa...",
      roadmap: "Mapa",
      satellite: "Satélite",
      terrain: "Terreno",
      zoomIn: "Acercar",
      zoomOut: "Alejar",
      resetView: "Restablecer vista",
      viewOffice: "Ver nuestra oficina",
      showAllRoutes: "Mostrar todas las rutas",
      hideAllRoutes: "Ocultar todas las rutas",
      exportDestinations: "Destinos de Exportación",
      office: "Oficina de SENA INDO UGANDA LIMITED",
      officeAddress: "Parcela 15/17, 1ª Calle Zona Industrial, Kampala, Uganda",
    },
    pt: {
      title: "Nossa Rede Global de Exportação",
      subtitle: "Rotas de Exportação de Café de Uganda",
      description:
        "Exportamos grãos de café selecionados e aprovados para a Europa e outros mercados. Para garantir o máximo de benefícios para nossos agricultores, negociamos as melhores taxas de café em nossos mercados no exterior.",
      statistics: "Atualmente, estas são nossas estatísticas de exportações de Uganda para o resto do mundo",
      loading: "Carregando mapa...",
      roadmap: "Mapa",
      satellite: "Satélite",
      terrain: "Terreno",
      zoomIn: "Aproximar",
      zoomOut: "Afastar",
      resetView: "Redefinir visualização",
      viewOffice: "Ver nosso escritório",
      showAllRoutes: "Mostrar todas as rotas",
      hideAllRoutes: "Ocultar todas as rotas",
      exportDestinations: "Destinos de Exportação",
      office: "Escritório SENA INDO UGANDA LIMITED",
      officeAddress: "Lote 15/17, 1ª Rua Área Industrial, Kampala, Uganda",
    },
    nl: {
      title: "Ons Wereldwijde Exportnetwerk",
      subtitle: "Koffie-exportroutes vanuit Oeganda",
      description:
        "We exporteren gesorteerde en goedgekeurde koffiebonen naar Europa en andere markten. Om maximale voordelen voor onze boeren te garanderen, hebben we de beste koffieprijzen op onze overzeese markten bedongen.",
      statistics: "Momenteel zijn dit onze exportstatistieken van Oeganda naar de rest van de wereld",
      loading: "Kaart laden...",
      roadmap: "Kaart",
      satellite: "Satelliet",
      terrain: "Terrein",
      zoomIn: "Inzoomen",
      zoomOut: "Uitzoomen",
      resetView: "Weergave resetten",
      viewOffice: "Ons kantoor bekijken",
      showAllRoutes: "Alle routes tonen",
      hideAllRoutes: "Alle routes verbergen",
      exportDestinations: "Exportbestemmingen",
      office: "SENA INDO UGANDA LIMITED Kantoor",
      officeAddress: "Perceel 15/17, 1e Straat Industriegebied, Kampala, Oeganda",
    },
  }

  const t = translations[language as keyof typeof translations] || translations.en

  // Initialize map and start animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      startAnimation()
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Animation effect
  useEffect(() => {
    let animationFrame: number
    let startTime: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / 5000, 1) // 5 seconds animation
      setAnimationProgress(progress)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    const startAnimation = () => {
      startTime = 0
      animationFrame = requestAnimationFrame(animate)
    }

    if (!isLoading) {
      startAnimation()
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isLoading])

  // Draw routes on canvas
  useEffect(() => {
    if (isLoading || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set canvas dimensions to match container
    const container = mapRef.current
    if (container) {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    // Function to convert geo coordinates to pixel coordinates
    const geoToPixel = (lat: number, lng: number): [number, number] => {
      // Simple Mercator projection
      const x = (lng + 180) * (canvas.width / 360)
      const latRad = (lat * Math.PI) / 180
      const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2))
      const y = canvas.height / 2 - (canvas.width * mercN) / (2 * Math.PI)
      return [x, y]
    }

    // Draw routes from Uganda to each destination
    const [ugandaX, ugandaY] = geoToPixel(UGANDA_COORDINATES[0], UGANDA_COORDINATES[1])

    exportDestinations.forEach((destination) => {
      if (!showAllRoutes && (!selectedDestination || selectedDestination.name !== destination.name)) {
        return
      }

      const [destX, destY] = geoToPixel(destination.coordinates[0], destination.coordinates[1])

      // Draw curved route
      ctx.beginPath()
      ctx.moveTo(ugandaX, ugandaY)

      // Control point for the curve
      const controlX = (ugandaX + destX) / 2
      const controlY = Math.min(ugandaY, destY) - Math.abs(destX - ugandaX) / 4

      // Draw the curve with animation
      const currentX = ugandaX + (destX - ugandaX) * animationProgress
      const currentY = ugandaY + (destY - ugandaY) * animationProgress

      ctx.quadraticCurveTo(controlX, controlY, currentX, currentY)

      ctx.strokeStyle = destination.color
      ctx.lineWidth = selectedDestination?.name === destination.name ? 3 : 2
      ctx.setLineDash([5, 3])
      ctx.stroke()

      // Draw destination marker if animation is complete
      if (animationProgress === 1) {
        ctx.beginPath()
        ctx.arc(destX, destY, 4, 0, Math.PI * 2)
        ctx.fillStyle = destination.color
        ctx.fill()

        // Draw destination name
        ctx.font = "10px Arial"
        ctx.fillStyle = "#333"
        ctx.fillText(`${destination.name}, ${destination.country}`, destX + 8, destY + 4)
      }
    })

    // Draw Uganda marker
    ctx.beginPath()
    ctx.arc(ugandaX, ugandaY, 6, 0, Math.PI * 2)
    ctx.fillStyle = "#4285F4"
    ctx.fill()
    ctx.strokeStyle = "#3367D6"
    ctx.lineWidth = 2
    ctx.stroke()

    // Label Uganda
    ctx.font = "bold 12px Arial"
    ctx.fillStyle = "#333"
    ctx.fillText("Uganda", ugandaX + 10, ugandaY + 5)
  }, [isLoading, animationProgress, showAllRoutes, selectedDestination, zoom, center, mapType])

  const startAnimation = () => {
    setAnimationProgress(0)
    const animate = () => {
      setAnimationProgress((prev) => {
        const newProgress = prev + 0.01
        if (newProgress >= 1) {
          return 1
        }
        requestAnimationFrame(animate)
        return newProgress
      })
    }
    requestAnimationFrame(animate)
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, 20))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, 1))
  }

  const handleResetView = () => {
    setZoom(2)
    setCenter(UGANDA_COORDINATES)
    setSelectedDestination(null)
    setShowAllRoutes(true)
  }

  const handleViewOffice = () => {
    setZoom(14)
    setCenter(KAMPALA_COORDINATES)
  }

  const handleMapTypeChange = (type: "roadmap" | "satellite" | "terrain") => {
    setMapType(type)
  }

  const handleDestinationClick = (destination: ExportDestination) => {
    setSelectedDestination(destination)
    setShowAllRoutes(false)
    startAnimation()
  }

  const toggleAllRoutes = () => {
    setShowAllRoutes((prev) => !prev)
    if (!showAllRoutes) {
      setSelectedDestination(null)
      startAnimation()
    }
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">{t.title}</h2>
        <p className="text-xl mb-4">{t.subtitle}</p>
        <p className="max-w-3xl mx-auto text-gray-700 mb-2">{t.description}</p>
        <p className="max-w-3xl mx-auto text-gray-700">{t.statistics}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Map container */}
        <div className="w-full md:w-3/4 h-[600px] relative rounded-lg border border-gray-200 shadow-md overflow-hidden">
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
              <span className="font-medium">Google Maps</span>
            </div>
            <div className="flex space-x-2">
              <button
                className={`px-2 py-1 text-xs ${mapType === "satellite" ? "bg-blue-500 text-white border-blue-600" : "bg-white border-gray-300 hover:bg-gray-50"} border rounded`}
                onClick={() => handleMapTypeChange("satellite")}
              >
                {t.satellite}
              </button>
              <button
                className={`px-2 py-1 text-xs ${mapType === "terrain" ? "bg-blue-500 text-white border-blue-600" : "bg-white border-gray-300 hover:bg-gray-50"} border rounded`}
                onClick={() => handleMapTypeChange("terrain")}
              >
                {t.terrain}
              </button>
              <button
                className={`px-2 py-1 text-xs ${mapType === "roadmap" ? "bg-blue-500 text-white border-blue-600" : "bg-white border-gray-300 hover:bg-gray-50"} border rounded`}
                onClick={() => handleMapTypeChange("roadmap")}
              >
                {t.roadmap}
              </button>
            </div>
          </div>

          {/* Map content */}
          <div
            ref={mapRef}
            className="w-full h-full relative"
            style={{
              backgroundImage:
                mapType === "satellite"
                  ? "url('https://miro.medium.com/v2/resize:fit:1400/1*_6UhbWpTXvBK1v3PVyqbBQ.jpeg')"
                  : mapType === "terrain"
                    ? "url('https://i.stack.imgur.com/rLKsj.jpg')"
                    : "url('https://developers.google.com/static/maps/images/landing/hero_maps_static_api.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: `brightness(${isLoading ? 0.7 : 1})`,
              transition: "filter 0.5s ease",
            }}
          >
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70">
                <div className="flex flex-col items-center">
                  <svg
                    className="animate-spin h-10 w-10 text-gray-500 mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
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
                {/* Canvas for drawing routes */}
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

                {/* Office info window (only visible at high zoom) */}
                {zoom >= 10 && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-lg shadow-lg max-w-xs">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-sm">{t.office}</h3>
                        <p className="text-xs text-gray-600 mt-1">{t.officeAddress}</p>
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
              <button
                onClick={toggleAllRoutes}
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center"
                aria-label={showAllRoutes ? t.hideAllRoutes : t.showAllRoutes}
              >
                <Layers className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Destinations sidebar */}
        <div className="w-full md:w-1/4 h-[600px] rounded-lg border border-gray-200 shadow-md overflow-hidden">
          <div className="bg-green-800 text-white p-3 font-semibold">{t.exportDestinations}</div>
          <div className="p-2 h-[calc(100%-48px)] overflow-y-auto">
            <div className="space-y-2">
              {exportDestinations.map((destination) => (
                <div
                  key={destination.name}
                  className={`p-2 rounded cursor-pointer transition-colors ${selectedDestination?.name === destination.name ? "bg-green-100 border-l-4 border-green-600" : "hover:bg-gray-100"}`}
                  onClick={() => handleDestinationClick(destination)}
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: destination.color }} />
                    <div>
                      <div className="font-medium">{destination.name}</div>
                      <div className="text-xs text-gray-600">{destination.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {exportDestinations.map((dest) => (
          <span
            key={dest.name}
            className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-green-200"
            onClick={() => handleDestinationClick(dest)}
          >
            {dest.name}, {dest.country}
          </span>
        ))}
      </div>
    </div>
  )
}

