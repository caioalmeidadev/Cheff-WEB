import Router from "express";
import { AuthRegister } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/login", AuthRegister);

export default authRouter;
