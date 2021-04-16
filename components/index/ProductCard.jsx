import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import NumberFormat from 'react-number-format';
import ShopBadge from '../index/ShopBadge'

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function ProductCard(props) {



    return (
        <div>
            <Link href="/ProductDetails">
                <Card onClick={() => localStorage.setItem("productDetail", props.id)}>
                    {/* {props.shopId} */}

                    <Image imageUrl={props.imageUrl} />

                    <Name>{props.name || "product name "}</Name>
                    <NumberFormat value={props.price || "-"} displayType={'text'} thousandSeparator={true} renderText={value => <Price>{value} บาท</Price>} />
                    <div style={{ marginTop: "14px" }}>
                        <ShopBadge shopId={props.shopId} />
                    </div>

                </Card>
            </Link>
        </div>
    )
}

const Card = styled.div`
    width: 270px;
    height: 300px;
    border: 1px solid #CDCDCF;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 8px;
    cursor: pointer;
    padding: 16px;
    background-color: white;

    &:hover{
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
        transition: 0.3s;
    }
`

const Image = styled.div`
    width: 110px;
    height: 110px;
    background-image: url(${props => props.imageUrl || "https://backend.tops.co.th/media//catalog/product/3/4/3415581119183_e29-03-2019.jpg"});
    background-size: 110px 110px;
`

const Name = styled.div`
    margin-top: 30px;
    font-size: 19px;
    color: #185341;
    font-weight: bold;
    margin-bottom: 5px;
    text-align: center;
`

const Price = styled.div`
    margin-top: 15px;
    font-size: 17px;
    font-weight: bold;
`


