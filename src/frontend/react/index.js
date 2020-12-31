const fse = require('fs-extra')
const path = require('path')
const { generateHeader } = require('./Header')

const copyStaticContent = setup => {
  console.log('- Copying React static content')
  const dir = setup.outputDir
  fse.ensureDirSync(dir)
  fse.copySync(path.join('static', 'react'), dir)
}

const generateReact = (meta, setup) => {
  copyStaticContent(setup)
  generateHeader(meta, setup)
}

module.exports = {
  generateReact
}
