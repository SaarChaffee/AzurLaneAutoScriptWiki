import { defineConfig } from '@koishijs/vitepress'

const isDev = process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview'

// https://vitepress.dev/reference/site-config
export default defineConfig({

  title: 'AzurLaneAutoScript',

  locales: {
    'en-US': require('./en-US'),
    'zh-CN': require('./zh-CN'),
    ...(isDev ? {
      'ja-JP': require('./ja-JP'),
      'zh-TW': require('./zh-TW'),
    } : {})
  },

  themeConfig: {
    logo: '/icon.ico',
    editLink: {
      pattern: "https://github.com/koishijs/docs/edit/main/:path"
    },
    socialLinks: {
      github: 'https://github.com/LmeSzinc/AzurLaneAutoScript',
    },
  },

  vite: {
    optimizeDeps: {
      include: ['xss'],
    },
  },
})
