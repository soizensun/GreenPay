import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import { GrGoogle } from "react-icons/gr";
import Axios from 'axios'
import { GoogleLogin } from 'react-google-login';
import { ImSearch } from "react-icons/im";
import { BiCartAlt } from "react-icons/bi";
import styled from 'styled-components'

const HEADERS = { 'Content-Type': 'application/json' }


const LoginButton = styled.button`
    border: none;
    background: none;
    color: #ABB686;

    &:hover {
        color: #DBEAC9;
    }
`

export default function MainLayout(props) {

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
            <Navbar collapseOnSelect variant="dark" sticky="top" style={{ backgroundColor: "#56762E", height: "40px" }}>
                <Nav className="mr-auto">
                    <Nav.Link>วิธีขาย</Nav.Link>
                    <Nav.Link>วิธีสั่งซื้อ</Nav.Link>
                    <Link href="/Test" passHref>
                        <Nav.Link>เกี่ยวกับ GreenPay</Nav.Link>
                    </Link>

                </Nav>
                <Nav>
                    <Link href="/" passHref>
                        <Nav.Link>
                            <GoogleLogin
                                clientId="1068628232562-qm0ssc22ls4ks62jcopg1frqbdau8jau.apps.googleusercontent.com"
                                render={renderProps => (
                                    <LoginButton onClick={renderProps.onClick}>
                                        <GrGoogle style={{ marginRight: "5px", marginBottom: "3px" }} />Login
                                    </LoginButton>
                                )}
                                buttonText="Login with google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </Nav.Link>


                    </Link>
                </Nav>
            </Navbar>


            <Navbar collapseOnSelect variant="dark" sticky="top" style={{ backgroundColor: "#6D953A", height: "70px" }}>
                <Link href="/Home" passHref>
                    <Navbar.Brand href="">GreenPay</Navbar.Brand>
                </Link>
                <Nav className="mr-auto">
                </Nav>
                <Nav>
                    <Link href="/" passHref>
                        <Nav.Link><BiCartAlt style={{fontSize: "23px", marginRight: "17px"}}/></Nav.Link>
                    </Link>
                    <Form inline>
                        <FormControl type="text" size="sm" placeholder="ค้นหาสินค้า หรือร้านค้า" className="mr-sm-2" />
                        <ImSearch style={{color: "#DBEAC9", fontSize: "17px"}}/> 
                    </Form>

                </Nav>
            </Navbar>

            {props.children}
        </div>
    )
}
