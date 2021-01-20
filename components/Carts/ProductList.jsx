import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import styled from 'styled-components'
import CustomButton from "../util/CustomButton";
import { AiTwotoneDelete } from "react-icons/ai";

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function ProductCartList(props) {

    return (

        <div>
            <ProductContainer>
                <ProductImage imageUrl={props.product.mainPicture} />

                <ProductName>
                    {props.product.name}
                </ProductName>

                <ProductAmount>
                    <Counter>
                        <span onClick={() => {
                            (localStorage.getItem("userToken") != null) ?
                                Axios.post('api/addOrDeleteAProductInCart', JSON.stringify({
                                    "tokenId": localStorage.getItem("userToken"),
                                    "productId": props.product._id,
                                    "amount": -1
                                }), HEADERS)
                                    .then(res => {
                                        console.log(res.data);
                                        window.location.reload();
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                                : ""
                        }}>
                            <CustomButton buttonText="-" width="30px" height="30px" backgroundColor="#17202A" />
                        </span>
                        <ShowCount>{props.amount}</ShowCount>
                        <span onClick={() => {
                            (localStorage.getItem("userToken") != null) ?
                                Axios.post('api/addOrDeleteAProductInCart', JSON.stringify({
                                    "tokenId": localStorage.getItem("userToken"),
                                    "productId": props.product._id,
                                    "amount": 1
                                }), HEADERS)
                                    .then(res => {
                                        console.log(res.data);
                                        window.location.reload();
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                                : ""
                        }} >
                            <CustomButton buttonText="+" width="30px" height="30px" backgroundColor="#17202A" />
                        </span>
                    </Counter>
                </ProductAmount>

                <ProductPrice>
                    {props.product.price + props.product.greenPrice} บาท (+ {props.product.greenPrice} บาท)
                </ProductPrice>

                <ProductAmountPrice>
                    รวม {(props.product.price + props.product.greenPrice) * props.amount} บาท
                </ProductAmountPrice>

                <ProductDeleteIcon>
                    <span onClick={() => {
                        (localStorage.getItem("userToken") != null) ?
                            Axios.post('api/addOrDeleteAProductInCart', JSON.stringify({
                                "tokenId": localStorage.getItem("userToken"),
                                "productId": props.product._id,
                                "amount": (props.amount) * -1
                            }), HEADERS)
                                .then(res => {
                                    console.log(res.data);
                                    window.location.reload();
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                            : ""
                    }}>
                        <AiTwotoneDelete />
                    </span>
                </ProductDeleteIcon>

            </ProductContainer>
        </div>
    )
}

const ProductContainer = styled.div`
    height: 90px;
    font-size: 17px;
    display: flex;
    align-items: stretch;
    align-items: center;
    padding-bottom: 20px;
    padding-top: 20px;

    /* &:hover{
        box-shadow: 1px 1px 5px 1px #F4F7F5;
        transition: 0.3s;
        background-color: #F4F7F5;
    } */
`

const ProductImage = styled.div`
    /* flex-grow: 1; */
    margin-left: 30px;
    margin-right: 50px;
    width: 70px;
    height: 70px;
    background-image: url(${props => props.imageUrl || "https://backend.tops.co.th/media//catalog/product/3/4/3415581119183_e29-03-2019.jpg"});
    background-size: 70px 70px;

`

const ProductName = styled.div`
    width: 200px;
    flex-grow: 2;
`
const ProductAmount = styled.div`
    flex-grow: 1;
`

const ProductPrice = styled.div`
    width: 100px;
    flex-grow: 1;
`

const ProductAmountPrice = styled.div`
    flex-grow: 1;
`

const ProductDeleteIcon = styled.div`
    margin-right: 30px;
    font-size: 28px;
    color: #EC7063;
`

const Counter = styled.div`
    margin-top: 15px;
    margin-bottom: 15px;
`

const ShowCount = styled.span`
    margin: 10px;
`