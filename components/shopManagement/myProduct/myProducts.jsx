import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import styled from "styled-components";
import NoItem from '../../util/NoItem'

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function myProducts() {
    const [allProduct, setAllProduct] = useState([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("userShop") != null) {
                Axios.post("/api/getMyProducts", JSON.stringify({ shopId: localStorage.getItem("userShop") }), HEADERS)
                    .then(res => {
                        setAllProduct(res.data)
                    })
            }
        }
    }, [])

    const deleteProduct = (productId) => {
        console.log(productId);
        Axios.post("/api/deleteProduct", JSON.stringify({ productId }), HEADERS)
            .then(res => {
                setAllProduct(res.data)
            })
    }

    return (
        <div>
            {
                (allProduct.length !== 0) ?
                    <ProductContainer>
                        {
                            allProduct.map(item => {
                                return (
                                    <ProductCard
                                        shopId={item.shopId}
                                        imageUrl={item.mainPicture}
                                        name={item.name}
                                        price={item.price + item.greenPrice}
                                        greenPrice={item.greenPrice}
                                        id={item._id}
                                        stock={item.stock}
                                        deleteProduct={deleteProduct}
                                    />)
                            })
                        }
                    </ProductContainer>
                    :
                    <NoItem wording="no product"/>
            }
        </div>

    )
}

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
`

