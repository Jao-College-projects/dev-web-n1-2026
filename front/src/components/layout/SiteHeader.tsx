import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLoja } from "../../store/LojaContext";

export function SiteHeader(): JSX.Element {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setPastHero(false);
      return;
    }
    const onScroll = (): void => {
      setPastHero(window.scrollY > window.innerHeight * 0.82);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const headerMods = isHome
    ? pastHero
      ? " site-header--home-scrolled"
      : " site-header--overlay"
    : "";

  const {
    totalItensCarrinho,
    usuarioLogado,
    tipoUsuario,
    isAdmin,
    modoEdicao,
    alternarModoEdicao,
    logout
  } = useLoja();

  return (
    <header className={`site-header${headerMods}`}>
      <div className="header-shell">
        <Link to="/" className="brand-title" style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif', fontStyle: 'italic', fontWeight: 400 }}>
          Luar Móveis
        </Link>

        <nav className="header-nav">
          <NavLink to="/" end className="nav-link-custom">
            Home
          </NavLink>
          <NavLink to="/produtos" end className="nav-link-custom">
            Produtos
          </NavLink>
          <NavLink to="/carrinho" end className="nav-link-custom">
            Carrinho ({totalItensCarrinho})
          </NavLink>
          <NavLink to="/login" end className="nav-link-custom">
            Login
          </NavLink>
          <NavLink to="/cadastro" end className="nav-link-custom">
            Cadastro
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" end className="nav-link-custom">
              Curadoria
            </NavLink>
          )}
          {isAdmin && (
            <button className="btn-minimal" onClick={alternarModoEdicao}>
              {modoEdicao ? "Encerrar edicao" : "Modo edicao"}
            </button>
          )}
          {usuarioLogado && (
            <>
              <span className="nav-meta">Perfil: {tipoUsuario}</span>
              <button className="btn-minimal" onClick={logout}>
                Sair
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
