import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { IMAGES } from "./assets";
import { easeEditorial } from "./motionPresets";
import { useLoja } from "../../store/LojaContext";

export function LuarManifesto(): JSX.Element {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.1"] });

  const { secoesHome } = useLoja();
  const manifestoSection = secoesHome.find(s => s.identificador === 'manifesto');
  const conteudo = manifestoSection?.conteudo || {};

  const lines = [
    conteudo.linha1 || "Cada peça nasce do equilíbrio entre matéria, luz e tempo — um gesto silencioso que acolhe o cotidiano sem apressar o olhar.",
    conteudo.linha2 || "Na Luar Móveis, cada peça é apresentada como uma experiência: o toque da madeira, o desenho da costura, a calma de um ambiente que respira."
  ].filter(Boolean);

  const yBack = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -40]);
  const yMid = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -20]);
  const yFront = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -58]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-cream px-6 py-28 sm:px-10 md:py-40 lg:px-16"
    >
      {/* Giant decorative quote mark */}
      <div
        className="pointer-events-none absolute left-4 top-6 select-none font-display font-light leading-none text-parchment/60 sm:left-8 lg:left-12"
        style={{ fontSize: "clamp(10rem,20vw,18rem)" }}
        aria-hidden
      >
        "
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col gap-16 lg:flex-row lg:items-center lg:gap-14 xl:gap-28">

        {/* ── Text side ────────────────────────────────────── */}
        <div className="relative z-10 max-w-xl lg:w-[50%] lg:max-w-none">

          {/* Brand stamp */}
          <motion.div
            className="mb-8 inline-flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ ...easeEditorial, duration: 0.8 }}
          >
            <div className="h-px w-8 bg-gold-soft/65" />
            <span className="font-display text-[0.95rem] font-light italic tracking-[0.06em] text-gold-soft/80">
              Boutique · São Paulo
            </span>
          </motion.div>

          {/* Section label */}
          <motion.div
            className="mb-6 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ ...easeEditorial, duration: 0.9, delay: 0.08 }}
          >
            <span className="font-sans text-[0.82rem] uppercase tracking-[0.32em] text-mist">
              Manifesto
            </span>
          </motion.div>

          {/* Main heading — bigger & more dramatic */}
          <motion.h2
            className="font-display font-medium leading-[1.08] tracking-[0.01em] text-charcoal"
            style={{ fontSize: "clamp(2.4rem,5.5vw,4.2rem)" }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={easeEditorial}
          >
            <span dangerouslySetInnerHTML={{ __html: conteudo.titulo || "Criamos móveis como quem compõe<br/><em class=\"font-light italic\">um espaço de silêncio.</em>" }} />
          </motion.h2>

          {/* Animated gold accent line */}
          <motion.div
            className="mt-10 h-[1.5px] w-20 origin-left bg-gold-soft/60"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ ...easeEditorial, delay: 0.3 }}
          />

          {/* Paragraphs */}
          <div className="mt-10 space-y-7">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                className="font-sans font-light leading-[1.95] text-ink/85"
                style={{ fontSize: "clamp(1rem,1.3vw,1.1rem)" }}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ ...easeEditorial, delay: 0.1 + i * 0.12 }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Pull quote */}
          <motion.blockquote
            className="mt-14 border-l-[2px] border-gold-soft/55 pl-6"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ ...easeEditorial, delay: 0.28 }}
          >
            <p
              className="font-display font-light italic leading-[1.65] text-charcoal/70"
              style={{ fontSize: "clamp(1.05rem,1.5vw,1.3rem)" }}
            >
              {conteudo.citacao || `"Móveis que envelhecem como a madeira — com graça e sem pressa."`}
            </p>
            <p className="mt-3 font-sans text-[0.75rem] uppercase tracking-[0.28em] text-mist/60">
              {conteudo.autor || "— Fundador, Luar Móveis"}
            </p>
          </motion.blockquote>
        </div>

        {/* ── Visual side — parallax layered images ────────── */}
        <div className="relative mx-auto min-h-[480px] w-full max-w-xl flex-1 lg:mx-0 lg:max-w-none lg:min-h-[600px]">
          <motion.div
            style={{ y: yBack }}
            className="absolute -right-2 top-4 h-[50%] w-[56%] overflow-hidden rounded-[2px] shadow-[0_32px_72px_-20px_rgba(28,25,23,0.30)] sm:right-0 sm:top-8 sm:w-[50%]"
          >
            <img
              src={conteudo.imagem_back || IMAGES.manifestoBack}
              alt=""
              className="h-full w-full scale-[1.08] object-cover blur-[2.5px] brightness-[0.88] saturate-[0.82]"
            />
          </motion.div>

          <motion.div
            style={{ y: yMid }}
            className="absolute left-0 top-[26%] z-[2] h-[44%] w-[48%] overflow-hidden rounded-[3px] shadow-[0_36px_82px_-18px_rgba(28,25,23,0.38)] sm:left-4 sm:w-[46%]"
          >
            <img
              src={conteudo.imagem_mid || IMAGES.manifestoMid}
              alt=""
              className="h-full w-full object-cover brightness-[0.94]"
            />
          </motion.div>

          <motion.div
            style={{ y: yFront }}
            className="absolute bottom-2 right-0 z-[3] h-[48%] w-[60%] overflow-hidden rounded-[4px] shadow-[0_44px_100px_-24px_rgba(28,25,23,0.42)] sm:bottom-6 sm:right-4 sm:w-[58%]"
          >
            <img
              src={conteudo.imagem_front || IMAGES.manifestoFront}
              alt=""
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Floating badge */}
          <motion.div
            className="absolute -bottom-3 left-1/2 z-[4] -translate-x-1/2 border border-gold-soft/30 bg-cream/94 px-6 py-3 shadow-lg backdrop-blur-sm"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ ...easeEditorial, delay: 0.55 }}
          >
            <p className="whitespace-nowrap font-display text-[0.82rem] font-light italic tracking-[0.06em] text-charcoal/60">
              Desde 2013 · São Paulo
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
