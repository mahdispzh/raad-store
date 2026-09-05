// shared/auth/jwt.ts

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function signAccessToken(payload: {
  userId: number;
  role: number;
  name: string | null;
}) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "115m",
  });
}

export function signRefreshToken(payload: {
  userId: number;
  role: number;
  name: string | null;
}) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "30d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as {
    userId: number;
    role: number;
    name: string | null;
  };
}
