// modified from https://github.com/vuejs/vitepress/blob/283407d072353a77ee0939a71a1f2a35e953eb7d/src/node/markdown/plugins/highlight.ts

import { getHighlighter, HtmlRendererOptions, IThemeRegistration } from 'shiki'
import MarkdownIt from 'markdown-it'

/**
 * 2 steps:
 *
 * 1. convert attrs into line numbers:
 *    {4,7-13,16,23-27,40} -> [4,7,8,9,10,11,12,13,16,23,24,25,26,27,40]
 * 2. convert line numbers into line options:
 *    [{ line: number, classes: string[] }]
 */
const attrsToLines = (attrs: string): HtmlRendererOptions['lineOptions'] => {
  const result: number[] = []
  if (!attrs.trim()) {
    return []
  }
  attrs
    .split(',')
    .map((v) => v.split('-').map((v) => parseInt(v, 10)))
    .forEach(([start, end]) => {
      if (start && end) {
        result.push(
          ...Array.from({ length: end - start + 1 }, (_, i) => start + i),
        )
      } else {
        result.push(start)
      }
    })
  return result.map((v) => ({
    line: v,
    classes: ['highlighted'],
  }))
}

const alias = {
  pip: 'sh',
  conda: 'sh',
  python: 'sh',
  docker: 'sh',
  venv: 'sh',
  macos: 'sh',
  normal: 'sh'
}

const tokens = {
  '#ABB2BF': 'text',
  '#E5C07B': 'constant',
  '#D19A66': 'number',
  '#98C379': 'string',
  '#7F848E': 'comment',
  '#C678DD': 'keyword',
  '#E06C75': 'parameter',
  '#61AFEF': 'function',
  '#56B6C2': 'operator',
}

const colorRE = / style="color: ?(#[0-9a-fA-F]{6})"/g

export default async function highlight(theme: string): Promise<MarkdownIt.Options['highlight']> {
  const getThemeName = (themeValue: IThemeRegistration) =>
    typeof themeValue === 'string' ? themeValue : themeValue.name

  const highlighter = await getHighlighter({
    themes: [theme],
  })
  const vueRE = /-vue$/

  return (code: string, lang: string, attrs: string) => {
    const vPre = vueRE.test(lang) ? '' : 'v-pre'
    lang = lang.replace(vueRE, '').toLowerCase()
    lang = alias[lang] || lang
    code = code
      .replace(/^[\s\S]*\/\/ ---cut---\r?\n/, '')
      .replace(/^[\s\S]*\/\/ @errors: \d+\r?\n/, '')
      .trim()

    const lineOptions = attrsToLines(attrs)

    return highlighter
      .codeToHtml(code, { lang, lineOptions, theme: getThemeName(theme) })
      .replace(/^<pre.*?>/, `<pre ${vPre}>`)
      .replace(colorRE, (match, color) => {
        const token = tokens[color.toUpperCase()]
        return token ? ` style="color: var(--shiki-token-${token})"` : match
      })
  }
}
