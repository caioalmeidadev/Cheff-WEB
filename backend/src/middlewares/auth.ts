import { NextFunction, Response, Request } from "express";
import * as z from "zod";
import authRepository from "../repositories/auth.repository";

const userPassBodySchema = z.object({
  codigo: z.string(),
  senha: z.string(),
});


export async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (req.method !== 'OPTIONS') {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({ error: "Not authorized" });
    }


    const { codigo, senha } = userPassBodySchema.parse(JSON.parse(authorization));


    if (!codigo && !senha) {
      return res.status(401).send({ error: "Not authorized2" });
    }
    try {
      if (!(await authRepository.check(codigo, senha))) {
        return res.status(401).send({
          error: "Not authorized3"
        });
      }
    } catch (err: any) {
      return res.status(401).send({ error: err.message });
    }
  }
  return next();
}
