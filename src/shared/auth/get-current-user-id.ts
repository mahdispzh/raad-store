import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getCurrentUserId(
  providedUserId?: number,
): Promise<number | undefined> {
  if (providedUserId !== undefined) {
    return providedUserId;
  }

  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return undefined;
  }

  try {
    const payload = verifyToken(refreshToken);
    return payload.userId;
  } catch {
    return undefined;
  }
}
