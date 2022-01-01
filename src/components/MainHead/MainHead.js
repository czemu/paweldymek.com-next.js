import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { Context } from '../../store/store'

export default function MainHead() {
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
        <Head>
            <title>{t('title')}</title>
            <meta name="description" content={t('meta-description')} />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&amp;display=swap" rel="stylesheet" />
        </Head>
    )
}