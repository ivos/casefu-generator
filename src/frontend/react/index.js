const fse = require('fs-extra')
const path = require('path')
const { generateHeaderJs } = require('./header')
const { generateAppJs } = require('./app')
const { generateEntities } = require('./entity')
const { generateLocalStorageJs } = require('./local-storage')
const { generatePackageJson } = require('./package')

const copyStaticContent = setup => {
  console.log('- Copying React static content')
  const dir = setup.outputDir
  fse.ensureDirSync(dir)
  fse.copySync(path.join('static', 'react'), dir)
}

const generateReact = (meta, setup) => {
  copyStaticContent(setup)
  generateHeaderJs(meta, setup)
  generateAppJs(meta, setup)
  generateEntities(meta, setup)
  generateLocalStorageJs(meta, setup)
  generatePackageJson(meta, setup)
}

module.exports = {
  generateReact
}
