module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    output: {
      libraryExport: 'default',
    }
  },
  css: {
    extract: false,
  },
  filenameHashing: false
};
