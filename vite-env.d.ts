/// <reference types="vite/client" />

// ↓ここから下を追記・編集する

interface ImportMetaEnv {
  // ここに .env で定義した変数の型を定義する
  // readonly をつけておくと、コード内で誤って上書きするのを防げる
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL: string
  readonly VITE_DEBUG_MODE: string // .env の値は文字列として読み込まれる
  readonly VITE_REACT_APP_SUPABASE_URL: string
  readonly VITE_REACT_APP_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
