import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLoja } from "../../store/LojaContext";
import logo from "../../assets/logo.png";

export function SiteHeader(): JSX.Element {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [pastHero, setPastHero] = useState(false);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const {
    totalItensCarrinho,
    itensCarrinho,
    produtos,
    subtotalCarrinho,
    usuarioLogado,
    isAdmin,
    modoEdicao,
    alternarModoEdicao,
    logout
  } = useLoja();

  const headerMods = "bg-white/10 backdrop-blur-xl shadow-sm border-b border-white/10 text-charcoal";

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${headerMods}`}>
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-6 sm:px-10 lg:px-16">
        
        {/* LOGO (Left) */}
        <Link to="/" className="hover:opacity-70 transition-opacity flex items-center">
          <img 
            src={logo} 
            alt="Luar Móveis" 
            className="h-10 md:h-12 w-auto object-contain"
            onError={(e) => {
              // Fallback caso a imagem não carregue
              (e.target as HTMLImageElement).style.display = 'none';
              const textSpan = document.createElement('span');
              textSpan.className = "font-display text-[1.85rem] italic font-medium tracking-tight text-charcoal";
              textSpan.innerText = "Luar Móveis";
              (e.target as HTMLImageElement).parentElement?.appendChild(textSpan);
            }}
          />
        </Link>

        {/* ACTIONS (Right) */}
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* NAVIGATION LINKS (Desktop) */}
          <nav className="hidden items-center gap-6 md:flex">
            <NavLink to="/" end className={({ isActive }) => `font-sans text-[0.65rem] uppercase tracking-[0.2em] transition-all relative pb-1 ${isActive ? 'text-stone-900 border-b-2 border-gold-soft' : 'hover:text-gold-soft opacity-70'}`}>
              Home
            </NavLink>
            <NavLink to="/produtos" className={({ isActive }) => `font-sans text-[0.65rem] uppercase tracking-[0.2em] transition-all relative pb-1 ${isActive ? 'text-stone-900 border-b-2 border-gold-soft' : 'hover:text-gold-soft opacity-70'}`}>
              Produtos
            </NavLink>
            {isAdmin && (
              <NavLink to="/admin" className={({ isActive }) => `font-sans text-[0.65rem] uppercase tracking-[0.2em] transition-all relative pb-1 ${isActive ? 'text-stone-900 border-b-2 border-gold-soft' : 'hover:text-gold-soft opacity-70'}`}>
                Painel
              </NavLink>
            )}
            {isAdmin && (
              <button 
                onClick={alternarModoEdicao} 
                className={`border-0 bg-transparent p-0 shadow-none outline-none font-sans text-[0.6rem] uppercase tracking-[0.2em] transition-all ${modoEdicao ? 'text-gold-soft font-bold' : 'opacity-50 hover:opacity-100'}`}
              >
                {modoEdicao ? "Editor ON" : "Editor OFF"}
              </button>
            )}
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            {/* CART DROPDOWN */}
            <div 
              className="relative py-4"
              onMouseEnter={() => !window.matchMedia("(max-width: 768px)").matches && setCartDropdownOpen(true)}
              onMouseLeave={() => !window.matchMedia("(max-width: 768px)").matches && setCartDropdownOpen(false)}
            >
              <Link to="/carrinho" className="relative block group border-0 bg-transparent p-0 shadow-none outline-none" onClick={(e) => {
                if (window.matchMedia("(max-width: 768px)").matches) {
                   // No mobile, apenas segue o link
                } else {
                  e.preventDefault();
                }
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-gold-soft transition-colors">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {totalItensCarrinho > 0 && (
                  <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-soft text-[0.6rem] font-bold text-white">
                    {totalItensCarrinho}
                  </span>
                )}
              </Link>

              {/* DROPDOWN PANEL (Desktop only) */}
              <AnimatePresence>
                {cartDropdownOpen && !window.matchMedia("(max-width: 768px)").matches && (
                  <motion.div 
                    initial={{ opacity: 0, scaleY: 0, x: "-50%" }}
                    animate={{ opacity: 1, scaleY: 1, x: "-50%" }}
                    exit={{ opacity: 0, scaleY: 0, x: "-50%" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-1/2 top-full w-85 min-w-[340px] border border-stone-200 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[110] origin-top overflow-hidden"
                    style={{ marginTop: '-4px' }}
                  >
                    {/* Bridge pointer zone */}
                    <div className="absolute -top-4 left-0 right-0 h-4" />

                    <h4 className="mb-5 font-display text-base font-medium text-charcoal border-b border-stone-100 pb-3 text-center">Sacola de Compras</h4>
                    
                    {itensCarrinho.length === 0 ? (
                      <div className="py-8 text-center">
                        <p className="font-sans text-[0.7rem] text-mist uppercase tracking-[0.2em]">Sua sacola está vazia</p>
                      </div>
                    ) : (
                      <div 
                        className={`overflow-y-auto space-y-4 pr-1 custom-scrollbar transition-all duration-500`}
                        style={{ maxHeight: '450px' }}
                      >
                        {itensCarrinho.map((item) => {
                          const prod = produtos.find(p => p.id === item.produtoId);
                          if (!prod) return null;
                          
                          // Ajuste dinâmico de tamanho baseado no número de itens
                          const isMany = itensCarrinho.length > 2;
                          const imgClass = isMany ? "aspect-[21/9]" : "aspect-video";
                          const paddingClass = isMany ? "pb-2" : "pb-4";

                          return (
                            <Link 
                              key={item.produtoId} 
                              to={`/produtos/${prod.id}`}
                              className={`flex flex-col gap-2 group transition-all border-b border-stone-50 last:border-0 ${paddingClass}`}
                            >
                              <div className={`w-full flex-shrink-0 overflow-hidden rounded-sm border border-stone-100 shadow-sm transition-all duration-700 group-hover:scale-[1.01] ${imgClass}`}>
                                <img src={prod.imagem} alt={prod.nome} className="h-full w-full object-cover" />
                              </div>
                              <div className="text-center px-2">
                                <p className={`truncate font-display font-medium text-charcoal group-hover:text-gold-soft transition-colors ${isMany ? 'text-[0.8rem]' : 'text-[0.9rem]'}`}>
                                  {prod.nome}
                                </p>
                                <div className="mt-0.5 flex items-center justify-center gap-2">
                                  <span className="font-sans text-[0.65rem] text-mist uppercase tracking-widest">
                                    {item.quantidade}x
                                  </span>
                                  <span className={`font-sans font-bold text-stone-600 ${isMany ? 'text-[0.7rem]' : 'text-[0.75rem]'}`}>
                                    R$ {prod.preco.toLocaleString('pt-BR')}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}

                    <div className="mt-4 border-t border-stone-100 pt-4">
                      <div className="flex justify-between items-center mb-4 px-1">
                        <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-mist">Subtotal</span>
                        <span className="font-display text-base font-semibold text-charcoal">R$ {subtotalCarrinho.toLocaleString('pt-BR')}</span>
                      </div>
                      <Link 
                        to="/carrinho" 
                        className="block w-full bg-stone-900 py-3.5 text-center font-sans text-[0.7rem] uppercase tracking-[0.3em] text-white hover:bg-gold-soft hover:text-stone-900 transition-all shadow-lg active:scale-[0.98]"
                      >
                        Finalizar Compra
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* LOGIN / ACCOUNT (Desktop) */}
            <div className="hidden md:flex items-center gap-5">
              {!usuarioLogado ? (
                <NavLink to="/auth" className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-charcoal hover:text-gold-soft transition-all">
                  Login
                </NavLink>
              ) : (
                <button onClick={logout} className="border-0 bg-transparent p-0 shadow-none outline-none font-sans text-[0.65rem] uppercase tracking-[0.2em] text-mist hover:text-charcoal transition-all">
                  Sair
                </button>
              )}
            </div>

            {/* HAMBURGER (Mobile) */}
            <button 
              className="border-0 bg-transparent p-0 shadow-none outline-none flex md:hidden text-charcoal"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-[90] border-b border-stone-200 bg-white/95 p-8 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-6 items-center">
              <NavLink to="/" end className="font-sans text-[0.8rem] uppercase tracking-[0.25em] text-charcoal">Home</NavLink>
              <NavLink to="/produtos" className="font-sans text-[0.8rem] uppercase tracking-[0.25em] text-charcoal">Produtos</NavLink>
              {isAdmin && <NavLink to="/admin" className="font-sans text-[0.8rem] uppercase tracking-[0.25em] text-charcoal">Painel</NavLink>}
              {!usuarioLogado ? (
                <NavLink to="/auth" className="font-sans text-[0.8rem] uppercase tracking-[0.25em] text-gold-soft font-bold">Login</NavLink>
              ) : (
                <button onClick={logout} className="font-sans text-[0.8rem] uppercase tracking-[0.25em] text-mist">Sair</button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
