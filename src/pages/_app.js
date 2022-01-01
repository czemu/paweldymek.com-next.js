import { appWithTranslation } from 'next-i18next'
import Store from '../store/store'
import { CookiesProvider } from 'react-cookie'
import Layout from '../components/Layout/Layout'
import '../styles/main.scss'

function MyApp({ Component, pageProps }) {
  return (
    <Store>
      <CookiesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CookiesProvider>
    </Store>
  )
}
  
export default appWithTranslation(MyApp)