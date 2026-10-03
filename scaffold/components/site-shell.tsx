import { getPortfolio } from "@/lib/data";
import { SiteNav } from "@/components/site-nav";
export async function SiteShell({children}:{children:React.ReactNode}){const {profile}=await getPortfolio();return <><SiteNav name={profile?.name||"Alex Morgan"} cv={profile?.cv_url}/>{children}</>}
