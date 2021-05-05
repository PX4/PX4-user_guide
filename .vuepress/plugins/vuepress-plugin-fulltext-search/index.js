const { path } = require('@vuepress/shared-utils')
const { htmlToText } = require('html-to-text')
const _ = require('lodash')

let customTitles = null

module.exports = (options, ctx, globalCtx) => ({
  extendPageData($page) {
    try {
      const { html } = $page._context.markdown.render($page._strippedContent || '')
      if (!customTitles) customTitles = getCustomTitles(globalCtx)

      const plaintext = htmlToText(html, {
        wordwrap: null,
        hideLinkHrefIfSameAsText: true,
        ignoreImage: true,
        ignoreHref: true,
        uppercaseHeadings: false,
        tables: true,
      })

      for (const h of $page.headers || []) {
        const titlePlaintext = $page._context.markdown.renderInline(h.title)
        h.normalizedTitle = normalizeText(titlePlaintext)
        h.charIndex = plaintext.indexOf(titlePlaintext)
        if (h.charIndex === -1) h.charIndex = null
      }
      $page.headersStr = $page.headers ? $page.headers.map(h => h.title).join(' ') : null
      $page.content = plaintext
      $page.normalizedContent = normalizeText(plaintext)

      $page.charsets = getCharsets(plaintext)

      // Take title from sidebar if it's missing on the page itself
      if (!$page.title) $page.title = customTitles[normalizePath($page.path)]
    } catch (e) {
      // incorrect markdown
      console.error('Error when applying fulltext-search plugin:', e)
    }
  },
  alias: {
    '@SearchBox': path.resolve(__dirname, 'components/SearchBox.vue'),
  },
  clientDynamicModules() {
    return {
      name: 'hooks.js',
      content: options.hooks || 'export default {}',
    }
  },
  define() {
    return {
      OPTIONS: options,
    }
  },
})

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function getCustomTitles(globalCtx) {
  try {
    const sidebarConfig = _.get(globalCtx, '_pluginContext.themeConfig.sidebar')
    if (!sidebarConfig) return {}

    let sidebars = [sidebarConfig]
    if (_.isPlainObject(sidebarConfig)) sidebars = _.values(sidebarConfig)

    sidebars = sidebars.filter(sb => _.isArray(sb))

    const result = {}
    for (const sb of sidebars) {
      for (const page of sb) {
        if (_.isArray(page)) {
          const [pathWithExtension, title] = page
          const normalizedPath = normalizePath(pathWithExtension)
          if (normalizedPath && title) result[normalizedPath] = title
          continue
        }
        if (!_.isObjectLike(page)) continue

        if (page.path && page.title) {
          const normalizedPath = normalizePath(page.path)
          if (normalizedPath) result[normalizedPath] = page.title
        }
        if (page.children) {
          for (const c of page.children) {
            if (_.isArray(c)) {
              const [pathWithExtension, title] = c
              const normalizedPath = normalizePath(pathWithExtension)
              if (normalizedPath && title) result[normalizedPath] = title
            }
          }
        }
      }
    }
    return result
  } catch (e) {
    console.error('[fulltext-search] Error while getting sidebar paths:', e)
    return {}
  }
}

function normalizePath(rawPath) {
  if (!rawPath) return null
  try {
    const parsedPath = path.parse(rawPath)
    return path.join(parsedPath.dir, parsedPath.name)
  } catch (e) {
    console.error(`[fulltext-search] Error while normalizing path ${rawPath}:`, e)
    return null
  }
}

function getCharsets(text) {
  const cyrillicRegex = /[\u0400-\u04FF]/iu
  const cjkRegex = /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]|[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]|[\u3041-\u3096]|[\u30A1-\u30FA]/iu

  const result = {}
  if (cyrillicRegex.test(text)) result.cyrillic = true
  if (cjkRegex.test(text)) result.cjk = true
  return result
}
