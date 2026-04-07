import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_SESSION_COOKIE, getSessionFromToken } from "@/lib/auth";

export default async function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = getSessionFromToken(cookieStore.get(AUTH_SESSION_COOKIE)?.value);

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
