const I18NextHttpBackend = require('i18next-http-backend')

module.exports = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'nl', 'es', 'en'],
  },
  debug: false,
  ns: ["common"],
  serializeConfig: false,
  use: [I18NextHttpBackend],
  backend: {
    loadPath: `https://my.backend/translations/{{lng}}`
  },
  reloadOnPrerender: true
};
