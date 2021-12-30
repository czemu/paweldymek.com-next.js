import Image from 'next/image'
import Link from 'next/link'
import classNames from 'classnames/bind';
import profilePhoto from '../../../public/images/pawel_dymek.jpg'
import styles from './Sidebar.module.scss'

let cx = classNames.bind(styles);

export default function Sidebar(props) {
    return (
        <aside className={cx({aside: true, asideSimple: props.simple})}>
            <header>
                <div className={styles.author}>
                    <div className={cx({imageWrap: true, imageWrapSmall: props.simple})}>
                        <Link href={'/'}>
                            <a>
                                <Image
                                    className={styles.image}
                                    src={profilePhoto}
                                    width={180}
                                    height={180}
                                    alt="Paweł Dymek"
                                />
                            </a>
                        </Link>
                    </div>
                    {props.simple !== true
                        ?
                            <>
                                <h1 className={styles.header}>Paweł Dymek</h1>
                                <span className={styles.subheader}>Software Developer</span>
                            </>
                        :
                            <span className={cx({header: true, headerSmall: true})}>Paweł Dymek</span>
                    }
                </div>

                {props.title && <h1 className={styles.title}><span>{props.title}</span></h1>}
            </header>

            {props.simple !== true &&
                <ul className={styles.icons}>
                    <li>
                        <a href="https://github.com/czemu" title="GitHub" target="_blank" rel="noreferrer"><i className="icon-github-circled"></i></a>
                    </li>
                    <li>
                        <a href="https://twitter.com/pawel_dymek" title="Twitter" target="_blank" rel="noreferrer"><i className="icon-twitter"></i></a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/pawel-dymek/" title="LinkedIn" target="_blank" rel="noreferrer"><i className="icon-linkedin-squared"></i></a>
                    </li>
                    <li>
                        <a href="mailto:pawel.dymek@gmail.com" title="E-mail" rel="noreferrer"><i className="icon-mail-alt"></i></a>
                    </li>
                </ul>
            }
        </aside>
    )
}