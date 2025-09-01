# Contributing

## Branch strategy

- `main` contains production-ready code.
- `dev` is the integration branch for feature work. Create feature branches from `dev` and open pull requests back to `dev`. Releases merge from `dev` into `main`.

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

## Pull requests

- Ensure `dist/` contains the latest build.
- Follow the coding guidelines in `AGENTS.md`.
