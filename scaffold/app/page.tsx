import { getPortfolio } from "@/lib/data";
import { PortfolioView } from "@/components/portfolio-view";

export const revalidate = 0;

export default async function Home() {
  const { profile, projects, education } = await getPortfolio();

  return <PortfolioView profile={profile} projects={projects} education={education} />;
}
