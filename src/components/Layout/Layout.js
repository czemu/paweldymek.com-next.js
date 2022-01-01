import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { APP_URL } from '../../config/app'
import Head from 'next/head'
import CookieAlert from '../CookieAlert/CookieAlert'
import { Context } from '../../store/store'

export default function Layout({ children }) {
    const router = useRouter()
    const [state, dispatch] = useContext(Context)
    const { t } = useTranslation('common');
  
    useEffect(() => {
        dispatch({
          type: 'SET_LOCALE',
          payload: router.locale
        });
    }, [router.locale]);

    return (
        <>
            <Head>
                <title>{t('title')}</title>
                
                <meta name="description" content={t('meta-description')} />

                <meta property="og:site_name" content="Paweł Dymek" key="og_site_name" />
                <meta property="og:locale" content={router.locale} key="og_locale" />
                <meta property="og:url" content={router.basePath} key="og_url" />
                <meta property="og:type" content="website" key="og_type" />
                <meta property="og:title" content={t('title')} key="og_title" />
                <meta property="og:image" content={APP_URL + '/images/home.png'} />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&amp;display=swap" rel="stylesheet" />
                <link rel="canonical" href={APP_URL + '/' + state.locale + router.asPath} />

                <script
                    dangerouslySetInnerHTML={{
                    __html:
                        `
                            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
                
                            ga('create', 'UA-836606-11', 'auto');
                            ga('send', 'pageview');
                        `
                    }}
                />
            </Head>

            <div id="wrapper">
                {children}
            </div>

            <CookieAlert />
        </>
    )
}