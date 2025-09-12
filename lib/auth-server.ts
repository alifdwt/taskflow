import { headers } from "next/headers";

import { auth } from "@/lib/auth";

/**
 * Get session in Server Components
 * Use this for server-side session checking
 */
export async function getServerSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session;
  } catch (error) {
    console.error("Error getting server session:", error);
    return null;
  }
}

/**
 * Check if user is authenticated on server
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getServerSession();
  return !!session?.user;
}

/**
 * Get current user from server session
 */
export async function getCurrentUser() {
  const session = await getServerSession();
  return session?.user || null;
}

/**
 * Server-side auth guard for Server Components
 */
export async function requireAuth() {
  const session = await getServerSession();

  if (!session?.user) {
    throw new Error("Unauthorized: Authentication required");
  }

  return session;
}
