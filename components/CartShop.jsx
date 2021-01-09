import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import styled from 'styled-components'

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function CartShop(props) {
    const [shop, setShop] = useState({})
    const [products, setProducts] = useState([])
    const [amount, setAmount] = useState([]);

    useEffect(async () => {

        Axios.post("/api/getShopDetail", JSON.stringify({ shopId: props.shop.shopId }), HEADERS)
            .then(res => {
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

    return (
        <div>

            <ShopContainer>
                <ProductContainer>
                    {shop.name}
                    {
                        (products.length != 0) ?
                            products.map((product, index) =>
                                <div>{product.name}{amount[index]}</div>
                            )
                            : ""
                    }
                </ProductContainer>
            </ShopContainer>


        </div>
    )
}

const ShopContainer = styled.div`
    box-shadow: 1px 1px 5px #ABB2B9;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    padding: 8px;

    &:hover{
        box-shadow: 2px 2px 7px 2px #ABB2B9;
        transition: 0.3s;
    }
`
const ProductContainer = styled.div`

`
