import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FiltroProdutos } from "../components/produtos/FiltroProdutos";
import { ProdutoGrid } from "../components/produtos/ProdutoGrid";
import { useLoja } from "../store/LojaContext";

const easeEd = { duration: 1.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

export function ProdutosPage(): JSX.Element {
  const { produtos } = useLoja();

  // Local state for filters
  const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null);
  const [filtroPreco, setFiltroPreco] = useState<string | null>(null);
  const [filtroEstoque, setFiltroEstoque] = useState<boolean>(false);

  // Derive filtered products
  const produtosFiltrados = useMemo(() => {
    return produtos.filter(produto => {
      // 1. Categoria
      if (filtroCategoria && produto.categoria !== filtroCategoria) {
        return false;
      }

      // 2. Preço
      if (filtroPreco) {
        if (filtroPreco === "Até R$ 2.000" && produto.preco > 2000) return false;
        if (filtroPreco === "R$ 2.000 – 5.000" && (produto.preco < 2000 || produto.preco > 5000)) return false;
        if (filtroPreco === "R$ 5.000 – 10.000" && (produto.preco < 5000 || produto.preco > 10000)) return false;
        if (filtroPreco === "Acima de R$ 10.000" && produto.preco <= 10000) return false;
      }

      // 3. Estoque
      if (filtroEstoque && produto.estoque <= 0) {
        return false;
      }

      return true;
    });
  }, [produtos, filtroCategoria, filtroPreco, filtroEstoque]);

  const categoriasUnicas = new Set(produtosFiltrados.map((produto) => produto.categoria)).size;
  const ticketMedio = produtosFiltrados.length
    ? produtosFiltrados.reduce((soma, produto) => soma + produto.preco, 0) / produtosFiltrados.length
    : 0;

  return (
    <div>
      {/* ── Cabeçalho editorial ─────────────────────────── */}
      <motion.div
        className="mb-12 border-b border-stone-200/60 pb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={easeEd}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-gold-soft/60" />
          <p className="font-sans text-[0.68rem] uppercase tracking-[0.35em] text-mist">
            Coleção Inverno 2026
          </p>
        </div>
        <h1
          className="font-display font-medium leading-[1.08] text-charcoal"
          style={{ fontSize: "clamp(2.2rem,5vw,4rem)" }}
        >
          Catálogo de Móveis
        </h1>
        <p className="mt-4 max-w-xl font-sans text-[0.95rem] font-light leading-[1.8] text-mist">
          Curadoria em composição de ambientes com linguagem autoral e atemporal.
          Cada peça selecionada por critérios de forma, função e permanência.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <span className="border border-stone-200/80 bg-white px-3 py-1.5 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-mist/80">
            {produtosFiltrados.length} {produtosFiltrados.length === 1 ? "peça" : "peças"}
          </span>
          <span className="border border-stone-200/80 bg-white px-3 py-1.5 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-mist/80">
            {categoriasUnicas} categorias
          </span>
          <span className="border border-stone-200/80 bg-white px-3 py-1.5 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-mist/80">
            Ticket médio R$ {ticketMedio.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
          </span>
        </div>
      </motion.div>

      {/* ── Grid: sidebar + produtos ────────────────────── */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr] xl:grid-cols-[260px_1fr]">
        <FiltroProdutos
          filtroCategoria={filtroCategoria}
          setFiltroCategoria={setFiltroCategoria}
          filtroPreco={filtroPreco}
          setFiltroPreco={setFiltroPreco}
          filtroEstoque={filtroEstoque}
          setFiltroEstoque={setFiltroEstoque}
        />
        <div className="rounded-md border border-stone-200/70 bg-white/70 p-4 sm:p-6">
          <ProdutoGrid produtos={produtosFiltrados} />
        </div>
      </div>
    </div>
  );
}
