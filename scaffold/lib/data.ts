import { createClient } from "@supabase/supabase-js";
import {
  fallbackProfile,
  fallbackCategories,
  fallbackProjects,
  fallbackEducation,
  fallbackExperience,
  fallbackSkills,
  fallbackSocials,
} from "./fallback-data";

export type Row = Record<string, any>;

const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://nphottnnloakekudwdeh.supabase.co";
const key =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_I0ygKNtmafX-5BM1DqklPQ_hpC5Ol1P";

export const supabase =
  url && key
    ? createClient(url, key, {
        auth: {
          persistSession: typeof window !== "undefined",
          autoRefreshToken: typeof window !== "undefined",
        },
      })
    : null;

const reportedTables = new Set<string>();

async function rows(table: string, query = "*") {
  if (!supabase) return [] as Row[];
  try {
    const { data, error } = await supabase.from(table).select(query);
    if (error) {
      if (!reportedTables.has(table)) {
        reportedTables.add(table);
        console.warn(`[Supabase] Table "${table}": ${error.message}.`);
      }
      return [] as Row[];
    }
    return (data ?? []) as Row[];
  } catch (err: any) {
    if (!reportedTables.has(table)) {
      reportedTables.add(table);
      console.warn(`[Supabase] Connexion impossible (${err?.message || "fetch failed"}).`);
    }
    return [] as Row[];
  }
}

export async function getPortfolio() {
  const [profiles, categories, projects, skills, experience, education, achievements, socials] =
    await Promise.all([
      rows("profiles"),
      rows("categories", "*"),
      rows("projects", "*, categories(name,slug), project_technologies(technologies(name))"),
      rows("skills", "*"),
      rows("experience", "*"),
      rows("education", "*"),
      rows("achievements", "*"),
      rows("social_links", "*"),
    ]);

  const ordered = (arr: Row[]) => arr.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

  const resolvedProfile = profiles[0] || fallbackProfile;
  const resolvedCategories = categories.length > 0 ? categories.filter((c) => c.is_visible) : fallbackCategories;
  const resolvedSkills = skills.length > 0 ? skills : fallbackSkills;
  const resolvedProjects = projects.length > 0 ? projects : fallbackProjects;
  const resolvedExperience = experience.length > 0 ? experience : fallbackExperience;
  const resolvedEducation = education.length > 0 ? education : fallbackEducation;
  const resolvedSocials = socials.length > 0 ? socials : fallbackSocials;

  return {
    profile: resolvedProfile,
    categories: ordered(resolvedCategories),
    projects: ordered(resolvedProjects),
    skills: ordered(resolvedSkills),
    experience: ordered(resolvedExperience),
    education: ordered(resolvedEducation),
    achievements: ordered(achievements),
    socials: ordered(resolvedSocials),
  };
}

export async function getProjects() {
  const { projects, categories } = await getPortfolio();
  return {
    projects: projects.filter((p) => p.published),
    categories,
  };
}

export async function getProject(slug: string) {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*, categories(name,slug), project_technologies(technologies(name))")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (!error) {
        return (data ?? null) as Row | null;
      }
    } catch {
      // En cas d'erreur de connexion réseau à Supabase, tenter le fallback
    }
  }

  // Fallback si la requête Supabase a complètement échoué
  const fallback = fallbackProjects.find((p) => p.slug === slug);
  return (fallback ?? null) as Row | null;
}

