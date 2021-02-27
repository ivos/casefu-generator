const fse = require('fs-extra')
const path = require('path')
const { generateIndexHtml } = require('./index-html')
const { generateHeaderJs } = require('./header')
const { generateAppJs } = require('./app')
const { generateEntities } = require('./entity')
const { generateLocalStorageJs } = require('./local-storage')
const { generatePackageJson } = require('./package')

const copyStaticContent = (moduleDir, targetDir) => {
  console.log('- Copying React static content')
  fse.ensureDirSync(targetDir)
  fse.copySync(path.join(moduleDir, 'static', 'react'), targetDir)
}

const generateReact = (meta, moduleDir, targetDir) => {
  copyStaticContent(moduleDir, targetDir)
  generateIndexHtml(meta, targetDir)
  generateHeaderJs(meta, targetDir)
  generateAppJs(meta, targetDir)
  generateEntities(meta, targetDir)
  generateLocalStorageJs(meta, targetDir)
  generatePackageJson(meta, targetDir)
}

module.exports = {
  generateReact
}
