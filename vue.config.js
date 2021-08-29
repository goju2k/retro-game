const production = process.env.NODE_ENV === 'production'

module.exports = {
    publicPath: production
    ? './'
    : '/',
    lintOnSave:false,
    productionSourceMap:!production,
    chainWebpack: config => {

        config.module.rule('images').use('url-loader')
        .tap(options => {
            options.limit = 5000000 //이미지 사이즈 5메가 이하는 전부 js안으로 빌드됨
            return options;
        });

    },
}