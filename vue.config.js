const production = process.env.NODE_ENV === 'production'

module.exports = {
    publicPath: production
    ? './'
    : '/',
    lintOnSave:false,
    productionSourceMap:!production,
}