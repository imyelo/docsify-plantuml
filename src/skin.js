import defaultSkin from 'raw-loader!./skins/default.pu'
import classicSkin from 'raw-loader!./skins/classic.pu'

const SKINS = {
	default: defaultSkin,
	classic: classicSkin,
}
const SKINS_DEFAULT_KEY = 'default'

export default function skin (name) {
	if (name in SKINS) {
		return SKINS[name]
	}
	console.warn('[Docsify-PlantUML] Invalid skin name: ' + name)
	return SKINS[SKINS_DEFAULT_KEY]
}
