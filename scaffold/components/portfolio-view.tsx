"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Code2, 
  Sparkles, 
  Database, 
  Layers, 
  ExternalLink, 
  Github, 
  Mail, 
  ArrowUpRight, 
  ChevronRight,
  GraduationCap,
  Calendar,
  MapPin,
  ArrowDown,
  Copy,
  Check
} from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

interface PortfolioViewProps {
  profile: any;
  projects: any[];
  education?: any[];
}

export function PortfolioView({ profile, projects, education = [] }: PortfolioViewProps) {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("preferred_lang") as "fr" | "en";
    if (saved === "fr" || saved === "en") {
      setLang(saved);
    }
  }, []);

  const switchLang = (newLang: "fr" | "en") => {
    setLang(newLang);
    localStorage.setItem("preferred_lang", newLang);
  };

  const p = {
    name: profile?.name || "Emna Ghorbel",
    location: profile?.location || "Sfax, Tunisie",
    email: profile?.email || "emna.ghorbel@enis.tn",
    github_url: profile?.github_url || "https://github.com/emna1ghorbel",
    linkedin_url: profile?.linkedin_url || "https://linkedin.com",
    short_bio: profile?.short_bio || "",
  };

  const t = {
    fr: {
      nav: {
        home: "Accueil",
        education: "Formation",
        experience: "Expérience",
        stack: "Stack",
        projects: "Projets",
        contact: "Contact",
      },
      hero: {
        status: "Disponible pour nouvelles opportunités & stages",
        badge: "Bonjour ! Je suis",
        chipLeft: "Full-Stack Dev",
        chipRight: "IA & Deep Learning",
        pretitle: "Une Développeuse & Conceptrice qui",
        titleLine1: "Juge un livre",
        titleByIts: "à sa",
        coverWord: "couverture",
        tagline: "Parce que si la couverture ne vous impressionne pas, qu'est-ce qui le fera ?",
        rolePrefix: "Je suis",
        role: "Élève-ingénieure en Génie Informatique – IA, Data, Web & Mobile",
        bio: "Élève-ingénieure à l'ENIS (École Nationale d'Ingénieurs de Sfax) avec un master en systèmes embarqués en parallèle. Passionnée par la conception de plateformes web & ERP modernes et le développement de systèmes d'IA innovants (RAG, agents LLM, vision). À la recherche d'un stage de fin d'études (PFE).",
        exploreBtn: "Explorer mes projets",
        contactBtn: "Me contacter",
        copyEmail: "Copier mon email",
        emailCopied: "Email copié ! ✨",
        stats: [
          { value: "ENIS", label: "Génie Informatique & Master Embarqué" },
          { value: "4+", label: "Projets majeurs & ERP en production" },
          { value: "1er Prix", label: "Challenge Sight Day – IEEE" },
          { value: "100%", label: "Code typé, testé & déployé" },
        ],
        techPillsLabel: "Technologies clés",
        techPills: ["Python", "Next.js 15", "TypeScript", "PyTorch", "LangGraph", "RAG / FAISS", "PostgreSQL", "Docker", "React Native", "FPGA Xilinx"],
        scrollHint: "Découvrir mon parcours",
      },
      education: {
        title: "Formation Académique",
        subtitle: "Mon parcours universitaire d'excellence en ingénierie informatique et systèmes embarqués.",
        defaults: [
          {
            degree: "Diplôme National d'Ingénieur en Génie Informatique (3ème année)",
            institution: "École Nationale d'Ingénieurs de Sfax (ENIS)",
            period: "Sept. 2024 — en cours",
            location: "Sfax, Tunisie",
            desc: "Spécialisation en génie logiciel, intelligence artificielle, apprentissage profond, calcul distribué et cybersécurité.",
            tags: ["Génie Logiciel", "Intelligence Artificielle", "Deep Learning", "Systèmes Distribués"],
          },
          {
            degree: "Master en Systèmes Embarqués (suivi en parallèle)",
            institution: "École Nationale d'Ingénieurs de Sfax (ENIS)",
            period: "2025 — en cours",
            location: "Sfax, Tunisie",
            desc: "Formation de haut niveau en co-conception matériel/logiciel, synthèse HLS, FPGA Xilinx, VHDL et systèmes temps réel.",
            tags: ["Systèmes Embarqués", "FPGA Xilinx", "Vivado HLS", "VHDL"],
          },
          {
            degree: "Cycle Préparatoire aux Études d'Ingénieur (Filière Technologie)",
            institution: "Institut Préparatoire aux Études d'Ingénieurs de Sfax (IPEIS)",
            period: "Sept. 2022 — Juin 2024",
            location: "Sfax, Tunisie",
            desc: "Formation d'excellence intensive en mathématiques avancées, physique, algorithmique fondamentale et modélisation.",
            tags: ["Mathématiques Avancées", "Physique", "Algorithmique", "Sciences de l'Ingénieur"],
          },
          {
            degree: "Baccalauréat Sciences Techniques – Mention Bien",
            institution: "Lycée Ibno Rachiq",
            period: "Juin 2022",
            location: "Sfax, Tunisie",
            desc: "Enseignement secondaire axé sur les sciences techniques, l'électricité et les systèmes logiques.",
            tags: ["Sciences Techniques", "Mention Bien"],
          },
        ],
      },
      experience: {
        title: "Expérience & Savoir-faire",
        subtitle: "Conception d'architectures complètes, plateformes en production et modèles d'IA avancés.",
        learnMore: "EN SAVOIR PLUS",
        cards: [
          {
            title: "Randz Medical – Développeuse Full-Stack",
            company: "Plateforme E-Commerce & ERP en production",
            desc: "Développement monorepo complet (Next.js 15, API REST Express 5, PostgreSQL 16 via Prisma 7). Gestion des devis, factures PDF, stocks, finance et assistant IA intégré (Groq, Llama 3.3 70B). Déploiement VPS OVH avec Docker Compose et Nginx.",
            tags: ["Next.js 15", "PostgreSQL", "Prisma 7", "Docker", "Groq AI"],
          },
          {
            title: "Mobelite Tunisia – Stagiaire Mobile",
            company: "Application Immobilière Property Finder",
            desc: "Application mobile cross-platform avec React Native et Redux Toolkit, synchronisation temps réel Firestore, backend Node.js JWT et géocodage OpenStreetMap.",
            tags: ["React Native", "Redux Toolkit", "Firebase", "Node.js", "OpenStreetMap"],
          },
          {
            title: "Système Multi-Agents CTI & RAG",
            company: "Projet de Fin d'Année – Cyber-Threat Intelligence",
            desc: "Pipeline LangGraph à 4 agents : Recherche Web, Extraction IOC, scoring MITRE ATT&CK et rapports automatisés. RAG hybride sur FAISS avec Qwen 7B 4-bit (RAGAS : 0.84).",
            tags: ["LangGraph", "FAISS", "Qwen 7B", "FastAPI", "LangSmith"],
          },
          {
            title: "Détection Alzheimer sur FPGA",
            company: "Projet de Fin d'Année – Co-conception Matérielle",
            desc: "Pipeline de co-traitement CPU-FPGA (Xilinx Zynq/Alveo) sur données IRM cérébrales : LSTM/ARIMA, GNN/PointNet et accélération via synthèse Vivado HLS.",
            tags: ["PyTorch", "GNN", "PointNet", "Xilinx FPGA", "Vivado HLS"],
          },
        ],
      },
      stack: {
        headline: "Je souhaite intégrer une",
        highlight: "équipe innovante & ambitieuse",
        headlineEnd: "pour mon stage de fin d'études (PFE) et contribuer à des projets à fort impact.",
      },
      projects: {
        title: "Projets Récents",
        subtitle: "Quelques-unes de mes réalisations techniques majeures en IA, Web et Embarqué.",
        eyebrow: "Projet à la une",
        detailsBtn: "Détails du projet",
        sourceCode: "Code source",
        liveDemo: "Démo en direct",
        defaultProjects: [
          {
            slug: "systeme-multi-agents-cti-rag",
            title: "Système Multi-Agents de Cyber-Threat Intelligence avec RAG",
            desc: "Pipeline LangGraph à 4 agents intelligents (Recherche RSS, analyse IOC, scoring MITRE ATT&CK, rapport PDF). RAG hybride sur index FAISS avec Qwen 7B 4-bit et monitoring LangSmith.",
            stack: ["#Python", "#LangGraph", "#FAISS", "#Qwen7B", "#FastAPI"],
            img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
          },
          {
            slug: "randz-medical-erp",
            title: "Randz Medical – Plateforme E-Commerce & ERP Médical",
            desc: "Plateforme en production monorepo Next.js 15, PostgreSQL 16 via Prisma 7 (46 modèles), gestion complète catalogue/commandes/factures PDF et assistant IA (Groq, Llama 3.3 70B).",
            stack: ["#Next.js15", "#PostgreSQL", "#Prisma7", "#Docker", "#Groq"],
            img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
          },
          {
            slug: "alzheimer-detection-fpga",
            title: "Détection Précoce de la Maladie d'Alzheimer sur FPGA",
            desc: "Pipeline de co-traitement CPU-FPGA (Xilinx Zynq/Alveo) sur données IRM : modèles GNN/PointNet, LSTM temporel et accélération matérielle basse consommation avec Vivado HLS.",
            stack: ["#PyTorch", "#GNN", "#XilinxFPGA", "#VivadoHLS", "#PointNet"],
            img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
          },
          {
            slug: "property-finder-mobile",
            title: "Property Finder – Application Immobilière Mobile",
            desc: "Application mobile multiplateforme React Native + Redux Toolkit avec synchronisation Firestore temps réel, backend Node.js et intégration de l'API OpenStreetMap.",
            stack: ["#ReactNative", "#ReduxToolkit", "#Firebase", "#NodeJS"],
            img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
          },
        ],
      },
      contact: {
        title: "Contact",
        subtitle: "Vous avez un projet en tête ou souhaitez échanger autour d'une opportunité ? N'hésitez pas à me contacter !",
        rights: "Tous droits réservés.",
      },
    },
    en: {
      nav: {
        home: "Home",
        education: "Education",
        experience: "Experience",
        stack: "Stack",
        projects: "Projects",
        contact: "Contact",
      },
      hero: {
        status: "Available for new opportunities & internships",
        badge: "Hello! I am",
        chipLeft: "Full-Stack Dev",
        chipRight: "AI & Deep Learning",
        pretitle: "A Developer & Designer who",
        titleLine1: "Judges a book",
        titleByIts: "by its",
        coverWord: "cover",
        tagline: "Because if the cover does not impress you, what else will?",
        rolePrefix: "I'm an",
        role: "Engineering Student in Computer Science – AI, Data, Web & Mobile",
        bio: "Computer engineering student at ENIS (National Engineering School of Sfax) pursuing a concurrent Master's in Embedded Systems. Specialized in full-stack web/ERP platforms (Next.js, PostgreSQL, Docker) and advanced AI systems (RAG, LLM agents, computer vision). Seeking an end-of-studies internship (PFE).",
        exploreBtn: "Explore my projects",
        contactBtn: "Get in touch",
        copyEmail: "Copy my email",
        emailCopied: "Email copied! ✨",
        stats: [
          { value: "ENIS", label: "Computer Eng. & Embedded Master" },
          { value: "4+", label: "Major projects & production ERP" },
          { value: "1st Prize", label: "Sight Day Challenge – IEEE" },
          { value: "100%", label: "Typed, tested & deployed code" },
        ],
        techPillsLabel: "Core technologies",
        techPills: ["Python", "Next.js 15", "TypeScript", "PyTorch", "LangGraph", "RAG / FAISS", "PostgreSQL", "Docker", "React Native", "FPGA Xilinx"],
        scrollHint: "Scroll down to explore",
      },
      education: {
        title: "Academic Background",
        subtitle: "My university journey in computer engineering and embedded systems.",
        defaults: [
          {
            degree: "National Computer Engineering Degree (3rd year)",
            institution: "National School of Engineers of Sfax (ENIS)",
            period: "Sept. 2024 — Present",
            location: "Sfax, Tunisia",
            desc: "Specialization in software engineering, artificial intelligence, deep learning, distributed systems, and cybersecurity.",
            tags: ["Software Engineering", "Artificial Intelligence", "Deep Learning", "Distributed Systems"],
          },
          {
            degree: "Master in Embedded Systems (Concurrent)",
            institution: "National School of Engineers of Sfax (ENIS)",
            period: "2025 — Present",
            location: "Sfax, Tunisia",
            desc: "Advanced curriculum in hardware/software co-design, HLS synthesis, Xilinx FPGA, VHDL, and real-time systems.",
            tags: ["Embedded Systems", "Xilinx FPGA", "Vivado HLS", "VHDL"],
          },
          {
            degree: "Preparatory Engineering Studies (Technology Track)",
            institution: "Preparatory Institute for Engineering Studies of Sfax (IPEIS)",
            period: "Sept. 2022 — June 2024",
            location: "Sfax, Tunisia",
            desc: "Intensive training in advanced mathematics, physics, fundamental algorithms, and engineering sciences.",
            tags: ["Advanced Mathematics", "Physics", "Algorithms", "Engineering Sciences"],
          },
          {
            degree: "Baccalaureate in Technical Sciences – Honors (Mention Bien)",
            institution: "Ibno Rachiq High School",
            period: "June 2022",
            location: "Sfax, Tunisia",
            desc: "Secondary education focused on technical sciences, electrical systems, and applied mechanics.",
            tags: ["Technical Sciences", "Honors"],
          },
        ],
      },
      experience: {
        title: "Work Experience",
        subtitle: "Building robust architectures, production systems, and state-of-the-art AI pipelines.",
        learnMore: "LEARN MORE",
        cards: [
          {
            title: "Randz Medical – Full-Stack Developer",
            company: "Medical E-Commerce & ERP in Production",
            desc: "End-to-end monorepo build (Next.js 15, Express 5, PostgreSQL 16 via Prisma 7). Covered quotes, invoices, stock, finance, and integrated Groq Llama 3.3 70B AI assistant. Deployed on OVH VPS with Docker Compose and Nginx.",
            tags: ["Next.js 15", "PostgreSQL", "Prisma 7", "Docker", "Groq AI"],
          },
          {
            title: "Mobelite Tunisia – Mobile Developer Intern",
            company: "Property Finder Real Estate App",
            desc: "Cross-platform mobile app using React Native & Redux Toolkit, real-time Firestore synchronization, Node.js JWT backend, and OpenStreetMap geocoding integration.",
            tags: ["React Native", "Redux Toolkit", "Firebase", "Node.js", "OpenStreetMap"],
          },
          {
            title: "Multi-Agent CTI & RAG System",
            company: "Capstone Project – Cyber Threat Intelligence",
            desc: "4-agent LangGraph pipeline: Web search, IOC extraction, MITRE ATT&CK scoring, and automated PDF reporting. Hybrid RAG on FAISS with Qwen 7B 4-bit (RAGAS: 0.84).",
            tags: ["LangGraph", "FAISS", "Qwen 7B", "FastAPI", "LangSmith"],
          },
          {
            title: "Early Alzheimer Detection on FPGA",
            company: "Capstone Project – Hardware Co-design",
            desc: "CPU-FPGA co-processing pipeline on brain MRI scans: LSTM/ARIMA, GNN/PointNet, and low-power hardware acceleration via Vivado HLS synthesis.",
            tags: ["PyTorch", "GNN", "PointNet", "Xilinx FPGA", "Vivado HLS"],
          },
        ],
      },
      stack: {
        headline: "I'm looking to join an",
        highlight: "innovative & ambitious team",
        headlineEnd: "for my final end-of-studies internship (PFE) and build high-impact technologies.",
      },
      projects: {
        title: "Featured Projects",
        subtitle: "Key technical achievements across AI, Full-Stack Web, and Embedded Systems.",
        eyebrow: "Featured Project",
        detailsBtn: "Project details",
        sourceCode: "Source code",
        liveDemo: "Live demo",
        defaultProjects: [
          {
            slug: "systeme-multi-agents-cti-rag",
            title: "Multi-Agent Cyber-Threat Intelligence with RAG",
            desc: "4-agent LangGraph pipeline (RSS research, IOC analysis, MITRE ATT&CK mapping, PDF reports). Hybrid FAISS RAG with Qwen 7B 4-bit and LangSmith monitoring.",
            stack: ["#Python", "#LangGraph", "#FAISS", "#Qwen7B", "#FastAPI"],
            img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
          },
          {
            slug: "randz-medical-erp",
            title: "Randz Medical – E-Commerce & Medical ERP Platform",
            desc: "Production monorepo built with Next.js 15, PostgreSQL 16 via Prisma 7 (46 models), order/invoice PDF management, and Groq Llama 3.3 70B AI assistant.",
            stack: ["#Next.js15", "#PostgreSQL", "#Prisma7", "#Docker", "#Groq"],
            img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
          },
          {
            slug: "alzheimer-detection-fpga",
            title: "Early Alzheimer Detection on FPGA",
            desc: "CPU-FPGA hardware co-processing pipeline on MRI datasets: GNN/PointNet, temporal LSTM, and energy-efficient Vivado HLS acceleration.",
            stack: ["#PyTorch", "#GNN", "#XilinxFPGA", "#VivadoHLS", "#PointNet"],
            img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
          },
          {
            slug: "property-finder-mobile",
            title: "Property Finder – Mobile Real Estate App",
            desc: "Cross-platform React Native + Redux Toolkit mobile app with Firestore real-time sync, Node.js backend, and OpenStreetMap geolocation.",
            stack: ["#ReactNative", "#ReduxToolkit", "#Firebase", "#NodeJS"],
            img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
          },
        ],
      },
      contact: {
        title: "Contact",
        subtitle: "Have a project in mind or looking for a motivated engineer? Let's connect!",
        rights: "All rights reserved.",
      },
    },
  };

  const cur = t[lang];

  const experienceIcons = [Code2, Sparkles, Database, Layers];

  const techStack = [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "TypeScript", icon: "TS" },
    { name: "Python", icon: "🐍" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Supabase", icon: "⚡" },
    { name: "Node.js", icon: "🟢" },
    { name: "Figma", icon: "❖" },
    { name: "Git", icon: "🌿" },
  ];

  const published = projects.filter((pr) => pr.published);

  // Use custom education if provided in Supabase, else use default education
  const displayEducation = education.length > 0
    ? education.map((edu) => ({
        degree: edu.degree || "Diplôme d'Ingénieur",
        institution: edu.institution || "Université",
        period: edu.start_date ? `${new Date(edu.start_date).getFullYear()} — ${edu.current ? (lang === "fr" ? "Présent" : "Present") : (edu.end_date ? new Date(edu.end_date).getFullYear() : "")}` : "2023 — Présent",
        location: edu.location || "Sfax, Tunisie",
        desc: edu.description || "Formation approfondie en ingénierie informatique.",
        tags: edu.field ? [edu.field] : ["Ingénierie Informatique"],
      }))
    : cur.education.defaults;

  return (
    <>
      <ScrollReveal />

      {/* TOP NAVBAR */}
      <header className="figma-nav">
        <div className="site-container figma-nav-inner">
          <Link href="/" className="brand-glyph" aria-label="Home">
            <span>EG</span>
          </Link>

          <nav className="nav-links-list">
            <Link href="#hero" className="nav-item-link">{cur.nav.home}</Link>
            <Link href="#formation" className="nav-item-link">{cur.nav.education}</Link>
            <Link href="#experience" className="nav-item-link">{cur.nav.experience}</Link>
            <Link href="#skills" className="nav-item-link">{cur.nav.stack}</Link>
            <Link href="#projects" className="nav-item-link">{cur.nav.projects}</Link>
            <Link href="#contact" className="nav-item-link">{cur.nav.contact}</Link>

            {/* Language Switch Button */}
            <div className="lang-switch-pill" role="group" aria-label="Language selection">
              <button 
                type="button"
                className={`lang-btn ${lang === "fr" ? "active" : ""}`}
                onClick={() => switchLang("fr")}
                title="Passer en Français"
              >
                FR
              </button>
              <button 
                type="button"
                className={`lang-btn ${lang === "en" ? "active" : ""}`}
                onClick={() => switchLang("en")}
                title="Switch to English"
              >
                EN
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="bg-grid-pattern">
        {/* HERO SECTION */}
        <section id="hero" className="hero-section">
          <div className="site-container hero-two-col">

            {/* ── LEFT : Photo ── */}
            <div className="hero-left reveal visible">
              <div className="hero-photo-wrap">
                <img
                  src="/avatar.jpg"
                  alt={p.name}
                  className="hero-photo"
                />
              </div>
              <div className="hero-social-row">
                <a href={`mailto:${p.email}`} className="hero-social-btn" title={p.email}>
                  <Mail size={16} /> Email
                </a>
                <a href={p.github_url || "https://github.com/emna1ghorbel"} target="_blank" rel="noopener noreferrer" className="hero-social-btn">
                  <Github size={16} /> GitHub
                </a>
                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="hero-social-btn" title="Consulter le CV (PDF)">
                  📄 Mon CV
                </a>
              </div>
            </div>

            {/* ── RIGHT : Content ── */}
            <div className="hero-right">
              <span className="hero-eyebrow reveal visible">{cur.hero.rolePrefix} — {cur.hero.role}</span>
              <h1 className="hero-name reveal visible" style={{ transitionDelay: "0.08s" }}>{p.name}</h1>
              <div className="hero-divider reveal visible" style={{ transitionDelay: "0.12s" }} />
              <p className="hero-bio reveal visible" style={{ transitionDelay: "0.16s" }}>{p.short_bio || cur.hero.bio}</p>
              <div className="hero-ctas reveal visible" style={{ transitionDelay: "0.22s" }}>
                <Link href="#projects" className="btn-primary-purple">
                  {cur.hero.exploreBtn}
                  <ChevronRight size={17} />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText(p.email);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2200);
                    }
                  }}
                  className="btn-secondary-glass"
                  title={p.email}
                >
                  {copied ? <Check size={15} style={{ color: "#16a34a" }} /> : <Copy size={15} />}
                  <span>{copied ? cur.hero.emailCopied : cur.hero.copyEmail}</span>
                </button>
              </div>
              <div className="hero-pills-row reveal visible" style={{ transitionDelay: "0.28s" }}>
                {cur.hero.techPills.slice(0, 6).map((tech, idx) => (
                  <span key={idx} className="hero-mini-pill">{tech}</span>
                ))}
              </div>
              <div className="hero-stats-row reveal visible" style={{ transitionDelay: "0.34s" }}>
                {cur.hero.stats.map((stat, idx) => (
                  <div key={idx} className="hero-stat-item">
                    <span className="hero-stat-value">{stat.value}</span>
                    <span className="hero-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
              <Link href="#formation" className="hero-scroll-hint reveal visible" style={{ transitionDelay: "0.4s" }}>
                <span>{cur.hero.scrollHint}</span>
                <ArrowDown size={13} className="hero-bounce-arrow" />
              </Link>
            </div>

          </div>
        </section>

        {/* EDUCATION / FORMATION SECTION */}
        <section id="formation" className="site-container section-spacer">
          <div className="reveal visible">
            <h2 className="section-title-figma">{cur.education.title}</h2>
            <p className="section-subtitle-figma">
              {cur.education.subtitle}
            </p>
          </div>

          <div className="education-grid">
            {displayEducation.map((edu, idx) => (
              <div key={idx} className="education-card reveal visible" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <div>
                  <div className="edu-badge-period">
                    <Calendar size={13} />
                    <span>{edu.period}</span>
                  </div>

                  <div className="edu-card-header">
                    <div className="edu-icon-box">
                      <GraduationCap size={26} />
                    </div>
                    <div>
                      <h3 className="edu-degree-title">{edu.degree}</h3>
                      <span className="edu-institution-name">{edu.institution}</span>
                    </div>
                  </div>

                  <p className="edu-card-desc">{edu.desc}</p>

                  <div className="exp-card-tags">
                    {edu.tags.map((tag: string, tIdx: number) => (
                      <span key={tIdx} className="exp-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.85rem', marginTop: '1rem' }}>
                  <MapPin size={14} style={{ color: '#2563eb' }} />
                  <span>{edu.location}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WORK EXPERIENCE SECTION (2x2 Grid) */}
        <section id="experience" className="site-container section-spacer">
          <div className="reveal visible">
            <h2 className="section-title-figma">{cur.experience.title}</h2>
            <p className="section-subtitle-figma">
              {cur.experience.subtitle}
            </p>
          </div>

          <div className="experience-grid">
            {cur.experience.cards.map((exp, idx) => {
              const Icon = experienceIcons[idx] || Code2;
              return (
                <div key={idx} className="experience-card reveal visible" style={{ transitionDelay: `${idx * 0.1}s` }}>
                  <div>
                    <div className="exp-card-header">
                      <div className="exp-icon-box">
                        <Icon size={26} />
                      </div>
                      <div>
                        <h3 className="exp-card-title">{exp.title}</h3>
                        <span className="exp-card-company">{exp.company}</span>
                      </div>
                    </div>
                    <p className="exp-card-body">{exp.desc}</p>
                    <div className="exp-card-tags">
                      {exp.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="exp-tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <Link href="#projects" className="exp-learn-more-btn">
                    {cur.experience.learnMore}
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* TECH STACK & COSMIC ORBIT SECTION */}
        <section id="skills" className="site-container orbit-section">
          <p className="orbit-lead-text reveal visible">
            {cur.stack.headline} <span className="highlight-text">{cur.stack.highlight}</span> {cur.stack.headlineEnd}
          </p>

          <div className="tech-icons-row reveal visible">
            {techStack.map((tech, i) => (
              <span key={i} className="tech-pill-badge">
                <span>{tech.icon}</span>
                <span>{tech.name}</span>
              </span>
            ))}
          </div>

          <div className="orbit-visual-container reveal visible">
            <div className="orbit-ring orbit-ring-2" />
            <div className="orbit-ring orbit-ring-1" />
            <div className="orbit-central-orb">
              <span>EG</span>
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS SECTION */}
        <section id="projects" className="site-container section-spacer">
          <div className="reveal visible">
            <h2 className="section-title-figma">{cur.projects.title}</h2>
            <p className="section-subtitle-figma">
              {cur.projects.subtitle}
            </p>
          </div>

          {published.length > 0 ? (
            published.map((proj, idx) => {
              const isReversed = idx % 2 === 1;
              const coverImage = (proj.image_url || "").split(/[\n,]+/)[0]?.trim();
              const isCoverVideo = Boolean(coverImage?.match(/\.(mp4|webm|mov|ogg)$/i) || proj.demo_url?.match(/\.(mp4|webm|mov|ogg)$/i));

              return (
                <div 
                  key={proj.id} 
                  className={`featured-project-row ${isReversed ? "reversed" : ""} reveal visible`}
                >
                  {isReversed ? (
                    <>
                      <div className="proj-mockup-frame">
                        <div className="mockup-header-bar">
                          <span className="mockup-dot mockup-dot-red" />
                          <span className="mockup-dot mockup-dot-yellow" />
                          <span className="mockup-dot mockup-dot-green" />
                        </div>
                        {isCoverVideo ? (
                          <video 
                            src={coverImage?.match(/\.(mp4|webm|mov|ogg)$/i) ? coverImage : proj.demo_url} 
                            controls 
                            playsInline 
                            className="mockup-img" 
                            style={{ objectFit: "cover" }} 
                          />
                        ) : (
                          <img 
                            src={coverImage || "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80"} 
                            alt={proj.title} 
                            className="mockup-img"
                          />
                        )}
                      </div>
                      <div className="proj-info-col">
                        <span className="proj-eyebrow">{cur.projects.eyebrow}</span>
                        <h3 className="proj-title">
                          <Link href={`/projects/${proj.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {proj.title}
                          </Link>
                        </h3>
                        <div className="proj-desc-box">
                          {proj.short_description || "Application moderne conçue pour une expérience utilisateur rapide et intuitive."}
                        </div>
                        <div className="proj-links-row">
                          <Link href={`/projects/${proj.slug}`} className="btn-primary-purple" style={{ padding: '0.65rem 1.5rem', fontSize: '0.85rem' }}>
                            {cur.projects.detailsBtn}
                            <ExternalLink size={15} />
                          </Link>
                          {proj.demo_url && (
                            <a href={proj.demo_url} target="_blank" rel="noreferrer" className="btn-secondary-glass" style={{ padding: '0.65rem 1.2rem', fontSize: '0.85rem' }}>
                              {proj.demo_url.match(/\.(mp4|webm|mov|ogg)$/i) ? "🎬 Vidéo Démo" : "Démo en direct"}
                            </a>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="proj-info-col">
                        <span className="proj-eyebrow">{cur.projects.eyebrow}</span>
                        <h3 className="proj-title">
                          <Link href={`/projects/${proj.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {proj.title}
                          </Link>
                        </h3>
                        <div className="proj-desc-box">
                          {proj.short_description || "Application moderne conçue pour une expérience utilisateur rapide et intuitive."}
                        </div>
                        <div className="proj-links-row">
                          <Link href={`/projects/${proj.slug}`} className="btn-primary-purple" style={{ padding: '0.65rem 1.5rem', fontSize: '0.85rem' }}>
                            {cur.projects.detailsBtn}
                            <ExternalLink size={15} />
                          </Link>
                          {proj.demo_url && (
                            <a href={proj.demo_url} target="_blank" rel="noreferrer" className="btn-secondary-glass" style={{ padding: '0.65rem 1.2rem', fontSize: '0.85rem' }}>
                              {proj.demo_url.match(/\.(mp4|webm|mov|ogg)$/i) ? "🎬 Vidéo Démo" : "Démo en direct"}
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="proj-mockup-frame">
                        <div className="mockup-header-bar">
                          <span className="mockup-dot mockup-dot-red" />
                          <span className="mockup-dot mockup-dot-yellow" />
                          <span className="mockup-dot mockup-dot-green" />
                        </div>
                        {isCoverVideo ? (
                          <video 
                            src={coverImage?.match(/\.(mp4|webm|mov|ogg)$/i) ? coverImage : proj.demo_url} 
                            controls 
                            playsInline 
                            className="mockup-img" 
                            style={{ objectFit: "cover" }} 
                          />
                        ) : (
                          <img 
                            src={coverImage || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"} 
                            alt={proj.title} 
                            className="mockup-img"
                          />
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })
          ) : (
            cur.projects.defaultProjects.map((dp, idx) => {
              const isReversed = idx % 2 === 1;
              return (
                <div 
                  key={idx} 
                  className={`featured-project-row ${isReversed ? "reversed" : ""} reveal visible`} 
                  style={{ transitionDelay: `${idx * 0.15}s` }}
                >
                  {isReversed ? (
                    <>
                      <div className="proj-mockup-frame">
                        <div className="mockup-header-bar">
                          <span className="mockup-dot mockup-dot-red" />
                          <span className="mockup-dot mockup-dot-yellow" />
                          <span className="mockup-dot mockup-dot-green" />
                        </div>
                        <img 
                          src={dp.img} 
                          alt={dp.title} 
                          className="mockup-img"
                        />
                      </div>
                      <div className="proj-info-col">
                        <span className="proj-eyebrow">{cur.projects.eyebrow}</span>
                        <h3 className="proj-title">
                          <Link href={`/projects/${dp.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {dp.title}
                          </Link>
                        </h3>
                        <div className="proj-desc-box">{dp.desc}</div>
                        <div className="proj-tech-stack">
                          {dp.stack.map((stk, sIdx) => (
                            <span key={sIdx} className="proj-tech-item">{stk}</span>
                          ))}
                        </div>
                        <div className="proj-links-row">
                          <Link href={`/projects/${dp.slug}`} className="btn-primary-purple" style={{ padding: '0.65rem 1.5rem', fontSize: '0.85rem' }}>
                            {cur.projects.detailsBtn}
                            <ExternalLink size={15} />
                          </Link>
                          <a href="https://github.com/emna1ghorbel" target="_blank" rel="noreferrer" className="btn-secondary-glass" style={{ padding: '0.65rem 1.2rem', fontSize: '0.85rem' }}>
                            <Github size={15} /> {cur.projects.sourceCode}
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="proj-info-col">
                        <span className="proj-eyebrow">{cur.projects.eyebrow}</span>
                        <h3 className="proj-title">
                          <Link href={`/projects/${dp.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {dp.title}
                          </Link>
                        </h3>
                        <div className="proj-desc-box">{dp.desc}</div>
                        <div className="proj-tech-stack">
                          {dp.stack.map((stk, sIdx) => (
                            <span key={sIdx} className="proj-tech-item">{stk}</span>
                          ))}
                        </div>
                        <div className="proj-links-row">
                          <Link href={`/projects/${dp.slug}`} className="btn-primary-purple" style={{ padding: '0.65rem 1.5rem', fontSize: '0.85rem' }}>
                            {cur.projects.detailsBtn}
                            <ExternalLink size={15} />
                          </Link>
                          <a href="https://github.com/emna1ghorbel" target="_blank" rel="noreferrer" className="btn-secondary-glass" style={{ padding: '0.65rem 1.2rem', fontSize: '0.85rem' }}>
                            <Github size={15} /> {cur.projects.sourceCode}
                          </a>
                        </div>
                      </div>
                      <div className="proj-mockup-frame">
                        <div className="mockup-header-bar">
                          <span className="mockup-dot mockup-dot-red" />
                          <span className="mockup-dot mockup-dot-yellow" />
                          <span className="mockup-dot mockup-dot-green" />
                        </div>
                        <Link href={`/projects/${dp.slug}`} style={{ display: 'block', overflow: 'hidden' }}>
                          <img 
                            src={dp.img} 
                            alt={dp.title} 
                            className="mockup-img"
                          />
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </section>

        {/* CONTACT & FOOTER */}
        <section id="contact" className="site-container section-spacer">
          <div className="contact-section-box reveal visible">
            <h2 className="section-title-figma">{cur.contact.title}</h2>
            <p className="section-subtitle-figma" style={{ marginInline: 'auto', marginBottom: '2.5rem' }}>
              {cur.contact.subtitle}
            </p>

            <div className="hero-actions-group">
              <a href={`mailto:${p.email}`} className="btn-primary-purple">
                <Mail size={18} />
                {p.email}
              </a>
              <a href={p.github_url || "https://github.com"} target="_blank" rel="noopener noreferrer" className="btn-secondary-glass">
                <Github size={18} />
                GitHub
              </a>
            </div>
          </div>

          <footer className="footer-bottom-bar">
            <span>© {new Date().getFullYear()} {p.name}. {cur.contact.rights}</span>
            <div className="footer-socials">
              <a href={`mailto:${p.email}`} className="footer-social-link">Email</a>
              <a href={p.github_url || "https://github.com"} target="_blank" rel="noopener noreferrer" className="footer-social-link">GitHub</a>
              <a href={p.linkedin_url || "https://linkedin.com"} target="_blank" rel="noopener noreferrer" className="footer-social-link">LinkedIn</a>
            </div>
          </footer>
        </section>
      </main>
    </>
  );
}
