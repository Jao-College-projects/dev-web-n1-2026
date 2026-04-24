import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IMAGES } from "./assets";
import { easeEditorial } from "./motionPresets";
import { useLoja } from "../../store/LojaContext";

const piecesFallback = [
  {
    name: "Sofá Aurora",
    verse: "Linhas baixas, abraço amplo — o lugar onde a tarde se demora.",
    image: IMAGES.piece1,
    num: "I",
  },
  {
    name: "Poltrona Eira",
    verse: "Um único gesto de madeira sustenta o descanso.",
    image: IMAGES.piece2,
    num: "II",
  },
  {
    name: "Mesa Lume",
    verse: "Madeira escura e um plano sereno para reunir.",
    image: IMAGES.piece3,
    num: "III",
  },
  {
    name: "Estante Horizonte",
    verse: "Prateleiras como horas — silenciosas, ordenadas, profundas.",
    image: IMAGES.piece4,
    num: "IV",
  },
];

function PieceBlock({
  name,
  verse,
  image,
  num,
  className,
  sizesClass,
}: {
  name: string;
  verse: string;
  image: string;
  num: string;
  className?: string;
  sizesClass?: string;
}): JSX.Element {
  return (
    <motion.figure
      className={`group relative overflow-hidden ${className ?? ""}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={easeEditorial}
    >
      {/* Top gold line reveal */}
      <div className="absolute inset-x-0 top-0 z-10 h-[2px] origin-left scale-x-0 bg-gold-soft/75 transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />

      <div className={`relative w-full overflow-hidden ${sizesClass ?? "min-h-[280px]"}`}>
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          loading="lazy"
        />

        {/* Gradient overlay — always slightly present, stronger on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/10 to-transparent opacity-60 transition duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100" />

        {/* Faint roman numeral */}
        <div className="absolute left-5 top-5" aria-hidden>
          <span
            className="select-none font-display font-light leading-none text-cream/12 transition duration-700 group-hover:text-cream/28"
            style={{ fontSize: "clamp(2rem,3vw,3rem)" }}
          >
            {num}
          </span>
        </div>

        {/* Caption — always show name, verse reveals on hover */}
        <figcaption className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10">
          {/* Name always visible */}
          <div className="mb-0 h-px w-8 bg-gold-soft/60 transition duration-700 group-hover:w-14" />
          <p
            className="mt-3 font-display font-medium text-cream"
            style={{ fontSize: "clamp(1.4rem,2.2vw,2rem)", textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}
          >
            {name}
          </p>

          {/* Verse + link reveal on hover */}
          <div className="mt-3 translate-y-4 opacity-0 transition duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
            <p
              className="max-w-[280px] font-sans font-light leading-[1.78] text-stone-200/85"
              style={{ fontSize: "clamp(0.85rem,1.1vw,0.95rem)", textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
            >
              {verse}
            </p>
            <Link
              to="/produtos"
              className="mt-5 inline-flex items-center gap-2.5 border-b border-gold-soft/55 pb-0.5 font-sans text-[0.72rem] uppercase tracking-[0.28em] text-gold-soft transition-all duration-500 hover:text-cream hover:border-cream"
            >
              Ver peça
              <svg className="stroke-current transition-transform duration-500 hover:translate-x-1" width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </figcaption>
      </div>
    </motion.figure>
  );
}

export function LuarCurated(): JSX.Element {
  const { secoesHome } = useLoja();
  const curadoriaSecao = secoesHome.find(s => s.identificador === 'curadoria');
  const conteudo = curadoriaSecao?.conteudo || {};

  const lista = conteudo.pieces?.length === 4 ? conteudo.pieces : piecesFallback;

  // We assign fallback images directly here mapped over lista, just to be safe
  const fallbackLista = lista.map((p: any, i: number) => ({
    ...p,
    image: p.image || piecesFallback[i].image
  }));

  const [featured, a, b, wide] = fallbackLista;

  return (
    <section id="curadoria" className="bg-cream px-6 py-28 sm:px-10 md:py-40 lg:px-16">
      <div className="mx-auto max-w-[1500px]">

        {/* ── Section header ───────────────────────────────── */}
        <motion.div
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={easeEditorial}
        >
          <div>
            {/* Brand stamp */}
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-gold-soft/60" />
              <p className="font-display text-[0.92rem] font-light italic tracking-[0.06em] text-gold-soft/80">
                Boutique · São Paulo
              </p>
            </div>

            <div className="mb-5 flex items-center gap-3">
              <span className="font-sans text-[0.82rem] uppercase tracking-[0.32em] text-mist">
                Curadoria
              </span>
            </div>

            <h2
              className="max-w-lg font-display font-medium leading-[1.1] text-charcoal"
              style={{ fontSize: "clamp(2.2rem,4.8vw,3.8rem)" }}
            >
              <span dangerouslySetInnerHTML={{ __html: (conteudo.titulo_linha1 || "Peças escolhidas,") + "<br/><em class=\"font-light italic\">" + (conteudo.titulo_linha2 || "não exibidas em série.") + "</em>" }} />
            </h2>
          </div>

          {/* Desktop CTA */}
          <Link
            to="/produtos"
            className="group hidden items-center gap-3 border-b border-gold-soft/40 pb-1 font-sans text-[0.78rem] uppercase tracking-[0.28em] text-mist transition-all duration-500 hover:border-gold-soft hover:text-charcoal md:inline-flex"
          >
            Ver coleção completa
            <svg
              className="stroke-current transition-transform duration-500 ease-editorial group-hover:translate-x-1"
              width="13" height="13" viewBox="0 0 14 14" fill="none"
            >
              <path d="M2 7h10M7 2l5 5-5 5" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        {/* ── Gold divider ─────────────────────────────────── */}
        <motion.div
          className="mt-12 h-px w-full origin-left bg-gradient-to-r from-gold-soft/30 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ ...easeEditorial, delay: 0.2 }}
        />

        {/* ── Main gallery grid ─────────────────────────────── */}
        <div className="mt-16 flex flex-col gap-4 lg:mt-20 lg:flex-row lg:items-start lg:gap-5">
          <PieceBlock
            {...featured}
            className="w-full lg:w-[55%] lg:max-w-[760px]"
            sizesClass="min-h-[min(72vh,640px)] lg:min-h-[720px]"
          />
          <div className="flex w-full flex-col gap-4 lg:w-[45%]">
            <PieceBlock {...a} className="w-full" sizesClass="min-h-[280px] md:min-h-[340px]" />
            <PieceBlock {...b} className="w-full" sizesClass="min-h-[280px] md:min-h-[340px]" />
          </div>
        </div>

        {/* ── Wide bottom piece ─────────────────────────────── */}
        <div className="mt-4">
          <PieceBlock
            {...wide}
            className="w-full"
            sizesClass="min-h-[240px] md:min-h-[320px] lg:min-h-[400px]"
          />
        </div>

        {/* Mobile CTA */}
        <motion.div
          className="mt-12 flex justify-center md:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={easeEditorial}
        >
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 border-b border-gold-soft/45 pb-1 font-sans text-[0.78rem] uppercase tracking-[0.28em] text-mist"
          >
            Ver coleção completa
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
