import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import styled from 'styled-components'
import { Dropdown } from 'semantic-ui-react'
import ProductList from './ProductList';

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function CartShop(props) {
    const [shop, setShop] = useState({})
    const [products, setProducts] = useState([])
    const [amount, setAmount] = useState([]);
    const [shippings, setShippings] = useState([]);
    const [shippingPrice, setShippingPrice] = useState(0);

    useEffect(async () => {

        Axios.post("/api/getShopDetail", JSON.stringify({ shopId: props.shop.shopId }), HEADERS)
            .then(res => {
                let tmpArray = []

                res.data.shipping.map(type => {
                    let tmpShippingObj = {}
                    tmpShippingObj.key = type.type
                    tmpShippingObj.text = type.type + ` (${type.price} บาท)`
                    tmpShippingObj.value = type.price

                    tmpArray.push(tmpShippingObj)
                })
                setShippings(tmpArray);
                setShop(res.data)
            })

        let tmpShopArray = []
        let tmpAmountArray = []

        props.shop.product.map(product => {
            const resPromise = Axios.post('/api/getProductDetail', JSON.stringify({ productId: product.productId }), HEADERS)
            tmpShopArray.push(resPromise)
            tmpAmountArray.push(product.amount)
        })

        const res = await Promise.allSettled(tmpShopArray)
            .then(r =>
                r.map(r => {
                    return r.value.data
                })
            );
        await setProducts(res)
        await setAmount(tmpAmountArray)

    }, [])

    const calculatePrice = () => {
        let totalPrice = 0
        let greenPrice = 0
        let amountPrice = 0
        let count = 0

        if (products.length != 0) {
            products.map((product, index) => {
                amountPrice = amountPrice + ((amount[index] * (product.price + product.greenPrice)))
                totalPrice = totalPrice + ((amount[index] * product.price))
                greenPrice = greenPrice + ((amount[index] * product.greenPrice))
                count = count + 1
            })
        }

        if (!isNaN(totalPrice) && totalPrice != 0) {
            if (localStorage.getItem('totalPrice')) {
                let amountPrice = totalPrice + parseInt(localStorage.getItem('totalPrice'))
                localStorage.setItem('totalPrice', amountPrice)

                let totalGreenPrice = greenPrice + parseInt(localStorage.getItem('greenPrice'))
                localStorage.setItem('greenPrice', totalGreenPrice)
            }
            else {
                localStorage.setItem('totalPrice', totalPrice)
                localStorage.setItem('greenPrice', greenPrice)
            } 
        }

        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div>ยอดสั่งซื้อ ({count} ชิ้น) : {amountPrice} บาท</div>
            </div>
        )
    }


    return (
        <div>

            <ShopContainer>
                <ShopNameLabel>
                    ร้าน {shop.name}
                </ShopNameLabel>

                {
                    (products.length != 0) ?
                        products.map((product, index) =>
                            <ProductList key={index} product={product} amount={amount[index]} />
                        )
                        : ""
                }

                <PriceLabel>
                    <span></span>
                    <span>
                        {
                            calculatePrice()
                        }
                    </span>
                </PriceLabel>
            </ShopContainer>

        </div>
    )
}

const ShopContainer = styled.div`
    box-shadow: 1px 1px 3px #ABB2B9;
    border-radius: 5px;
    align-items: center;
    margin: 10px 50px 10px 50px;
`

const ShopNameLabel = styled.div`
    font-size: 17px;
    padding: 20px 0 20px 37px;
    color: white;
    background-color: #679072;
    border-radius: 5px 5px 0px 0px;
    border-color: #679072;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const PriceLabel = styled.div`
    font-size: 17px;
    margin: 0 0 0 0;
    padding: 15px 35px 15px 0;
    color: #131B15;
    background-color: #EFF4F1;
    border-radius: 0px 0px 0px 0px;
    border-color: #EFF4F1;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
