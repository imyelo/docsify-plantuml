import defaultSkin from 'raw-loader!./skins/default.pu'
import classicSkin from 'raw-loader!./skins/classic.pu'

const SKINS = {
  default: defaultSkin,
  classic: classicSkin,
}

const VALID_EXTENSIONS = ['pu', 'puml']
const SKINS_DEFAULT_KEY = 'default'

function isExternalSkin(url) {
  try {
    new URL(url)
  } catch (_) {
    return false
  }
  return true
}

function isValidExtension(name) {
  const extension = name.split('.').pop()
  if (VALID_EXTENSIONS.includes(extension)) {
    return true
  }
  console.warn(
    "[Docsify-PlantUML] '." + extension + "' is a invalid extension!"
  )
  return false
}

function getExternalSkin(url) {
  return fetch(url).then(function (r) {
    return r.text()
  })
}

export default function skin(name) {
  if (name in SKINS) {
    return new Promise(function (resolve, _) {
      resolve(SKINS[name])
    })
  } else if (isExternalSkin(name) || isValidExtension(name)) {
    return getExternalSkin(name)
  } else {
    return new Promise(function (resolve, _) {
      console.warn('[Docsify-PlantUML] Invalid skin name: ' + name)
      resolve(SKINS[SKINS_DEFAULT_KEY])
    })
  }
}
