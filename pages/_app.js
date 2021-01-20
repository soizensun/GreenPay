
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ fontFamily: 'Prompt' }}>

      <Head>
        <title>Green Pay</title>
        <link rel="icon" href="/tree.ico" />
        
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@400&display=swap" rel="stylesheet"/>
      </Head>
      
      <RecoilRoot>
        < Component {...pageProps} />
      </RecoilRoot>

    </div>
  )
}

export default MyApp
