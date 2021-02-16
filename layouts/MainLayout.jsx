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
    const [currentUser, setCurrentUser] = useState({});
    const [cart, setCart] = useState({});
    const [userShop, setUserShop] = useState({});

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("userToken") != null) {

                Axios.post('api/loginUser', JSON.stringify({ "tokenId": localStorage.getItem("userToken") }), { headers: HEADERS })
                    .then(res => {
                        setCurrentUser(res.data)
                        Axios.post('/api/getCart', { "userId": res.data._id }, HEADERS)
                            .then(r => {
                                setCart(r.data)
                            })

                        Axios.post('api/getOwnerShop', JSON.stringify({ "tokenId": localStorage.getItem("userToken") }), { headers: HEADERS })
                            .then(r => {
                                localStorage.setItem("userShop", r.data._id)
                                // window.location.reload();
                                setUserShop(r.data)
                            })
                        
                    })
            }
        }
    }, [])

    const responseGoogle = (response) => {

        Axios.post('/api/googleAuth', JSON.stringify({ "tokenId": response.tokenId }), { headers: HEADERS })
            .then(res => {
                localStorage.setItem("userToken", res.data.token)

                Axios.post('api/loginUser', JSON.stringify({ "tokenId": localStorage.getItem("userToken") }), { headers: HEADERS })
                    .then(res => {
                        setCurrentUser(res.data)

                        Axios.post('api/getOwnerShop', JSON.stringify({ "tokenId": localStorage.getItem("userToken") }), { headers: HEADERS })
                            .then(r => {
                                localStorage.setItem("userShop", r.data._id)
                                setUserShop(r.data)
                                window.location.reload();
                            })
                    })
            })
    }

    const logout = () => {
        localStorage.removeItem('userToken')
        localStorage.removeItem('userShop')
        setCurrentUser({})
        // window.location.reload();
    }

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
                        {currentUser.displayName}
                    </Nav.Link>
                    {
                        (Object.keys(currentUser).length !== 0) ?
                            <Link href="/" passHref>
                                <Nav.Link
                                    style={{ color: "#2C3E50" }}
                                    onClick={logout}>
                                    <FaSignOutAlt /> logout
                            </Nav.Link>
                            </Link>
                            :
                            <Nav.Link>
                                <GoogleLogin
                                    clientId="1068628232562-qm0ssc22ls4ks62jcopg1frqbdau8jau.apps.googleusercontent.com"
                                    render={renderProps => (
                                        <LoginButton onClick={renderProps.onClick} style={{ color: "#2C3E50" }}>
                                            <GrGoogle style={{ marginRight: "5px", marginBottom: "3px" }} />Login
                                        </LoginButton>
                                    )}
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </Nav.Link>
                    }

                </Nav>
            </Navbar>

            <Navbar collapseOnSelect variant="dark" sticky="top" style={{ backgroundColor: "#185341", height: "70px", borderRadius: "0px 0px 10px 10px", fontSize: "16px" }}>
                <Link href="/" passHref>
                    <Navbar.Brand style={{ marginLeft: "18px" }} href="">GreenPay</Navbar.Brand>
                </Link>
                <Nav className="mr-auto">
                    {
                        (typeof window !== "undefined") &&
                        (
                            (localStorage.getItem('userShop') !== null && localStorage.getItem('userShop') !== 'undefined') &&
                            <Link href="/ShopManagement" passHref>
                                <Nav.Link style={{ color: "white" }}>จัดการร้านค้า</Nav.Link>
                            </Link>
                        )
                    }
                    {
                        currentUser.role &&
                        (
                            ((currentUser.role).includes('admin')) &&
                            <Link href="/AdminConsole" passHref>
                                <Nav.Link style={{ color: "white" }}>สำหรับ admin</Nav.Link>
                            </Link>
                        )
                    }
                </Nav>
                <Nav>
                    {
                        (Object.keys(currentUser).length !== 0) &&
                        (
                            (Object.keys(cart).length !== 0) && (
                                <Link href="/Cart" passHref>
                                    <Nav.Link>
                                        <Badge badgeContent={cart.product.length} color="secondary">
                                            <BiCartAlt style={{ fontSize: "23px", marginRight: "5px", color: "white" }} />
                                        </Badge>
                                    </Nav.Link>
                                </Link>
                            )

                        )
                    }

                    <Search
                        style={{ marginLeft: "20px" }}
                        size='mini'
                    />
                </Nav>
            </Navbar>

            {props.children}
        </div>
    )
}
