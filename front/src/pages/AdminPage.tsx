import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { useLoja } from "../store/LojaContext";

export function AdminPage(): JSX.Element {
  const {
    isAdmin,
    produtos,
    depoimentos,
    secoesHome,
    atualizarProduto,
    adicionarProduto,
    removerProduto,
    adicionarDepoimento,
    atualizarDepoimento,
    removerDepoimento,
    atualizarSecaoHome
  } = useLoja();

  const [novoProdutoNome, setNovoProdutoNome] = useState<string>("");
  const [novoProdutoCategoria, setNovoProdutoCategoria] = useState<string>("");
  const [novoProdutoPreco, setNovoProdutoPreco] = useState<number>(0);
  const [novoProdutoImagem, setNovoProdutoImagem] = useState<string>("");
  const [novoProdutoDescricao, setNovoProdutoDescricao] = useState<string>("");

  const [novoDepoimentoCliente, setNovoDepoimentoCliente] = useState<string>("");
  const [novoDepoimentoTexto, setNovoDepoimentoTexto] = useState<string>("");
  const [novoDepoimentoCidade, setNovoDepoimentoCidade] = useState<string>("");

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  function handleNovoProduto(evento: FormEvent<HTMLFormElement>): void {
    evento.preventDefault();
    adicionarProduto({
      nome: novoProdutoNome,
      categoria: novoProdutoCategoria,
      descricaoCurta: novoProdutoDescricao,
      descricaoLonga: novoProdutoDescricao,
      preco: novoProdutoPreco,
      estoque: 1,
      imagem: novoProdutoImagem,
      destaqueCarrossel: false
    });
    setNovoProdutoNome("");
    setNovoProdutoCategoria("");
    setNovoProdutoPreco(0);
    setNovoProdutoImagem("");
    setNovoProdutoDescricao("");
  }

  function handleNovoDepoimento(evento: FormEvent<HTMLFormElement>): void {
    evento.preventDefault();
    adicionarDepoimento({
      cliente: novoDepoimentoCliente,
      texto: novoDepoimentoTexto,
      cidade: novoDepoimentoCidade
    });
    setNovoDepoimentoCliente("");
    setNovoDepoimentoTexto("");
    setNovoDepoimentoCidade("");
  }

  const heroSection = secoesHome.find(s => s.identificador === 'hero');
  const manifestoSection = secoesHome.find(s => s.identificador === 'manifesto');
  const atmosferaSection = secoesHome.find(s => s.identificador === 'atmosfera');
  const curadoriaSection = secoesHome.find(s => s.identificador === 'curadoria');

  return (
    <section>
      <h1 className="section-title mb-4">Painel administrativo</h1>

      <section className="mb-8 border-b border-stone-200 pb-8">
        <h2 className="section-title mb-3 text-xl">Editar Texto e Imagens da Home (Hero)</h2>
        {heroSection && (
          <article className="lux-panel p-4 flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[0.65rem] uppercase tracking-widest text-mist mb-1">Título (Linha 1)</label>
                <input
                  className="field-input"
                  value={heroSection.conteudo.titulo_linha1}
                  onChange={(e) => atualizarSecaoHome('hero', { ...heroSection, conteudo: { ...heroSection.conteudo, titulo_linha1: e.target.value } })}
                />
              </div>
              <div>
                <label className="block text-[0.65rem] uppercase tracking-widest text-mist mb-1">Título (Linha 2)</label>
                <input
                  className="field-input"
                  value={heroSection.conteudo.titulo_linha2}
                  onChange={(e) => atualizarSecaoHome('hero', { ...heroSection, conteudo: { ...heroSection.conteudo, titulo_linha2: e.target.value } })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[0.65rem] uppercase tracking-widest text-mist mb-1">Tagline</label>
                <input
                  className="field-input"
                  value={heroSection.conteudo.tagline}
                  onChange={(e) => atualizarSecaoHome('hero', { ...heroSection, conteudo: { ...heroSection.conteudo, tagline: e.target.value } })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[0.65rem] uppercase tracking-widest text-mist mb-1">Upload da Imagem Background (URL - Integração com Supabase Storage)</label>
                <input
                  className="field-input"
                  placeholder="Ex: /assets/placeholder-hero.webp ou URL do Supabase"
                  value={heroSection.conteudo.imagem_url}
                  onChange={(e) => atualizarSecaoHome('hero', { ...heroSection, conteudo: { ...heroSection.conteudo, imagem_url: e.target.value } })}
                />
              </div>
            </div>
            <p className="text-xs text-mist mt-1 italic">
              Nota: Quando o backend rodar, este campo de imagem funcionará através do Upload nativo no Storage do Supabase (is_admin RLS).
            </p>
          </article>
        )}
      </section>

      <section className="mb-8 border-b border-stone-200 pb-8">
        <h2 className="section-title mb-3 text-xl">Editar Seção: Manifesto</h2>
        {manifestoSection && (
          <article className="lux-panel p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[0.65rem] uppercase tracking-widest text-mist mb-1">Imagem Fundo</label>
              <input
                className="field-input"
                placeholder="Ex: /assets/... ou URL"
                value={manifestoSection.conteudo.imagem_back || ''}
                onChange={(e) => atualizarSecaoHome('manifesto', { ...manifestoSection, conteudo: { ...manifestoSection.conteudo, imagem_back: e.target.value } })}
              />
            </div>
            <div>
              <label className="block text-[0.65rem] uppercase tracking-widest text-mist mb-1">Imagem Meio</label>
              <input
                className="field-input"
                value={manifestoSection.conteudo.imagem_mid || ''}
                onChange={(e) => atualizarSecaoHome('manifesto', { ...manifestoSection, conteudo: { ...manifestoSection.conteudo, imagem_mid: e.target.value } })}
              />
            </div>
            <div>
              <label className="block text-[0.65rem] uppercase tracking-widest text-mist mb-1">Imagem Frente</label>
              <input
                className="field-input"
                value={manifestoSection.conteudo.imagem_front || ''}
                onChange={(e) => atualizarSecaoHome('manifesto', { ...manifestoSection, conteudo: { ...manifestoSection.conteudo, imagem_front: e.target.value } })}
              />
            </div>
          </article>
        )}
      </section>

      <section className="mb-8 border-b border-stone-200 pb-8">
        <h2 className="section-title mb-3 text-xl">Editar Seção: Atmosfera (Imagens)</h2>
        {atmosferaSection && atmosferaSection.conteudo.ambientes && (
          <article className="lux-panel p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {atmosferaSection.conteudo.ambientes.map((amb: any, index: number) => (
              <div key={index}>
                <label className="block text-[0.65rem] uppercase tracking-widest text-mist mb-1">{amb.title}</label>
                <input
                  className="field-input"
                  placeholder="URL da Imagem"
                  value={amb.image || ''}
                  onChange={(e) => {
                    const newAmbientes = [...atmosferaSection.conteudo.ambientes];
                    newAmbientes[index].image = e.target.value;
                    atualizarSecaoHome('atmosfera', { ...atmosferaSection, conteudo: { ...atmosferaSection.conteudo, ambientes: newAmbientes } });
                  }}
                />
              </div>
            ))}
          </article>
        )}
      </section>

      <section className="mb-8 border-b border-stone-200 pb-8">
        <h2 className="section-title mb-3 text-xl">Editar Seção: Curadoria (Imagens)</h2>
        {curadoriaSection && curadoriaSection.conteudo.pieces && (
          <article className="lux-panel p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {curadoriaSection.conteudo.pieces.map((piece: any, index: number) => (
              <div key={index}>
                <label className="block text-[0.65rem] uppercase tracking-widest text-mist mb-1">{piece.name}</label>
                <input
                  className="field-input"
                  placeholder="URL da Imagem"
                  value={piece.image || ''}
                  onChange={(e) => {
                    const newPieces = [...curadoriaSection.conteudo.pieces];
                    newPieces[index].image = e.target.value;
                    atualizarSecaoHome('curadoria', { ...curadoriaSection, conteudo: { ...curadoriaSection.conteudo, pieces: newPieces } });
                  }}
                />
              </div>
            ))}
          </article>
        )}
      </section>

      <section className="mb-5 border-b border-stone-200 pb-8">
        <h2 className="section-title mb-3 text-xl">Editar moveis exibidos</h2>
        <div className="flex flex-col gap-3">
          {produtos.map((produto) => (
            <article className="lux-panel p-3" key={produto.id}>
              <div className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-12 md:col-span-3">
                  <input
                    className="field-input"
                    value={produto.nome}
                    onChange={(evento) =>
                      atualizarProduto({ ...produto, nome: evento.target.value })
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-2">
                  <input
                    className="field-input"
                    value={produto.categoria}
                    onChange={(evento) =>
                      atualizarProduto({ ...produto, categoria: evento.target.value })
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-2">
                  <input
                    className="field-input"
                    type="number"
                    value={produto.preco}
                    onChange={(evento) =>
                      atualizarProduto({ ...produto, preco: Number(evento.target.value) })
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-3 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`destaque-${produto.id}`}
                    checked={produto.destaqueCarrossel || false}
                    onChange={(e) => atualizarProduto({ ...produto, destaqueCarrossel: e.target.checked })}
                    className="accent-gold-soft cursor-pointer"
                  />
                  <label htmlFor={`destaque-${produto.id}`} className="text-sm font-medium text-stone-600 block cursor-pointer">
                    Destaque (Carrossel)
                  </label>
                </div>
                <div className="col-span-12 flex items-end md:col-span-2">
                  <button
                    className="btn-line"
                    type="button"
                    onClick={() => removerProduto(produto.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <form className="lux-panel mt-4 p-4" onSubmit={handleNovoProduto}>
          <h3 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wide text-stone-600">
            Adicionar novo movel
          </h3>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 md:col-span-4">
              <input
                className="field-input"
                placeholder="Nome do movel"
                value={novoProdutoNome}
                onChange={(evento) => setNovoProdutoNome(evento.target.value)}
                required
              />
            </div>
            <div className="col-span-12 md:col-span-3">
              <input
                className="field-input"
                placeholder="Categoria"
                value={novoProdutoCategoria}
                onChange={(evento) => setNovoProdutoCategoria(evento.target.value)}
                required
              />
            </div>
            <div className="col-span-12 md:col-span-2">
              <input
                className="field-input"
                type="number"
                placeholder="Preco"
                value={novoProdutoPreco}
                onChange={(evento) => setNovoProdutoPreco(Number(evento.target.value))}
                required
              />
            </div>
            <div className="col-span-12 md:col-span-3">
              <input
                className="field-input"
                placeholder="URL da imagem"
                value={novoProdutoImagem}
                onChange={(evento) => setNovoProdutoImagem(evento.target.value)}
                required
              />
            </div>
            <div className="col-span-12">
              <input
                className="field-input"
                placeholder="Descricao curta"
                value={novoProdutoDescricao}
                onChange={(evento) => setNovoProdutoDescricao(evento.target.value)}
                required
              />
            </div>
            <div className="col-span-12">
              <button className="btn-minimal" type="submit">
                Adicionar movel
              </button>
            </div>
          </div>
        </form>
      </section>

      <section>
        <h2 className="section-title mb-3 text-xl">Editar experiencias de clientes</h2>
        <div className="flex flex-col gap-3">
          {depoimentos.map((depoimento) => (
            <article className="lux-panel p-3" key={depoimento.id}>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-12 md:col-span-3">
                  <input
                    className="field-input"
                    value={depoimento.cliente}
                    onChange={(evento) =>
                      atualizarDepoimento({ ...depoimento, cliente: evento.target.value })
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <input
                    className="field-input"
                    value={depoimento.texto}
                    onChange={(evento) =>
                      atualizarDepoimento({ ...depoimento, texto: evento.target.value })
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-2">
                  <input
                    className="field-input"
                    value={depoimento.cidade}
                    onChange={(evento) =>
                      atualizarDepoimento({ ...depoimento, cidade: evento.target.value })
                    }
                  />
                </div>
                <div className="col-span-12 flex items-end md:col-span-1">
                  <button
                    className="btn-line"
                    type="button"
                    onClick={() => removerDepoimento(depoimento.id)}
                  >
                    X
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <form className="lux-panel mt-3 p-3" onSubmit={handleNovoDepoimento}>
          <h3 className="mb-2 font-sans text-sm font-semibold uppercase tracking-wide text-stone-600">
            Adicionar depoimento
          </h3>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12 md:col-span-3">
              <input
                className="field-input"
                placeholder="Nome do cliente"
                value={novoDepoimentoCliente}
                onChange={(evento) => setNovoDepoimentoCliente(evento.target.value)}
                required
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <input
                className="field-input"
                placeholder="Texto da experiencia"
                value={novoDepoimentoTexto}
                onChange={(evento) => setNovoDepoimentoTexto(evento.target.value)}
                required
              />
            </div>
            <div className="col-span-12 md:col-span-3">
              <input
                className="field-input"
                placeholder="Cidade"
                value={novoDepoimentoCidade}
                onChange={(evento) => setNovoDepoimentoCidade(evento.target.value)}
                required
              />
            </div>
            <div className="col-span-12">
              <button className="btn-minimal" type="submit">
                Adicionar depoimento
              </button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
}
