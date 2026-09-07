# Skyboard ✈️

Projeto integrador da formação **Angular Avançado**.

Ao longo das 14 sessões, vamos evoluir esta aplicação de gestão de voos, aplicando os conceitos de cada módulo: arquitetura standalone-first, control flow moderno, routing, componentes reutilizáveis, Signals, `httpResource`/`rxResource`, gestão de estado com Signal Store, e otimização de performance.

## Como começar

Faz clone deste repositório e instala as dependências:

```bash
git clone https://github.com/JoaoGoncalves/skyboard.git
cd skyboard
npm install
```

Depois arranca o servidor de desenvolvimento:

```bash
npm start
```

Abre o browser em `http://localhost:4200/`. A aplicação recarrega automaticamente sempre que alteras código-fonte.

## Estrutura do projeto

```
src/
  app/
    app.ts / app.html      → componente raiz, layout com navbar + sidebar
    shell/
      navbar/               → barra de navegação superior
      sidebar/               → menu lateral
public/
  assets/                   → logotipo e outros ficheiros estáticos
```

## Acompanhar o progresso das sessões

Após cada sessão, o progresso é submetido para a branch `main` deste repositório. Faz `git pull` regularmente para acompanhares a evolução.

```bash
git pull origin main
```

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm start` | Arranca o servidor de desenvolvimento |
| `npm run build` | Build de produção (pasta `dist/`) |
| `npm test` | Corre os testes unitários (Vitest) |

---

Formação **Angular Avançado** · João Gonçalves · [joaogoncalves.net](https://joaogoncalves.net)
