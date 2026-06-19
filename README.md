# Edvaldo Films

Portfolio audiovisual de Edvaldo Films, com trabalhos de drone, Reels,
comerciais e lifestyle.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Publicar no GitHub Pages

1. Crie um repositorio vazio no GitHub.
2. Use a branch principal `main`.
3. Envie os arquivos deste projeto para o repositorio.
4. No GitHub, abra `Settings > Pages`.
5. Em `Build and deployment > Source`, selecione `GitHub Actions`.
6. Abra a aba `Actions` e acompanhe o workflow `Deploy GitHub Pages`.

Depois de cada envio para a branch `main`, o site sera publicado
automaticamente.

## Arquivos locais

Os videos e fotos originais, arquivos de analise, logs, dependencias e builds
locais estao no `.gitignore`. Somente as versoes otimizadas de midia em
`public/media` devem ser publicadas.
