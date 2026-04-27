import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  ICredenciaisLogin,
  IFormularioCadastro,
  IItemCarrinho,
  IProduto,
  ITextosSite,
  ISecaoHome,
  IPedidoDados,
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
  isLoading: boolean;
  login: (dados: ICredenciaisLogin) => Promise<void>;
  cadastrar: (dados: IFormularioCadastro) => Promise<void>;
  logout: () => Promise<void>;
  limparCarrinho: () => void;
  criarPedido: (dados: IPedidoDados) => Promise<void>;
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

  const [usuarioLogado, setUsuarioLogado] = useState<boolean>(false);
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>("normal");
  const [modoEdicao, setModoEdicao] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Prevents fetchUserType from being called twice during initial auth setup
  const authInitialized = useRef(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUsuarioLogado(!!session);
      if (session?.user && !authInitialized.current) {
        authInitialized.current = true;
        fetchUserType(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuarioLogado(!!session);
      if (session?.user) {
        authInitialized.current = true;
        fetchUserType(session.user.id);
      } else {
        authInitialized.current = false;
        setTipoUsuario("normal");
      }
    });

    // OPT-1: Parallelized queries — was sequential awaits, now runs all 3 concurrently
    async function loadData() {
      setIsLoading(true);
      try {
        const [prodResult, depoResult, homeResult] = await Promise.all([
          supabase.from('produtos').select('*').order('id', { ascending: false }),
          supabase.from('depoimentos').select('*').order('id', { ascending: false }),
          supabase.from('secoes_home').select('*').eq('ativo', true),
        ]);

        const imageUrls: string[] = [];

        if (prodResult.data) {
          setProdutos(prodResult.data.map((p: any) => ({
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
          prodResult.data.forEach((p: any) => { if (p.imagem) imageUrls.push(p.imagem); });
        }

        if (depoResult.data) {
          setDepoimentos(depoResult.data);
          depoResult.data.forEach((d: any) => { if (d.imagem) imageUrls.push(d.imagem); });
        }

        if (homeResult.data) {
          setSecoesHome(homeResult.data.map((s: any) => ({
            identificador: s.identificador,
            tituloSecao: s.titulo_secao,
            ordem: s.ordem,
            ativo: s.ativo,
            conteudo: s.conteudo
          })));
          homeResult.data.forEach((s: any) => {
            const c = s.conteudo ?? {};
            if (c.imagem_url) imageUrls.push(c.imagem_url);
            if (c.imagem_back) imageUrls.push(c.imagem_back);
            if (c.imagem_mid) imageUrls.push(c.imagem_mid);
            if (c.imagem_front) imageUrls.push(c.imagem_front);
            (c.ambientes ?? []).forEach((a: any) => { if (a.image) imageUrls.push(a.image); });
            (c.pieces ?? []).forEach((p: any) => { if (p.image) imageUrls.push(p.image); });
          });
        }

        // Preload all images into browser cache while user reads the hero.
        // When lazy-loaded <img> elements scroll into view, they resolve instantly from cache.
        imageUrls.forEach(url => { const img = new Image(); img.src = url; });
      } finally {
        setIsLoading(false);
      }
    }
    loadData();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchUserType(userId: string) {
    const { data } = await supabase.from('usuarios').select('tipo_usuario').eq('id', userId).maybeSingle();
    if (data && data.tipo_usuario === 'admin') {
      setTipoUsuario('admin');
    } else {
      setTipoUsuario('normal');
    }
  }

  // OPT-3: All context functions wrapped with useCallback to prevent recreation on every render

  const selecionarProduto = useCallback((produto: IProduto): void => {
    setProdutoSelecionado(produto);
  }, []);

  const fecharDetalhesProduto = useCallback((): void => {
    setProdutoSelecionado(null);
  }, []);

  const adicionarAoCarrinho = useCallback((produtoId: number): void => {
    setItensCarrinho((prev) => {
      const itemExistente = prev.find((item) => item.produtoId === produtoId);
      if (itemExistente) {
        return prev.map((item) =>
          item.produtoId === produtoId ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prev, { produtoId, quantidade: 1 }];
    });
  }, []);

  const removerDoCarrinho = useCallback((produtoId: number): void => {
    setItensCarrinho((prev) =>
      prev
        .map((item) => item.produtoId === produtoId ? { ...item, quantidade: Math.max(item.quantidade - 1, 0) } : item)
        .filter((item) => item.quantidade > 0)
    );
  }, []);

  const adicionarProduto = useCallback(async (novoProduto: Omit<IProduto, "id">) => {
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
  }, []);

  const atualizarProduto = useCallback(async (produtoAtualizado: IProduto) => {
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
  }, []);

  const removerProduto = useCallback(async (produtoId: number) => {
    const { error } = await supabase.from('produtos').delete().eq('id', produtoId);
    if (!error) {
      setProdutos(prev => prev.filter(p => p.id !== produtoId));
    }
  }, []);

  const adicionarDepoimento = useCallback(async (novo: Omit<IDepoimento, "id">) => {
    const { data, error } = await supabase.from('depoimentos').insert([novo]).select('*').single();
    if (!error && data) {
      setDepoimentos(prev => [data, ...prev]);
    }
  }, []);

  const atualizarDepoimento = useCallback(async (atualizado: IDepoimento) => {
    const { error } = await supabase.from('depoimentos').update(atualizado).eq('id', atualizado.id);
    if (!error) {
      setDepoimentos(prev => prev.map(d => d.id === atualizado.id ? atualizado : d));
    }
  }, []);

  const removerDepoimento = useCallback(async (id: number) => {
    const { error } = await supabase.from('depoimentos').delete().eq('id', id);
    if (!error) {
      setDepoimentos(prev => prev.filter(d => d.id !== id));
    }
  }, []);

  const atualizarTextoSite = useCallback((chave: keyof ITextosSite, valor: string): void => {
    if (tipoUsuario !== "admin") return;
    setTextosSite(prev => ({ ...prev, [chave]: valor }));
  }, [tipoUsuario]);

  const atualizarSecaoHome = useCallback(async (identificador: string, novaSecao: ISecaoHome) => {
    const { error } = await supabase.from('secoes_home').upsert({
      identificador: identificador,
      titulo_secao: novaSecao.tituloSecao,
      conteudo: novaSecao.conteudo,
      ativo: novaSecao.ativo,
      ordem: novaSecao.ordem
    }, { onConflict: 'identificador' });

    if (!error) {
      setSecoesHome(prev => {
        const index = prev.findIndex(s => s.identificador === identificador);
        if (index >= 0) return prev.map((s, i) => i === index ? novaSecao : s);
        return [...prev, novaSecao];
      });
    }
  }, []);

  const alternarModoEdicao = useCallback((): void => {
    if (tipoUsuario !== "admin") return;
    setModoEdicao(prev => !prev);
  }, [tipoUsuario]);

  const login = useCallback(async (dados: ICredenciaisLogin): Promise<void> => {
    const { error } = await supabase.auth.signInWithPassword({
      email: dados.email,
      password: dados.senha,
    });
    if (error) throw error;
  }, []);

  const cadastrar = useCallback(async (dados: IFormularioCadastro): Promise<void> => {
    const { data, error } = await supabase.auth.signUp({
      email: dados.email,
      password: dados.senha,
      options: {
        data: {
          nomeCompleto: dados.nomeCompleto
        }
      }
    });
    if (error) throw error;

    if (data.user) {
      const { error: insertError } = await supabase.from('usuarios').insert([
        { id: data.user.id, nome_completo: dados.nomeCompleto, email: dados.email, tipo_usuario: 'normal' }
      ]);
      if (insertError) {
        console.warn("Aviso: Nao foi possivel inserir na tabela public.usuarios (Verifique RLS).", insertError);
      }
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    await supabase.auth.signOut();
    setUsuarioLogado(false);
    setTipoUsuario("normal");
    setModoEdicao(false);
  }, []);

  const limparCarrinho = useCallback((): void => {
    setItensCarrinho([]);
  }, []);

  const criarPedido = useCallback(async (dados: IPedidoDados): Promise<void> => {
    const { data: { session } } = await supabase.auth.getSession();

    const { data: pedido, error: pedidoError } = await supabase
      .from('pedidos')
      .insert([{
        usuario_id: session?.user?.id ?? null,
        status: 'carrinho',
        total: itensCarrinho.reduce((acc, item) => {
          const p = produtos.find(x => x.id === item.produtoId);
          return p ? acc + p.preco * item.quantidade : acc;
        }, 0),
        dados_entrega: dados,
      }])
      .select('id')
      .single();

    if (pedidoError || !pedido) throw new Error(pedidoError?.message ?? 'Erro ao criar pedido');

    const itensPedido = itensCarrinho.map(item => {
      const produto = produtos.find(p => p.id === item.produtoId);
      return {
        pedido_id: pedido.id,
        produto_id: item.produtoId,
        quantidade: item.quantidade,
        preco_unitario: produto?.preco ?? 0,
      };
    });

    const { error: itensError } = await supabase.from('itens_pedido').insert(itensPedido);
    if (itensError) throw new Error(itensError.message);

    // Diminui o estoque de cada produto comprado
    await Promise.all(
      itensCarrinho.map(async (item) => {
        const produto = produtos.find(p => p.id === item.produtoId);
        if (!produto) return;
        const novoEstoque = Math.max(0, produto.estoque - item.quantidade);
        await supabase.from('produtos').update({ estoque: novoEstoque }).eq('id', item.produtoId);
        setProdutos(prev => prev.map(p => p.id === item.produtoId ? { ...p, estoque: novoEstoque } : p));
      })
    );

    setItensCarrinho([]);
  }, [itensCarrinho, produtos]);

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

  // OPT-5: Memoize the entire context value to prevent cascade re-renders
  const contextValue = useMemo<ILojaContextData>(() => ({
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
    isLoading,
    login,
    cadastrar,
    logout,
    limparCarrinho,
    criarPedido,
  }), [
    produtos, depoimentos, textosSite, secoesHome, itensCarrinho,
    produtoSelecionado, usuarioLogado, tipoUsuario, modoEdicao, isAdmin,
    totalItensCarrinho, subtotalCarrinho, selecionarProduto, fecharDetalhesProduto,
    adicionarAoCarrinho, removerDoCarrinho, adicionarProduto, atualizarProduto,
    removerProduto, adicionarDepoimento, atualizarDepoimento, removerDepoimento,
    atualizarTextoSite, atualizarSecaoHome, alternarModoEdicao, isLoading, login, cadastrar, logout,
    limparCarrinho, criarPedido,
  ]);

  return (
    <LojaContext.Provider value={contextValue}>
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
