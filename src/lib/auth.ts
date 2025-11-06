import jwt from "jsonwebtoken";
import { prisma } from "@/lib/db";

export async function getCurrentUser(req: Request) {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return null;

  const sessionCookie = cookieHeader
    .split("; ")
    .find((c) => c.startsWith("session="))
    ?.split("=")[1];

  if (!sessionCookie) return null;

  try {
    const decoded = jwt.verify(sessionCookie, process.env.JWT_SECRET!) as {
      id: string;
    };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    return user;
  } catch {
    return null;
  }
}
