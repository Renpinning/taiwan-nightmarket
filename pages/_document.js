import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="zh-TW">
      <Head>
        {/* GTM with consent check */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // 初始化 dataLayer
              window.dataLayer = window.dataLayer || [];
              
              // 設置默認 consent 狀態
              dataLayer.push({
                'event': 'default_consent',
                'consent_state': 'granted'
              });
              
              // GTM
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({
                  'gtm.start': new Date().getTime(),
                  event:'gtm.js'
                });
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KNR8G2V');
            `,
          }}
        />
      </Head>
      <body>
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KNR8G2V"
            height="0"
            width="0"
            title="Google Tag Manager"
            style={{
              display: 'none',
              visibility: 'hidden',
            }}
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
