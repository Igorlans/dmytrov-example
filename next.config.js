const { i18n } = require("./next-i18next.config");
const path = require("path");

/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            "cdn-icons-png.flaticon.com",
            "tlqvhaqcusstnyakthdf.supabase.co",
        ],
    },
    i18n
};

module.exports = nextConfig;
