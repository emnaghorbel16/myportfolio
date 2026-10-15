import { getPortfolio } from "@/lib/data";
import { PortfolioView } from "@/components/portfolio-view";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const { profile, projects, education, experience, skills } = await getPortfolio();

  return (
    <PortfolioView
      profile={profile}
      projects={projects}
      education={education}
      experience={experience}
      skills={skills}
    />
  );
}

