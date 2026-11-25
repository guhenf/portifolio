# Portfólio · Gustavo Franco

React + TypeScript + Vite. Sem bibliotecas além do React.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera a pasta dist/
npm run preview  # testa o build
```

## Onde mexer

| O quê | Arquivo |
|---|---|
| Projetos, experiências, formação, stack, contatos, palavras do jogo | `src/data.ts` |
| Topo, menu e linha da trajetória | `src/components/Hero.tsx` |
| Sobre | `src/components/About.tsx` |
| Fora do código (APAE, medalha, camisa) | `src/components/OffCode.tsx`, `MilkBoxes.tsx` |
| Seção da Kelly | `src/components/KellySection.tsx` |
| Física e desenho do jogo | `src/game/basketball.ts` |
| Cores e estilos | `src/styles.css` (variáveis em `:root`) |

## Publicar

- **Vercel:** importe o repositório. Ela detecta Vite sozinha.
- **GitHub Pages:** rode `npm run build` e publique a pasta `dist/`, por exemplo com a action oficial do Pages. O `base: './'` no `vite.config.ts` já faz o build funcionar em subpasta.
