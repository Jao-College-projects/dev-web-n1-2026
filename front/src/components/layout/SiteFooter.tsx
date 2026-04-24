import { Link } from "react-router-dom";

export function SiteFooter(): JSX.Element {
  return (
    <footer className="mt-16 border-t border-stone-200/60 bg-charcoal px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="font-display text-[1.3rem] font-light italic text-cream/85">Luar Móveis</p>
          <p className="mt-1 font-sans text-[0.68rem] text-stone-500">São Paulo · Atendimento sob consulta</p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3 font-sans text-[0.65rem] uppercase tracking-[0.22em] text-stone-500">
          <Link to="/produtos" className="hover:text-stone-300 transition">Coleção</Link>
          <Link to="/login" className="hover:text-stone-300 transition">Conta</Link>
        </nav>
      </div>
      <div className="mx-auto mt-8 max-w-[1400px] border-t border-stone-800/60 pt-6">
        <p className="font-sans text-[0.6rem] uppercase tracking-[0.18em] text-stone-600/50">
          © {new Date().getFullYear()} Luar Móveis · Disciplina Prof. Fernando
        </p>
      </div>
    </footer>
  );
}
