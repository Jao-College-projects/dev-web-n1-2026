import { useNavigate } from "react-router-dom";
import { useLoja } from "../../store/LojaContext";

export function ResumoCarrinho(): JSX.Element {
  const { subtotalCarrinho, totalItensCarrinho, itensCarrinho } = useLoja();
  const navigate = useNavigate();

  if (!itensCarrinho.length) return <></>;

  return (
    <div className="border-t border-stone-200/70 bg-stone-50/80 px-[6vw] py-8">
      {/* Trust badges */}
      <div className="mb-6 flex flex-wrap items-center gap-6">
        {["Pagamento seguro", "Entrega cuidadosa", "Garantia 2 anos"].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <div className="h-px w-4 bg-gold-soft/60" />
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-mist/60">{item}</span>
          </div>
        ))}
      </div>

      {/* Linha dourada */}
      <div className="mb-6 h-px w-full bg-gradient-to-r from-gold-soft/40 via-gold-soft/20 to-transparent" />

      {/* Barra de resumo */}
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        {/* Valores */}
        <div className="flex flex-wrap items-center gap-8">
          <div>
            <p className="font-sans text-[0.62rem] uppercase tracking-[0.24em] text-mist/60">Itens</p>
            <p className="mt-0.5 font-sans text-[0.88rem] text-charcoal">
              {totalItensCarrinho} {totalItensCarrinho === 1 ? "peça" : "peças"}
            </p>
          </div>
          <div>
            <p className="font-sans text-[0.62rem] uppercase tracking-[0.24em] text-mist/60">Entrega</p>
            <p className="mt-0.5 font-sans text-[0.88rem] text-green-700">Grátis</p>
          </div>
          <div>
            <p className="font-sans text-[0.62rem] uppercase tracking-[0.24em] text-mist/60">Total</p>
            <p
              className="mt-0.5 font-display font-medium text-charcoal"
              style={{ fontSize: "clamp(1.5rem,2.5vw,2rem)" }}
            >
              R$ {subtotalCarrinho.toLocaleString("pt-BR")}
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => navigate("/finalizar")}
          className="group relative overflow-hidden border border-charcoal bg-charcoal px-12 py-4 font-sans text-[0.72rem] font-medium uppercase tracking-[0.3em] text-cream transition-all duration-700 hover:bg-charcoal/88"
        >
          <span className="relative z-10">Finalizar compra</span>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/8 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>
      </div>
    </div>
  );
}
