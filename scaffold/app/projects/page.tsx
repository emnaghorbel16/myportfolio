import { getProjects } from "@/lib/data";
import { ProjectsBrowser } from "@/components/projects-browser";
export const revalidate=0;
export default async function ProjectsPage(){const {projects,categories}=await getProjects();return <ProjectsBrowser projects={projects} categories={categories}/>}
