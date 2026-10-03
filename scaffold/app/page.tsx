import { getPortfolio } from "@/lib/data";
import { CustomCursor } from "@/components/custom-cursor";
import { PremiumNav } from "@/components/premium-nav";
import { NewContactForm } from "@/components/new-contact-form";
import Link from "next/link";

export const revalidate = 0;

export default async function Home() {
  const { profile, projects, experience, education, achievements, socials } = await getPortfolio();

  const activeProfile = profile ?? {
    name: "Emna Ghorbel",
    professional_title: "Computer Science Student & Developer",
    short_bio: "I build intelligent systems at the intersection of AI, computer vision and modern software engineering.",
    about: "Passionate about pushing boundaries with code. I specialize in deep learning, computer vision, and building robust full-stack applications that make a difference.",
    location: "Sfax, Tunisia",
    email: "emna.ghorbel@example.com",
    profile_image_url: "",
    cv_url: "",
    phone: "",
  };

  const publishedProjects = projects.filter(p => p.published).slice(0, 4);

  const techStack = [
    "Python", "Java", "React", "JavaScript", "TypeScript",
    "OpenCV", "MediaPipe", "YOLO", "PyTorch", "TensorFlow",
    "Node.js", "FastAPI", "Android", "Git", "Supabase",
    "LangChain", "Next.js", "MongoDB", "Docker", "AWS",
  ];

  return (
    <>
      <CustomCursor />
      <PremiumNav name={activeProfile.name} />

      <main className="eg-main">

        {/* ─── HERO ─── */}
        <section className="eg-hero" id="home">
          <div className="eg-hero__bg">
            <div className="eg-hero__grain" />
            <div className="eg-hero__orb eg-hero__orb--1" />
            <div className="eg-hero__orb eg-hero__orb--2" />
          </div>

          <div className="eg-container eg-hero__container">
            {/* Left: text */}
            <div className="eg-hero__copy">
              <div className="eg-hero__label eg-animate eg-animate--1">
                <span className="eg-dot" />
                Available for work
              </div>

              <h1 className="eg-hero__h1">
                <span className="eg-hero__line eg-animate eg-animate--2">Hi, I'm Emna.</span>
                <span className="eg-hero__line eg-hero__line--sub eg-animate eg-animate--3">
                  Computer Science<br />Student &amp; Developer.
                </span>
              </h1>

              <p className="eg-hero__bio eg-animate eg-animate--4">
                {activeProfile.short_bio}
              </p>

              <div className="eg-hero__actions eg-animate eg-animate--5">
                <Link href="#work" className="eg-btn eg-btn--dark">View My Work</Link>
                <Link href="#contact" className="eg-btn eg-btn--outline">Let's Talk</Link>
              </div>

              <div className="eg-hero__meta eg-animate eg-animate--6">
                <span className="eg-hero__loc">📍 {activeProfile.location}</span>
                <span className="eg-sep" />
                <span>Open to opportunities</span>
              </div>
            </div>

            {/* Right: visual card */}
            <div className="eg-hero__visual eg-animate eg-animate--3">
              <div className="eg-hero__card" data-cursor="view">
                <div className="eg-hero__card-inner">
                  {/* Terminal-style code window */}
                  <div className="eg-terminal">
                    <div className="eg-terminal__bar">
                      <span /><span /><span />
                      <p>emna@dev ~ portfolio</p>
                    </div>
                    <div className="eg-terminal__body">
                      <div className="eg-terminal__line">
                        <span className="t-prompt">~</span>
                        <span className="t-cmd"> python ai_model.py</span>
                      </div>
                      <div className="eg-terminal__line t-out">
                        <span>Loading model weights... ✓</span>
                      </div>
                      <div className="eg-terminal__line t-out">
                        <span>Accuracy: <em>98.3%</em></span>
                      </div>
                      <div className="eg-terminal__line t-out">
                        <span>Inference: <em>12ms</em></span>
                      </div>
                      <div className="eg-terminal__line">
                        <span className="t-prompt">~</span>
                        <span className="t-cmd"> git push origin main</span>
                      </div>
                      <div className="eg-terminal__line t-out">
                        <span>✓ Deployed to production</span>
                      </div>
                      <div className="eg-terminal__line eg-terminal__cursor">
                        <span className="t-prompt">~</span>
                        <span className="t-blink">▮</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating tech pills */}
                {["Python", "React", "AI", "Computer Vision", "Java"].map((tech, i) => (
                  <div key={tech} className={`eg-float-tag eg-float-tag--${i + 1}`}>
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="eg-hero__scroll eg-animate eg-animate--6">
            <div className="eg-scroll-line" />
            <span>Scroll</span>
          </div>
        </section>

        {/* ─── ABOUT ─── */}
        <section className="eg-about" id="about">
          <div className="eg-container">
            <div className="eg-label eg-reveal">About Me</div>

            <div className="eg-about__statement eg-reveal">
              I build{" "}
              <em className="eg-em">digital experiences</em>{" "}
              with code,{" "}
              <em className="eg-em">AI</em>{" "}
              and computer{" "}
              <em className="eg-em">vision.</em>
            </div>

            <div className="eg-about__grid">
              <div className="eg-about__text eg-reveal">
                <p>{activeProfile.about}</p>
                <p>
                  Whether it's building autonomous agents, crafting beautiful web
                  interfaces, or engineering scalable backend systems — I bring
                  craft and precision to every line of code.
                </p>
                {activeProfile.cv_url && (
                  <a href={activeProfile.cv_url} className="eg-btn eg-btn--outline" target="_blank" rel="noreferrer">
                    Download CV
                  </a>
                )}
              </div>

              <div className="eg-about__stats eg-reveal">
                {[
                  { n: "15+", label: "Projects completed" },
                  { n: "10+", label: "Technologies mastered" },
                  { n: "3", label: "Awards & honours" },
                ].map(({ n, label }) => (
                  <div key={label} className="eg-stat">
                    <span className="eg-stat__n">{n}</span>
                    <span className="eg-stat__label">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── SKILLS / TECH WALL ─── */}
        <section className="eg-skills" id="skills">
          <div className="eg-container">
            <div className="eg-label eg-reveal">Expertise</div>
            <h2 className="eg-section-title eg-reveal">Technology Stack</h2>
            <p className="eg-section-sub eg-reveal">
              Tools &amp; languages I use to bring ideas to life.
            </p>

            <div className="eg-tech-wall eg-reveal">
              {techStack.map((tech) => (
                <div key={tech} className="eg-tech-pill">
                  <span className="eg-tech-pill__dot" />
                  {tech}
                </div>
              ))}
            </div>

            {/* Domain cards */}
            <div className="eg-domain-grid eg-reveal">
              {[
                { icon: "🤖", title: "AI & Machine Learning", desc: "Deep learning pipelines, NLP, generative AI, multi-agent systems." },
                { icon: "👁️", title: "Computer Vision", desc: "YOLO, OpenCV, MediaPipe — real-time detection & classification." },
                { icon: "🛡️", title: "Cybersecurity", desc: "Threat intelligence, CTI multi-agent systems, network security." },
                { icon: "💻", title: "Full Stack", desc: "React, Next.js, FastAPI, Node.js — end-to-end web applications." },
                { icon: "📱", title: "Mobile", desc: "Cross-platform mobile apps with smooth, responsive UX." },
                { icon: "📊", title: "Big Data", desc: "Hadoop, distributed processing, large-scale data platforms." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="eg-domain-card eg-reveal">
                  <span className="eg-domain-card__icon">{icon}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROJECTS ─── */}
        <section className="eg-work" id="work">
          <div className="eg-container">
            <div className="eg-label eg-reveal">Selected Work</div>
            <h2 className="eg-section-title eg-reveal">Projects</h2>

            <div className="eg-projects">
              {publishedProjects.length > 0 ? publishedProjects.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.slug}`}
                  className={`eg-project eg-reveal${i % 2 === 1 ? " eg-project--alt" : ""}`}
                  data-cursor="view"
                >
                  <div className="eg-project__visual">
                    <img
                      src={p.image_url || `https://images.unsplash.com/photo-155594996${3 + i}-ff9fe0c870eb?auto=format&fit=crop&w=900&q=80`}
                      alt={p.title}
                    />
                    <div className="eg-project__overlay">
                      <span>View Project →</span>
                    </div>
                  </div>
                  <div className="eg-project__info">
                    <span className="eg-project__idx">0{i + 1}</span>
                    <span className="eg-project__cat">{p.categories?.name || "Project"}</span>
                    <h3>{p.title}</h3>
                    <p>{p.short_description || "Project overview to be added."}</p>
                    <div className="eg-project__tags">
                      {(p.project_technologies || []).slice(0, 4).map((pt: any) => (
                        <span key={pt.technologies?.name}>{pt.technologies?.name}</span>
                      ))}
                    </div>
                    <span className="eg-project__cta">View Project →</span>
                  </div>
                </Link>
              )) : (
                // Placeholder projects when DB has none
                [
                  { title: "CTI Multi-Agent System", cat: "Cybersecurity", desc: "A multi-agent framework for cyber threat intelligence gathering and analysis.", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80", tags: ["Python", "LLM", "Multi-Agent"] },
                  { title: "Computer Vision Pipeline", cat: "AI", desc: "Real-time object detection and classification system using YOLO and OpenCV.", img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=900&q=80", tags: ["OpenCV", "YOLO", "PyTorch"] },
                  { title: "Generative AI Platform", cat: "AI", desc: "LangChain-powered generative AI application with multi-model orchestration.", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=900&q=80", tags: ["LangChain", "OpenAI", "Python"] },
                ].map(({ title, cat, desc, img, tags }, i) => (
                  <div key={title} className={`eg-project eg-reveal${i % 2 === 1 ? " eg-project--alt" : ""}`}>
                    <div className="eg-project__visual" data-cursor="view">
                      <img src={img} alt={title} />
                      <div className="eg-project__overlay"><span>View Project →</span></div>
                    </div>
                    <div className="eg-project__info">
                      <span className="eg-project__idx">0{i + 1}</span>
                      <span className="eg-project__cat">{cat}</span>
                      <h3>{title}</h3>
                      <p>{desc}</p>
                      <div className="eg-project__tags">{tags.map(t => <span key={t}>{t}</span>)}</div>
                      <span className="eg-project__cta">Add projects from admin panel →</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* ─── EXPERIENCE & EDUCATION ─── */}
        <section className="eg-journey" id="experience">
          <div className="eg-container">
            <div className="eg-label eg-reveal">Journey</div>
            <h2 className="eg-section-title eg-reveal">Experience &amp; Education</h2>

            <div className="eg-journey__grid">
              <div className="eg-journey__col">
                <h3 className="eg-journey__col-title eg-reveal">Experience</h3>
                {experience.length > 0 ? experience.filter(x => x.is_visible !== false).map((x, i) => (
                  <div key={x.id} className="eg-journey__item eg-reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                    <span className="eg-journey__year">{x.start_date?.slice(0, 4)}{x.end_date ? ` — ${x.end_date.slice(0, 4)}` : " — Present"}</span>
                    <h4>{x.position}</h4>
                    <span className="eg-journey__where">{x.company}</span>
                    <p>{x.description}</p>
                  </div>
                )) : (
                  <div className="eg-journey__empty eg-reveal">
                    <p>Add your experience from the admin panel.</p>
                  </div>
                )}
              </div>

              <div className="eg-journey__col">
                <h3 className="eg-journey__col-title eg-reveal">Education</h3>
                {education.length > 0 ? education.filter(x => x.is_visible !== false).map((x, i) => (
                  <div key={x.id} className="eg-journey__item eg-reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                    <span className="eg-journey__year">{x.start_date?.slice(0, 4)}{x.end_date ? ` — ${x.end_date.slice(0, 4)}` : x.current ? " — Present" : ""}</span>
                    <h4>{x.degree}</h4>
                    <span className="eg-journey__where">{x.institution}</span>
                    <p>{x.field}</p>
                  </div>
                )) : (
                  <div className="eg-journey__item eg-reveal">
                    <span className="eg-journey__year">2022 — Present</span>
                    <h4>Engineering Degree — Computer Science</h4>
                    <span className="eg-journey__where">ENIS — National Engineering School of Sfax</span>
                    <p>Specialization in AI, Machine Learning and Software Engineering.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─── ACHIEVEMENTS ─── */}
        {(achievements.length > 0) && (
          <section className="eg-achievements" id="achievements">
            <div className="eg-container">
              <div className="eg-label eg-reveal">Milestones</div>
              <h2 className="eg-section-title eg-reveal">Achievements</h2>
              <div className="eg-ach-grid">
                {achievements.filter(a => a.is_visible !== false).map((a, i) => (
                  <div key={a.id} className="eg-ach-card eg-reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                    <span className="eg-ach-card__date">{a.date?.slice(0, 4) || ""}</span>
                    <h4>{a.title}</h4>
                    <p>{a.description}</p>
                    {a.organization && <span className="eg-ach-card__org">{a.organization}</span>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Default achievement if none in DB */}
        {achievements.length === 0 && (
          <section className="eg-achievements" id="achievements">
            <div className="eg-container">
              <div className="eg-label eg-reveal">Milestones</div>
              <h2 className="eg-section-title eg-reveal">Achievements</h2>
              <div className="eg-ach-grid">
                <div className="eg-ach-card eg-reveal">
                  <span className="eg-ach-card__date">2023</span>
                  <h4>1st Place — IEEE Sight ENIS Non-Tech Competition</h4>
                  <p>Recognized for outstanding problem-solving and innovative approaches in a multidisciplinary challenge.</p>
                  <span className="eg-ach-card__org">IEEE Sight ENIS</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── CONTACT ─── */}
        <section className="eg-contact" id="contact">
          <div className="eg-container">
            <div className="eg-contact__grid">
              <div className="eg-contact__left eg-reveal">
                <div className="eg-label">Let's Connect</div>
                <h2 className="eg-contact__title">
                  Interested in working<br />
                  <em>together?</em>
                </h2>
                <p>
                  Whether you have a project in mind, want to collaborate, or just
                  want to say hi — my inbox is always open.
                </p>
                <div className="eg-contact__links">
                  {activeProfile.email && (
                    <a href={`mailto:${activeProfile.email}`} className="eg-contact__link">
                      <span className="eg-contact__link-icon">✉</span>
                      {activeProfile.email}
                    </a>
                  )}
                  {activeProfile.location && (
                    <a className="eg-contact__link">
                      <span className="eg-contact__link-icon">📍</span>
                      {activeProfile.location}
                    </a>
                  )}
                  {socials.map((s: any) => (
                    <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="eg-contact__link">
                      <span className="eg-contact__link-icon">↗</span>
                      {s.platform}
                    </a>
                  ))}
                </div>
              </div>

              <div className="eg-contact__right eg-reveal">
                <NewContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="eg-footer">
          <div className="eg-container eg-footer__inner">
            <span className="eg-footer__brand">EG · {activeProfile.name}</span>
            <span className="eg-footer__copy">© {new Date().getFullYear()} — All rights reserved</span>
            <div className="eg-footer__links">
              <a href="#home">Top ↑</a>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
