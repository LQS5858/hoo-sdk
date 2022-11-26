module.exports = {
    css: {
        extract: false  //强制将css内连
    },
    productionSourceMap: false,
    configureWebpack: config => {
        config.optimization.minimizer[0].options.terserOptions.compress.drop_console = false
        config.output.libraryExport = 'default'
    }
}