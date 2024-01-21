/** @type {import("next").NextConfig} */
const path = require("path");

module.exports = {
    i18n: {
        defaultLocale: 'uk',
        locales: ['uk', 'ru'],
        localeDetection: false,
        localePath: path.resolve('./public/locales')
    },
}