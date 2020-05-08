import skin from './skin'
import { encode } from 'plantuml-encoder'

var LANG = 'plantuml'
var SELECTOR = 'pre[data-lang="' + LANG + '"]'

export function plant (content, config) {
  var content = skin(config.skin) + content
  var svgUrl = (config.serverPath || '//www.plantuml.com/plantuml/svg/') + encode(content)
  if (config.renderSvgAsObject) {
    return '<object type="image/svg+xml" data="'+ svgUrl + '" />'
  }
  return '<img src="' + svgUrl + '" />'
}

export function replace (content, selector, config) {
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

export function install (hook, vm) {
	const config = Object.assign({}, {
        skin: 'default',
        renderSvgAsObject: false
	}, vm.config.plantuml)
  hook.afterEach(function (content) {
    return replace(content, SELECTOR, config)
  })
}
