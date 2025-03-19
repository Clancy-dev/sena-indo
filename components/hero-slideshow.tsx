"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useLanguage } from "@/context/language-context"
import { motion, AnimatePresence } from "framer-motion"

interface HeroSlide {
  imageUrl: string
  headingKey: string
  subtitleKey: string
}

export default function HeroSlideshow() {
  const { language } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  // Translations for the hero slides
  const translations = {
    en: {
      heading1: "Premium Green Coffee Beans",
      subtitle1: "Sourced directly from Uganda's finest plantations",
      heading2: "Quality That Speaks For Itself",
      subtitle2: "Expertly selected and processed for exceptional flavor profiles",
      heading3: "Sustainable Coffee Sourcing",
      subtitle3: "Supporting farmers and protecting the environment with every bean",
    },
    zh: {
      heading1: "优质绿咖啡豆",
      subtitle1: "直接从乌干达最好的种植园采购",
      heading2: "品质自我证明",
      subtitle2: "专业挑选和加工，带来卓越的风味特征",
      heading3: "可持续咖啡采购",
      subtitle3: "每一颗豆子都支持农民并保护环境",
    },
    fr: {
      heading1: "Grains de Café Vert Premium",
      subtitle1: "Provenant directement des meilleures plantations d'Ouganda",
      heading2: "Une Qualité Qui Parle d'Elle-même",
      subtitle2: "Sélectionnés et traités par des experts pour des profils de saveur exceptionnels",
      heading3: "Approvisionnement Durable en Café",
      subtitle3: "Soutenir les agriculteurs et protéger l'environnement avec chaque grain",
    },
    it: {
      heading1: "Chicchi di Caffè Verde Premium",
      subtitle1: "Provenienti direttamente dalle migliori piantagioni dell'Uganda",
      heading2: "Qualità Che Parla Da Sola",
      subtitle2: "Selezionati e lavorati da esperti per profili di sapore eccezionali",
      heading3: "Approvvigionamento Sostenibile di Caffè",
      subtitle3: "Sostenere gli agricoltori e proteggere l'ambiente con ogni chicco",
    },
    de: {
      heading1: "Premium Grüne Kaffeebohnen",
      subtitle1: "Direkt aus den besten Plantagen Ugandas",
      heading2: "Qualität, Die Für Sich Spricht",
      subtitle2: "Fachmännisch ausgewählt und verarbeitet für außergewöhnliche Geschmacksprofile",
      heading3: "Nachhaltige Kaffeebeschaffung",
      subtitle3: "Unterstützung von Bauern und Schutz der Umwelt mit jeder Bohne",
    },
    es: {
      heading1: "Granos de Café Verde Premium",
      subtitle1: "Obtenidos directamente de las mejores plantaciones de Uganda",
      heading2: "Calidad Que Habla Por Sí Misma",
      subtitle2: "Seleccionados y procesados por expertos para perfiles de sabor excepcionales",
      heading3: "Abastecimiento Sostenible de Café",
      subtitle3: "Apoyando a los agricultores y protegiendo el medio ambiente con cada grano",
    },
    pt: {
      heading1: "Grãos de Café Verde Premium",
      subtitle1: "Obtidos diretamente das melhores plantações de Uganda",
      heading2: "Qualidade Que Fala Por Si",
      subtitle2: "Selecionados e processados por especialistas para perfis de sabor excepcionais",
      heading3: "Fornecimento Sustentável de Café",
      subtitle3: "Apoiando agricultores e protegendo o meio ambiente com cada grão",
    },
    nl: {
      heading1: "Premium Groene Koffiebonen",
      subtitle1: "Rechtstreeks afkomstig van de beste plantages in Oeganda",
      heading2: "Kwaliteit Die Voor Zich Spreekt",
      subtitle2: "Deskundig geselecteerd en verwerkt voor uitzonderlijke smaakprofielen",
      heading3: "Duurzame Koffie Inkoop",
      subtitle3: "Ondersteuning van boeren en bescherming van het milieu met elke boon",
    },
  }

  // Slide data with image URLs and translation keys
  const slides: HeroSlide[] = [
    {
      imageUrl: "/sena image 1.png",
      headingKey: "heading1",
      subtitleKey: "subtitle1",
    },
    {
      imageUrl: "/hero2.png",
      headingKey: "heading2",
      subtitleKey: "subtitle2",
    },
    {
      imageUrl: "/hero 3.png",
      headingKey: "heading3",
      subtitleKey: "subtitle3",
    },
  ]

  // Get translations for current language
  const t = translations[language as keyof typeof translations] || translations.en

  // Rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].imageUrl || "/placeholder.svg"}
            alt="Coffee plantation landscape"
            fill
            priority
            className="object-cover brightness-50"
          />
        </motion.div>
      </AnimatePresence>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {t[slides[currentSlide].headingKey as keyof typeof t]}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl">{t[slides[currentSlide].subtitleKey as keyof typeof t]}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"} transition-colors`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

