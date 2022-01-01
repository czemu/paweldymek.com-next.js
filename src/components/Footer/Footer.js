import Link from 'next/link'
import { useContext } from 'react'
import { Context } from '../../store/store'
import styles from './Footer.module.scss'

export default function Footer() {
    const [state, dispatch] = useContext(Context);

    return (
        <footer className={styles.footer}>
            <p className="copyright">
                Copyright &copy; 2021 <Link href={'/'}>paweldymek.com</Link>
            </p>

            <ul className="links">
                <li>
                    {state.locale === 'pl'
                        ? <Link href={'/'} locale="en">English version</Link>
                        : <Link href={'/'} locale="pl">Wersja polska</Link>
                    }
                </li>
            </ul>
        </footer>
    )
}