# Luar Móveis — Sistema de Gestão Boutique

Este projeto foi desenvolvido como parte da disciplina de **Desenvolvimento Web** do **Prof. Fernando**. A aplicação é um e-commerce boutique focado em curadoria de móveis de alto padrão, utilizando tecnologias modernas e seguindo rigorosos padrões de arquitetura de software.

## 🛠️ Tecnologias Utilizadas

- **React (Vite + TypeScript)**: Base da aplicação para alta performance e segurança de dados via tipagem forte.
- **Bootstrap (via CDN)**: Utilizado para a estrutura base e sistema de grades (Grid System).
- **Tailwind CSS**: Utilizado para estilização personalizada, cores e micro-interações.
- **Supabase**: Backend-as-a-Service para autenticação, banco de dados (PostgreSQL) e armazenamento de imagens.
- **Framer Motion**: Para animações fluidas e experiência de usuário premium.

## 🏗️ Arquitetura e Decisões Técnicas

A aplicação foi estruturada seguindo o princípio de **Responsabilidade Única (SRP)** e **Componentização**:

1. Separação de Camadas:
   - `src/components`: Dividido em pastas lógicas (`layout`, `produtos`, `ui`). Isso garante que componentes puramente visuais (UI) fiquem separados da lógica de negócio (Produtos).
   - `src/pages`: Componentes de página que orquestram os componentes menores e lidam com a lógica de roteamento.
   - `src/store`: Uso de **Context API** (`LojaContext`) para centralizar o estado global (Produtos, Carrinho, Usuário). Isso permite que o **Dashboard** e a **Listagem** estejam sempre sincronizados.
   - `src/types`: Interfaces TypeScript rigorosas que definem o "contrato" de dados do sistema, prevenindo erros de execução.

2. Layout Assimétrico (Bootstrap):
   - A página de Catálogo utiliza o **Sistema de Grades do Bootstrap** (`row`, `col-lg-3`, `col-lg-9`).
   - No Desktop, a organização é assimétrica: barra lateral de filtros (3 colunas) e conteúdo principal (9 colunas).
   - No Celular, as colunas se empilham automaticamente para 12 unidades, garantindo total responsividade.

3. Dashboard Dinâmico e Status Visual:
   - O Dashboard no topo do catálogo reage instantaneamente a qualquer alteração na lista (filtros, exclusão ou atualização de estoque).
   - Peças com estoque zerado recebem o status visual **"Esgotado"** com overlay e desabilitação de compra, conforme os requisitos de lógica de estado.

4. Semântica HTML5:
   - Uso rigoroso das tags `header`, `main`, `section`, `aside` e `address` para garantir acessibilidade e SEO.

## 🚀 Como Rodar o Projeto

Para facilitar a execução, o projeto possui scripts automatizados na raiz:

1.  **Instalar dependências**:
    ```bash
    npm run install:front
    ```

2.  **Iniciar o site**:
    ```bash
    npm run dev
    ```
    *Isso iniciará o servidor de desenvolvimento e o site estará disponível em `http://localhost:5173`.*

## 👤 Identificação

- **Aluno**: João Pedro
- **Disciplina**: Desenvolvimento Web
- **Professor**: Fernando
- **Data**: Abril de 2026

---
*Os scripts de configuração do banco de dados (SQL) podem ser encontrados na pasta `/sql` deste repositório.*
