import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ProjectCard({ project, index = 0 }: { project: Record<string, any>; index?: number }) {
  const tech = (project.project_technologies || []).map((x: any) => x.technologies?.name).filter(Boolean);
  const coverImage = (project.image_url || "").split(/[\n,]+/)[0]?.trim();

  return (
    <article className={`project-card card-${index % 3}`}>
      <Link className="project-visual" href={`/projects/${project.slug}`} aria-label={`View ${project.title}`}>
        <div className="visual-number">0{index + 1}</div>
        <div className="visual-shape shape-a" />
        <div className="visual-shape shape-b" />
        <span className="visual-open">
          <ArrowUpRight />
        </span>
        {coverImage && <img src={coverImage} alt={project.title || ""} />}
      </Link>
      <div className="project-info">
        <div className="project-topline">
          <span>{project.categories?.name || "Independent"}</span>
          <span>{project.created_at?.slice(0, 4) || "Selected work"}</span>
        </div>
        <Link href={`/projects/${project.slug}`}>
          <h3>
            {project.title}
            <ArrowUpRight size={17} />
          </h3>
        </Link>
        <p>{project.short_description}</p>
        <div className="project-tags">
          {tech.slice(0, 4).map((t: string) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
