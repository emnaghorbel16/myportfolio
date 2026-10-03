import { createClient } from "@supabase/supabase-js";

export type Row = Record<string, any>;
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = url && key ? createClient(url, key, { auth: { persistSession: typeof window !== "undefined", autoRefreshToken: typeof window !== "undefined" } }) : null;
const reportedTables = new Set<string>();
async function rows(table: string, query = "*") {
  if (!supabase) return [] as Row[];
  const { data, error } = await supabase.from(table).select(query);
  if (error) {
    if (!reportedTables.has(table)) {
      reportedTables.add(table);
      console.error(`Unable to load ${table}: ${error.message}. Apply supabase/schema.sql in your Supabase project's SQL Editor.`);
    }
    return [] as Row[];
  }
  return (data ?? []) as Row[];
}
export async function getPortfolio() {
  const [profiles,categories,projects,skills,experience,education,achievements,socials] = await Promise.all([
    rows("profiles"), rows("categories","*"), rows("projects","*, categories(name,slug), project_technologies(technologies(name))"), rows("skills","*"), rows("experience","*"), rows("education","*"), rows("achievements","*"), rows("social_links","*")
  ]);
  const ordered = (arr: Row[]) => arr.sort((a,b)=>(a.display_order??0)-(b.display_order??0));
  return { profile: profiles[0] ?? null, categories: ordered(categories.filter(c=>c.is_visible)), projects: ordered(projects), skills: ordered(skills), experience: ordered(experience), education: ordered(education), achievements: ordered(achievements), socials: ordered(socials) };
}
export async function getProjects() { const {projects,categories}=await getPortfolio(); return { projects:projects.filter(p=>p.published), categories }; }
export async function getProject(slug:string) { if(!supabase)return null; const {data}=await supabase.from("projects").select("*, categories(name,slug), project_technologies(technologies(name))").eq("slug",slug).eq("published",true).maybeSingle(); return data as Row|null; }
