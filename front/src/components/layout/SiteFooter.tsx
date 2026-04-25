import { Link } from "react-router-dom";

export function SiteFooter(): JSX.Element {
  return (
    <footer className="mt-24 border-t border-stone-200/10 bg-charcoal px-6 py-20 sm:px-10 lg:px-16 text-cream">
      <div className="mx-auto max-w-[1400px]">
        
        {/* Top Section: Brand & Tagline */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-stone-800/40 pb-16">
          <div className="md:col-span-5">
            <h2 className="font-display text-[1.8rem] font-light italic tracking-tight text-white mb-6">
              Luar Móveis
            </h2>
            <p className="font-sans text-[0.85rem] leading-relaxed text-stone-400 max-w-sm">
              Curadoria boutique de móveis para ambientes clássicos, elegantes e atemporais. 
              <br /><span className="text-stone-500">Goiânia, Goiás.</span>
            </p>
            <div className="mt-10 flex items-center gap-6">
              <span className="font-sans text-[0.62rem] uppercase tracking-[0.3em] text-gold-soft/60">Desde 2013</span>
              <Link to="/produtos" className="group flex items-center gap-3">
                <span className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-white group-hover:text-gold-soft transition-colors">Navegar</span>
                <div className="h-px w-8 bg-stone-700 group-hover:w-12 group-hover:bg-gold-soft transition-all duration-500" />
              </Link>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-3">
            <h3 className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-gold-soft mb-8">Menu</h3>
            <nav className="flex flex-col gap-4 font-sans text-[0.75rem] text-stone-400 uppercase tracking-widest">
              <Link to="/produtos" className="hover:text-white transition-colors">Coleção</Link>
              <Link to="/#ambientes" className="hover:text-white transition-colors">Ambientes</Link>
              <Link to="/auth" className="hover:text-white transition-colors">Conta</Link>
            </nav>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4">
            <h3 className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-gold-soft mb-8">Contato</h3>
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-sans text-[0.75rem] text-white uppercase tracking-widest">Goiânia · GO</p>
                <p className="font-sans text-[0.7rem] text-stone-500 uppercase tracking-wider mt-1">Atendimento sob consulta</p>
              </div>
              <a href="mailto:contato@luarmoveis.com.br" className="font-sans text-[0.75rem] text-stone-400 hover:text-white transition-colors underline underline-offset-8 decoration-stone-800">
                contato@luarmoveis.com.br
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Academic Info */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="flex flex-col gap-2">
            <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-stone-600">
              © {new Date().getFullYear()} LUAR MÓVEIS · TODOS OS DIREITOS RESERVADOS
            </p>
          </div>

          {/* Informações Obrigatórias - Prof. Fernando (Tag Address Obrigatória) */}
          <address className="not-italic text-left md:text-right">
            <p className="font-sans text-[0.58rem] text-stone-600 uppercase tracking-[0.2em] leading-loose">
              Desenvolvido por: <span className="text-stone-400">João Pedro</span><br />
              Disciplina: Desenvolvimento Web · <span className="text-stone-400">Prof. Fernando</span><br />
              Data: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </address>
        </div>
      </div>
    </footer>
  );
}
