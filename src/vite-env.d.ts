/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_SUPABASE_URL: string
  readonly VITE_APP_SUPABASE_ANON_KEY: string
  readonly VITE_APP_URL: string
  readonly VITE_APP_GIPHY_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
