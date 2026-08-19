import { getSessionUser } from "@/lib/auth";
import { SiteNavClient } from "@/components/layout/site-nav-client";

export async function SiteNav() {
  const session = await getSessionUser();
  return <SiteNavClient session={session} />;
}