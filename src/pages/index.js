import styles from '../styles/pages/HomePage.module.scss'
import MainHead from '../components/MainHead/MainHead'
import Sidebar from '../components/Sidebar/Sidebar'
import Footer from '../components/Footer/Footer'
import PostList from '../components/PostList/PostList'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { API_URL } from '../config/api'

export default function HomePage({ posts }) {
  return (
    <div id="wrapper">
      <MainHead />

      <div id="content">
        <Sidebar simple={false} />

        <main className={styles.main}>
          <PostList posts={posts} />
          <Footer />
        </main>
      </div>
    </div>
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