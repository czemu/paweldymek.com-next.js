import { useContext } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Context } from '../../store/store'
import TagList from '../../components/TagList/TagList'
import styles from './PostListItem.module.scss'
import moment from 'moment'
import 'moment/locale/pl'

export default function PostListItem({ post }) {
    const [state, dispatch] = useContext(Context);
    const { t } = useTranslation('post');

    moment.locale(state.locale);

    return (
        <article className={styles.article}>
            <header className={styles.header}>
                <h3>
                    {post.external_url === null
                        ? <Link href={'/post/'+post.slug}>{post.name}</Link>
                        : <a href={post.external_url} target="_blank" rel="nofollow noopener noreferrer">{post.name}</a>
                    }
                </h3>
                <div className={styles.topDetails}>
                    <span>
                        {t('posted')} <time dateTime={moment(post.created_at).format('YYYY-MM-DD')} title={moment(post.created_at).format('YYYY-MM-DD')}>
                            {moment(post.created_at).fromNow()}
                        </time>
                    </span>
                    <span>
                        {post.external_url === null
                            ? t('read-time', {time: post.read_time})
                            : <a href={post.external_url} target="_blank" rel="nofollow noopener noreferrer"><i className="icon-link-ext"></i>{new URL(post.external_url).hostname}</a>
                        }
                    </span>
                </div>
            </header>
            <p>{post.intro}</p>
            <p className={styles.readMore}>
                {post.external_url === null
                    ? <Link href={'/post/'+post.slug}>{t('read-more')}</Link>
                    : <a href={post.external_url} target="_blank" rel="nofollow noopener noreferrer">{t('read-more')}</a>
                }
            </p>
            {post.tags.length &&
                <TagList tags={post.tags} />
            }
        </article>
    )
}