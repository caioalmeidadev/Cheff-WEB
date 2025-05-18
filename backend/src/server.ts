import express from "express";
import cors from "cors";
import routes from "./routes";
import { env } from "./env";

const app = express();

app.use(cors({
  preflightContinue: true,
}));
app.use(express.json());
app.use(routes);

app.listen(env.SERVER_PORT, () => {
  console.log(`Servidor rodando na porta ${env.SERVER_PORT}`);
});
