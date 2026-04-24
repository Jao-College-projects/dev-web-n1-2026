import { IProduto } from "../../types/IProduto";
import { ProdutoCard } from "./ProdutoCard";

interface ProdutoGridProps {
  produtos: IProduto[];
}

export function ProdutoGrid({ produtos }: ProdutoGridProps): JSX.Element {
  if (!produtos.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-4 h-px w-12 bg-gold-soft/55" />
        <p className="font-display text-[1.4rem] font-light text-mist">Nenhum produto encontrado.</p>
        <p className="mt-2 font-sans text-[0.85rem] text-mist/60">Ajuste os filtros para ver mais opções.</p>
      </div>
    );
  }

  return (
    <section aria-label="Catálogo de produtos">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {produtos.map((produto) => (
          <ProdutoCard key={produto.id} produto={produto} />
        ))}
      </div>
      <p className="mt-8 font-sans text-[0.72rem] uppercase tracking-[0.22em] text-mist/50 text-right">
        {produtos.length} {produtos.length === 1 ? "peça" : "peças"}
      </p>
    </section>
  );
}
