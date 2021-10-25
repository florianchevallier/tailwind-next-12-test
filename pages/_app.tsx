import '../styles/globals.css'
if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks')
}
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next';
import NextI18nextConfig from '../next-i18next.config'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default appWithTranslation(MyApp, NextI18nextConfig)
