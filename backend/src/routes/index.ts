import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth";
import clientesRouter from "./clientes.routes";
import comandaRouter from "./comanda.routes";
import produtoRouter from "./produtos.routes";
import mesasRouter from "./mesas.routes";
import authRouter from "./auth.routes";
import funcionariosRouter from "./funcionario.routes";
import { Log } from "../middlewares/log";
import { env } from "../env";

const routes = Router();

routes.use(Log);
routes.get("/", (req, res) =>
  res.send(`
<div>
    <h1>Servidor Online</h1>
    <p>Serviço rodando na porta ${env.SERVER_PORT}. </p>
    <p>Banco de dados: ${env.DB_PATH}</p>
    <p>Host do banco: ${env.DB_HOST}</p>
</div>
`)
);
routes.use("/", authRouter);
routes.use(AuthMiddleware);
routes.use("/funcionarios", funcionariosRouter);
routes.use("/comandas", comandaRouter);
routes.use("/produtos", produtoRouter);
routes.use("/clientes", clientesRouter);
routes.use("/mesas", mesasRouter);

export default routes;
