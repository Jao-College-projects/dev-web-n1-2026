import cors from "cors";
import express from "express";
import { imoveisRouter } from "./routes/imoveis.routes.js";

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.use("/api/imoveis", imoveisRouter);

app.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
