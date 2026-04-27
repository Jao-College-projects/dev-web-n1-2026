import { supabase } from "../lib/supabase";
import { IProduto } from "../types/IProduto";

export async function buscarProdutos(): Promise<IProduto[]> {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .order("id", { ascending: false });

  if (error || !data) return [];

  return data.map((p: any) => ({
    id: p.id,
    nome: p.nome,
    categoria: p.categoria,
    descricaoCurta: p.descricao_curta,
    descricaoLonga: p.descricao_longa,
    preco: Number(p.preco),
    estoque: p.estoque,
    imagem: p.imagem,
    destaqueCarrossel: p.destaque_carrossel,
  }));
}

export async function criarProduto(novoProduto: Omit<IProduto, "id">): Promise<IProduto | null> {
  const { data, error } = await supabase
    .from("produtos")
    .insert([{
      nome: novoProduto.nome,
      categoria: novoProduto.categoria,
      descricao_curta: novoProduto.descricaoCurta,
      descricao_longa: novoProduto.descricaoLonga,
      preco: novoProduto.preco,
      estoque: novoProduto.estoque,
      imagem: novoProduto.imagem,
      destaque_carrossel: novoProduto.destaqueCarrossel || false,
    }])
    .select("*")
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    nome: data.nome,
    categoria: data.categoria,
    descricaoCurta: data.descricao_curta,
    descricaoLonga: data.descricao_longa,
    preco: Number(data.preco),
    estoque: data.estoque,
    imagem: data.imagem,
    destaqueCarrossel: data.destaque_carrossel,
  };
}

export async function editarProduto(produto: IProduto): Promise<boolean> {
  const { error } = await supabase
    .from("produtos")
    .update({
      nome: produto.nome,
      categoria: produto.categoria,
      descricao_curta: produto.descricaoCurta,
      descricao_longa: produto.descricaoLonga,
      preco: produto.preco,
      estoque: produto.estoque,
      imagem: produto.imagem,
      destaque_carrossel: produto.destaqueCarrossel || false,
    })
    .eq("id", produto.id);

  return !error;
}

export async function excluirProduto(produtoId: number): Promise<boolean> {
  const { error } = await supabase.from("produtos").delete().eq("id", produtoId);
  return !error;
}
