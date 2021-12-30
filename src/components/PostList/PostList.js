import PostListItem from '../PostListItem/PostListItem'
import styles from './PostList.module.scss'

export default function PostList({ posts }) {
    return (
        <section className={styles.wrapper}>
            {posts.map(post => (
                <PostListItem post={post} key={post.id} />
            ))}
        </section>
    )
}