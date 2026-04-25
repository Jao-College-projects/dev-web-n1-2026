import { useState } from "react";
import { Link } from "react-router-dom";
import { useLoja } from "../../store/LojaContext";
import { IProduto } from "../../types/IProduto";
import { ContextMenuProduto } from "./ContextMenuProduto";

interface ProdutoCardProps {
  produto: IProduto;
  onEdit?: (produto: IProduto) => void;
  viewMode?: "grid" | "list";
}

export function ProdutoCard({ produto, onEdit, viewMode = "grid" }: ProdutoCardProps): JSX.Element {
  const { adicionarAoCarrinho, removerProduto, isAdmin, modoEdicao } = useLoja();
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);

  const handleAddCarrinho = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    adicionarAoCarrinho(produto.id);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    if (isAdmin && modoEdicao) {
      e.preventDefault();
      e.stopPropagation();
      setContextMenu({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div onContextMenu={handleContextMenu} className="relative">
      <Link
        to={`/produtos/${produto.id}`}
        className={`group relative flex ${viewMode === 'grid' ? 'flex-col' : 'flex-row items-center'} bg-white border ${modoEdicao ? 'border-gold-soft/30 hover:border-gold-soft/60' : 'border-stone-200/60'} overflow-hidden transition-all duration-500 ease-editorial hover:-translate-y-1 hover:shadow-[0_20px_48px_-12px_rgba(28,25,23,0.14)] no-underline`}
      >
        {/* Imagem */}
        <div className={`relative overflow-hidden ${viewMode === 'grid' ? 'aspect-[4/5]' : 'h-32 w-32 sm:h-44 sm:w-44 flex-shrink-0'}`}>
          <img
            src={produto.imagem}
            alt={produto.nome}
            className="h-full w-full object-cover transition duration-[1200ms] ease-editorial group-hover:scale-[1.04]"
            loading="lazy"
          />

          {/* Overlay hover com ações */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent opacity-0 transition duration-700 group-hover:opacity-100" />

          {/* Categoria pill */}
          <div className="absolute left-4 top-4">
            <span className="bg-cream/92 px-3 py-1 font-sans text-[0.58rem] uppercase tracking-[0.22em] text-charcoal/80 backdrop-blur-sm">
              {produto.categoria}
            </span>
          </div>

          {/* Ações no hover (Somente no Grid) */}
          {viewMode === 'grid' && (
            <div className="absolute bottom-5 left-5 right-5 flex gap-2 translate-y-0 opacity-100 transition duration-[700ms] ease-editorial sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
              <button
                type="button"
                onClick={handleAddCarrinho}
                disabled={produto.estoque <= 0}
                className={`w-full py-2.5 font-sans uppercase tracking-[0.22em] text-charcoal transition shadow-md text-[0.6rem] ${
                  produto.estoque <= 0 
                    ? "bg-stone-300 cursor-not-allowed opacity-50" 
                    : "bg-gold/90 hover:bg-gold-soft cursor-pointer"
                }`}
              >
                {produto.estoque <= 0 ? 'Indisponível' : '+ Carrinho'}
              </button>
            </div>
          )}

          {/* Status Esgotado Overlay */}
          {produto.estoque <= 0 && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-stone-900/40 backdrop-blur-[2px]">
              <span className="bg-white px-4 py-2 font-sans text-[0.7rem] font-bold uppercase tracking-[0.3em] text-charcoal shadow-xl">
                Esgotado
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className={`flex flex-1 flex-col gap-3 ${viewMode === 'grid' ? 'p-5' : 'px-6 py-4'}`}>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3
                className="font-display font-medium leading-tight text-charcoal"
                style={{ fontSize: viewMode === 'grid' ? "clamp(1.05rem,1.6vw,1.3rem)" : "clamp(1.1rem,1.8vw,1.5rem)" }}
              >
                {produto.nome}
              </h3>
              <p className={`mt-1.5 font-sans font-light leading-[1.65] text-mist ${viewMode === 'grid' ? 'text-[0.82rem] line-clamp-2' : 'text-[0.9rem] line-clamp-3 max-w-xl'}`}>
                {produto.descricaoCurta}
              </p>
            </div>

            {viewMode === 'list' && (
              <p className="font-price text-[1.4rem] font-medium text-charcoal whitespace-nowrap">
                R$ {produto.preco.toLocaleString("pt-BR")}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="border border-stone-200 bg-stone-50 px-2 py-1 font-sans text-[0.58rem] uppercase tracking-[0.18em] text-mist/70">
              Entrega cuidada
            </span>
            <span className="border border-gold-soft/45 bg-gold-soft/10 px-2 py-1 font-sans text-[0.58rem] uppercase tracking-[0.18em] text-charcoal/75">
              Curadoria
            </span>
          </div>

          <div className={`flex items-center justify-between border-t border-stone-100 pt-3 ${viewMode === 'list' ? 'mt-auto' : ''}`}>
            {viewMode === 'grid' && (
              <p className="font-price text-[1.15rem] font-medium text-charcoal">
                R$ {produto.preco.toLocaleString("pt-BR")}
              </p>
            )}
            
            <div className="flex items-center gap-6">
              {viewMode === 'list' && (
                <button
                  type="button"
                  onClick={handleAddCarrinho}
                  disabled={produto.estoque <= 0}
                  className={`font-sans text-[0.6rem] uppercase tracking-[0.22em] transition-colors ${
                    produto.estoque <= 0 
                      ? "text-stone-300 cursor-not-allowed" 
                      : "text-gold-dark hover:text-gold-soft cursor-pointer"
                  }`}
                >
                  {produto.estoque <= 0 ? 'Indisponível' : '+ Carrinho'}
                </button>
              )}
              <span className="group/link inline-flex items-center gap-1.5 font-sans text-[0.6rem] uppercase tracking-[0.22em] text-mist transition-colors duration-300 group-hover:text-charcoal cursor-pointer">
                Ver página
                <svg className="stroke-current transition-transform duration-300 group-hover:translate-x-0.5" width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>

      {contextMenu && (
        <ContextMenuProduto
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onEdit={() => onEdit?.(produto)}
          onDelete={() => removerProduto(produto.id)}
        />
      )}
    </div>
  );
}
