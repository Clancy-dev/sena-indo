"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/context/language-context"

// Update the languages array to include the new languages with their flag images
const languages = [
  { code: "en", name: "English", flag: "/english.png" },
  { code: "zh", name: "Chinese", flag: "/china.png" },
  { code: "fr", name: "French", flag: "/french.png" },
  { code: "it", name: "Italian", flag: "/italy.png" },
  { code: "de", name: "German", flag: "/germany.png" },
  { code: "es", name: "Spanish", flag: "/spain.png" },
  { code: "pt", name: "Portuguese", flag: "/portugal.png" },
  { code: "nl", name: "Dutch", flag: "/dutch.png" },
]

export default function Navbar() {
  const { language, setLanguage } = useLanguage()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const translations = {
    en: {
      home: "Home",
      about: "About Us",
      overview: "Overview of the business",
      sustainability: "Sustainability",
      services: "Our Services",
      blog: "Our Blog",
      careers: "Careers",
      news: "News",
      contact: "Contact Us",
      getInTouch: "Get in Touch",
    },
    zh: {
      home: "首页",
      about: "关于我们",
      overview: "业务概览",
      sustainability: "可持续发展",
      services: "我们的服务",
      blog: "我们的博客",
      careers: "职业机会",
      news: "新闻",
      contact: "联系我们",
      getInTouch: "联系我们",
    },
    fr: {
      home: "Accueil",
      about: "À Propos",
      overview: "Aperçu de l'entreprise",
      sustainability: "Durabilité",
      services: "Nos Services",
      blog: "Notre Blog",
      careers: "Carrières",
      news: "Actualités",
      contact: "Contactez-nous",
      getInTouch: "Contactez-nous",
    },
    it: {
      home: "Home",
      about: "Chi Siamo",
      overview: "Panoramica dell'azienda",
      sustainability: "Sostenibilità",
      services: "I Nostri Servizi",
      blog: "Il Nostro Blog",
      careers: "Carriere",
      news: "Notizie",
      contact: "Contattaci",
      getInTouch: "Contattaci",
    },
    de: {
      home: "Startseite",
      about: "Über Uns",
      overview: "Geschäftsübersicht",
      sustainability: "Nachhaltigkeit",
      services: "Unsere Dienstleistungen",
      blog: "Unser Blog",
      careers: "Karriere",
      news: "Neuigkeiten",
      contact: "Kontakt",
      getInTouch: "Kontaktieren Sie uns",
    },
    es: {
      home: "Inicio",
      about: "Sobre Nosotros",
      overview: "Visión general del negocio",
      sustainability: "Sostenibilidad",
      services: "Nuestros Servicios",
      blog: "Nuestro Blog",
      careers: "Carreras",
      news: "Noticias",
      contact: "Contáctenos",
      getInTouch: "Póngase en contacto",
    },
    pt: {
      home: "Início",
      about: "Sobre Nós",
      overview: "Visão geral do negócio",
      sustainability: "Sustentabilidade",
      services: "Nossos Serviços",
      blog: "Nosso Blog",
      careers: "Carreiras",
      news: "Notícias",
      contact: "Contate-nos",
      getInTouch: "Entre em contato",
    },
    nl: {
      home: "Home",
      about: "Over Ons",
      overview: "Overzicht van het bedrijf",
      sustainability: "Duurzaamheid",
      services: "Onze Diensten",
      blog: "Onze Blog",
      careers: "Carrières",
      news: "Nieuws",
      contact: "Neem Contact Op",
      getInTouch: "Neem contact op",
    },
  }

  const t = translations[language as keyof typeof translations]

  return (
    <header className="w-full bg-white">
      {/* Top header with logo and company name */}
      <div className="container py-4 flex flex-col items-center justify-center">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png?height=60&width=60"
            alt="SENA INDO UGANDA LIMITED Logo"
            width={60}
            height={60}
            className="object-contain"
          />
          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-bold text-green-800">SENA INDO UGANDA LIMITED</h1>
            <p className="text-sm text-gray-600 italic">A Reliable Coffee Partner</p>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="bg-green-800 text-white border-t border-green-700">
        <div className="container flex h-16 items-center justify-between pl-10">
          <nav className="hidden lg:flex items-center space-x-6 overflow-x-auto">
            <Link href="/" className="text-sm font-medium hover:text-green-200 transition-colors whitespace-nowrap">
              {t.home}
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-green-200 transition-colors whitespace-nowrap"
            >
              {t.about}
            </Link>
            <Link
              href="/overview"
              className="text-sm font-medium hover:text-green-200 transition-colors whitespace-nowrap"
            >
              {t.overview}
            </Link>
            <Link
              href="/sustainability"
              className="text-sm font-medium hover:text-green-200 transition-colors whitespace-nowrap"
            >
              {t.sustainability}
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium hover:text-green-200 transition-colors whitespace-nowrap"
            >
              {t.services}
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-green-200 transition-colors whitespace-nowrap">
              {t.blog}
            </Link>
            <Link
              href="/careers"
              className="text-sm font-medium hover:text-green-200 transition-colors whitespace-nowrap"
            >
              {t.careers}
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-green-200 transition-colors whitespace-nowrap"
            >
              {t.contact}
            </Link>
          </nav>

          <div className="flex items-center space-x-4 ml-auto">
            {/* Language selector with flag images */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:text-green-200 hover:bg-green-700">
                  <div className="w-6 h-4 mr-2 relative overflow-hidden">
                    <Image
                      src={languages.find((lang) => lang.code === language)?.flag || "/flags/en.png"}
                      alt={languages.find((lang) => lang.code === language)?.name || "English"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="hidden sm:inline">{languages.find((lang) => lang.code === language)?.name}</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)} className="cursor-pointer">
                    <div className="w-6 h-4 mr-2 relative overflow-hidden">
                      <Image src={lang.flag || "/placeholder.svg"} alt={lang.name} fill className="object-cover" />
                    </div>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="hidden md:flex bg-white text-green-800 hover:bg-green-100">{t.getInTouch}</Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-white hover:text-green-200 hover:bg-green-700"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white p-2">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/" className="text-sm font-medium hover:text-green-700 transition-colors">
                    {t.home}
                  </Link>
                  <Link href="/about" className="text-sm font-medium hover:text-green-700 transition-colors">
                    {t.about}
                  </Link>
                  <Link href="/overview" className="text-sm font-medium hover:text-green-700 transition-colors">
                    {t.overview}
                  </Link>
                  <Link href="/sustainability" className="text-sm font-medium hover:text-green-700 transition-colors">
                    {t.sustainability}
                  </Link>
                  <Link href="/services" className="text-sm font-medium hover:text-green-700 transition-colors">
                    {t.services}
                  </Link>
                  <Link href="/blog" className="text-sm font-medium hover:text-green-700 transition-colors">
                    {t.blog}
                  </Link>
                  <Link href="/careers" className="text-sm font-medium hover:text-green-700 transition-colors">
                    {t.careers}
                  </Link>
                  <Link href="/contact" className="text-sm font-medium hover:text-green-700 transition-colors">
                    {t.contact}
                  </Link>

                  {/* Update the mobile language selector to display flag images */}
                  <div className="pt-4 border-t">
                    <p className="mb-2 text-sm font-medium">Language</p>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((lang) => (
                        <Button
                          key={lang.code}
                          variant="outline"
                          size="sm"
                          onClick={() => setLanguage(lang.code)}
                          className={`flex items-center gap-1 ${language === lang.code ? "border-green-700 bg-green-50" : ""}`}
                        >
                          <div className="w-5 h-3 relative overflow-hidden">
                            <Image
                              src={lang.flag || "/placeholder.svg"}
                              alt={lang.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs">{lang.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-green-700 hover:bg-green-800 mt-4 text-white">{t.getInTouch}</Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

