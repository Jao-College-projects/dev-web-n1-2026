import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoja } from "../store/LojaContext";

export function AuthPage(): JSX.Element {
  const { login, cadastrar } = useLoja();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setMensagemSucesso("");
    setLoading(true);

    try {
      if (isLogin) {
        await login({ email, senha, tipoUsuario: "normal" });
        navigate("/");
      } else {
        await cadastrar({ email, senha, nomeCompleto });
        setMensagemSucesso("Cadastro realizado com sucesso! Verifique seu email se necessário, ou tente fazer login.");
        setIsLogin(true); // Muda para a tela de login
      }
    } catch (err: any) {
      setErro(err.message || "Ocorreu um erro durante a autenticação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-12">
      <div className="w-full max-w-[440px] border border-stone-200/60 bg-white p-10 shadow-[0_8px_40px_-12px_rgba(28,25,23,0.10)]">
        <div className="border-t-2 border-gold-soft mb-8" />

        <div className="w-full">
          {/* Brand */}
          <div className="mb-8 text-center">
            <p className="font-display text-[1.6rem] font-light italic tracking-[0.02em] text-charcoal">
              Luar Móveis
            </p>
            <div className="mx-auto mt-3 h-px w-10 bg-gold-soft/55" />
          </div>

          <h1 className="mb-7 font-display text-[1.6rem] font-medium text-charcoal">
            {isLogin ? "Entrar na conta" : "Criar conta"}
          </h1>

          {erro && (
            <div className="mb-6 border border-red-200 bg-red-50 p-3 text-center text-sm text-red-600">
              {erro}
            </div>
          )}

          {mensagemSucesso && (
            <div className="mb-6 border border-green-200 bg-green-50 p-3 text-center text-sm text-green-700">
              {mensagemSucesso}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {!isLogin && (
              <div>
                <label className="mb-2 block font-sans text-[0.65rem] font-medium uppercase tracking-[0.25em] text-charcoal/65">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={nomeCompleto}
                  onChange={(e) => setNomeCompleto(e.target.value)}
                  required={!isLogin}
                  className="w-full border border-stone-300 bg-white px-4 py-3 font-sans text-[0.9rem] text-charcoal placeholder:text-mist/40 outline-none transition focus:border-charcoal focus:shadow-[0_0_0_3px_rgba(28,25,23,0.08)]"
                  placeholder="Seu nome"
                />
              </div>
            )}

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

            <button
              type="submit"
              disabled={loading}
              className="group relative mt-2 w-full overflow-hidden border border-charcoal bg-charcoal py-4 font-sans text-[0.72rem] font-medium uppercase tracking-[0.3em] text-cream transition-all duration-700 hover:bg-charcoal/88 disabled:opacity-70"
            >
              <span className="relative z-10">{loading ? "Aguarde..." : (isLogin ? "Entrar" : "Criar conta")}</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/8 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>

            <p className="text-center font-sans text-[0.75rem] text-mist/70">
              {isLogin ? "Não tem conta?" : "Já tem conta?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErro("");
                  setMensagemSucesso("");
                }}
                className="text-charcoal underline underline-offset-2 hover:text-gold-soft transition"
              >
                {isLogin ? "Criar conta" : "Entrar"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
