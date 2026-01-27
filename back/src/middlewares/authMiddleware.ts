import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { randomBytes } from "crypto";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }
  const secret: Secret =
    process.env.JWT_SECRET ??
    (() => {
      console.warn("JWT_SECRET não está definido. Gerando um valor temporário.");
      return randomBytes(64).toString("hex");
    })();
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido ou expirado" });
  }
  return; 
};