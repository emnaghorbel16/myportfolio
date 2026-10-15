import { getPortfolio } from "@/lib/data";
import { SiteNav } from "@/components/site-nav";
export async function SiteShell({children}:{children:React.ReactNode}){const {profile}=await getPortfolio();return <><SiteNav name={profile?.name||"Emna Ghorbel"} cv={profile?.cv_url||"/cv.pdf"}/>{children}</>}
