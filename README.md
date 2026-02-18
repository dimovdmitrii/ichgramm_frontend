# React + Vite

## Architecture & Tech Stack

**Tech stack:** React 19, Vite 7, TypeScript. State management: Redux Toolkit with Redux Persist. Routing: React Router v7. HTTP: Axios. Forms: React Hook Form. Styling: CSS Modules. Linting: ESLint.

**Architecture:** App entry and auth restoration in `App.tsx`; routing and layout in `pages/Navigation`. **Pages** — Home, Explore, My Profile, Other Profile, Edit Profile, Login/Register/Reset, NotFound, Privacy/Terms. **Modules** — feature modals (Search, Chat, Create/Edit/My Post, Notifications, Messages) and auth forms. **Shared** — `api` (Axios instance, auth and users APIs), reusable UI (Sidebar, Post, Button, Input, TextField, Footer), route guards (PrivateRoute, PublicRoute). **Store** — auth slice (user, tokens), persisted via redux-persist.

---

Login: dima1

Password: Qwer123!

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
