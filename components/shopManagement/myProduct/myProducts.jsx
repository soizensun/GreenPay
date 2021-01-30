import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import styled from "styled-components";
import NoItem from '../../util/NoItem';
import Skeleton from '@material-ui/lab/Skeleton';

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function myProducts() {
    const [allProduct, setAllProduct] = useState([]);
    const [isLonding, setIsLonding] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("userShop") != null) {
                Axios.post("/api/getMyProducts", JSON.stringify({ shopId: localStorage.getItem("userShop") }), HEADERS)
                    .then(res => {
                        setAllProduct(res.data)
                        setIsLonding(false)
                    })
            }
        }
    }, [])

    const deleteProduct = (productId) => {
        console.log(productId);
        setIsLonding(true)
        Axios.post("/api/deleteProduct", JSON.stringify({ productId }), HEADERS)
            .then(res => {
                setAllProduct(res.data)
                setIsLonding(false)
            })
    }

    return (
        <div>

            {
                (allProduct.length !== 0) ?
                    (isLonding) ?
                        <div>
                            <div style={{ margin: "10px 15px 10px 15px" }}>
                                <Skeleton animation="wave" variant="rect" height={150} />
                            </div>
                            <div style={{ margin: "10px 15px 10px 15px" }}>
                                <Skeleton animation="wave" variant="rect" height={150} />
                            </div>
                            <div style={{ margin: "10px 15px 10px 15px" }}>
                                <Skeleton animation="wave" variant="rect" height={150} />
                            </div>
                            <div style={{ margin: "10px 15px 10px 15px" }}>
                                <Skeleton animation="wave" variant="rect" height={150} />
                            </div>
                        </div>
                        :
                        <ProductContainer>
                            {
                                allProduct.map(item => {
                                    return (
                                        <ProductCard
                                            product={item}
                                            deleteProduct={deleteProduct}
                                        />)
                                })
                            }
                        </ProductContainer>
                    :
                    <NoItem wording="no product" />
            }
        </div>

    )
}

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
`

