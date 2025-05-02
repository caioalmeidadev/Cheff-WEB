import { NextFunction, Response, Request } from "express";
import * as z from "zod";
import authRepository from "../repositories/auth.repository";

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userPassBodySchema = z.object({
    username: z.string(),
    password: z.string(),
  });

  const { username, password } = userPassBodySchema.parse(req.headers);

  if (!username && !password) {
    return res.status(401).send({ error: "Not authorized" });
  }
  try {
    if (!(await authRepository.check(username, password))) {
      return res.status(401).send({ error: "Not authorized" });
    }
  } catch (err: any) {
    return res.status(401).send({ error: err.message });
  }

  return next();
}
