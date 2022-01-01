import { useContext } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { API_URL } from '../../config/api'
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
                                {t('posted')} <time dateTime={moment(post.created_at).format('YYYY-MM-DD')} title={moment(post.created_at).format('YYYY-MM-DD')}>
                                    {moment(post.created_at).fromNow()}
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