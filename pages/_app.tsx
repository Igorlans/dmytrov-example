import '@/styles/app.scss'
import '@/styles/media.scss'
import '@/styles/index.scss'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import {SessionProvider} from "next-auth/react";
import NextNProgress from 'nextjs-progressbar';
import {Toaster} from "react-hot-toast";
import {createTheme, ThemeProvider} from "@mui/material";
import { appWithTranslation } from "next-i18next";
import Script from "next/script";

import { DefaultSeo } from 'next-seo';

const App = ({ Component, pageProps }: AppProps) => {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#e55733', // оранжевий
            },
            secondary: {
                main: '#808080', // сірий
            },
        },
        typography: {
            fontFamily: 'Raleway, sans-serif'
        }
    });
  return (
      <>
        <Head>
            <DefaultSeo
                title="dmytrov.com.ua"
                description="Розробка технiчного та дизайн-проєкту"
                openGraph={{
                    type: 'website',
                    locale: 'uk_UA',
                    url: 'https://dmytrov.com.ua',
                    site_name: 'dmytrov.com.ua',
                    images: [
                        {
                            url: 'https://dmytrov.com.ua/dmytrov.ico',
                            width: 800,
                            height: 600,
                            alt: 'dmytrov.com.ua',
                        },
                    ],
                }}
            />
            <link rel="apple-touch-icon" sizes="180x180" href="/dmytrov.ico" />
            <link rel="icon" type="image/png" sizes="32x32" href="/dmytrov.ico" />
            <link rel="icon" type="image/png" sizes="16x16" href="/dmytrov.ico" />
            <link rel="manifest" href="/site.webmanifest" />
            <meta name="theme-color" content="#ffffff" />
        </Head>

          <NextNProgress color="#e55733" startPosition={0.3} stopDelayMs={200} height={6} showOnShallow={true} />
          <Toaster
              position="top-center"
              reverseOrder={false}
          />
          <SessionProvider>
              <ThemeProvider theme={theme}>
                  <Component {...pageProps} />
              </ThemeProvider>
          </SessionProvider>
      </>

  )
}

export default appWithTranslation(App)
