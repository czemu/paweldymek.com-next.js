import Store from '../store/store'
import CookieAlert from '../components/CookieAlert/CookieAlert';
import { appWithTranslation } from 'next-i18next';
import { CookiesProvider } from 'react-cookie';
import '../styles/main.scss'

function MyApp({ Component, pageProps }) {
  return (
    <Store>
      <CookiesProvider>
        <Component {...pageProps} />
        <CookieAlert />
      </CookiesProvider>
    </Store>
  )
}
  
export default appWithTranslation(MyApp)