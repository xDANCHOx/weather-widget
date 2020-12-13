module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    output: {
      libraryExport: 'default',
    }
  },
  productionSourceMap: false,
  css: {
    extract: false,
  },
  filenameHashing: false
};
