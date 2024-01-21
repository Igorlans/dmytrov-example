import { Html, Head, Main, NextScript } from 'next/document'
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
        <Head />
      <body>
      <Script id="google-analytics" strategy="afterInteractive">
          {`
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-KSJ8JJ74');
                `}
      </Script>
      <noscript
          dangerouslySetInnerHTML={{ __html:
                  `<iframe 
                src="https://www.googletagmanager.com/ns.html?id=GTM-KSJ8JJ74"
                height="0"
                width="0"
                style="display:none;visibility:hidden"
          ></iframe>`
          }}></noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}