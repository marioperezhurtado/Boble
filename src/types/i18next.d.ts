import 'i18next'
import global_en from '@/translations/en/global.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      global: typeof global_en
    }
  }
}
