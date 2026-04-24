import { Router } from "express";
import {
  atualizarStatusImovel,
  listarImoveis
} from "../controllers/imoveis.controller.js";

const imoveisRouter = Router();

imoveisRouter.get("/", listarImoveis);
imoveisRouter.patch("/:id/status", atualizarStatusImovel);

export { imoveisRouter };
