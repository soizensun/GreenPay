import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Axios from 'axios'

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function ShopBadge(props) {
    const [shopName, setShopName] = useState("")

    useEffect(() => {
        Axios.post("/api/getShopDetail", JSON.stringify({ shopId: props.shopId }), HEADERS)
            .then(res => {
                // console.log(res.data.name);
                setShopName(res.data.name)
            })
    }, []);

    return (
        <div>
            <Badge backgroundColor="#D8E3DB" color="#273746">ร้าน {shopName}</Badge>
        </div>
    )
}


const Badge = styled.span`
    background-color: ${props => props.backgroundColor || "#5C6E9A"};
    padding: 3px 10px 3px 10px;
    font-size: 13px;
    font-weight: normal;
    color: ${props => props.color || "white"};
    border-radius: 10px;
`