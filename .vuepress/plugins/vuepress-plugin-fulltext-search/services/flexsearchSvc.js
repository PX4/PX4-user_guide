import Flexsearch from 'flexsearch'
// Use when flexSearch v0.7.0 will be available
// import cyrillicCharset from 'flexsearch/dist/lang/cyrillic/default.min.js'
// import cjkCharset from 'flexsearch/dist/lang/cjk/default.min.js'
import _ from 'lodash'

let index = null
let cyrillicIndex = null
let cjkIndex = null
let pagesByPath = null

const cjkRegex = /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]|[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]|[\u3041-\u3096]|[\u30A1-\u30FA]/giu

export default {
  buildIndex(allPages, options, localePath) {
    const pages = allPages.filter(p => !p.frontmatter || p.frontmatter.search !== false && (p.path.startsWith(localePath) || p.path === '/'))
    
    const indexSettings = {
      encode: options.encode || 'simple',
      tokenize: options.tokenize || 'forward',
      split: options.split || /\W+/,
      async: true,
      doc: {
        id: 'key',
        // here you choose the fields you want to index.
        // for me I will search in the title and the content of each page.
        // of course I stripped the content before so I use the plain text content not the markdown text
        field: ['title', 'headersStr', 'content'],
      },
    }
    index = new Flexsearch(indexSettings)
    index.add(pages)

    const cyrillicPages = pages.filter(p => p.charsets.cyrillic)
    const cjkPages = pages.filter(p => p.charsets.cjk)

    if (cyrillicPages.length) {
      cyrillicIndex = new Flexsearch({
        ...indexSettings,
        encode: 'icase',
        split: /\s+/,
        tokenize: 'forward',
      })
      cyrillicIndex.add(cyrillicPages)
    }
    if (cjkPages.length) {
      cjkIndex = new Flexsearch({
        ...indexSettings,
        encode: false,
        tokenize: function(str) {
          const cjkWords = []
          let m = null
          do {
            m = cjkRegex.exec(str)
            if (m) {
              cjkWords.push(m[0])
            }
          } while (m)
          return cjkWords
        },
      })
      cjkIndex.add(cjkPages)
    }
    pagesByPath = _.keyBy(pages, 'path')
  },
  async match(queryString, queryTerms, limit = 7) {
    const searchParams = [
      {
        field: 'title',
        query: queryString,
        limit,
        boost: 10,
      },
      {
        field: 'headersStr',
        query: queryString,
        limit,
        boost: 7,
      },
      {
        field: 'content',
        query: queryString,
        limit,
      },
    ]
    const searchResult1 = await index.search(searchParams)
    const searchResult2 = cyrillicIndex ? await cyrillicIndex.search(searchParams) : []
    const searchResult3 = cjkIndex ? await cjkIndex.search(searchParams) : []
    const searchResult = _.uniqBy([...searchResult1, ...searchResult2, ...searchResult3], 'path')
    const result = searchResult.map(page => ({
      ...page,
      parentPageTitle: getParentPageTitle(page),
      ...getAdditionalInfo(page, normalizeString(queryString), queryTerms),
    }))

    const resultByParent = _.groupBy(result, 'parentPageTitle')
    return _.values(resultByParent)
      .map(arr =>
        arr.map((x, i) => {
          if (i === 0) return x
          return { ...x, parentPageTitle: null }
        }),
      )
      .flat()
  },
  normalizeString,
}

function getParentPageTitle(page) {
  const pathParts = page.path.split('/')
  let parentPagePath = '/'
  if (pathParts[1]) parentPagePath = `/${pathParts[1]}/`

  const parentPage = pagesByPath[parentPagePath] || page
  return parentPage.title
}

function getAdditionalInfo(page, queryString, queryTerms) {
  const query = queryString.toLowerCase()
  const match = getMatch(page, query, queryTerms)
  if (!match)
    return {
      ...getFullHeading(page),
      slug: '',
      contentStr: null,
    }

  if (match.headerIndex != null) {
    // header match
    return {
      ...getFullHeading(page, match.headerIndex, match),
      slug: '#' + page.headers[match.headerIndex].slug,
      contentStr: null,
    }
  }

  // content match
  let headerIndex = _.findLastIndex(page.headers || [], h => h.charIndex != null && h.charIndex < match.charIndex)
  if (headerIndex === -1) headerIndex = null

  return {
    ...getFullHeading(page, headerIndex),
    slug: headerIndex == null ? '' : '#' + page.headers[headerIndex].slug,
    ...getContentStr(page, match),
  }
}

function getFullHeading(page, headerIndex, match) {
  if (headerIndex == null) return { headingStr: page.title }
  const headersPath = []
  while (headerIndex != null) {
    const header = page.headers[headerIndex]
    headersPath.unshift(header)
    headerIndex = _.findLastIndex(page.headers, h => h.level === header.level - 1, headerIndex - 1)
    if (headerIndex === -1) headerIndex = null
  }

  const headingStr = headersPath.map(h => h.title).join(' > ')
  const prefixPath = headersPath.slice(0, -1)
  const prefixLength = _.sum(prefixPath.map(p => (p.title || '').length)) + prefixPath.length * 3
  const headingHighlight = match && match.headerIndex != null && [match.charIndex + prefixLength, match.termLength]
  return { headingStr, headingHighlight }
}

function getMatch(page, query, terms) {
  const matches = terms
    .map(t => {
      return getHeaderMatch(page, t) || getContentMatch(page, t)
    })
    .filter(m => m)
  if (matches.length === 0) return null

  if (matches.every(m => m.headerIndex != null)) {
    return getHeaderMatch(page, query) || matches[0]
  }

  return getContentMatch(page, query) || matches.find(m => m.headerIndex == null)
}

function getHeaderMatch(page, term) {
  if (!page.headers) return null
  for (let i = 0; i < page.headers.length; i++) {
    const h = page.headers[i]
    const charIndex = h.normalizedTitle.indexOf(term)
    if (charIndex === -1) continue
    return {
      headerIndex: i,
      charIndex,
      termLength: term.length,
    }
  }
  return null
}

function getContentMatch(page, term) {
  if (!page.normalizedContent) return null
  const charIndex = page.normalizedContent.indexOf(term)
  if (charIndex === -1) return null

  return { headerIndex: null, charIndex, termLength: term.length }
}

function getContentStr(page, match) {
  const snippetLength = 120
  const { charIndex, termLength } = match

  let lineStartIndex = page.content.lastIndexOf('\n', charIndex)
  let lineEndIndex = page.content.indexOf('\n', charIndex)

  if (lineStartIndex === -1) lineStartIndex = 0
  if (lineEndIndex === -1) lineEndIndex = page.content.length

  const line = page.content.slice(lineStartIndex, lineEndIndex)
  const lineCharIndex = charIndex - lineStartIndex
  const contentHighlight = [lineCharIndex, termLength]

  if (snippetLength >= line.length) return { contentStr: line, contentHighlight }

  const additionalCharactersFromStart = _.round((snippetLength - termLength) / 2)
  const snippetStart = Math.max(lineCharIndex - additionalCharactersFromStart, 0)
  const snippetEnd = Math.min(snippetStart + snippetLength, line.length)
  let contentStr = line.slice(snippetStart, snippetEnd)
  contentHighlight[0] = contentHighlight[0] - snippetStart

  if (snippetStart > 0) {
    contentStr = '...' + contentStr
    contentHighlight[0] = contentHighlight[0] + 3
  }
  if (snippetEnd < line.length) contentStr = contentStr + '...'
  return {
    contentStr,
    contentHighlight,
  }
}

function normalizeString(str) {
  if (!str) return str
  return str
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

