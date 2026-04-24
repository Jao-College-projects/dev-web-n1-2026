export interface IProduto {
  id: number;
  nome: string;
  categoria: string;
  descricaoCurta: string;
  descricaoLonga: string;
  preco: number;
  estoque: number;
  imagem: string;
  destaqueCarrossel?: boolean;
}

export interface IItemCarrinho {
  produtoId: number;
  quantidade: number;
}

export interface ICredenciaisLogin {
  email: string;
  senha: string;
  tipoUsuario: TipoUsuario;
}

export interface IFormularioCadastro {
  nomeCompleto: string;
  email: string;
  senha: string;
}

export type TipoUsuario = "normal" | "admin";

export interface ITextosSite {
  tituloLoja: string;
  legendaLoja: string;
  secaoApresentacaoTitulo: string;
  secaoApresentacaoTexto: string;
  secaoProdutosTitulo: string;
  secaoProdutosTexto: string;
  secaoExperienciasTitulo: string;
}

export interface ISecaoHome {
  identificador: string;
  tituloSecao: string;
  ordem: number;
  ativo: boolean;
  conteudo: any; // JSON payload para textos e imagens
}
