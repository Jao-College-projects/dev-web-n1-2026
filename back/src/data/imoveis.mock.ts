import { IImovel } from "../models/imovel.model.js";

export const imoveisMock: IImovel[] = [
  {
    id: 1,
    titulo: "Apartamento com varanda gourmet",
    bairro: "Centro",
    preco: 420000,
    metragem: 78,
    status: "disponivel"
  },
  {
    id: 2,
    titulo: "Casa com quintal amplo",
    bairro: "Jardim Primavera",
    preco: 650000,
    metragem: 140,
    status: "reservado"
  },
  {
    id: 3,
    titulo: "Studio mobiliado",
    bairro: "Universitario",
    preco: 290000,
    metragem: 42,
    status: "vendido"
  }
];
