import { useContext } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Context } from '../../store/store'
import styles from './PostListItem.module.scss'

export default function PostListItem({ post }) {
    const [state, dispatch] = useContext(Context);
    const { t } = useTranslation('post');
    
    return (
        <article className={styles.article}>
            <header>
                <h3>
                    {post.external_url === null
                    ? <Link href={'/posts/'+post.slug}>{post.name}</Link>
                    : <a href={post.external_url} target="_blank" rel="nofollow noopener noreferrer">{post.name}</a>
                    }
                </h3>
                <div className={styles.headerBottom}>
                    <span>
                        {t('posted')}
                        <time dateTime={post.created_at} title={post.created_at}>
                            {new Date(post.created_at).toLocaleDateString(state.locale, {year: 'numeric', month: 'long', day: 'numeric'})
                        }</time>
                    </span>
                </div>
            </header>
            <p>{post.intro}</p>
        </article>
    )
}