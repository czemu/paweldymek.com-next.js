import Link from 'next/link'
import styles from './TagList.module.scss'

export default function TagList({ tags }) {
    return (
        <ul className={styles.tags}>
            {tags.map(tag => (
                <li key={tag.id}>
                    <Link href={'/tag/'+tag.slug}>{tag.name}</Link>
                </li>
            ))}
        </ul>
    )
}