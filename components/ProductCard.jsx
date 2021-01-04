import React from 'react'
import styled from 'styled-components'

export default function ProductCard(props) {
    return (
        <div>
            <Card>
                <Image/>
                <Name>{props.name || "product name "}</Name>
                <Price>{props.price || "25 บาท"}</Price>
            </Card>
        </div>
    )
}

const Card = styled.div`
    width: 220px;
    height: 220px;
    box-shadow: 1px 1px 5px #ABB2B9;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    &:hover{
        box-shadow: 2px 2px 7px 2px #ABB2B9;
        transition: 0.4s;
    }
`

const Image = styled.div`
    width: 110px;
    height: 110px;
    background-image: url('https://backend.tops.co.th/media//catalog/product/3/4/3415581119183_e29-03-2019.jpg');
    background-size: 110px 110px;
`

const Name = styled.div`
    margin-top: 20px;
    font-size: 19px;

`

const Price = styled.div`
    margin-top: 5px;
    font-size: 19px
`
