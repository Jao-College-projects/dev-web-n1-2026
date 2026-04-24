import { motion } from "framer-motion";
import { easeEditorial } from "./motionPresets";

const marqueeItems = [
  "Luar Móveis",
  "·",
  "São Paulo",
  "·",
  "Curadoria Boutique",
  "·",
  "Desde 2013",
  "·",
  "Móveis Atemporais",
  "·",
  "Artesanato Brasileiro",
  "·",
  "12 Anos de Excelência",
  "·",
];

const metrics = [
  { value: "12", unit: "anos", label: "de curadoria artesanal", detail: "Moldando espaços com intencionalidade e silêncio." },
  { value: "3K", unit: "+",    label: "peças entregues",        detail: "Em residências autorais por todo o Brasil." },
  { value: "100",unit: "%",    label: "madeira certificada",    detail: "Reflorestamento e cadeia produtiva ética." },
  { value: "SP", unit: "·BR",  label: "ateliê exclusivo",       detail: "Showroom em São Paulo, atendimento sob consulta." },
];

export function LuarBrandNumbers(): JSX.Element {
  const repeated = [...marqueeItems, ...marqueeItems];

  return (
    <section className="overflow-hidden bg-charcoal">

      {/* ── Marquee ─────────────────────────────────────── */}
      <div className="border-b border-stone-800/60 py-5 overflow-hidden">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: "marquee 36s linear infinite" }}
        >
          {repeated.map((item, i) => (
            <span
              key={i}
              className={`flex-shrink-0 font-sans text-[0.82rem] uppercase tracking-[0.28em] ${
                item === "·" ? "text-gold-soft" : "text-stone-300"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Métricas ─────────────────────────────────────── */}
      <div className="px-6 pb-0 pt-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">

          {/* Label da seção */}
          <motion.div
            className="mb-16 flex items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={easeEditorial}
          >
            <div className="h-px w-8 bg-gold-soft/70" />
            <span className="font-sans text-[0.82rem] uppercase tracking-[0.32em] text-stone-300">
              Em números
            </span>
          </motion.div>

          {/* Grid 4 colunas */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4 lg:gap-x-12">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                className="group flex flex-col gap-0"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ ...easeEditorial, delay: i * 0.12 }}
              >
                {/* Valor + unidade */}
                <div className="flex items-end gap-2 leading-none">
                  <span
                    className="font-display font-light text-cream"
                    style={{ fontSize: "clamp(3.8rem,7vw,6rem)", lineHeight: 1 }}
                  >
                    {m.value}
                  </span>
                  <span
                    className="mb-1 font-display font-medium text-gold-soft"
                    style={{ fontSize: "clamp(1.8rem,3.2vw,2.6rem)", lineHeight: 1 }}
                  >
                    {m.unit}
                  </span>
                </div>

                {/* Linha dourada animada */}
                <div className="mt-4 h-px w-10 origin-left bg-gold-soft/60 transition-all duration-700 ease-editorial group-hover:w-20 group-hover:bg-gold-soft" />

                {/* Label */}
                <p className="mt-4 font-sans text-[0.9rem] font-medium uppercase tracking-[0.16em] text-stone-200">
                  {m.label}
                </p>

                {/* Detalhe */}
                <p className="mt-2 font-sans text-[0.88rem] font-light leading-[1.72] text-stone-400">
                  {m.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divisor ──────────────────────────────────────── */}
      <div className="mx-auto mt-24 max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-stone-700/60 to-transparent" />
      </div>

      {/* ── Citação central ──────────────────────────────── */}
      <div className="px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ ...easeEditorial, delay: 0.1 }}
          >
            {/* Aspas decorativas */}
            <span
              className="select-none font-display font-light leading-none text-gold-soft/20"
              style={{ fontSize: "6rem", lineHeight: 0.8 }}
              aria-hidden
            >
              "
            </span>

            <p
              className="mt-4 max-w-4xl font-display font-medium leading-[1.22] tracking-[0.01em] text-cream"
              style={{ fontSize: "clamp(1.7rem,3.8vw,3rem)" }}
            >
              Não fazemos móveis. Criamos os lugares onde a vida acontece com graça.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="h-px w-12 bg-gold-soft/40" />
              <p className="font-sans text-[0.82rem] uppercase tracking-[0.3em] text-stone-400">
                Fundador · Luar Móveis
              </p>
              <div className="h-px w-12 bg-gold-soft/40" />
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
