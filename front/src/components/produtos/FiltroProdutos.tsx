import React from "react";

interface FiltroProdutosProps {
  filtroCategoria: string | null;
  setFiltroCategoria: React.Dispatch<React.SetStateAction<string | null>>;
  filtroPreco: string | null;
  setFiltroPreco: React.Dispatch<React.SetStateAction<string | null>>;
  filtroEstoque: boolean;
  setFiltroEstoque: React.Dispatch<React.SetStateAction<boolean>>;
}

export function FiltroProdutos({
  filtroCategoria,
  setFiltroCategoria,
  filtroPreco,
  setFiltroPreco,
  filtroEstoque,
  setFiltroEstoque
}: FiltroProdutosProps): JSX.Element {
  
  const handleToggleCategoria = (item: string) => {
    setFiltroCategoria((prev) => (prev === item ? null : item));
  };
  
  const handleTogglePreco = (item: string) => {
    setFiltroPreco((prev) => (prev === item ? null : item));
  };

  const gruposFiltros = [
    { 
      label: "Categoria", 
      items: ["Sala", "Jantar", "Quarto", "Living", "Escritório"],
      ativo: filtroCategoria,
      onToggle: handleToggleCategoria
    },
    { 
      label: "Faixa de preço", 
      items: ["Até R$ 2.000", "R$ 2.000 – 5.000", "R$ 5.000 – 10.000", "Acima de R$ 10.000"],
      ativo: filtroPreco,
      onToggle: handleTogglePreco
    }
  ];

  return (
    <aside className="self-start rounded-md border border-stone-200/70 bg-white/75 p-5 lg:sticky lg:top-24">
      {/* Header lateral */}
      <div className="border-t-2 border-gold-soft pt-5">
        <h2
          className="font-display font-medium text-charcoal"
          style={{ fontSize: "clamp(1.1rem,1.8vw,1.35rem)" }}
        >
          Refinar coleção
        </h2>
        <p className="mt-2 font-sans text-[0.8rem] font-light leading-[1.7] text-mist">
          Seleção pensada para uma experiência de visita em loja física.
        </p>
      </div>

      {/* Filtros */}
      <div className="mt-8 flex flex-col gap-6">
        {gruposFiltros.map((grupo) => (
          <div key={grupo.label}>
            <p className="mb-3 font-sans text-[0.65rem] font-medium uppercase tracking-[0.28em] text-charcoal/70">
              {grupo.label}
            </p>
            <ul className="flex flex-col gap-2">
              {grupo.items.map((item) => {
                const isActive = grupo.ativo === item;
                return (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => grupo.onToggle(item)}
                      className={`group flex w-full items-center gap-2.5 text-left font-sans text-[0.78rem] transition-colors duration-200 ${
                        isActive ? "text-charcoal font-medium" : "text-mist hover:text-charcoal"
                      }`}
                    >
                      <span 
                        className={`h-px transition-all duration-300 ${
                          isActive ? "w-5 bg-gold-soft" : "w-3 bg-stone-300 group-hover:w-5 group-hover:bg-gold-soft"
                        }`} 
                      />
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Disponibilidade */}
      <div className="mt-6 border-t border-stone-200 pt-5">
        <p className="mb-3 font-sans text-[0.65rem] font-medium uppercase tracking-[0.28em] text-charcoal/70">
          Disponibilidade
        </p>
        <button
          type="button"
          onClick={() => setFiltroEstoque((prev) => !prev)}
          className={`group flex items-center gap-2.5 font-sans text-[0.78rem] ${
            filtroEstoque ? "text-charcoal font-medium" : "text-mist hover:text-charcoal"
          }`}
        >
          <span 
            className={`h-px transition-all duration-300 ${
              filtroEstoque ? "w-5 bg-gold-soft" : "w-3 bg-stone-300 group-hover:w-5 group-hover:bg-gold-soft"
            }`} 
          />
          Em estoque
        </button>
      </div>
    </aside>
  );
}
