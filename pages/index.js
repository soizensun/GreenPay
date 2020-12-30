import { useEffect } from 'react'
import MainLayout from "../layouts/MainLayout";
import { GoogleLogin } from 'react-google-login';
import Axios from 'axios'


const HEADERS = { 'Content-Type': 'application/json' }
export default function Home() {

  const responseGoogle = (response) => {
    console.log(response);

    Axios.post('/api/googleAuth', JSON.stringify({ "tokenId": response.tokenId }), { headers: HEADERS })
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
    })
  }

    return (
      <div>
        <MainLayout>

          <main>
            <GoogleLogin
              clientId="1068628232562-qm0ssc22ls4ks62jcopg1frqbdau8jau.apps.googleusercontent.com"
              buttonText="Login with google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </main>
        </MainLayout>
      </div>
    )
  }




