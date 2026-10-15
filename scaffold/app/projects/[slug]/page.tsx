import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/data";
import { SiteShell } from "@/components/site-shell";
import { ProjectCard } from "@/components/project-card";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Play,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Calendar,
  Tag,
  Share2,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProject(slug);
  return {
    title: p ? `${p.title} · Emna Ghorbel` : "Projet · Emna Ghorbel",
    description: p?.short_description || "Détails du projet technique.",
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getProject(slug);

  if (!p) {
    notFound();
  }

  const { projects } = await getProjects();
  const related = projects
    .filter((x) => x.id !== p.id)
    .slice(0, 3);

  const isImageVideo = Boolean(p.image_url?.match(/\.(mp4|webm|mov|ogg)$/i));
  const isDemoVideo = Boolean(p.demo_url?.match(/\.(mp4|webm|mov|ogg)$/i));
  const videoSource = isDemoVideo ? p.demo_url : (isImageVideo ? p.image_url : null);
  const displayImage = !isImageVideo && p.image_url ? p.image_url : (
    !videoSource ? "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80" : null
  );

  const techs = (p.project_technologies || []).map(
    (t: any) => t.technologies?.name || t
  ).filter(Boolean);

  return (
    <SiteShell>
      <main className="project-detail-page">
        {/* Breadcrumb & Navigation */}
        <div className="site-container">
          <div className="project-breadcrumb-bar">
            <Link href="/projects" className="project-back-btn">
              <ArrowLeft size={16} />
              <span>Tous les projets</span>
            </Link>
            <div className="breadcrumb-trail">
              <Link href="/">Accueil</Link>
              <span>/</span>
              <Link href="/projects">Projets</Link>
              <span>/</span>
              <span className="current">{p.title}</span>
            </div>
          </div>

          {/* Project Header */}
          <header className="project-hero-header">
            <div className="project-category-pill">
              <Sparkles size={14} />
              <span>{p.categories?.name || "Ingénierie Logicielle & IA"}</span>
            </div>

            <h1 className="project-hero-title">{p.title}</h1>

            <p className="project-hero-lead">{p.short_description}</p>

            {/* Quick Actions & Meta */}
            <div className="project-header-actions">
              {p.github_url && (
                <a
                  href={p.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-github-action"
                >
                  <Github size={18} />
                  <span>Code Source GitHub</span>
                  <ArrowUpRight size={15} />
                </a>
              )}

              {p.demo_url && (
                <a
                  href={p.demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-demo-action"
                >
                  <Play size={16} fill="currentColor" />
                  <span>{isDemoVideo ? "Voir la vidéo démo" : "Démo en direct"}</span>
                  <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          </header>

          {/* Media Showcase: Mockup Window with Video / Image */}
          <section className="project-showcase-window">
            <div className="window-header-bar">
              <div className="window-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="window-url-badge">
                <span>🔒 https://emnaghorbel.dev/projects/{p.slug}</span>
              </div>
              <div style={{ width: 60 }} />
            </div>

            <div className="window-content-viewport">
              {videoSource ? (
                <div className="video-player-wrapper">
                  <div className="video-player-badge">
                    <Play size={13} fill="#fff" />
                    <span>Démonstration Vidéo Interactive</span>
                  </div>
                  <video
                    src={videoSource}
                    controls
                    playsInline
                    preload="metadata"
                    className="featured-video-player"
                  />
                </div>
              ) : displayImage ? (
                <img
                  src={displayImage}
                  alt={p.title}
                  className="featured-showcase-img"
                />
              ) : null}
            </div>
          </section>

          {/* Main 2-Column Content Layout */}
          <div className="project-content-grid">
            {/* Left Column: Deep Dive */}
            <article className="project-main-article">
              <section className="article-block">
                <div className="block-title-row">
                  <span className="block-kicker">PRÉSENTATION DÉTAILLÉE</span>
                  <h2>À propos de cette réalisation</h2>
                </div>
                <div className="article-rich-text">
                  {String(p.description || p.short_description)
                    .split("\n")
                    .filter(Boolean)
                    .map((paragraph: string, idx: number) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                </div>
              </section>

              {/* Highlights Feature Card */}
              <section className="article-block highlights-card">
                <div className="block-title-row">
                  <span className="block-kicker">POINTS CLÉS & APPORTS</span>
                  <h3>Caractéristiques & Performance</h3>
                </div>
                <ul className="highlights-list">
                  <li>
                    <CheckCircle2 size={18} className="highlight-icon" />
                    <div>
                      <strong>Architecture modulaire & scalable :</strong> Conçue selon les meilleures pratiques du génie logiciel avec typage rigoureux.
                    </div>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className="highlight-icon" />
                    <div>
                      <strong>Traitement & Optimisation :</strong> Algorithmes avancés optimisés pour une faible latence et une haute précision.
                    </div>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className="highlight-icon" />
                    <div>
                      <strong>Déploiement & Environnement :</strong> Conteneurisation Docker, monitoring et intégration prête pour la production.
                    </div>
                  </li>
                </ul>
              </section>
            </article>

            {/* Right Column: Sticky Meta Sidebar */}
            <aside className="project-sidebar">
              <div className="sidebar-card">
                <h3 className="sidebar-card-title">Fiche Technique</h3>

                <div className="sidebar-meta-list">
                  <div className="meta-item">
                    <span className="meta-label">Catégorie</span>
                    <span className="meta-val highlight">{p.categories?.name || "Informatique"}</span>
                  </div>

                  <div className="meta-item">
                    <span className="meta-label">Rôle</span>
                    <span className="meta-val">Conception & Développement</span>
                  </div>

                  <div className="meta-item">
                    <span className="meta-label">Période</span>
                    <span className="meta-val">2025 — 2026</span>
                  </div>

                  <div className="meta-item">
                    <span className="meta-label">Statut</span>
                    <span className="meta-val status-badge">✓ Validé & Testé</span>
                  </div>
                </div>

                <div className="sidebar-divider" />

                <div className="sidebar-stack-section">
                  <span className="meta-label">Technologies utilisées</span>
                  <div className="sidebar-tech-tags">
                    {techs.length > 0 ? (
                      techs.map((name: string) => (
                        <span key={name} className="tech-badge-item">
                          {name}
                        </span>
                      ))
                    ) : (
                      <>
                        <span className="tech-badge-item">Python</span>
                        <span className="tech-badge-item">TypeScript</span>
                        <span className="tech-badge-item">Next.js</span>
                        <span className="tech-badge-item">Docker</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="sidebar-divider" />

                <div className="sidebar-actions">
                  {p.github_url && (
                    <a
                      href={p.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="sidebar-btn-dark"
                    >
                      <Github size={16} />
                      <span>Consulter sur GitHub</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}

                  {p.demo_url && (
                    <a
                      href={p.demo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="sidebar-btn-primary"
                    >
                      <Play size={14} fill="currentColor" />
                      <span>Lancer la démo</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}

                  <Link href="/#contact" className="sidebar-btn-glass">
                    <span>Discuter de ce projet</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Related Projects Section */}
          {related.length > 0 && (
            <section className="related-projects-section">
              <div className="section-title-wrap">
                <span className="section-kicker">AUTRES RÉALISATIONS</span>
                <h2>Continuer l’exploration</h2>
                <p>Découvrez d'autres projets majeurs en Intelligence Artificielle et Développement.</p>
              </div>

              <div className="related-cards-grid">
                {related.map((r, i) => (
                  <ProjectCard key={r.id} project={r} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </SiteShell>
  );
}
