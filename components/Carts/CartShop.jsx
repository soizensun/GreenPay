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
    const [shipings, setShipings] = useState([]);

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
                setShipings(tmpArray);
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
                <ShopNameLabel>
                    ร้าน {shop.name}
                    <div>
                        <label>เลือกช่องทางการส่ง </label>
                        <Dropdown
                            placeholder='ช่องทางการส่ง'
                            selection
                            options={shipings}
                            style={{ marginRight: "20px", marginLeft: "10px" }}
                            onChange={(e, { value }) => console.log(value)}
                        />
                    </div>

                </ShopNameLabel>
                {
                    (products.length != 0) ?
                        products.map((product, index) =>
                            <ProductList product={product} amount={amount[index]} />
                        )
                        : ""
                }

            </ShopContainer>


        </div>
    )
}

const ShopContainer = styled.div`
    box-shadow: 1px 1px 3px #ABB2B9;
    /* border-style: solid;
    border-width: 1px; */
    border-radius: 5px;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 30px;
    margin-right: 30px;
    /* background-color: #F8F9F9; */
`

const ShopNameLabel = styled.div`
    font-size: 17px;
    padding-left: 37px;
    padding-bottom: 10px;
    padding-top: 10px;
    color: white;
    background-color: #679072;
    border-radius: 5px 5px 0px 0px;
    border-color: #679072;
    display: flex;
    justify-content: space-between;
    align-items: center;

`
