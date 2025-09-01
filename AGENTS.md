# Agent Guidelines

These instructions apply to the entire repository.

## Design Principles
- Use [Lit](https://lit.dev/) with TypeScript for all card implementation.
- Build and bundle using Vite. The compiled card must output to `dist/family-grid-calendar.js`.
- Keep the build output (`dist/`) committed; it is required for HACS.

## Code Style
- Run `npm run lint` and `npm run build` before committing.
- Format code with Prettier (`npm run format`).
- Avoid introducing additional build tools without discussion.

## Repository Conventions
- Follow the branch strategy described in `CONTRIBUTING.md`.
- Documentation lives in Markdown files at the root unless otherwise specified.
- New source files belong in `src/`.
