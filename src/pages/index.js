import Head from 'next/head'
import { useContext } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import Footer from '../components/Footer/Footer'
import PostList from '../components/PostList/PostList'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { APP_URL, API_URL } from '../config/app'
import { Context } from '../store/store'
import styles from '../styles/pages/HomePage.module.scss'

export default function HomePage({ posts }) {
  const [state, dispatch] = useContext(Context);

  return (
    <>
      <div id="content">
        <Sidebar simple={false} />

        <main className={styles.main}>
          <PostList posts={posts} />
          <Footer />
        </main>
      </div>

      <Head>
        <link rel="alternate" hrefLang={state.locale === 'en' ? 'pl' : 'en'} href={APP_URL + '/' + (state.locale === 'en' ? 'pl/' : 'en/')} />
      </Head>
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const response = await fetch(API_URL+'/posts?filter[locale]=' + locale)
  const json = await response.json()

  return {
    props: {
      ...(await serverSideTranslations(locale, ['post', 'common'])),
      posts: json.data
    },
  }
}