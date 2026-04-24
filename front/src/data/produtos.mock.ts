import { IDepoimento } from "../types/IDepoimento";
import { IProduto } from "../types/IProduto";

export const produtosMock: IProduto[] = [
  {
    id: 1,
    nome: "Sofa Luar 3 Lugares",
    categoria: "Sala",
    descricaoCurta: "Design curvo com acabamento premium em linho.",
    descricaoLonga:
      "Sofa de alto padrao com espuma de densidade progressiva, estrutura em madeira macica e detalhes artesanais.",
    preco: 8990,
    estoque: 5,
    imagem: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    nome: "Mesa Aura Nogueira",
    categoria: "Jantar",
    descricaoCurta: "Tampo nobre e base escultural contemporanea.",
    descricaoLonga:
      "Mesa de jantar em madeira nobre com acabamento acetinado e proporcao ideal para ambientes sofisticados.",
    preco: 6290,
    estoque: 7,
    imagem: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    nome: "Poltrona Atelier",
    categoria: "Living",
    descricaoCurta: "Conforto ergonomico com identidade autoral.",
    descricaoLonga:
      "Poltrona assinada com encosto envolvente, base em metal dourado fosco e tecido texturizado de alto desempenho.",
    preco: 3590,
    estoque: 10,
    imagem: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
  }
];

export const depoimentosMock: IDepoimento[] = [
  {
    id: 1,
    cliente: "Camila Araujo",
    texto: "A curadoria de moveis transformou minha sala. Atendimento impecavel e acabamento excelente.",
    cidade: "Sao Paulo"
  },
  {
    id: 2,
    cliente: "Rafael Teixeira",
    texto: "Entrega cuidadosa e qualidade acima da media. A loja realmente tem padrao boutique.",
    cidade: "Curitiba"
  },
  {
    id: 3,
    cliente: "Helena Motta",
    texto: "A peca redefine o ambiente inteiro. Silencio e presenca no mesmo lugar.",
    cidade: "Belo Horizonte"
  },
  {
    id: 4,
    cliente: "Diego Santana",
    texto: "Projeto sob medida com tempo e cuidado. Voltaria a comprar sem pensar duas vezes.",
    cidade: "Porto Alegre"
  }
];
