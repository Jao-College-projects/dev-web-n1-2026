import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { IMAGES } from "./assets";
import { easeEditorial, staggerChildren, fadeUp } from "./motionPresets";
import { useLoja } from "../../store/LojaContext";

export function LuarHero(): JSX.Element {
  const reduced = useReducedMotion();
  const { produtos, secoesHome } = useLoja();

  const heroSection = secoesHome.find(s => s.identificador === 'hero');
  const conteudo = heroSection?.conteudo || {};

  const produtosDestaque = produtos.filter(p => p.destaqueCarrossel);
  const produtosExibir = produtosDestaque.length > 0 ? produtosDestaque : produtos;
  const strip = [...produtosExibir, ...produtosExibir, ...produtosExibir, ...produtosExibir, ...produtosExibir];

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
      {/* Background Ken Burns */}
      <motion.div
        className="pointer-events-none absolute inset-0 origin-[60%_40%]"
        initial={{ scale: 1.04 }}
        animate={reduced ? { scale: 1.04 } : { scale: 1.1 }}
        transition={
          reduced
            ? {}
            : { duration: 55, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
        }
      >
        <img
          src={conteudo.imagem_url || IMAGES.hero}
          alt=""
          className="h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
      </motion.div>

      {/* Gradientes cinematográficos */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/96 via-stone-950/75 to-stone-950/28" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/88 via-transparent to-stone-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_65%_at_8%_85%,rgba(184,149,108,0.10),transparent_55%)]" />
      </div>

      {/* Régua vertical esquerda */}
      <motion.div
        className="absolute left-7 top-0 hidden h-full flex-col items-center lg:flex"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...easeEditorial, delay: 1.8 }}
        aria-hidden
      >
        <div className="mt-36 flex flex-col items-center gap-5">
          <div className="h-24 w-px bg-gradient-to-b from-transparent to-cream/30" />
          <p className="origin-center -rotate-90 whitespace-nowrap font-sans text-[0.62rem] uppercase tracking-[0.45em] text-cream/30">
            — I N V E R N O · 2 0 2 6 —
          </p>
          <div className="h-24 w-px bg-gradient-to-t from-transparent to-cream/30" />
        </div>
      </motion.div>

      {/* ── Layout principal: conteúdo + carrossel ──────── */}
      <div className="relative z-10 flex h-full flex-col">

        {/* Conteúdo — ocupa o espaço restante, centralizado verticalmente */}
        <div className="flex flex-1 flex-col justify-center pl-10 pr-8 sm:pl-16 md:pl-[12%] md:pr-16 lg:pl-[15%]">
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="max-w-[680px]"
          >
            {/* Kicker */}
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <div className="h-px w-10 bg-gold-soft/60" />
              <span className="font-display text-[1rem] font-light italic tracking-[0.08em] text-gold-soft/90">
                {conteudo.kicker || "Boutique · São Paulo"}
              </span>
            </motion.div>

            {/* Título */}
            <motion.h1 variants={fadeUp} className="mt-6 leading-none">
              <span
                className="block font-display font-light italic text-cream"
                style={{ fontSize: "clamp(4.5rem,11vw,9.5rem)", textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
              >
                {conteudo.titulo_linha1 || "Luar"}
              </span>
              <span
                className="block font-display font-medium tracking-[0.06em] text-cream"
                style={{ fontSize: "clamp(3.5rem,9vw,7.5rem)", textShadow: "0 2px 16px rgba(0,0,0,0.4)" }}
              >
                {conteudo.titulo_linha2 || "Móveis"}
              </span>
            </motion.h1>

            {/* Separador */}
            <motion.div variants={fadeUp} className="mt-7 flex items-center gap-3">
              <div className="h-px w-12 bg-cream/38" />
              <div className="h-px w-4 bg-cream/18" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-lg font-serif italic font-light leading-[1.72] text-cream"
              style={{ fontSize: "clamp(1.1rem,1.9vw,1.45rem)" }}
            >
              {conteudo.tagline || "A quiet expression of timeless living."}
            </motion.p>

            {/* Descrição */}
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-[420px] font-sans font-light leading-[1.9] text-cream/90"
              style={{ fontSize: "clamp(0.95rem,1.3vw,1.08rem)" }}
            >
              {conteudo.descricao || "Curadoria boutique de móveis para ambientes clássicos, elegantes e atemporais."}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-6">
              <Link
                to="/produtos"
                className="group relative inline-flex min-h-[52px] items-center overflow-hidden border border-cream/75 bg-cream/12 px-10 py-3.5 font-sans text-[0.82rem] font-medium uppercase tracking-[0.26em] text-cream backdrop-blur-sm transition-colors duration-700 ease-editorial hover:bg-cream/22"
              >
                <span className="relative z-10 whitespace-nowrap">Explorar coleção</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-editorial group-hover:translate-x-full" />
              </Link>
              <a
                href="#ambientes"
                className="group inline-flex min-h-[52px] items-center gap-2 font-sans text-[0.82rem] font-medium uppercase tracking-[0.26em] text-cream"
              >
                <span className="border-b border-cream/45 pb-0.5 transition-all duration-500 group-hover:border-cream">
                  Ver ambientes
                </span>
                <svg
                  className="mt-0.5 stroke-current transition-transform duration-500 ease-editorial group-hover:translate-x-1"
                  width="13" height="13" viewBox="0 0 12 12" fill="none"
                >
                  <path d="M2 6h8M6 2l4 4-4 4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Carrossel — faixa branca de ponta a ponta ──── */}
        {strip.length > 0 && (
          <motion.div
            className="w-full border-t border-white/10 bg-white/95 backdrop-blur-md"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...easeEditorial, delay: 1.4 }}
          >
            {/* Itens deslizantes */}
            <div className="overflow-hidden px-4 py-4 sm:px-6">
              <div
                className="flex w-max gap-4"
                style={{ animation: "marquee 28s linear infinite" }}
              >
                {strip.map((p, i) => (
                  <Link
                    key={i}
                    to={`/produtos/${p.id}`}
                    tabIndex={-1}
                    className="group relative flex-shrink-0 overflow-hidden rounded-md border border-stone-200/80 bg-white no-underline shadow-[0_6px_18px_-10px_rgba(28,25,23,0.28)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-12px_rgba(28,25,23,0.35)] cursor-pointer"
                    style={{ width: "clamp(150px, 13vw, 200px)" }}
                  >
                    {/* Linha dourada topo no hover */}
                    <div className="absolute inset-x-0 top-0 z-10 h-[2px] origin-left scale-x-0 bg-gold-soft/70 transition duration-500 group-hover:scale-x-100" />

                    <div className="overflow-hidden" style={{ height: "clamp(110px, 9.5vw, 145px)" }}>
                      <img
                        src={p.imagem}
                        alt={p.nome}
                        className="h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                        loading="lazy"
                      />
                    </div>
                    <div className="px-4 py-3">
                      <p className="truncate font-sans text-[0.66rem] uppercase tracking-[0.12em] text-charcoal/70 leading-tight">
                        {p.nome}
                      </p>
                      <div className="mt-2 h-px w-8 bg-gold-soft/35 transition-all duration-500 group-hover:w-12 group-hover:bg-gold-soft/55" />
                      <p className="mt-1.5 font-display text-[0.94rem] font-medium text-gold-soft no-underline">
                        R$ {p.preco.toLocaleString("pt-BR")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Número decorativo */}
      <motion.div
        className="absolute right-10 top-1/2 -translate-y-1/2 hidden flex-col items-end md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...easeEditorial, delay: 2.1 }}
        aria-hidden
      >
        <span className="select-none font-display font-light leading-none text-cream/[0.07] tabular-nums" style={{ fontSize: "clamp(4rem,8vw,6rem)" }}>01</span>
        <span className="font-sans text-[0.6rem] uppercase tracking-[0.4em] text-cream/20">Inverno</span>
      </motion.div>
    </section>
  );
}
