import styles from '../../styles/pages/HomePage.module.scss'
import MainHead from '../../components/MainHead/MainHead'
import Sidebar from '../../components/Sidebar/Sidebar'
import Footer from '../../components/Footer/Footer'
import PostList from '../../components/PostList/PostList'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { API_URL } from '../../config/app'

export default function TagPage({ tag, posts }) {
  return (
    <div id="wrapper">
      <MainHead />

      <div id="content">
        <Sidebar simple={true} title={'Tag: ' + tag.name} />

        <main className={styles.main}>
          <PostList posts={posts} />
          <Footer />
        </main>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const tagResponse = await fetch(API_URL+'/tags/slug:' + context.params.slug);
  const tagJson = await tagResponse.json();
  const postsResponse = await fetch(API_URL+'/tags/'+tagJson.data.id+'/posts?filter[locale]='+context.locale);
  const postsJson = await postsResponse.json();

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['post', 'common'])),
      tag: tagJson.data,
      posts: postsJson.data
    },
  }
}