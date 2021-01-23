const path = require('path')

module.exports = {
  target: 'node',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: 'CaseFuGenerator',
    libraryTarget: 'commonjs2'
  }
}
