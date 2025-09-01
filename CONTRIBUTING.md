# Contributing

## Branch strategy

- `main` is the only long-lived branch and contains production-ready code.
- Create temporary feature branches from `main` and open pull requests back to `main` when work is ready.
- Frequent tagged releases from `main` provide stable fallback points if a feature branch introduces issues.

## Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Lint and build before committing:
   ```bash
   npm run lint
   npm run build
   ```

## Documentation

- Update documentation for any feature changes.
- Record design decisions in `/docs` or an ADR log.

## Pull requests

- Ensure `dist/` contains the latest build.
- Follow the coding guidelines in `AGENTS.md`.
- Include relevant documentation changes.
- Explain significant architectural decisions in the pull request description.
- The `main` branch is protected:
  - direct pushes are blocked,
  - open pull requests from feature branches and wait for at least one approving review, and
  - CI must report success via the `build` workflow (runs lint and build) before merging.
