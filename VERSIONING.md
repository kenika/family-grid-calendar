# Versioning Strategy

This project follows [Semantic Versioning](https://semver.org/) for all releases.

## Version Format

```
MAJOR.MINOR.PATCH
```

- **MAJOR** – incompatible API changes.
- **MINOR** – backwards-compatible functionality additions.
- **PATCH** – backwards-compatible bug fixes.

## Release Process

1. Start from the `dev` branch.
2. Update the `version` field in `package.json`.
3. Run `npm run format`, `npm run lint`, and `npm run build` to ensure code quality and update `dist/`.
4. Commit the changes and create a Git tag matching the version, e.g. `v1.2.3`.
5. Merge `dev` into `main` and push the tag.

## Initial Version

The tag `v0.1.0` marks the initial baseline for the project and can be used as a fallback if needed.
