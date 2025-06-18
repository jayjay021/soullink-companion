# Development Setup Guide

## VS Code Configuration

This project is configured with the following development tools:

### ESLint & Prettier

- ESLint runs automatically in VS Code and shows the same errors as the build process
- Prettier formats code on save
- Both tools run automatically on pre-commit

### Git Hooks (Husky)

#### Pre-commit hooks:

- **Lint-staged**: Runs ESLint and Prettier on staged files
- **Type checking**: Runs TypeScript compiler to check for type errors

#### Commit message validation:

- **Commitlint**: Enforces conventional commit message format

### Conventional Commit Format

Commit messages must follow this format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools
- `ci`: Changes to CI configuration files and scripts
- `build`: Changes that affect the build system or external dependencies
- `revert`: Reverts a previous commit

**Examples:**

```bash
git commit -m "feat: add pokemon search functionality"
git commit -m "fix: resolve pokemon grid drag and drop issue"
git commit -m "docs: update component reorganization guide"
git commit -m "refactor: improve pokemon component structure"
```

### Available Scripts

```bash
# Development
pnpm dev                 # Start development server
pnpm build              # Build for production
pnpm start              # Start production server

# Code Quality
pnpm lint               # Run ESLint
pnpm lint:fix           # Run ESLint and fix auto-fixable issues
pnpm type-check         # Run TypeScript type checking
pnpm format             # Format code with Prettier
pnpm format:check       # Check if code is formatted correctly

# Git
pnpm commitlint         # Manually run commit message validation
```

### VS Code Extensions

Install these recommended extensions for the best development experience:

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Path Intellisense
- Auto Rename Tag

### Troubleshooting

If you're not seeing ESLint errors in VS Code:

1. Make sure the ESLint extension is installed and enabled
2. Check the VS Code output panel for ESLint logs
3. Restart VS Code
4. Run `pnpm lint` to verify the configuration is working
