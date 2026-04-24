import { StatusImovel } from "../types/status-imovel.type.js";

export interface IImovel {
  id: number;
  titulo: string;
  bairro: string;
  preco: number;
  metragem: number;
  status: StatusImovel;
}
