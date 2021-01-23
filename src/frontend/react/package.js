const fs = require('fs')
const path = require('path')
const { paramCase } = require('change-case')

const generatePackageJson = (meta, targetDir) => {
  console.log('- Generating React "package.json"')

  const npmModuleName = meta.systemName ? paramCase(meta.systemName) : 'casefu-sample-app'

  const content = `{
  "name": "${npmModuleName}",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@fortawesome/fontawesome-svg-core": "^1.2.30",
    "@fortawesome/free-regular-svg-icons": "^5.14.0",
    "@fortawesome/free-solid-svg-icons": "^5.14.0",
    "@fortawesome/react-fontawesome": "^0.1.11",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "axios": "^0.20.0",
    "bootstrap": "^4.5.2",
    "change-case": "^4.1.1",
    "date-fns": "^2.16.1",
    "formik": "^2.1.5",
    "lodash.pickby": "^4.6.0",
    "qs": "^6.9.4",
    "react": "^16.13.1",
    "react-bootstrap": "^1.3.0",
    "react-datepicker": "^3.3.0",
    "react-dom": "^16.13.1",
    "react-fast-compare": "^3.2.0",
    "react-functional-select": "^2.9.4",
    "react-loading-skeleton": "^2.1.1",
    "react-router-dom": "^5.2.0",
    "react-scripts": "3.4.3",
    "react-use": "^15.3.4",
    "react-window": "^1.8.6",
    "styled-components": "^5.2.1",
    "swr": "^0.3.8",
    "yup": "^0.29.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "proxy": "http://localhost:8000"
}
`
  const dir = path.join(targetDir, 'frontend')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'package.json'), content)
}

module.exports = {
  generatePackageJson
}