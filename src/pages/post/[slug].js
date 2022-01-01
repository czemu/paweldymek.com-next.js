import { useContext } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { APP_URL, API_URL } from '../../config/app'
import { Context } from '../../store/store'
import MainHead from '../../components/MainHead/MainHead'
import Sidebar from '../../components/Sidebar/Sidebar'
import TagList from '../../components/TagList/TagList'
import styles from '../../styles/pages/PostPage.module.scss'
import Highlight from 'react-highlight'
import { DiscussionEmbed } from 'disqus-react'
import moment from 'moment'
import 'moment/locale/pl'

export default function PostPage({ post }) {
    const router = useRouter();
    const { slug } = router.query;
    const [state, dispatch] = useContext(Context);
    const { t } = useTranslation('post');
    const postDate = moment(post.created_at);
    
    moment.locale(state.locale);

    return (
        <div id="wrapper">
            <MainHead />

            <div id="content">
                <Sidebar simple={true} title={post.name} />

                <main>
                    <article className={styles.article}>
                        <div className={styles.topBar}>
                            <p>
                                {t('posted')} <time dateTime={postDate.format()} title={postDate.format('YYYY-MM-DD')}>
                                    {postDate.fromNow()}
                                </time>
                                <span>&bull;</span>
                                {t('read-time', {time: post.read_time})}
                            </p>
                        </div>

                        {post.intro !== null &&
                            <div className={styles.intro}>{post.intro}</div>
                        }

                        {post.image !== null &&
                           <figure className={styles.mainImage}>
                                <Image
                                    width={post.image.width}
                                    height={post.image.height}
                                    src={post.image.url}
                                    alt={post.image.alt}
                                />

                                {post.image.description !== null &&
                                    <figcaption>{post.image.description}</figcaption>
                                }
                            </figure>
                        }

                        <div className={styles.content}>
                            <Highlight innerHTML={true}>
                                {post.content}
                            </Highlight>
                        </div>

                        {post.tags.length &&
                            <TagList tags={post.tags} />
                        }

                        <DiscussionEmbed
                            shortname='pawel-dymek'
                            config={
                                {
                                    url: router.basePath,
                                    identifier: '/post/' + post.slug,
                                    title: post.name,
                                    language: state.locale
                                }
                            }
                        />
                    </article>
                </main>
            </div>

            <Head>
                <meta property="og:url" content={APP_URL + '/' + state.locale + router.asPath} key="og_url" />
                <meta property="og:type" content="article" key="og_type" />
                <meta property="og:title" content={post.name} key="og_title" />

                {post.image !== null &&
                    <meta property="og:image" content={post.image.url} />
                }
            </Head>
        </div>
    )
}

export async function getServerSideProps(context) {
    const response = await fetch(API_URL + '/posts/slug:' + context.params.slug)
    const json = await response.json()

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['post', 'common'])),
            post: json.data
        },
    }
}