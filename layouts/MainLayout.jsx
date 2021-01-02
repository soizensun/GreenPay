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
import { Search } from 'semantic-ui-react'


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
            <Navbar collapseOnSelect variant="dark" sticky="top" style={{ backgroundColor: "#185341", height: "35px", fontSize: "12px" }}>
                <Nav className="mr-auto" style={{ marginLeft: "14px" }}>
                    <Nav.Link style={{ color: "white" }}>วิธีขาย</Nav.Link>
                    <Nav.Link style={{ color: "white" }}>วิธีสั่งซื้อ</Nav.Link>
                    <Link href="/Test" passHref>
                        <Nav.Link style={{ color: "white" }}>เกี่ยวกับ GreenPay</Nav.Link>
                    </Link>
                </Nav>
                <Nav>
                    <Link href="/" passHref>
                        <Nav.Link>
                            <GoogleLogin
                                clientId="1068628232562-qm0ssc22ls4ks62jcopg1frqbdau8jau.apps.googleusercontent.com"
                                render={renderProps => (
                                    <LoginButton onClick={renderProps.onClick} style={{ color: "white" }}>
                                        <GrGoogle style={{ marginRight: "5px", marginBottom: "1px" }} />Login
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


            <Navbar collapseOnSelect variant="dark" sticky="top" style={{ backgroundColor: "#185341", height: "49px", borderRadius: "0px 0px 10px 10px", fontSize: "13px" }}>
                <Link href="/Home" passHref>
                    <Navbar.Brand style={{ marginLeft: "18px" }} href="">GreenPay</Navbar.Brand>
                </Link>
                <Nav className="mr-auto">
                    {/* <Search
                    size='mini'
                        // loading={loading}
                        // onResultSelect={(e, data) =>
                        //     dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
                        // }
                        // onSearchChange={handleSearchChange}
                        // results={results}
                        // value={value}
                    /> */}
                    <Nav.Link style={{ color: "white" }}>menu1</Nav.Link>
                    <Nav.Link style={{ color: "white" }}>menu2</Nav.Link>
                    <Nav.Link style={{ color: "white" }}>menu3</Nav.Link>
                    <Nav.Link style={{ color: "white" }}>menu4</Nav.Link>
                </Nav>
                <Nav>
                    <Link href="/" passHref>
                        <Nav.Link><BiCartAlt style={{ fontSize: "23px", marginRight: "17px", color: "white" }} /></Nav.Link>
                    </Link>
                </Nav>
            </Navbar>

            {props.children}
        </div>
    )
}
