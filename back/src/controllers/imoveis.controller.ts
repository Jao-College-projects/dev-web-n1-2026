import { Request, Response } from "express";
import { imoveisMock } from "../data/imoveis.mock.js";
import { StatusImovel } from "../types/status-imovel.type.js";

export function listarImoveis(_request: Request, response: Response): void {
  response.json(imoveisMock);
}

export function atualizarStatusImovel(request: Request, response: Response): void {
  const id = Number(request.params.id);
  const { status } = request.body as { status?: StatusImovel };

  if (!status || !["disponivel", "reservado", "vendido"].includes(status)) {
    response.status(400).json({ mensagem: "Status invalido." });
    return;
  }

  const imovel = imoveisMock.find((item) => item.id === id);

  if (!imovel) {
    response.status(404).json({ mensagem: "Imovel nao encontrado." });
    return;
  }

  imovel.status = status;
  response.json(imovel);
}
