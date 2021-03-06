import { useContext } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { APP_URL, API_URL } from '../../config/app'
import { Context } from '../../store/store'
import Sidebar from '../../components/Sidebar/Sidebar'
import TagList from '../../components/TagList/TagList'
import Footer from '../../components/Footer/Footer'
import styles from '../../styles/pages/PostPage.module.scss'
import Highlight from 'react-highlight'
import { DiscussionEmbed } from 'disqus-react'
import moment from 'moment'
import 'moment/locale/pl'

export default function PostPage({ post }) {
    const router = useRouter();
    const [state, dispatch] = useContext(Context);
    const { t } = useTranslation('post');
    const postDate = moment(post.created_at);

    moment.locale(state.locale);

    return (
        <>
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
                                {t('read-time', { time: post.read_time })}
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

                    <Footer />
                </main>
            </div>

            <Head>
                <meta property="og:url" content={APP_URL + '/' + state.locale + router.asPath} key="og_url" />
                <meta property="og:type" content="article" key="og_type" />
                <meta property="og:title" content={post.name} key="og_title" />

                {post.image !== null &&
                    <meta property="og:image" content={post.image.url} />
                }

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: `
                        {
                            "@context": "http://schema.org",
                            "@type": "Article",
                            "name": "` + post.name + `",
                            "headline": "` + post.name + `",
                            "datePublished": "` + postDate.format('YYYY-MM-DD') + `",
                            "dateModified": "` + moment(post.updated_at).format('YYYY-MM-DD') + `",
                            "author": {
                                "@type": "Person",
                                "name": "Pawe?? Dymek",
                                "url": "` + APP_URL + `",
                                "image": {
                                   "@type": "ImageObject",
                                   "url": "` + APP_URL + '/images/home.png' + `",
                                   "caption": "Pawe?? Dymek"
                                }
                            },
                            "publisher": {
                                "@type": "Organization",
                                "name": "Pawe?? Dymek",
                                "url": "` + APP_URL + '/images/home.png' + `",
                                "logo": {
                                   "@type": "ImageObject",
                                   "url": "` + APP_URL + '/images/home.png' + `",
                                   "name": "Pawe?? Dymek"
                                }
                            },
                      
                            `+
                                (post.image !== null
                                    ? `"image": "` + post.image.url + `",`
                                    : `"image": "` + APP_URL + '/images/home.png' + `",`)
                            +`

                            "mainEntityOfPage": {
                                "@type": "WebPage",
                                "@id": "` + APP_URL + '/' + state.locale + router.asPath + `"
                            }
                        }
                        `
                    }}
                />
            </Head>
        </>
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