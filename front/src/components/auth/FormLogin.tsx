import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoja } from "../../store/LojaContext";
import { TipoUsuario } from "../../types/IProduto";

export function FormLogin(): JSX.Element {
  const { login } = useLoja();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>("normal");

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    login({ email, senha, tipoUsuario });
    navigate("/");
  }

  return (
    <div className="w-full">
      {/* Brand */}
      <div className="mb-8 text-center">
        <p className="font-display text-[1.6rem] font-light italic tracking-[0.02em] text-charcoal">
          Luar Móveis
        </p>
        <div className="mx-auto mt-3 h-px w-10 bg-gold-soft/55" />
      </div>

      <h1 className="mb-7 font-display text-[1.6rem] font-medium text-charcoal">
        Entrar na conta
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="mb-2 block font-sans text-[0.65rem] font-medium uppercase tracking-[0.25em] text-charcoal/65">
            E-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-stone-300 bg-white px-4 py-3 font-sans text-[0.9rem] text-charcoal placeholder:text-mist/40 outline-none transition focus:border-charcoal focus:shadow-[0_0_0_3px_rgba(28,25,23,0.08)]"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label className="mb-2 block font-sans text-[0.65rem] font-medium uppercase tracking-[0.25em] text-charcoal/65">
            Senha
          </label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full border border-stone-300 bg-white px-4 py-3 font-sans text-[0.9rem] text-charcoal outline-none transition focus:border-charcoal focus:shadow-[0_0_0_3px_rgba(28,25,23,0.08)]"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="mb-2 block font-sans text-[0.65rem] font-medium uppercase tracking-[0.25em] text-charcoal/65">
            Tipo de acesso
          </label>
          <select
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value as TipoUsuario)}
            className="w-full border border-stone-300 bg-white px-4 py-3 font-sans text-[0.9rem] text-charcoal outline-none transition focus:border-charcoal focus:shadow-[0_0_0_3px_rgba(28,25,23,0.08)]"
          >
            <option value="normal">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button
          type="submit"
          className="group relative mt-2 w-full overflow-hidden border border-charcoal bg-charcoal py-4 font-sans text-[0.72rem] font-medium uppercase tracking-[0.3em] text-cream transition-all duration-700 hover:bg-charcoal/88"
        >
          <span className="relative z-10">Entrar</span>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/8 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>

        <p className="text-center font-sans text-[0.75rem] text-mist/70">
          Não tem conta?{" "}
          <Link to="/cadastro" className="text-charcoal underline underline-offset-2 hover:text-gold-soft transition">
            Criar conta
          </Link>
        </p>
      </form>
    </div>
  );
}
