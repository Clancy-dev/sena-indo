"use client"

import { useEffect, useState, useRef } from "react"
import { useLanguage } from "@/context/language-context"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

// Define destination interface
interface ExportDestination {
  name: string
  country: string
  coords: [number, number]
  color?: string
}

// Uganda coordinates (Entebbe International Airport)
const UGANDA_COORDS: [number, number] = [0.314, 32.581]

// Export destinations
const exportDestinations: ExportDestination[] = [
  { name: "Berlin", country: "Germany", coords: [52.52, 13.405], color: "#e74c3c" },
  { name: "Beijing", country: "China", coords: [39.9042, 116.4074], color: "#e67e22" },
  { name: "Rome", country: "Italy", coords: [41.9028, 12.4964], color: "#f1c40f" },
  { name: "Casablanca", country: "Morocco", coords: [33.5731, -7.5898], color: "#2ecc71" },
  { name: "Khartoum", country: "Sudan", coords: [15.5007, 32.5599], color: "#1abc9c" },
  { name: "Mumbai", country: "India", coords: [19.076, 72.8777], color: "#3498db" },
  { name: "Madrid", country: "Spain", coords: [40.4168, -3.7038], color: "#9b59b6" },
  { name: "New York", country: "USA", coords: [40.7128, -74.006], color: "#8e44ad" },
  { name: "Athens", country: "Greece", coords: [37.9838, 23.7275], color: "#2980b9" },
  { name: "Zurich", country: "Switzerland", coords: [47.3769, 8.5417], color: "#16a085" },
  { name: "Skopje", country: "Macedonia", coords: [41.9981, 21.4254], color: "#27ae60" },
  { name: "Singapore", country: "Singapore", coords: [1.3521, 103.8198], color: "#d35400" },
  { name: "Amsterdam", country: "Netherlands", coords: [52.3676, 4.9041], color: "#c0392b" },
  { name: "Lisbon", country: "Portugal", coords: [38.7169, -9.1399], color: "#7f8c8d" },
  { name: "Stockholm", country: "Sweden", coords: [59.3293, 18.0686], color: "#2c3e50" },
]

// Dynamically import the Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })

const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })

const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), { ssr: false })

const LeafletExportRoutes = () => {
  const { language } = useLanguage()
  const [isClient, setIsClient] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState<ExportDestination | null>(null)
  const mapRef = useRef(null)

  // Translations
  const translations = {
    en: {
      title: "Our Global Export Network",
      subtitle: "Coffee Export Routes from Uganda",
      description:
        "We export sorted and approved coffee beans to Europe & other markets. To ensure maximum benefits for our farmers, we have negotiated the best coffee rates in our overseas markets.",
      statistics: "Currently these are our statistics of exports from Uganda to the rest of the world",
      loading: "Loading map...",
      uganda: "Entebbe International Airport, Uganda",
      exportDestinations: "Export Destinations",
      viewAll: "View All Routes",
      selectDestination: "Select a destination to view its route",
    },
    zh: {
      title: "我们的全球出口网络",
      subtitle: "从乌干达出发的咖啡出口路线",
      description:
        "我们将分类和批准的咖啡豆出口到欧洲和其他市场。为了确保我们的农民获得最大利益，我们在海外市场上协商了最佳的咖啡价格。",
      statistics: "目前，这些是我们从乌干达到世界其他地区的出口统计数据",
      loading: "加载地图中...",
      uganda: "恩德培国际机场，乌干达",
      exportDestinations: "出口目的地",
      viewAll: "查看所有路线",
      selectDestination: "选择目的地查看其路线",
    },
    fr: {
      title: "Notre Réseau d'Exportation Mondial",
      subtitle: "Routes d'Exportation de Café depuis l'Ouganda",
      description:
        "Nous exportons des grains de café triés et approuvés vers l'Europe et d'autres marchés. Pour assurer un maximum d'avantages à nos agriculteurs, nous avons négocié les meilleurs tarifs de café sur nos marchés étrangers.",
      statistics: "Actuellement, voici nos statistiques d'exportations de l'Ouganda vers le reste du monde",
      loading: "Chargement de la carte...",
      uganda: "Aéroport International d'Entebbe, Ouganda",
      exportDestinations: "Destinations d'Exportation",
      viewAll: "Voir Toutes les Routes",
      selectDestination: "Sélectionnez une destination pour voir son itinéraire",
    },
    it: {
      title: "La Nostra Rete di Esportazione Globale",
      subtitle: "Rotte di Esportazione del Caffè dall'Uganda",
      description:
        "Esportiamo chicchi di caffè selezionati e approvati in Europa e altri mercati. Per garantire il massimo beneficio ai nostri agricoltori, abbiamo negoziato le migliori tariffe di caffè nei nostri mercati esteri.",
      statistics: "Attualmente queste sono le nostre statistiche di esportazione dall'Uganda al resto del mondo",
      loading: "Caricamento mappa...",
      uganda: "Aeroporto Internazionale di Entebbe, Uganda",
      exportDestinations: "Destinazioni di Esportazione",
      viewAll: "Visualizza Tutte le Rotte",
      selectDestination: "Seleziona una destinazione per visualizzare il suo percorso",
    },
    de: {
      title: "Unser Globales Exportnetzwerk",
      subtitle: "Kaffee-Exportrouten aus Uganda",
      description:
        "Wir exportieren sortierte und zugelassene Kaffeebohnen nach Europa und andere Märkte. Um maximale Vorteile für unsere Bauern zu gewährleisten, haben wir die besten Kaffeepreise auf unseren Überseemärkten ausgehandelt.",
      statistics: "Derzeit sind dies unsere Exportstatistiken von Uganda in die restliche Welt",
      loading: "Karte wird geladen...",
      uganda: "Internationaler Flughafen Entebbe, Uganda",
      exportDestinations: "Exportziele",
      viewAll: "Alle Routen anzeigen",
      selectDestination: "Wählen Sie ein Ziel, um seine Route anzuzeigen",
    },
    es: {
      title: "Nuestra Red Global de Exportación",
      subtitle: "Rutas de Exportación de Café desde Uganda",
      description:
        "Exportamos granos de café seleccionados y aprobados a Europa y otros mercados. Para garantizar el máximo beneficio para nuestros agricultores, hemos negociado las mejores tarifas de café en nuestros mercados extranjeros.",
      statistics: "Actualmente estas son nuestras estadísticas de exportaciones desde Uganda al resto del mundo",
      loading: "Cargando mapa...",
      uganda: "Aeropuerto Internacional de Entebbe, Uganda",
      exportDestinations: "Destinos de Exportación",
      viewAll: "Ver Todas las Rutas",
      selectDestination: "Seleccione un destino para ver su ruta",
    },
    pt: {
      title: "Nossa Rede Global de Exportação",
      subtitle: "Rotas de Exportação de Café de Uganda",
      description:
        "Exportamos grãos de café selecionados e aprovados para a Europa e outros mercados. Para garantir o máximo de benefícios para nossos agricultores, negociamos as melhores taxas de café em nossos mercados no exterior.",
      statistics: "Atualmente, estas são nossas estatísticas de exportações de Uganda para o resto do mundo",
      loading: "Carregando mapa...",
      uganda: "Aeroporto Internacional de Entebbe, Uganda",
      exportDestinations: "Destinos de Exportação",
      viewAll: "Ver Todas as Rotas",
      selectDestination: "Selecione um destino para ver sua rota",
    },
    nl: {
      title: "Ons Wereldwijde Exportnetwerk",
      subtitle: "Koffie-exportroutes vanuit Oeganda",
      description:
        "We exporteren gesorteerde en goedgekeurde koffiebonen naar Europa en andere markten. Om maximale voordelen voor onze boeren te garanderen, hebben we de beste koffieprijzen op onze overzeese markten bedongen.",
      statistics: "Momenteel zijn dit onze exportstatistieken van Oeganda naar de rest van de wereld",
      loading: "Kaart laden...",
      uganda: "Internationale Luchthaven Entebbe, Oeganda",
      exportDestinations: "Exportbestemmingen",
      viewAll: "Alle Routes Bekijken",
      selectDestination: "Selecteer een bestemming om de route te bekijken",
    },
  }

  const t = translations[language as keyof typeof translations] || translations.en

  // Set isClient to true when component mounts
  useEffect(() => {
    // Add Leaflet CSS using a link tag
    if (typeof window !== "undefined" && !document.getElementById("leaflet-css")) {
      const link = document.createElement("link")
      link.id = "leaflet-css"
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
      link.integrity = "sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
      link.crossOrigin = ""
      document.head.appendChild(link)
    }

    // Fix for Leaflet marker icons
    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      })
    })

    setIsClient(true)
  }, [])

  const handleDestinationClick = (destination: ExportDestination) => {
    setSelectedDestination(destination)
  }

  const handleViewAllRoutes = () => {
    setSelectedDestination(null)
  }

  // Custom marker icon for Uganda
  const createCustomIcon = (color: string) => {
    if (typeof window === "undefined") return null

    const L = require("leaflet")
    return new L.Icon({
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })
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
          {!isClient ? (
            <div className="h-full w-full flex items-center justify-center bg-gray-100">
              <div className="flex flex-col items-center">
                <Loader2 className="h-10 w-10 text-gray-500 mb-2 animate-spin" />
                <span className="text-gray-600">{t.loading}</span>
              </div>
            </div>
          ) : (
            <MapContainer center={UGANDA_COORDS} zoom={2} style={{ height: "100%", width: "100%" }} ref={mapRef}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {/* Marker for Uganda */}
              <Marker position={UGANDA_COORDS}>
                <Popup>{t.uganda}</Popup>
              </Marker>

              {/* Markers and Routes to Destinations */}
              {exportDestinations.map((dest, index) => (
                <>
                  <Marker key={`marker-${index}`} position={dest.coords}>
                    <Popup>{`${dest.name}, ${dest.country}`}</Popup>
                  </Marker>

                  {/* Only show selected route or all routes if none selected */}
                  {(!selectedDestination || selectedDestination.name === dest.name) && (
                    <Polyline
                      key={`route-${index}`}
                      positions={[UGANDA_COORDS, dest.coords]}
                      color={dest.color || "blue"}
                      weight={selectedDestination?.name === dest.name ? 4 : 2}
                      dashArray={selectedDestination?.name === dest.name ? "" : "5,5"}
                    />
                  )}
                </>
              ))}
            </MapContainer>
          )}
        </div>

        {/* Destinations sidebar */}
        <div className="w-full md:w-1/4 h-[600px] rounded-lg border border-gray-200 shadow-md overflow-hidden">
          <div className="bg-green-800 text-white p-3 font-semibold">{t.exportDestinations}</div>
          <div className="p-2 h-[calc(100%-96px)] overflow-y-auto">
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
                      <div className="font-medium">{destination.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-2 border-t border-gray-200">
            <Button variant="outline" className="w-full" onClick={handleViewAllRoutes}>
              {t.viewAll}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {exportDestinations.map((dest) => (
          <span
            key={dest.name}
            className={`${selectedDestination?.name === dest.name ? "bg-green-200" : "bg-green-100"} text-green-800 text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-green-200`}
            onClick={() => handleDestinationClick(dest)}
          >
            {dest.country}
          </span>
        ))}
      </div>
    </div>
  )
}

export default LeafletExportRoutes

