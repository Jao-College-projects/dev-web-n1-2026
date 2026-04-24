import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
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
  adicionarProduto: (novoProduto: Omit<IProduto, "id">) => Promise<void>;
  atualizarProduto: (produtoAtualizado: IProduto) => Promise<void>;
  removerProduto: (produtoId: number) => Promise<void>;
  adicionarDepoimento: (novoDepoimento: Omit<IDepoimento, "id">) => Promise<void>;
  atualizarDepoimento: (depoimentoAtualizado: IDepoimento) => Promise<void>;
  removerDepoimento: (depoimentoId: number) => Promise<void>;
  atualizarTextoSite: (chave: keyof ITextosSite, valor: string) => void;
  atualizarSecaoHome: (identificador: string, dados: ISecaoHome) => Promise<void>;
  alternarModoEdicao: () => void;
  login: (dados: ICredenciaisLogin) => void;
  cadastrar: (dados: IFormularioCadastro) => void;
  logout: () => void;
}

const LojaContext = createContext<ILojaContextData | undefined>(undefined);

export function LojaProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [depoimentos, setDepoimentos] = useState<IDepoimento[]>([]);
  const [secoesHome, setSecoesHome] = useState<ISecaoHome[]>([]);

  const [textosSite, setTextosSite] = useState<ITextosSite>({
    tituloLoja: "Luar Moveis",
    legendaLoja: "Curadoria boutique de moveis para ambientes classicos, elegantes e atemporais.",
    secaoApresentacaoTitulo: "Uma jornada de design e conforto",
    secaoApresentacaoTexto: "Na Luar Moveis, cada peca e apresentada como uma experiencia...",
    secaoProdutosTitulo: "Colecao exclusiva de moveis",
    secaoProdutosTexto: "Explore pecas selecionadas...",
    secaoExperienciasTitulo: "Experiencias de clientes"
  });

  const [itensCarrinho, setItensCarrinho] = useState<IItemCarrinho[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<IProduto | null>(null);

  // Fake Auth para não quebrar a UI antes do Supabase Auth total:
  const [usuarioLogado, setUsuarioLogado] = useState<boolean>(false);
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>("normal");
  const [modoEdicao, setModoEdicao] = useState<boolean>(false);

  // FETCH SUPABASE DATA
  useEffect(() => {
    async function loadData() {
      const { data: prodData } = await supabase.from('produtos').select('*').order('id', { ascending: false });
      if (prodData) {
        setProdutos(prodData.map((p: any) => ({
          id: p.id,
          nome: p.nome,
          categoria: p.categoria,
          descricaoCurta: p.descricao_curta,
          descricaoLonga: p.descricao_longa,
          preco: Number(p.preco),
          estoque: p.estoque,
          imagem: p.imagem,
          destaqueCarrossel: p.destaque_carrossel
        })));
      }

      const { data: depoData } = await supabase.from('depoimentos').select('*').order('id', { ascending: false });
      if (depoData) setDepoimentos(depoData);

      const { data: homeData } = await supabase.from('secoes_home').select('*').eq('ativo', true);
      if (homeData) {
        setSecoesHome(homeData.map((s: any) => ({
          identificador: s.identificador,
          tituloSecao: s.titulo_secao,
          ordem: s.ordem,
          ativo: s.ativo,
          conteudo: s.conteudo
        })));
      }
    }
    loadData();
  }, []);

  function selecionarProduto(produto: IProduto): void {
    setProdutoSelecionado(produto);
  }

  function fecharDetalhesProduto(): void {
    setProdutoSelecionado(null);
  }

  function adicionarAoCarrinho(produtoId: number): void {
    setItensCarrinho((prev) => {
      const itemExistente = prev.find((item) => item.produtoId === produtoId);
      if (itemExistente) {
        return prev.map((item) =>
          item.produtoId === produtoId ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prev, { produtoId, quantidade: 1 }];
    });
  }

  function removerDoCarrinho(produtoId: number): void {
    setItensCarrinho((prev) =>
      prev
        .map((item) => item.produtoId === produtoId ? { ...item, quantidade: Math.max(item.quantidade - 1, 0) } : item)
        .filter((item) => item.quantidade > 0)
    );
  }

  async function adicionarProduto(novoProduto: Omit<IProduto, "id">) {
    const { data, error } = await supabase.from('produtos').insert([{
      nome: novoProduto.nome,
      categoria: novoProduto.categoria,
      descricao_curta: novoProduto.descricaoCurta,
      descricao_longa: novoProduto.descricaoLonga,
      preco: novoProduto.preco,
      estoque: novoProduto.estoque,
      imagem: novoProduto.imagem,
      destaque_carrossel: novoProduto.destaqueCarrossel || false
    }]).select('*').single();

    if (!error && data) {
      setProdutos(prev => [{
        id: data.id,
        nome: data.nome,
        categoria: data.categoria,
        descricaoCurta: data.descricao_curta,
        descricaoLonga: data.descricao_longa,
        preco: Number(data.preco),
        estoque: data.estoque,
        imagem: data.imagem,
        destaqueCarrossel: data.destaque_carrossel
      }, ...prev]);
    }
  }

  async function atualizarProduto(produtoAtualizado: IProduto) {
    const { error } = await supabase.from('produtos').update({
      nome: produtoAtualizado.nome,
      categoria: produtoAtualizado.categoria,
      descricao_curta: produtoAtualizado.descricaoCurta,
      descricao_longa: produtoAtualizado.descricaoLonga,
      preco: produtoAtualizado.preco,
      estoque: produtoAtualizado.estoque,
      imagem: produtoAtualizado.imagem,
      destaque_carrossel: produtoAtualizado.destaqueCarrossel || false
    }).eq('id', produtoAtualizado.id);

    if (!error) {
      setProdutos(prev => prev.map(p => p.id === produtoAtualizado.id ? produtoAtualizado : p));
    }
  }

  async function removerProduto(produtoId: number) {
    const { error } = await supabase.from('produtos').delete().eq('id', produtoId);
    if (!error) {
      setProdutos(prev => prev.filter(p => p.id !== produtoId));
    }
  }

  async function adicionarDepoimento(novo: Omit<IDepoimento, "id">) {
    const { data, error } = await supabase.from('depoimentos').insert([novo]).select('*').single();
    if (!error && data) {
      setDepoimentos(prev => [data, ...prev]);
    }
  }

  async function atualizarDepoimento(atualizado: IDepoimento) {
    const { error } = await supabase.from('depoimentos').update(atualizado).eq('id', atualizado.id);
    if (!error) {
      setDepoimentos(prev => prev.map(d => d.id === atualizado.id ? atualizado : d));
    }
  }

  async function removerDepoimento(id: number) {
    const { error } = await supabase.from('depoimentos').delete().eq('id', id);
    if (!error) {
      setDepoimentos(prev => prev.filter(d => d.id !== id));
    }
  }

  async function atualizarSecaoHome(identificador: string, novaSecao: ISecaoHome) {
    const { error } = await supabase.from('secoes_home').update({
      titulo_secao: novaSecao.tituloSecao,
      conteudo: novaSecao.conteudo
    }).eq('identificador', identificador);

    if (!error) {
      setSecoesHome(prev => prev.map(s => s.identificador === identificador ? novaSecao : s));
    }
  }

  function atualizarTextoSite(chave: keyof ITextosSite, valor: string): void {
    if (tipoUsuario !== "admin") return;
    setTextosSite(prev => ({ ...prev, [chave]: valor }));
  }

  function alternarModoEdicao(): void {
    if (tipoUsuario !== "admin") return;
    setModoEdicao(prev => !prev);
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
    () => itensCarrinho.reduce((acc, item) => acc + item.quantidade, 0),
    [itensCarrinho]
  );

  const subtotalCarrinho = useMemo(() => {
    return itensCarrinho.reduce((acc, item) => {
      const p = produtos.find((x) => x.id === item.produtoId);
      return p ? acc + p.preco * item.quantidade : acc;
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
