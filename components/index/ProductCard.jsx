import Link from 'next/link'
import React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { clickedProduct as clickedProductAtom } from "../../recoil/atoms";

export default function ProductCard(props) {
    const [clickedProduct, setClickedProduct] = useRecoilState(clickedProductAtom)


    return (
        <div>
            <Link href="/ProductDetails">
                <Card onClick={() => localStorage.setItem("productDetail", props.id)}>
                    {/* {props.shopId} */}
                    <Image imageUrl={props.imageUrl} />
                    <Name>{props.name || "product name "}</Name>
                    <Price>{props.price || "-"} บาท (+ {props.greenPrice} บาท)</Price>
                </Card>
            </Link>

        </div>
    )
}

const Card = styled.div`
    width: 230px;
    height: 250px;
    box-shadow: 1px 1px 5px #ABB2B9;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    cursor: pointer;
    padding: 8px;

    &:hover{
        box-shadow: 2px 2px 7px 2px #ABB2B9;
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
    text-align: center
`

const Price = styled.div`
    margin-top: 15px;
    font-size: 17px
`
