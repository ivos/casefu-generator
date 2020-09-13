const fse = require('fs-extra')
const path = require('path')

const copyStaticContent = (setup) => {
  console.log('- Copying React static content')
  const dir = setup.outputDir
  fse.ensureDirSync(dir)
  fse.copySync(path.join('static', 'react'), dir)
}

const generateReact = (meta, setup) => {
  copyStaticContent(setup)
}

module.exports = {
  generateReact
}
