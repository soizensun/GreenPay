
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
        
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@400&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" type="text/css" href="semantic/dist/semantic.min.css" />
        <script
          src="https://code.jquery.com/jquery-3.1.1.min.js"
          integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
          crossorigin="anonymous"></script>
        <script src="semantic/dist/semantic.min.js"></script>
      </Head>
      
      <RecoilRoot>
        < Component {...pageProps} />
      </RecoilRoot>

    </div>
  )
}

export default MyApp
