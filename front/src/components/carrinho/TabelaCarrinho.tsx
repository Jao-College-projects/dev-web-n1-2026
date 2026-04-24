import { useLoja } from "../../store/LojaContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function TabelaCarrinho(): JSX.Element {
  const { itensCarrinho, produtos, adicionarAoCarrinho, removerDoCarrinho } = useLoja();

  if (!itensCarrinho.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-6 h-px w-12 bg-gold-soft/50" />
        <p className="font-display text-[1.8rem] font-light text-charcoal/50">Seu carrinho está vazio.</p>
        <p className="mt-3 font-sans text-[0.85rem] text-mist">Explore nossa coleção e encontre a peça ideal.</p>
        <Link
          to="/produtos"
          className="mt-8 inline-flex items-center gap-2 border-b border-gold-soft/50 pb-0.5 font-sans text-[0.7rem] uppercase tracking-[0.26em] text-mist hover:text-charcoal hover:border-gold-soft transition"
        >
          Ver coleção
          <svg className="stroke-current" width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M6 2l4 4-4 4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <section aria-label="Itens do carrinho">
      {/* Col header */}
      <div className="mb-6 flex items-center justify-between">
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-mist/60">
          {itensCarrinho.length} {itensCarrinho.length === 1 ? "peça selecionada" : "peças selecionadas"}
        </p>
        <Link
          to="/produtos"
          className="inline-flex items-center gap-2 font-sans text-[0.65rem] uppercase tracking-[0.22em] text-mist hover:text-charcoal transition"
        >
          <svg className="stroke-current rotate-180" width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M6 2l4 4-4 4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Continuar comprando
        </Link>
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {itensCarrinho.map((item, i) => {
          const produto = produtos.find((p) => p.id === item.produtoId);
          if (!produto) return null;

          return (
            <motion.article
              key={item.produtoId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
              className="group relative flex flex-col border border-stone-200/80 bg-white shadow-[0_2px_12px_-4px_rgba(28,25,23,0.08)] transition duration-500 hover:shadow-[0_8px_28px_-8px_rgba(28,25,23,0.14)]"
            >
              {/* Linha topo dourada no hover */}
              <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gold-soft/70 transition duration-500 group-hover:scale-x-100" />

              {/* Imagem */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>

              {/* Conteúdo */}
              <div className="flex flex-1 flex-col p-5">
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.28em] text-mist/70">
                  {produto.categoria}
                </p>
                <h3
                  className="mt-1.5 font-display font-medium leading-tight text-charcoal"
                  style={{ fontSize: "clamp(1rem,1.4vw,1.15rem)" }}
                >
                  {produto.nome}
                </h3>

                <div className="mt-3 h-px bg-stone-100" />

                {/* Preço unitário */}
                <p className="mt-3 font-sans text-[0.72rem] text-mist/60">
                  R$ {produto.preco.toLocaleString("pt-BR")} / un.
                </p>

                {/* Controles qty + subtotal */}
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center border border-stone-300 font-sans text-[0.8rem] text-charcoal transition hover:border-charcoal hover:bg-stone-50"
                      onClick={() => removerDoCarrinho(produto.id)}
                      aria-label="Diminuir quantidade"
                    >
                      −
                    </button>
                    <span className="w-5 text-center font-sans text-[0.85rem] font-medium text-charcoal">
                      {item.quantidade}
                    </span>
                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center border border-stone-300 font-sans text-[0.8rem] text-charcoal transition hover:border-charcoal hover:bg-stone-50"
                      onClick={() => adicionarAoCarrinho(produto.id)}
                      aria-label="Aumentar quantidade"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-display text-[1.1rem] font-medium text-charcoal">
                    R$ {(produto.preco * item.quantidade).toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
