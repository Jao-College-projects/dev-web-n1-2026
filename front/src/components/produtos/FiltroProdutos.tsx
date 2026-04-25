import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IProduto } from "../../types/IProduto";
import { EditableSectionField } from "../ui/EditableSectionField";

interface FiltroProdutosProps {
  produtos: IProduto[];
  filtroCategoria: string | null;
  setFiltroCategoria: React.Dispatch<React.SetStateAction<string | null>>;
  filtroPreco: string | null;
  setFiltroPreco: React.Dispatch<React.SetStateAction<string | null>>;
  filtroEstoque: boolean;
  setFiltroEstoque: React.Dispatch<React.SetStateAction<boolean>>;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

export function FiltroProdutos({
  produtos,
  filtroCategoria,
  setFiltroCategoria,
  filtroPreco,
  setFiltroPreco,
  filtroEstoque,
  setFiltroEstoque,
  viewMode,
  setViewMode
}: FiltroProdutosProps): JSX.Element {
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isPrecoOpen, setIsPrecoOpen] = useState(false);
  
  const categoriasUnicas = useMemo(() => {
    const cats = produtos.map(p => p.categoria);
    return Array.from(new Set(cats)).sort();
  }, [produtos]);

  const handleToggleCategoria = (item: string) => {
    setFiltroCategoria((prev) => (prev === item ? null : item));
    setIsCatOpen(false);
  };
  
  const handleTogglePreco = (item: string) => {
    setFiltroPreco((prev) => (prev === item ? null : item));
    setIsPrecoOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      {/* Grupos de Filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-5 md:gap-8">
        
        {/* Categoria Dropdown */}
        <div className="relative flex flex-col gap-2 md:gap-3">
          <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.25em] text-gold-soft/80">
            Categoria
          </p>
          <button
            onClick={() => {
              setIsCatOpen(!isCatOpen);
              setIsPrecoOpen(false);
            }}
            className="flex items-center justify-between gap-4 rounded-full border border-stone-200 bg-white px-4 md:px-5 py-2 md:py-2.5 font-sans text-[0.7rem] md:text-[0.72rem] uppercase tracking-wider text-charcoal transition-all hover:border-gold-soft"
          >
            <span className="truncate">{filtroCategoria || "Todas"}</span>
            <svg className={`flex-shrink-0 transition-transform duration-300 ${isCatOpen ? 'rotate-180' : ''}`} width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor">
              <path d="M2 4l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          
          <AnimatePresence>
            {isCatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 z-[60] mt-2 w-full min-w-[220px] rounded-xl border border-stone-200 bg-white p-2 shadow-2xl backdrop-blur-md"
              >
                <button
                  onClick={() => handleToggleCategoria("")}
                  className="w-full rounded-lg px-4 py-2 text-left font-sans text-[0.72rem] uppercase tracking-wide text-mist transition hover:bg-stone-50 hover:text-charcoal"
                >
                  Todas as categorias
                </button>
                {categoriasUnicas.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleToggleCategoria(cat)}
                    className={`w-full rounded-lg px-4 py-2 text-left font-sans text-[0.72rem] uppercase tracking-wide transition ${
                      filtroCategoria === cat ? "bg-charcoal text-white" : "text-mist hover:bg-stone-50 hover:text-charcoal"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Faixa de Preço Dropdown */}
        <div className="relative flex flex-col gap-2 md:gap-3">
          <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.25em] text-gold-soft/80">
            Faixa de Preço
          </p>
          <button
            onClick={() => {
              setIsPrecoOpen(!isPrecoOpen);
              setIsCatOpen(false);
            }}
            className="flex items-center justify-between gap-4 rounded-full border border-stone-200 bg-white px-4 md:px-5 py-2 md:py-2.5 font-sans text-[0.7rem] md:text-[0.72rem] uppercase tracking-wider text-charcoal transition-all hover:border-gold-soft"
          >
            <span className="truncate">{filtroPreco || "Qualquer"}</span>
            <svg className={`flex-shrink-0 transition-transform duration-300 ${isPrecoOpen ? 'rotate-180' : ''}`} width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor">
              <path d="M2 4l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          
          <AnimatePresence>
            {isPrecoOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 z-[60] mt-2 w-full min-w-[220px] rounded-xl border border-stone-200 bg-white p-2 shadow-2xl backdrop-blur-md"
              >
                <button
                  onClick={() => handleTogglePreco("")}
                  className="w-full rounded-lg px-4 py-2 text-left font-sans text-[0.72rem] uppercase tracking-wide text-mist transition hover:bg-stone-50 hover:text-charcoal"
                >
                  Todos os valores
                </button>
                {["Até R$ 2.000", "R$ 2.000 – 5.000", "R$ 5.000 – 10.000", "Acima de R$ 10.000"].map((p) => (
                  <button
                    key={p}
                    onClick={() => handleTogglePreco(p)}
                    className={`w-full rounded-lg px-4 py-2 text-left font-sans text-[0.72rem] uppercase tracking-wide transition ${
                      filtroPreco === p ? "bg-charcoal text-white" : "text-mist hover:bg-stone-50 hover:text-charcoal"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Disponibilidade */}
        <div className="flex flex-col gap-2 md:gap-3 sm:col-span-2 md:col-span-1">
          <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.25em] text-gold-soft/80">
            Disponibilidade
          </p>
          <button
            type="button"
            onClick={() => setFiltroEstoque((prev) => !prev)}
            className={`rounded-full px-4 md:px-5 py-2 md:py-2.5 font-sans text-[0.7rem] md:text-[0.72rem] uppercase tracking-wider transition-all duration-300 ${
              filtroEstoque 
                ? "bg-gold-soft text-stone-900 shadow-md font-bold" 
                : "bg-white text-mist border border-stone-200 hover:border-gold-soft hover:text-charcoal"
            }`}
          >
            Em estoque
          </button>
        </div>
      </div>

      {/* Alternador de Visualização */}
      <div className="flex flex-col gap-3 border-t border-stone-100 pt-8">
        <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.25em] text-mist/60">
          Visualização
        </p>
        <div className="flex items-center gap-2 border border-stone-200 bg-white/50 p-1 rounded-full w-fit">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-full transition-all ${viewMode === "grid" ? "bg-charcoal text-white shadow-md" : "text-mist hover:text-charcoal"}`}
            title="Visualização em Grade"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-full transition-all ${viewMode === "list" ? "bg-charcoal text-white shadow-md" : "text-mist hover:text-charcoal"}`}
            title="Visualização em Lista"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
