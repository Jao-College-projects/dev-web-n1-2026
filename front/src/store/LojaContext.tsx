import { createContext, useContext, useMemo, useState } from "react";
import { produtosMock } from "../data/produtos.mock";
import { depoimentosMock } from "../data/produtos.mock";
import {
  ICredenciaisLogin,
  IFormularioCadastro,
  IItemCarrinho,
  IProduto,
  ITextosSite,
  ISecaoHome,
  TipoUsuario
} from "../types/IProduto";
import { IDepoimento } from "../types/IDepoimento";

interface ILojaContextData {
  produtos: IProduto[];
  depoimentos: IDepoimento[];
  textosSite: ITextosSite;
  secoesHome: ISecaoHome[];
  itensCarrinho: IItemCarrinho[];
  produtoSelecionado: IProduto | null;
  usuarioLogado: boolean;
  tipoUsuario: TipoUsuario;
  modoEdicao: boolean;
  isAdmin: boolean;
  totalItensCarrinho: number;
  subtotalCarrinho: number;
  selecionarProduto: (produto: IProduto) => void;
  fecharDetalhesProduto: () => void;
  adicionarAoCarrinho: (produtoId: number) => void;
  removerDoCarrinho: (produtoId: number) => void;
  adicionarProduto: (novoProduto: Omit<IProduto, "id">) => void;
  atualizarProduto: (produtoAtualizado: IProduto) => void;
  removerProduto: (produtoId: number) => void;
  adicionarDepoimento: (novoDepoimento: Omit<IDepoimento, "id">) => void;
  atualizarDepoimento: (depoimentoAtualizado: IDepoimento) => void;
  removerDepoimento: (depoimentoId: number) => void;
  atualizarTextoSite: (chave: keyof ITextosSite, valor: string) => void;
  atualizarSecaoHome: (identificador: string, dados: ISecaoHome) => void;
  alternarModoEdicao: () => void;
  login: (dados: ICredenciaisLogin) => void;
  cadastrar: (dados: IFormularioCadastro) => void;
  logout: () => void;
}

const LojaContext = createContext<ILojaContextData | undefined>(undefined);

export function LojaProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [produtos, setProdutos] = useState<IProduto[]>(
    produtosMock.map((p, index) => ({ ...p, destaqueCarrossel: index % 2 === 0 })) // mock de destaques
  );
  const [depoimentos, setDepoimentos] = useState<IDepoimento[]>(depoimentosMock);
  const [textosSite, setTextosSite] = useState<ITextosSite>({
    tituloLoja: "Luar Moveis",
    legendaLoja: "Curadoria boutique de moveis para ambientes classicos, elegantes e atemporais.",
    secaoApresentacaoTitulo: "Uma jornada de design e conforto",
    secaoApresentacaoTexto:
      "Na Luar Moveis, cada peca e apresentada como uma experiencia de estilo, com narrativa visual refinada e consultoria personalizada.",
    secaoProdutosTitulo: "Colecao exclusiva de moveis",
    secaoProdutosTexto:
      "Explore pecas selecionadas para quem busca sofisticacao, ergonomia e excelente qualidade de acabamento.",
    secaoExperienciasTitulo: "Experiencias de clientes"
  });

  const [secoesHome, setSecoesHome] = useState<ISecaoHome[]>([
    {
      identificador: 'hero',
      tituloSecao: 'Hero Principal',
      ordem: 1,
      ativo: true,
      conteudo: {
        kicker: "Boutique · São Paulo",
        titulo_linha1: "Luar",
        titulo_linha2: "Móveis",
        tagline: "A quiet expression of timeless living.",
        descricao: "Curadoria boutique de móveis para ambientes clássicos, elegantes e atemporais.",
        cta_1_texto: "Explorar coleção",
        cta_2_texto: "Ver ambientes",
        imagem_url: ""
      }
    }
  ]);

  const [itensCarrinho, setItensCarrinho] = useState<IItemCarrinho[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<IProduto | null>(null);
  const [usuarioLogado, setUsuarioLogado] = useState<boolean>(false);
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>("normal");
  const [modoEdicao, setModoEdicao] = useState<boolean>(false);

  function selecionarProduto(produto: IProduto): void {
    setProdutoSelecionado(produto);
  }

  function fecharDetalhesProduto(): void {
    setProdutoSelecionado(null);
  }

  function adicionarAoCarrinho(produtoId: number): void {
    setItensCarrinho((estadoAnterior) => {
      const itemExistente = estadoAnterior.find((item) => item.produtoId === produtoId);
      if (itemExistente) {
        return estadoAnterior.map((item) =>
          item.produtoId === produtoId
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [...estadoAnterior, { produtoId, quantidade: 1 }];
    });
  }

  function removerDoCarrinho(produtoId: number): void {
    setItensCarrinho((estadoAnterior) =>
      estadoAnterior
        .map((item) =>
          item.produtoId === produtoId
            ? { ...item, quantidade: Math.max(item.quantidade - 1, 0) }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function adicionarProduto(novoProduto: Omit<IProduto, "id">): void {
    if (tipoUsuario !== "admin") {
      return;
    }

    setProdutos((estadoAnterior) => {
      const novoId = estadoAnterior.length
        ? Math.max(...estadoAnterior.map((produto) => produto.id)) + 1
        : 1;
      return [...estadoAnterior, { ...novoProduto, id: novoId }];
    });
  }

  function atualizarProduto(produtoAtualizado: IProduto): void {
    if (tipoUsuario !== "admin") {
      return;
    }

    setProdutos((estadoAnterior) =>
      estadoAnterior.map((produto) =>
        produto.id === produtoAtualizado.id ? produtoAtualizado : produto
      )
    );
  }

  function removerProduto(produtoId: number): void {
    if (tipoUsuario !== "admin") {
      return;
    }

    setProdutos((estadoAnterior) => estadoAnterior.filter((produto) => produto.id !== produtoId));
  }

  function adicionarDepoimento(novoDepoimento: Omit<IDepoimento, "id">): void {
    if (tipoUsuario !== "admin") {
      return;
    }

    setDepoimentos((estadoAnterior) => {
      const novoId = estadoAnterior.length
        ? Math.max(...estadoAnterior.map((depoimento) => depoimento.id)) + 1
        : 1;
      return [...estadoAnterior, { ...novoDepoimento, id: novoId }];
    });
  }

  function atualizarDepoimento(depoimentoAtualizado: IDepoimento): void {
    if (tipoUsuario !== "admin") {
      return;
    }

    setDepoimentos((estadoAnterior) =>
      estadoAnterior.map((depoimento) =>
        depoimento.id === depoimentoAtualizado.id ? depoimentoAtualizado : depoimento
      )
    );
  }

  function removerDepoimento(depoimentoId: number): void {
    if (tipoUsuario !== "admin") {
      return;
    }

    setDepoimentos((estadoAnterior) =>
      estadoAnterior.filter((depoimento) => depoimento.id !== depoimentoId)
    );
  }

  function atualizarTextoSite(chave: keyof ITextosSite, valor: string): void {
    if (tipoUsuario !== "admin") {
      return;
    }

    setTextosSite((estadoAnterior) => ({
      ...estadoAnterior,
      [chave]: valor
    }));
  }

  function atualizarSecaoHome(identificador: string, secaoAtualizada: ISecaoHome): void {
    if (tipoUsuario !== "admin") return;

    setSecoesHome((estadoAnterior) =>
      estadoAnterior.map((secao) =>
        secao.identificador === identificador ? secaoAtualizada : secao
      )
    );
  }

  function alternarModoEdicao(): void {
    if (tipoUsuario !== "admin") {
      return;
    }
    setModoEdicao((estadoAnterior) => !estadoAnterior);
  }

  function login(dados: ICredenciaisLogin): void {
    setTipoUsuario(dados.tipoUsuario);
    setUsuarioLogado(true);
  }

  function cadastrar(_dados: IFormularioCadastro): void {
    setTipoUsuario("normal");
    setUsuarioLogado(true);
  }

  function logout(): void {
    setUsuarioLogado(false);
    setTipoUsuario("normal");
    setModoEdicao(false);
  }

  const totalItensCarrinho = useMemo(
    () => itensCarrinho.reduce((acumulador, item) => acumulador + item.quantidade, 0),
    [itensCarrinho]
  );

  const subtotalCarrinho = useMemo(() => {
    return itensCarrinho.reduce((acumulador, item) => {
      const produto = produtos.find((p) => p.id === item.produtoId);
      if (!produto) {
        return acumulador;
      }

      return acumulador + produto.preco * item.quantidade;
    }, 0);
  }, [itensCarrinho, produtos]);

  const isAdmin = tipoUsuario === "admin";

  return (
    <LojaContext.Provider
      value={{
        produtos,
        depoimentos,
        textosSite,
        secoesHome,
        itensCarrinho,
        produtoSelecionado,
        usuarioLogado,
        tipoUsuario,
        modoEdicao,
        isAdmin,
        totalItensCarrinho,
        subtotalCarrinho,
        selecionarProduto,
        fecharDetalhesProduto,
        adicionarAoCarrinho,
        removerDoCarrinho,
        adicionarProduto,
        atualizarProduto,
        removerProduto,
        adicionarDepoimento,
        atualizarDepoimento,
        removerDepoimento,
        atualizarTextoSite,
        atualizarSecaoHome,
        alternarModoEdicao,
        login,
        cadastrar,
        logout
      }}
    >
      {children}
    </LojaContext.Provider>
  );
}

export function useLoja(): ILojaContextData {
  const contexto = useContext(LojaContext);
  if (!contexto) {
    throw new Error("useLoja deve ser usado dentro de LojaProvider.");
  }
  return contexto;
}
