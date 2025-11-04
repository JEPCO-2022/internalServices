This workspace has been prepared for a gradual migration to TypeScript.

What I changed:
- Added `tsconfig.json` with `allowJs: true` so you can migrate files incrementally.
- Added TypeScript entry files: `src/index.tsx` and `src/App.tsx`.
- Added TS/TSX copies of small modules: `src/component/Config.ts` and `src/component/Pages/Header.tsx`.
- Added `src/react-app-env.d.ts` to satisfy CRA type environment.
- Updated `package.json` with recommended devDependencies (typescript and types).

Next steps you can take:
1. Run `npm install` to get TypeScript and type packages installed.
2. Start migrating files: rename `*.js` to `*.ts` / `*.tsx` gradually and fix types.
3. Consider replacing `redux` setup with Redux Toolkit for simpler patterns.
4. Add ESLint + TypeScript rules for consistent style.

Notes:
- I preserved original JS files to keep the project runnable while migrating incrementally.
- If you want, I can continue by converting Redux files and one large page (`SubscriptionsInquiry`) to TypeScript next.
