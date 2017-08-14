var path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'fakesrc/index.umd.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'fake-vue.js',
    library: 'FakeVue',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.js/, loader: 'babel', exclude: /node_modules/ }
    ]
  }
}
