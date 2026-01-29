import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload } from "jsonwebtoken";
import { ENV } from "../config/constant";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

interface UserPayload {
  id: string;
  nome: string;
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido. Certifique-se de estar autenticado." });
  }
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (typeof decoded === "string") {
      return res.status(403).json({ message: "Token inválido. Payload inesperado." });
    }
    req.user = decoded as JwtPayload as UserPayload;
    return next();
}; 

export const generateToken = (user: UserPayload) => {
  const token = jwt.sign(user, ENV.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};