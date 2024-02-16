import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export interface AuthRequest extends Request {
  _id?: string;
}

export const verifyTokenAnonymous = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return next();
  }
  jwt.verify(
    token,
    process.env.JWT_KEY!,
    (err: JsonWebTokenError | null, data: any) => {
      if (err) {
        return res.status(401).send({ message: "You are unauthorized." });
      }
      req._id = data._id;
      next();
    }
  );
};
