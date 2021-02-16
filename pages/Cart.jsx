import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import MainLayout from "../layouts/MainLayout";
import CartShop from '../components/Carts/CartShop'
import AddressSection from '../components/Carts/AddressSection'
import CustomButton from '../components/util/CustomButton'
import ConfirmCartModal from '../components/Carts/ConfirmCartModal'
import Skeleton from '@material-ui/lab/Skeleton';
import NoItem from '../components/util/NoItem'
import styled from 'styled-components'

let HEADERS = { headers: { "Content-Type": "application/json" } }

export default function Cart() {
    const [carts, setCarts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tmpCart, setTmpCart] = useState([]);
    const [userId, setUserId] = useState("");
    const [disableBtn, setDisableBtn] = useState(false);

    useEffect(() => {

        if (typeof window !== "undefined") {
            localStorage.removeItem('totalPrice')
            localStorage.removeItem('greenPrice')
        }

        (typeof window !== "undefined") ?
            (localStorage.getItem("userToken") != null) ?
                Axios.post('api/loginUser', JSON.stringify({ "tokenId": localStorage.getItem("userToken") }), HEADERS)
                    .then(res => {
                        setUserId(res.data._id)
                        Axios.post('/api/getCart', { "userId": res.data._id }, HEADERS)
                            .then(res => {
                                setTmpCart(res.data.product)
                                let realCart = filter(res.data.product)
                                setCarts(realCart)
                                setIsLoading(false)
                            })
                    }) : ""
            : ""

    }, []);

    const filter = (allProduct) => {
        let shopList = []
        let realCart = []
        
        if (allProduct) {
            allProduct.map(product => {
                if (!shopList.includes(product.shopId)) {
                    shopList.push(product.shopId)
                }
            })

            shopList.map(shopId => {
                let tmpArray = {}
                let tmp = []
                allProduct.map(product => {
                    if (product.shopId == shopId) return tmp.push(product)
                })
                tmpArray.shopId = shopId
                tmpArray.product = tmp

                realCart.push(tmpArray)
            })
        }
        return realCart
    }

    const disableNextBtn = () => {setDisableBtn(true)}

    return (

        <MainLayout>
            {
                isLoading ?
                    <div>
                        <div style={{ margin: "0 30px 0 30px" }}>
                            <Skeleton animation="wave" variant="rect" height={70} />
                        </div>

                        <div style={{ margin: "10px 30px 0 30px" }}>
                            <Skeleton animation="wave" variant="rect" height={250} />
                        </div>

                        <div style={{ margin: "10px 30px 0 30px" }}>
                            <Skeleton animation="wave" variant="rect" height={500} />
                        </div>
                    </div>
                    :
                    <div>
                        {
                            (carts.length !== 0) ?
                                <div>
                                    {
                                        carts.map(shop =>
                                            <CartShop shop={shop} disableNextBtn={disableNextBtn}/>
                                        )
                                    }

                                    <CartFooter>
                                        <span></span>
                                        <ConfirmCartModal buttonStyle={
                                            <span>
                                                <CustomButton
                                                    buttonText="ถัดไป"
                                                    disabled={disableBtn}
                                                />
                                            </span>
                                        } />
                                    </CartFooter>
                                </div>
                                :
                                <NoItem/>
                        }
                    </div>
            }
        </MainLayout>
    )
}

const CartFooter = styled.div`
    font-size: 17px;
    margin: 25px 0 0 0;
    padding: 15px 50px 15px 0;
    border-color: #F7F9F8;
    display: flex;
    justify-content: space-between;
    align-items: center;
`