import Store from '../store/store'
import { appWithTranslation } from 'next-i18next';
import '../styles/main.scss'

function MyApp({ Component, pageProps }) {
  return (
    <Store>
      <Component {...pageProps} />
    </Store>
  )
}
  
export default appWithTranslation(MyApp)