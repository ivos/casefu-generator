const fse = require('fs-extra')
const path = require('path')
const { generateHeaderJs } = require('./header')
const { generateAppJs } = require('./app')
const { generatePackageJson } = require('./package')
const { generateEntities } = require('./entity')

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
  generatePackageJson(meta, setup)
}

module.exports = {
  generateReact
}
