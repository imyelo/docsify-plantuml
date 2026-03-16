import skin from './skin'
import { encode } from 'plantuml-encoder'

var LANG = 'plantuml'
var SELECTOR = 'pre[data-lang="' + LANG + '"]'

export function plant(content, config) {
  var newContent = config.preloadedSkin + content
  var urlPrefix = config.serverPath || '//www.plantuml.com/plantuml/svg/'
  if (config.renderSvgAsObject) {
    var svgUrl = urlPrefix + encode(createUrls(newContent))
    return '<object type="image/svg+xml" data="' + svgUrl + '" />'
  }
  var svgUrl = urlPrefix + encode(newContent)
  return '<img src="' + svgUrl + '" />'
}

function createUrls(content) {
  var location = window.location.toString()
  var currenturl = location.substring(0, location.lastIndexOf('/') + 1)

  return content.replace(/\[\[\$((?:\.?\.\/)*)/g, resolvePath)

  // solution taken from docsify codebase
  function resolvePath(_, path) {
    var segments = (currenturl + path).split('/')
    var resolved = []
    for (var i = 0, len = segments.length; i < len; i++) {
      var segment = segments[i]
      if (segment === '..') {
        resolved.pop()
      } else if (segment !== '.') {
        resolved.push(segment)
      }
    }
    return '[[' + resolved.join('/')
  }
}

export function replace(content, selector, config) {
  var dom = window.Docsify.dom
  var $ = dom.create('span', content)

  if (!$.querySelectorAll) {
    return content
  }

  (dom.findAll($, selector) || []).forEach(function (element) {
    var parent = element.parentNode
    var planted = dom.create('p', plant(element.innerText, config))
    if (parent) {
      planted.dataset.lang = LANG
      element.parentNode.replaceChild(planted, element)
    }
  })
  return $.innerHTML
}

export function install(hook, vm) {
  const config = Object.assign({}, {
      skin: 'default',
      renderSvgAsObject: false,
      preloadedSkin: '',
    }, vm.config.plantuml)

  hook.afterEach(function (content, next) {
    skin(config.skin).then(function (s) {
      config.preloadedSkin = s
      next(replace(content, SELECTOR, config))
    })
  })
}
