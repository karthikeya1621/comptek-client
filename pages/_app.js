import Header from '../components/Header/Header'
import '../styles/globals.scss'
import 'swiper/css'
import Footer from "components/Footer/Footer"

function MyApp({ Component, pageProps }) {
  return <>
    <Header />
    <Component {...pageProps} />
    <Footer />
  </>
}

export default MyApp
