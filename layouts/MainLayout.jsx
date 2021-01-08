import react, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'
import Axios from 'axios'
import { GoogleLogin } from 'react-google-login';
import { GrGoogle } from "react-icons/gr";
import { BiCartAlt } from "react-icons/bi";
import styled from 'styled-components'
import { Search } from 'semantic-ui-react'
import Badge from '@material-ui/core/Badge';
import { FaSignOutAlt } from "react-icons/fa";
import {currentUser as currentUserAtom} from '../recoil/atoms'
import { useRecoilState } from 'recoil';


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
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

    const responseGoogle = (response) => {
        console.log(response);

        Axios.post('/api/googleAuth', JSON.stringify({ "tokenId": response.tokenId }), { headers: HEADERS })
            .then(res => {
                localStorage.setItem("userToken", res.data.token)

                Axios.post('api/loginUser', JSON.stringify({ "tokenId": localStorage.getItem("userToken") }), { headers: HEADERS })
                    .then(res => {
                        console.log(res.data);
                        setCurrentUser(res.data)
                    })
            })
    }

    useEffect(() => {
        (typeof window !== "undefined") ?
            (localStorage.getItem("userToken") != null) ?
                Axios.post('api/loginUser', JSON.stringify({ "tokenId": localStorage.getItem("userToken") }), { headers: HEADERS })
                    .then(res => {
                        console.log(res.data);
                        setCurrentUser(res.data)
                    })
                :
                ""
            :
            ""
    }, [])

    return (
        <div style={{ paddingBottom: "70px" }}>
            <Navbar collapseOnSelect variant="dark" sticky="top" style={{ backgroundColor: "white", height: "40px", fontSize: "15px" }}>
                <Nav className="mr-auto" style={{ marginLeft: "14px" }}>
                    <Nav.Link style={{ color: "#2C3E50" }}>วิธีขาย</Nav.Link>
                    <Nav.Link style={{ color: "#2C3E50" }}>วิธีสั่งซื้อ</Nav.Link>
                    <Link href="/Test" passHref>
                        <Nav.Link style={{ color: "#2C3E50" }}>เกี่ยวกับ GreenPay</Nav.Link>
                    </Link>
                </Nav>
                <Nav>
                    <Nav.Link style={{ color: "#2C3E50" }}>
                        {currentUser.displayName}{console.log(currentUser)}
                    </Nav.Link>
                    {
                        // console.log(user)
                        (Object.keys(currentUser).length !== 0) ?
                            <Nav.Link
                                style={{ color: "#2C3E50" }}
                                onClick={() => {
                                    localStorage.removeItem('userToken')
                                    setCurrentUser({})
                                }}>
                                <FaSignOutAlt /> logout
                            </Nav.Link>
                            :
                            <Nav.Link>
                                <GoogleLogin
                                    clientId="1068628232562-qm0ssc22ls4ks62jcopg1frqbdau8jau.apps.googleusercontent.com"
                                    render={renderProps => (
                                        <LoginButton onClick={renderProps.onClick} style={{ color: "#2C3E50" }}>
                                            <GrGoogle style={{ marginRight: "5px", marginBottom: "3px" }} />Login
                                        </LoginButton>
                                    )}
                                    buttonText="Login with google"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </Nav.Link>
                    }

                </Nav>
            </Navbar>


            <Navbar collapseOnSelect variant="dark" sticky="top" style={{ backgroundColor: "#185341", height: "85px", borderRadius: "0px 0px 10px 10px", fontSize: "16px" }}>
                <Link href="/" passHref>
                    <Navbar.Brand style={{ marginLeft: "18px" }} href="">GreenPay</Navbar.Brand>
                </Link>
                <Nav className="mr-auto">
                    <Nav.Link style={{ color: "white" }}>โครงการสิ่งแวดล้อม</Nav.Link>
                    {/* <Nav.Link style={{ color: "white" }}>menu2</Nav.Link>
                    <Nav.Link style={{ color: "white" }}>menu3</Nav.Link>
                    <Nav.Link style={{ color: "white" }}>menu4</Nav.Link> */}
                </Nav>
                <Nav>
                    {/* <Link href="/MyCart" passHref> */}
                    <Nav.Link>
                        <Badge badgeContent={8} color="secondary">
                            <BiCartAlt style={{ fontSize: "23px", marginRight: "5px", color: "white" }} />
                        </Badge>
                    </Nav.Link>
                    {/* </Link> */}

                    <Search
                        style={{ marginLeft: "20px" }}
                        size='mini'
                    // loading={loading}
                    // onResultSelect={(e, data) =>
                    //     dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
                    // }
                    // onSearchChange={handleSearchChange}
                    // results={results}
                    // value={value}
                    />
                </Nav>
            </Navbar>

            {props.children}
            {/* <Footer>asdfasfd</Footer> */}
        </div>
    )
}
