import { useTranslation } from 'next-i18next'
import { useCookies } from 'react-cookie'
import styles from './CookieAlert.module.scss'

export default function CookieAlert() {
    const [cookies, setCookie] = useCookies(['cookie_alert']);
    const { t } = useTranslation('common');

    function closeAlert() {
        let date = new Date();
        
        date.setTime(date.getTime() + (1000 * 60 * 60 * 24 * 180)); // 180 days

        setCookie('cookie_alert', 1, { path: '/', expires: date });
    }

    if ( ! cookies.cookie_alert) {
        return (
            <div className={styles.cookieAlert}>
                <div className={styles.inner}>
                    <div>{t('cookie-alert')}</div>
                    <div>
                        <button className="btn btn-light btn-sm" onClick={closeAlert}><i className="icon-cancel"></i>{t('close')}</button>
                    </div>
                </div>
            </div>
        )
    }

    return null;
}