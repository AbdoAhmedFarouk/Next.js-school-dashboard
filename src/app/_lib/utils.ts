import { auth } from "@clerk/nextjs/server";

export async function getUserRole(): Promise<{
  role: string | null;
  currentUserId: string | null;
}> {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role || null;
  const currentUserId = userId ?? null;

  return { role, currentUserId };
}
