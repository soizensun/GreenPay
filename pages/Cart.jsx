import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import MainLayout from "../layouts/MainLayout";
import CartShop from '../components/CartShop'

let HEADERS = { headers: { "Content-Type": "application/json" } }

export default function Cart() {
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        (typeof window !== "undefined") ?
            (localStorage.getItem("userToken") != null) ?
                Axios.post('api/loginUser', JSON.stringify({ "tokenId": localStorage.getItem("userToken") }), HEADERS)
                    .then(res => {
                        Axios.post('/api/getCart', { "userId": res.data._id }, HEADERS)
                            .then(res => {
                                let realCart = filter(res.data.product)
                                setCarts(realCart)
                            })
                    }) : ""
            : ""

    }, []);

    const filter = (allproduct) => {
        let shopList = []
        let realCart = []
        if (allproduct) {
            allproduct.map(product => {
                if (!shopList.includes(product.shopId)) {
                    shopList.push(product.shopId)
                }
            })
            
            shopList.map(shopId => {
                var tmpArray = {}
                let tmp = []
                allproduct.map(product => {
                    if(product.shopId == shopId) return tmp.push(product)
                })
                tmpArray.shopId = shopId
                tmpArray.product = tmp

                realCart.push(tmpArray)
            })
        }
        return realCart
    }


    return (

        <MainLayout>
            <div>
                {
                    carts ?
                        carts.map(shop =>
                            <CartShop shop={shop} />
                        )
                        : ""
                }
            </div>
        </MainLayout>
    )
}
