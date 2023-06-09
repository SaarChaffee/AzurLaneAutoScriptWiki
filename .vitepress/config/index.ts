import { defineConfig } from '@koishijs/vitepress'
import highlight from '../theme/highlight'

const isDev = process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview'

// https://vitepress.dev/reference/site-config
export default async () => defineConfig({

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
    indexName: 'docs',
    logo: '/icon.ico',
    socialLinks: {
      github: 'https://github.com/LmeSzinc/AzurLaneAutoScript',
    },
  },

  markdown: {
    highlight: await highlight('one-dark-pro'),
  },

  vite: {
    optimizeDeps: {
      include: ['xss'],
    },
  },
})
