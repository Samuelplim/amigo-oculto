import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { randomBytes } from "crypto";
import cookieParser from "cookie-parser"; 

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

interface UserPayload {
  id: string;
  email: string;
  // Outros campos relevantes
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token; // Certifique-se de que o cookie-parser está sendo usado no app

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido. Certifique-se de estar autenticado." });
  }

  const secret: Secret =
    process.env.JWT_SECRET ??
    (() => {
      console.warn("JWT_SECRET não está definido. Gerando um valor temporário.");
      return randomBytes(64).toString("hex");
    })();

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não está definido. Configure a variável de ambiente.");
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string") {
      return res.status(403).json({ message: "Token inválido. Payload inesperado." });
    }

    req.user = decoded as JwtPayload as UserPayload;
    return next();
  } catch (error) {
    console.error("Erro ao validar o token JWT:", error);
    return res.status(403).json({ message: "Token inválido ou expirado. Faça login novamente." });
  }
};

export const generateToken = (user: UserPayload) => {
  const token = jwt.sign(user, process.env.JWT_SECRET ?? "default_secret", {
    expiresIn: "24h",
  });
  return token;
};

export const setTokenCookie = (res: Response, token: string) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
  });
};