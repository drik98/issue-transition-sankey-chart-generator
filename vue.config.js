module.exports = {
   chainWebpack: config => {
      config.module.rule('raw-loader').test(/\.csv$/i).use('raw-loader').loader('raw-loader');
   }
};
