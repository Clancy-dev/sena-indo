"use client"

import Image from "next/image"
import { CheckCircle } from "lucide-react"
import TeamMember from "@/components/team-member"

import LeafletExportRoutes from "@/components/leaflet-export-routes"
import { useLanguage } from "@/context/language-context"
import StatisticBanner from "@/components/StatisticBanner"
import CertificationBadge from "@/components/CertificationBadge"
import HeroSlideshow from "@/components/hero-slideshow"

export default function Home() {
  const { language } = useLanguage()

  const translations = {
    en: {
      business: {
        title: "Our Business",
        years: "10+ Years of Service",
        description1:
          "SENA INDO UGANDA LIMITED is a leading exporter of green coffee in Uganda. With over 10+ years of experience, we have established strong relationships with producers worldwide and provide reliable service to roasters of all sizes.",
        description2:
          "Our extensive network of suppliers and logistics expertise allows us to offer a wide variety of coffees from all origins, ensuring consistent quality and timely delivery to meet our customers' needs.",
        description3:
          "We pride ourselves on our commitment to sustainability and ethical sourcing, working closely with farmers and cooperatives to promote responsible practices throughout the supply chain.",
        learnMore: "Learn More",
      },
      statistic1: "We are a key player in Uganda's coffee exports, delivering premium quality to markets worldwide.",
      team: {
        title: "Our Team",
        subtitle: "Meet Our Leadership",
      },
      statistic2: "Our exported coffee is sustainably sourced and certified.",
      services: {
        title: "Our Services",
        subtitle: "What we do",
        service1: "Source and export high-quality green coffee across the world",
        service2: "Provide reliable logistics and warehousing solutions",
        service3: "Offer flexible financing options for coffee purchases",
        service4: "Ensure quality control and consistent cup profiles",
        service5: "Connect roasters with sustainable and certified coffees",
        partner: {
          title: "A dedicated partner",
          description1:
            "At SENA INDO UGANDA LIMITED, we understand that each customer has unique requirements. Our dedicated team works closely with roasters to understand their specific needs and provide tailored solutions that help them succeed in a competitive market.",
          description2:
            "From small specialty roasters to large commercial operations, we offer the same level of attention and service, ensuring that every customer receives the support they need to grow their business.",
        },
      },
      statistic3:
        "SENA INDO UGANDA LIMITED actively participates in innovative solutions and projects to improve coffee quality.",
      sustainability: {
        title: "Sustainability",
        subtitle: "Certifications and More",
        statement: "Providing traceable coffees that meet social, environmental and economic standards.",
        description:
          "We are committed to supporting sustainable practices throughout the coffee supply chain, from farm to cup. By working with certified producers and promoting responsible farming methods, we help ensure the long-term viability of coffee production while protecting the environment and supporting farming communities.",
        verified: {
          title: "Introducing NKG Verified",
          subtitle: "Traceable coffees with sustainability compliance delivered.",
          point1: "Verified compliance with sustainability standards",
          point2: "Full traceability from farm to roaster",
          point3: "Third-party verification for added confidence",
        },
      },
      footer: {
        contact: "Contact",
        links: "Links",
        follow: "Follow Us",
        rights: "All rights reserved.",
      },
    },
    zh: {
      business: {
        title: "我们的业务",
        years: "10+年的服务历程",
        description1:
          "SENA INDO 乌干达有限公司是乌干达领先的绿咖啡出口商。凭借超过10+年的经验，我们与全球生产商建立了牢固的关系，并为各种规模的烘焙商提供可靠的服务。",
        description2:
          "我们广泛的供应商网络和物流专业知识使我们能够提供来自所有产地的各种咖啡，确保一致的质量和及时交付，以满足客户的需求。",
        description3: "我们以对可持续发展和道德采购的承诺为荣，与农民和合作社密切合作，促进整个供应链中的负责任做法。",
        learnMore: "了解更多",
      },
      statistic1: "我们是乌干达咖啡出口的重要参与者，向全球市场提供优质产品。",
      team: {
        title: "我们的团队",
        subtitle: "认识我们的领导层",
      },
      statistic2: "我们出口的咖啡是可持续采购和认证的。",
      services: {
        title: "我们的服务",
        subtitle: "我们做什么",
        service1: "在全球范围内采购和出口高质量的绿咖啡",
        service2: "提供可靠的物流和仓储解决方案",
        service3: "为咖啡采购提供灵活的融资选择",
        service4: "确保质量控制和一致的杯型特征",
        service5: "将烘焙商与可持续和认证的咖啡连接起来",
        partner: {
          title: "专业合作伙伴",
          description1:
            "在SENA INDO 乌干达有限公司，我们了解每个客户都有独特的需求。我们的专业团队与烘焙商密切合作，了解他们的具体需求，并提供量身定制的解决方案，帮助他们在竞争激烈的市场中取得成功。",
          description2:
            "从小型特种烘焙商到大型商业运营，我们提供相同水平的关注和服务，确保每个客户都能获得发展业务所需的支持。",
        },
      },
      statistic3: "SENA INDO 乌干达有限公司积极参与创新解决方案和项目，以提高咖啡质量。",
      sustainability: {
        title: "可持续发展",
        subtitle: "认证和更多",
        statement: "提供符合社会、环境和经济标准的可追溯咖啡。",
        description:
          "我们致力于支持整个咖啡供应链中的可持续实践，从农场到杯子。通过与认证生产商合作并促进负责任的农业方法，我们帮助确保咖啡生产的长期可行性，同时保护环境并支持农业社区。",
        verified: {
          title: "介绍NKG认证",
          subtitle: "提供可追溯的、符合可持续性标准的咖啡。",
          point1: "经验证符合可持续性标准",
          point2: "从农场到烘焙商的完全可追溯性",
          point3: "第三方验证，增加信心",
        },
      },
      footer: {
        contact: "联系我们",
        links: "链接",
        follow: "关注我们",
        rights: "版权所有。",
      },
    },
    fr: {
      business: {
        title: "Notre Entreprise",
        years: "10+ Ans de Service",
        description1:
          "SENA INDO UGANDA LIMITED est un exportateur de premier plan de café vert en Ouganda. Avec plus de 10+ ans d'expérience, nous avons établi des relations solides avec des producteurs du monde entier et fournissons un service fiable aux torréfacteurs de toutes tailles.",
        description2:
          "Notre vaste réseau de fournisseurs et notre expertise logistique nous permettent d'offrir une grande variété de cafés de toutes origines, assurant une qualité constante et une livraison rapide pour répondre aux besoins de nos clients.",
        description3:
          "Nous sommes fiers de notre engagement envers la durabilité et l'approvisionnement éthique, travaillant en étroite collaboration avec les agriculteurs et les coopératives pour promouvoir des pratiques responsables tout au long de la chaîne d'approvisionnement.",
        learnMore: "En Savoir Plus",
      },
      statistic1:
        "Nous sommes un acteur clé dans les exportations de café de l'Ouganda, livrant une qualité premium aux marchés du monde entier.",
      team: {
        title: "Notre Équipe",
        subtitle: "Rencontrez Notre Direction",
      },
      statistic2: "Notre café exporté est sourcé de manière durable et certifié.",
      services: {
        title: "Nos Services",
        subtitle: "Ce que nous faisons",
        service1: "Sourcer et exporter du café vert de haute qualité dans le monde entier",
        service2: "Fournir des solutions logistiques et d'entreposage fiables",
        service3: "Offrir des options de financement flexibles pour les achats de café",
        service4: "Assurer le contrôle de la qualité et des profils de tasse cohérents",
        service5: "Connecter les torréfacteurs avec des cafés durables et certifiés",
        partner: {
          title: "Un partenaire dédié",
          description1:
            "Chez SENA INDO UGANDA LIMITED, nous comprenons que chaque client a des exigences uniques. Notre équipe dédiée travaille en étroite collaboration avec les torréfacteurs pour comprendre leurs besoins spécifiques et fournir des solutions sur mesure qui les aident à réussir dans un marché concurrentiel.",
          description2:
            "Des petits torréfacteurs spécialisés aux grandes opérations commerciales, nous offrons le même niveau d'attention et de service, garantissant que chaque client reçoit le soutien dont il a besoin pour développer son entreprise.",
        },
      },
      statistic3:
        "SENA INDO UGANDA LIMITED participe activement à des solutions et projets innovants pour améliorer la qualité du café.",
      sustainability: {
        title: "Durabilité",
        subtitle: "Certifications et Plus",
        statement: "Fournir des cafés traçables qui répondent aux normes sociales, environnementales et économiques.",
        description:
          "Nous nous engageons à soutenir des pratiques durables tout au long de la chaîne d'approvisionnement du café, de la ferme à la tasse. En travaillant avec des producteurs certifiés et en promouvant des méthodes agricoles responsables, nous contribuons à assurer la viabilité à long terme de la production de café tout en protégeant l'environnement et en soutenant les communautés agricoles.",
        verified: {
          title: "Introduction de NKG Verified",
          subtitle: "Des cafés traçables avec conformité de durabilité livrés.",
          point1: "Conformité vérifiée aux normes de durabilité",
          point2: "Traçabilité complète de la ferme au torréfacteur",
          point3: "Vérification par des tiers pour une confiance accrue",
        },
      },
      footer: {
        contact: "Contact",
        links: "Liens",
        follow: "Suivez-nous",
        rights: "Tous droits réservés.",
      },
    },
    it: {
      business: {
        title: "La Nostra Attività",
        years: "10+ Anni di Servizio",
        description1:
          "SENA INDO UGANDA LIMITED è un esportatore leader di caffè verde in Uganda. Con oltre 10+ anni di esperienza, abbiamo stabilito solide relazioni con produttori di tutto il mondo e forniamo un servizio affidabile a torrefattori di tutte le dimensioni.",
        description2:
          "La nostra vasta rete di fornitori e la nostra competenza logistica ci permettono di offrire un'ampia varietà di caffè di tutte le origini, garantendo qualità costante e consegne puntuali per soddisfare le esigenze dei nostri clienti.",
        description3:
          "Siamo orgogliosi del nostro impegno per la sostenibilità e l'approvvigionamento etico, lavorando a stretto contatto con agricoltori e cooperative per promuovere pratiche responsabili lungo tutta la catena di fornitura.",
        learnMore: "Scopri di Più",
      },
      statistic1:
        "Siamo un attore chiave nelle esportazioni di caffè dell'Uganda, fornendo qualità premium ai mercati di tutto il mondo.",
      team: {
        title: "Il Nostro Team",
        subtitle: "Incontra la Nostra Leadership",
      },
      statistic2: "Il nostro caffè esportato è di provenienza sostenibile e certificato.",
      services: {
        title: "I Nostri Servizi",
        subtitle: "Cosa facciamo",
        service1: "Approvvigionamento ed esportazione di caffè verde di alta qualità in tutto il mondo",
        service2: "Fornitura di soluzioni logistiche e di magazzinaggio affidabili",
        service3: "Offerta di opzioni di finanziamento flessibili per gli acquisti di caffè",
        service4: "Garanzia di controllo qualità e profili di tazza costanti",
        service5: "Collegamento dei torrefattori con caffè sostenibili e certificati",
        partner: {
          title: "Un partner dedicato",
          description1:
            "In SENA INDO UGANDA LIMITED, comprendiamo che ogni cliente ha requisiti unici. Il nostro team dedicato lavora a stretto contatto con i torrefattori per comprendere le loro esigenze specifiche e fornire soluzioni su misura che li aiutino a avere successo in un mercato competitivo.",
          description2:
            "Dai piccoli torrefattori specializzati alle grandi operazioni commerciali, offriamo lo stesso livello di attenzione e servizio, assicurando che ogni cliente riceva il supporto necessario per far crescere la propria attività.",
        },
      },
      statistic3:
        "SENA INDO UGANDA LIMITED partecipa attivamente a soluzioni e progetti innovativi per migliorare la qualità del caffè.",
      sustainability: {
        title: "Sostenibilità",
        subtitle: "Certificazioni e Altro",
        statement: "Fornitura di caffè tracciabili che soddisfano standard sociali, ambientali ed economici.",
        description:
          "Siamo impegnati a sostenere pratiche sostenibili lungo tutta la catena di approvvigionamento del caffè, dalla fattoria alla tazza. Lavorando con produttori certificati e promuovendo metodi agricoli responsabili, contribuiamo a garantire la sostenibilità a lungo termine della produzione di caffè, proteggendo l'ambiente e sostenendo le comunità agricole.",
        verified: {
          title: "Introduzione di NKG Verified",
          subtitle: "Caffè tracciabili con conformità alla sostenibilità garantita.",
          point1: "Conformità verificata agli standard di sostenibilità",
          point2: "Completa tracciabilità dalla fattoria al torrefattore",
          point3: "Verifica di terze parti per maggiore affidabilità",
        },
      },
      footer: {
        contact: "Contatti",
        links: "Collegamenti",
        follow: "Seguici",
        rights: "Tutti i diritti riservati.",
      },
    },
    de: {
      business: {
        title: "Unser Geschäft",
        years: "10+ Jahre Service",
        description1:
          "SENA INDO UGANDA LIMITED ist ein führender Exporteur von grünem Kaffee in Uganda. Mit über 10+ Jahren Erfahrung haben wir starke Beziehungen zu Produzenten weltweit aufgebaut und bieten zuverlässigen Service für Röster aller Größen.",
        description2:
          "Unser umfangreiches Netzwerk von Lieferanten und unsere logistische Expertise ermöglichen es uns, eine große Vielfalt an Kaffees aus allen Ursprüngen anzubieten und dabei eine konstante Qualität und pünktliche Lieferung zu gewährleisten, um die Bedürfnisse unserer Kunden zu erfüllen.",
        description3:
          "Wir sind stolz auf unser Engagement für Nachhaltigkeit und ethische Beschaffung und arbeiten eng mit Landwirten und Genossenschaften zusammen, um verantwortungsvolle Praktiken in der gesamten Lieferkette zu fördern.",
        learnMore: "Mehr Erfahren",
      },
      statistic1:
        "Wir sind ein wichtiger Akteur bei Ugandas Kaffeeexporten und liefern erstklassige Qualität an Märkte weltweit.",
      team: {
        title: "Unser Team",
        subtitle: "Lernen Sie unsere Führung kennen",
      },
      statistic2: "Unser exportierter Kaffee ist nachhaltig beschafft und zertifiziert.",
      services: {
        title: "Unsere Dienstleistungen",
        subtitle: "Was wir tun",
        service1: "Beschaffung und Export von hochwertigem grünem Kaffee in die ganze Welt",
        service2: "Bereitstellung zuverlässiger Logistik- und Lagerlösungen",
        service3: "Angebot flexibler Finanzierungsoptionen für Kaffeeeinkäufe",
        service4: "Sicherstellung der Qualitätskontrolle und konsistenter Tassenprofile",
        service5: "Verbindung von Röstern mit nachhaltigen und zertifizierten Kaffees",
        partner: {
          title: "Ein engagierter Partner",
          description1:
            "Bei SENA INDO UGANDA LIMITED verstehen wir, dass jeder Kunde einzigartige Anforderungen hat. Unser engagiertes Team arbeitet eng mit Röstern zusammen, um ihre spezifischen Bedürfnisse zu verstehen und maßgeschneiderte Lösungen anzubieten, die ihnen helfen, in einem wettbewerbsintensiven Markt erfolgreich zu sein.",
          description2:
            "Von kleinen Spezialröstern bis hin zu großen kommerziellen Betrieben bieten wir das gleiche Maß an Aufmerksamkeit und Service und stellen sicher, dass jeder Kunde die Unterstützung erhält, die er benötigt, um sein Geschäft auszubauen.",
        },
      },
      statistic3:
        "SENA INDO UGANDA LIMITED beteiligt sich aktiv an innovativen Lösungen und Projekten zur Verbesserung der Kaffeequalität.",
      sustainability: {
        title: "Nachhaltigkeit",
        subtitle: "Zertifizierungen und mehr",
        statement:
          "Bereitstellung rückverfolgbarer Kaffees, die soziale, ökologische und wirtschaftliche Standards erfüllen.",
        description:
          "Wir setzen uns für nachhaltige Praktiken in der gesamten Kaffeelieferkette ein, vom Anbau bis zur Tasse. Durch die Zusammenarbeit mit zertifizierten Produzenten und die Förderung verantwortungsvoller Anbaumethoden tragen wir dazu bei, die langfristige Lebensfähigkeit der Kaffeeproduktion zu gewährleisten und gleichzeitig die Umwelt zu schützen und landwirtschaftliche Gemeinschaften zu unterstützen.",
        verified: {
          title: "Einführung von NKG Verified",
          subtitle: "Rückverfolgbare Kaffees mit Nachhaltigkeitskonformität geliefert.",
          point1: "Verifizierte Einhaltung von Nachhaltigkeitsstandards",
          point2: "Vollständige Rückverfolgbarkeit vom Anbau bis zum Röster",
          point3: "Verifizierung durch Dritte für zusätzliches Vertrauen",
        },
      },
      footer: {
        contact: "Kontakt",
        links: "Links",
        follow: "Folgen Sie uns",
        rights: "Alle Rechte vorbehalten.",
      },
    },
    es: {
      business: {
        title: "Nuestro Negocio",
        years: "10+ Años de Servicio",
        description1:
          "SENA INDO UGANDA LIMITED es un exportador líder de café verde en Uganda. Con más de 10+ años de experiencia, hemos establecido relaciones sólidas con productores de todo el mundo y proporcionamos un servicio confiable a tostadores de todos los tamaños.",
        description2:
          "Nuestra extensa red de proveedores y experiencia logística nos permite ofrecer una amplia variedad de cafés de todos los orígenes, asegurando una calidad consistente y entrega oportuna para satisfacer las necesidades de nuestros clientes.",
        description3:
          "Nos enorgullecemos de nuestro compromiso con la sostenibilidad y el abastecimiento ético, trabajando estrechamente con agricultores y cooperativas para promover prácticas responsables en toda la cadena de suministro.",
        learnMore: "Saber Más",
      },
      statistic1:
        "Somos un actor clave en las exportaciones de café de Uganda, entregando calidad premium a mercados de todo el mundo.",
      team: {
        title: "Nuestro Equipo",
        subtitle: "Conozca a Nuestra Dirección",
      },
      statistic2: "Nuestro café exportado es de origen sostenible y certificado.",
      services: {
        title: "Nuestros Servicios",
        subtitle: "Lo que hacemos",
        service1: "Abastecimiento y exportación de café verde de alta calidad en todo el mundo",
        service2: "Proporcionar soluciones confiables de logística y almacenamiento",
        service3: "Ofrecer opciones de financiamiento flexibles para compras de café",
        service4: "Asegurar el control de calidad y perfiles de taza consistentes",
        service5: "Conectar tostadores con cafés sostenibles y certificados",
        partner: {
          title: "Un socio dedicado",
          description1:
            "En SENA INDO UGANDA LIMITED, entendemos que cada cliente tiene requisitos únicos. Nuestro equipo dedicado trabaja estrechamente con los tostadores para comprender sus necesidades específicas y proporcionar soluciones personalizadas que les ayuden a tener éxito en un mercado competitivo.",
          description2:
            "Desde pequeños tostadores especializados hasta grandes operaciones comerciales, ofrecemos el mismo nivel de atención y servicio, asegurando que cada cliente reciba el apoyo que necesita para hacer crecer su negocio.",
        },
      },
      statistic3:
        "SENA INDO UGANDA LIMITED participa activamente en soluciones y proyectos innovadores para mejorar la calidad del café.",
      sustainability: {
        title: "Sostenibilidad",
        subtitle: "Certificaciones y Más",
        statement: "Proporcionando cafés trazables que cumplen con estándares sociales, ambientales y económicos.",
        description:
          "Estamos comprometidos a apoyar prácticas sostenibles en toda la cadena de suministro del café, desde la finca hasta la taza. Al trabajar con productores certificados y promover métodos de cultivo responsables, ayudamos a asegurar la viabilidad a largo plazo de la producción de café mientras protegemos el medio ambiente y apoyamos a las comunidades agrícolas.",
        verified: {
          title: "Introduciendo NKG Verified",
          subtitle: "Cafés trazables con cumplimiento de sostenibilidad entregados.",
          point1: "Cumplimiento verificado con estándares de sostenibilidad",
          point2: "Trazabilidad completa desde la finca hasta el tostador",
          point3: "Verificación de terceros para mayor confianza",
        },
      },
      footer: {
        contact: "Contacto",
        links: "Enlaces",
        follow: "Síguenos",
        rights: "Todos los derechos reservados.",
      },
    },
    pt: {
      business: {
        title: "Nosso Negócio",
        years: "10+ Anos de Serviço",
        description1:
          "SENA INDO UGANDA LIMITED é um exportador líder de café verde em Uganda. Com mais de 10+ anos de experiência, estabelecemos fortes relações com produtores em todo o mundo e fornecemos serviço confiável para torrefadores de todos os tamanhos.",
        description2:
          "Nossa extensa rede de fornecedores e expertise logística nos permite oferecer uma ampla variedade de cafés de todas as origens, garantindo qualidade consistente e entrega pontual para atender às necessidades de nossos clientes.",
        description3:
          "Temos orgulho de nosso compromisso com a sustentabilidade e o fornecimento ético, trabalhando em estreita colaboração com agricultores e cooperativas para promover práticas responsáveis em toda a cadeia de suprimentos.",
        learnMore: "Saiba Mais",
      },
      statistic1:
        "Somos um ator-chave nas exportações de café de Uganda, entregando qualidade premium para mercados em todo o mundo.",
      team: {
        title: "Nossa Equipe",
        subtitle: "Conheça Nossa Liderança",
      },
      statistic2: "Nosso café exportado é de origem sustentável e certificado.",
      services: {
        title: "Nossos Serviços",
        subtitle: "O que fazemos",
        service1: "Fornecimento e exportação de café verde de alta qualidade para todo o mundo",
        service2: "Fornecimento de soluções confiáveis de logística e armazenamento",
        service3: "Oferta de opções flexíveis de financiamento para compras de café",
        service4: "Garantia de controle de qualidade e perfis de xícara consistentes",
        service5: "Conexão de torrefadores com cafés sustentáveis e certificados",
        partner: {
          title: "Um parceiro dedicado",
          description1:
            "Na SENA INDO UGANDA LIMITED, entendemos que cada cliente tem requisitos únicos. Nossa equipe dedicada trabalha em estreita colaboração com os torrefadores para entender suas necessidades específicas e fornecer soluções personalizadas que os ajudem a ter sucesso em um mercado competitivo.",
          description2:
            "De pequenos torrefadores especializados a grandes operações comerciais, oferecemos o mesmo nível de atenção e serviço, garantindo que cada cliente receba o suporte necessário para expandir seus negócios.",
        },
      },
      statistic3:
        "SENA INDO UGANDA LIMITED participa ativamente de soluções e projetos inovadores para melhorar a qualidade do café.",
      sustainability: {
        title: "Sustentabilidade",
        subtitle: "Certificações e Mais",
        statement: "Fornecendo cafés rastreáveis que atendem a padrões sociais, ambientais e econômicos.",
        description:
          "Estamos comprometidos em apoiar práticas sustentáveis em toda a cadeia de suprimentos do café, da fazenda à xícara. Ao trabalhar com produtores certificados e promover métodos agrícolas responsáveis, ajudamos a garantir a viabilidade a longo prazo da produção de café, protegendo o meio ambiente e apoiando as comunidades agrícolas.",
        verified: {
          title: "Apresentando o NKG Verified",
          subtitle: "Cafés rastreáveis com conformidade de sustentabilidade entregues.",
          point1: "Conformidade verificada com padrões de sustentabilidade",
          point2: "Rastreabilidade completa da fazenda ao torrefador",
          point3: "Verificação de terceiros para maior confiança",
        },
      },
      footer: {
        contact: "Contato",
        links: "Links",
        follow: "Siga-nos",
        rights: "Todos os direitos reservados.",
      },
    },
    nl: {
      business: {
        title: "Ons Bedrijf",
        years: "10+ Jaar Service",
        description1:
          "SENA INDO UGANDA LIMITED is een toonaangevende exporteur van groene koffie in Oeganda. Met meer dan 10+ jaar ervaring hebben we sterke relaties opgebouwd met producenten wereldwijd en bieden we betrouwbare service aan branders van alle groottes.",
        description2:
          "Ons uitgebreide netwerk van leveranciers en logistieke expertise stelt ons in staat om een breed scala aan koffies uit alle herkomstgebieden aan te bieden, waarbij we consistente kwaliteit en tijdige levering garanderen om aan de behoeften van onze klanten te voldoen.",
        description3:
          "We zijn trots op onze toewijding aan duurzaamheid en ethische inkoop, en werken nauw samen met boeren en coöperaties om verantwoorde praktijken in de hele toeleveringsketen te bevorderen.",
        learnMore: "Meer Informatie",
      },
      statistic1:
        "We zijn een belangrijke speler in de koffie-export van Oeganda en leveren premium kwaliteit aan markten wereldwijd.",
      team: {
        title: "Ons Team",
        subtitle: "Maak Kennis met Onze Leiding",
      },
      statistic2: "Onze geëxporteerde koffie is duurzaam ingekocht en gecertificeerd.",
      services: {
        title: "Onze Diensten",
        subtitle: "Wat we doen",
        service1: "Inkoop en export van hoogwaardige groene koffie over de hele wereld",
        service2: "Betrouwbare logistieke en opslagoplossingen bieden",
        service3: "Flexibele financieringsopties aanbieden voor koffie-aankopen",
        service4: "Kwaliteitscontrole en consistente kopprofielen waarborgen",
        service5: "Branders verbinden met duurzame en gecertificeerde koffies",
        partner: {
          title: "Een toegewijde partner",
          description1:
            "Bij SENA INDO UGANDA LIMITED begrijpen we dat elke klant unieke eisen heeft. Ons toegewijde team werkt nauw samen met branders om hun specifieke behoeften te begrijpen en op maat gemaakte oplossingen te bieden die hen helpen succesvol te zijn in een concurrerende markt.",
          description2:
            "Van kleine specialistische branders tot grote commerciële operaties, we bieden hetzelfde niveau van aandacht en service, en zorgen ervoor dat elke klant de ondersteuning krijgt die nodig is om hun bedrijf te laten groeien.",
        },
      },
      statistic3:
        "SENA INDO UGANDA LIMITED neemt actief deel aan innovatieve oplossingen en projecten om de koffiekwaliteit te verbeteren.",
      sustainability: {
        title: "Duurzaamheid",
        subtitle: "Certificeringen en Meer",
        statement: "Het leveren van traceerbare koffies die voldoen aan sociale, milieu- en economische normen.",
        description:
          "We zijn toegewijd aan het ondersteunen van duurzame praktijken in de hele koffietoeleveringsketen, van boerderij tot kopje. Door samen te werken met gecertificeerde producenten en verantwoorde landbouwmethoden te bevorderen, helpen we de langetermijnlevensvatbaarheid van koffieproductie te waarborgen, terwijl we het milieu beschermen en landbouwgemeenschappen ondersteunen.",
        verified: {
          title: "Introductie van NKG Verified",
          subtitle: "Traceerbare koffies met duurzaamheidsconformiteit geleverd.",
          point1: "Geverifieerde naleving van duurzaamheidsnormen",
          point2: "Volledige traceerbaarheid van boerderij tot brander",
          point3: "Verificatie door derden voor extra vertrouwen",
        },
      },
      footer: {
        contact: "Contact",
        links: "Links",
        follow: "Volg Ons",
        rights: "Alle rechten voorbehouden.",
      },
    },
  }

  const t = translations[language as keyof typeof translations]

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section with Slideshow */}
      <HeroSlideshow />

      {/* Our Business Section */}
      <section className="w-full max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{t.business.title}</h2>
        <p className="text-xl text-center mb-4">{t.business.years}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="space-y-4">
            <p className="text-gray-700">{t.business.description1}</p>
            <p className="text-gray-700">{t.business.description2}</p>
            <p className="text-gray-700">{t.business.description3}</p>
            <button className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 transition-colors">
              {t.business.learnMore}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/coffee branch.png?height=300&width=300"
              alt="Coffee plantation"
              width={300}
              height={300}
              className="rounded-md object-cover w-full h-full"
            />
            <Image
              src="/overview.jpg?height=300&width=300"
              alt="City skyline"
              width={300}
              height={300}
              className="rounded-md object-cover w-full h-full"
            />
            <Image
              src="/image 3.png?height=300&width=300"
              alt="Coffee beans"
              width={300}
              height={300}
              className="rounded-md object-cover w-full h-full"
            />
            <Image
              src="/image 4.png?height=300&width=300"
              alt="Coffee farm"
              width={300}
              height={300}
              className="rounded-md object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Statistic Banner 1 */}
      <StatisticBanner text={t.statistic1} bgColor="bg-green-100" />

      {/* Export Route Map Section */}
      <section className="w-full max-w-7xl mx-auto py-16 px-4">
        <LeafletExportRoutes />
      </section>

      {/* Our Team Section */}
      <section className="w-full max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t.team.title}</h2>
        <p className="text-xl text-center mb-8">{t.team.subtitle}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <TeamMember name="Lavanya Sekhar" title="Director" email="lavanya.sena24@gmail.com" phone="+256 756315546" />
          <TeamMember
            name="Adinarayana Balcha"
            title="Managing Director"
            email="accounts@gml.co.ug"
            phone="+256 752947050"
          />
          <TeamMember
            name="Nakiyemba Brenda"
            title="Operations Manager"
            email="thomas@senaindo.com"
            phone="+256 705367934"
          />
        </div>
      </section>

      {/* Statistic Banner 2 */}
      <StatisticBanner text={t.statistic2} bgColor="bg-green-100" />

      {/* Our Services Section */}
      <section className="w-full max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{t.services.title}</h2>
        <p className="text-xl text-center mb-12">{t.services.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="text-green-600 h-6 w-6 mt-1 flex-shrink-0" />
              <p className="text-gray-700">{t.services.service1}</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="text-green-600 h-6 w-6 mt-1 flex-shrink-0" />
              <p className="text-gray-700">{t.services.service2}</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="text-green-600 h-6 w-6 mt-1 flex-shrink-0" />
              <p className="text-gray-700">{t.services.service3}</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="text-green-600 h-6 w-6 mt-1 flex-shrink-0" />
              <p className="text-gray-700">{t.services.service4}</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="text-green-600 h-6 w-6 mt-1 flex-shrink-0" />
              <p className="text-gray-700">{t.services.service5}</p>
            </div>
          </div>
          <div>
            <Image
              src="/middle.jpg?height=400&width=600"
              alt="Coffee shipping containers"
              width={600}
              height={400}
              className="rounded-md object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">{t.services.partner.title}</h3>
          <p className="text-gray-700 mb-4">{t.services.partner.description1}</p>
          <p className="text-gray-700">{t.services.partner.description2}</p>
        </div>
      </section>

      {/* Innovation Banner */}
      <StatisticBanner text={t.statistic3} bgColor="bg-green-100" />

      {/* Sustainability Section */}
      <section className="w-full max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{t.sustainability.title}</h2>
        <p className="text-xl text-center mb-12">{t.sustainability.subtitle}</p>

        <div className="flex flex-wrap justify-center gap-8 mb-16">
          <CertificationBadge name="USDA Organic" imageSrc="/organic.png" />
          <CertificationBadge name="Rainforest Alliance" imageSrc="/rainforest.png" />
          <CertificationBadge name="Fair Trade" imageSrc="/fairtrade.png" />
        </div>

        <div className="bg-green-50 p-8 rounded-lg mb-16">
          <h3 className="text-2xl font-semibold text-center mb-6">{t.sustainability.statement}</h3>
          <p className="text-gray-700 text-center">{t.sustainability.description}</p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-6">{t.sustainability.verified.title}</h3>
          <p className="text-gray-700 text-center mb-8">{t.sustainability.verified.subtitle}</p>

          <div className="max-w-2xl mx-auto">
            <div className="flex items-start space-x-3 mb-4">
              <CheckCircle className="text-green-600 h-6 w-6 mt-1 flex-shrink-0" />
              <p className="text-gray-700">{t.sustainability.verified.point1}</p>
            </div>
            <div className="flex items-start space-x-3 mb-4">
              <CheckCircle className="text-green-600 h-6 w-6 mt-1 flex-shrink-0" />
              <p className="text-gray-700">{t.sustainability.verified.point2}</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="text-green-600 h-6 w-6 mt-1 flex-shrink-0" />
              <p className="text-gray-700">{t.sustainability.verified.point3}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Image
            src="/sample.png?height=400&width=600"
            alt="Coffee harvesting"
            width={600}
            height={400}
            className="rounded-md object-contain w-full h-full"
          />
          <Image
            src="/sample2.jpg?height=400&width=600"
            alt="Coffee processing"
            width={600}
            height={400}
            className="rounded-md object-contain w-full h-full"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#016630] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">{t.footer.contact}</h3>
            <p className="mb-2">Plot 15/17, 1st Street Industrial Area</p>
            <p className="mb-2">Kampala, Uganda</p>
            <p className="mb-2">info@senaindo.com</p>
            <p>+256 (555) 123-4567</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">{t.footer.links}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  {t.business.title}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t.services.title}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t.sustainability.title}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t.team.title}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">{t.footer.follow}</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="hover:text-gray-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
            <div className="mt-6">
              <Image
                src="/placeholder.svg?height=50&width=150"
                alt="SENA INDO UGANDA LIMITED Logo"
                width={150}
                height={50}
                className="brightness-0 invert"
              />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-white">
          <p className="text-center">
            © {new Date().getFullYear()} SENA INDO UGANDA LIMITED. {t.footer.rights}
          </p>
        </div>
      </footer>
    </main>
  )
}

