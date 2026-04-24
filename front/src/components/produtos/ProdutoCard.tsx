import { Link } from "react-router-dom";
import { useLoja } from "../../store/LojaContext";
import { IProduto } from "../../types/IProduto";

interface ProdutoCardProps {
  produto: IProduto;
}

export function ProdutoCard({ produto }: ProdutoCardProps): JSX.Element {
  const { adicionarAoCarrinho } = useLoja();

  const handleAddCarrinho = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    adicionarAoCarrinho(produto.id);
  };

  return (
    <Link
      to={`/produtos/${produto.id}`}
      className="group relative flex flex-col bg-white border border-stone-200/60 overflow-hidden transition-all duration-500 ease-editorial hover:-translate-y-1 hover:shadow-[0_20px_48px_-12px_rgba(28,25,23,0.14)] no-underline"
    >
      {/* Imagem */}
      <div className="relative overflow-hidden aspect-[4/5]">
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

        {/* Ações no hover */}
        <div className="absolute bottom-5 left-5 right-5 flex gap-2 translate-y-0 opacity-100 transition duration-[700ms] ease-editorial sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={handleAddCarrinho}
            className="w-full bg-gold/90 py-2.5 font-sans text-[0.6rem] uppercase tracking-[0.22em] text-charcoal transition hover:bg-gold-soft cursor-pointer shadow-md"
          >
            + Carrinho
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3 p-5">
        <div>
          <h3
            className="font-display font-medium leading-tight text-charcoal"
            style={{ fontSize: "clamp(1.05rem,1.6vw,1.3rem)" }}
          >
            {produto.nome}
          </h3>
          <p className="mt-1.5 font-sans text-[0.82rem] font-light leading-[1.65] text-mist line-clamp-2">
            {produto.descricaoCurta}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="border border-stone-200 bg-stone-50 px-2 py-1 font-sans text-[0.58rem] uppercase tracking-[0.18em] text-mist/70">
            Entrega cuidada
          </span>
          <span className="border border-gold-soft/45 bg-gold-soft/10 px-2 py-1 font-sans text-[0.58rem] uppercase tracking-[0.18em] text-charcoal/75">
            Curadoria
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-stone-100 pt-3">
          <p className="font-display text-[1.15rem] font-medium text-charcoal">
            R$ {produto.preco.toLocaleString("pt-BR")}
          </p>
          <span className="group/link inline-flex items-center gap-1.5 font-sans text-[0.6rem] uppercase tracking-[0.22em] text-mist transition-colors duration-300 group-hover:text-charcoal cursor-pointer">
            Ver página
            <svg className="stroke-current transition-transform duration-300 group-hover:translate-x-0.5" width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
