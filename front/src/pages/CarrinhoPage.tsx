import { motion } from "framer-motion";
import { ResumoCarrinho } from "../components/carrinho/ResumoCarrinho";
import { TabelaCarrinho } from "../components/carrinho/TabelaCarrinho";

const ease = { duration: 1.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] };

export function CarrinhoPage(): JSX.Element {
  return (
    <div>
      {/* Header */}
      <motion.div
        className="mb-10 border-b border-stone-200/60 pb-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={ease}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-gold-soft/60" />
          <p className="font-sans text-[0.68rem] uppercase tracking-[0.35em] text-mist">Carrinho</p>
        </div>
        <h1
          className="font-display font-medium leading-[1.08] text-charcoal"
          style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}
        >
          Minha seleção
        </h1>
      </motion.div>

      {/* Cards de produtos — full width breakout */}
      <div className="-mx-[6vw]">
        <div className="bg-white px-[6vw] py-10">
          <TabelaCarrinho />
        </div>
        <ResumoCarrinho />
      </div>
    </div>
  );
}
