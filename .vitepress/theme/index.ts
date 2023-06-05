import { defineTheme } from '@koishijs/vitepress/client'
import { defineAsyncComponent } from 'vue'
import Markdown from 'marked-vue'
import ElementPlus from 'element-plus'
import Layout from './layout.vue'

import 'element-plus/dist/index.css'
import './index.scss'
import { createI18n } from 'vue-i18n'

export default defineTheme({
  layouts: {
    home: defineAsyncComponent(() => import('./layouts/index.vue')),
  },
  Layout,
  enhanceApp({ app }) {
    const i18n = createI18n({
      legacy: false,
      locale: 'zh-CN',
      fallbackLocale: '',
    })

    app.use(ElementPlus)
    app.use(i18n)
    app.component('k-markdown', Markdown)
  },
})