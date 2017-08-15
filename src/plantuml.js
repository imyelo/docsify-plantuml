import { encode } from 'plantuml-encoder'
import style from 'raw-loader!./style.pu'

var LANG = 'plantuml'
var SELECTOR = 'pre[data-lang="' + LANG + '"]'

export function plant (content) {
	content = style + content
	return '<img src="http://www.plantuml.com/plantuml/svg/' + encode(content) + '" />'
}

export function replace (content, selector) {
	var dom = window.Docsify.dom
	var $ = dom.create('span', content)

	if (!$.querySelectorAll) {
		return content
	}

	(dom.findAll($, selector) || []).forEach(function (element) {
		var parent = element.parentNode
		var planted = dom.create('p', plant(element.innerText))
		if (parent) {
			planted.dataset.lang = LANG
			element.parentNode.replaceChild(planted, element)
		}
	})
	return $.innerHTML
}

export function install (hook) {
	hook.afterEach(function (content) {
		return replace(content, SELECTOR)
	})
}
