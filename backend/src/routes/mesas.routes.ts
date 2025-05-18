import { Router } from "express";
import mesaController from "../controllers/mesa.controller";

const mesasRouter = Router();

mesasRouter.get('/', mesaController.getMesas)

export default mesasRouter;