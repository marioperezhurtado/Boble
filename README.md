# Boble

Online Web Chat

<p>
	<img src='https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB'/>
   <img src='https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white'/>
  <img src='https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white'/>
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white"/>
</p>

## Table of contents

- [Tech Stack](#-tech-stack)
- [Tools / Dependencies](#-tools--dependencies)
- [External API's](#-external-apis)
- [Installation](#-installation)
- [Supabase Setup](#-supabase-setup)
- [Environment Variables](#-environment-variables)
- [Run locally](#-run-locally)
- [Test application](#-test-application)
- [Build for production](#%EF%B8%8F-build-for-production)

## 🧑‍💻 Tech Stack

[React](https://es.reactjs.org/), [Typescript](https://www.typescriptlang.org/), [TailwindCSS](https://tailwindcss.com/), [Supabase](https://supabase.com/)

## 🔧 Tools / Dependencies

**Bundler:** [Vite](https://vitejs.dev/)

**Routing:** [Wouter](https://github.com/molefrog/wouter)

**Server state management:** [TanStack Query](https://tanstack.com/query/v4/)

**Linting:** [ESLint](https://eslint.org/)

**Integration with Supabase:** [Supabase-js](https://github.com/supabase/supabase-js)

**Translation:** [React-i18next](https://react.i18next.com/)

**QR Code:** [React-qr-code](https://www.npmjs.com/package/react-qr-code)

**Testing:** [Vitest](https://vitest.dev/)

## 📡 External API's

**GIF Integration:** [GIPHY](https://developers.giphy.com/)

## 🚀 Installation

```bash
git clone https://github.com/marioperezhurtado/Boble.git
cd Boble
npm install
```

## ⚡ Supabase Setup

https://supabase.com/docs

- Create an account on Supabase

- Create a new project in the Supabase dashboard

- Enable and configure authentication providers (google, github)
  https://app.supabase.com/project/^your-proyect^/auth/providers

- Create RLS (Row Level Security) authorization rules  
   https://app.supabase.com/project/^your-proyect^/auth/policies

## 💬 Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_APP_URL='https://your-url.com'`

`VITE_APP_GIPHY_API_KEY='your-giphy-api-key'`

`VITE_APP_SUPABASE_URL='your-supabase-url'`

`VITE_APP_SUPABASE_ANON_KEY='your-anon-key'`

Supabase env variables can be found at https://app.supabase.com/project/^your-proyect^/settings/api

## 💻 Run locally

```bash
  npm run dev
```

## 🔬 Test application

```bash
  npm run test
```

```bash
  npm run coverage
```

## 🛠️ Build for production

```bash
  npm run build
```
