import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import styled from 'styled-components'
import NoItem from '../../util/NoItem';
import Skeleton from '@material-ui/lab/Skeleton';
import SnakeBar from '../../util/CustomSnakeBar'

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function myProducts() {
    const [allProduct, setAllProduct] = useState([]);
    const [isLonding, setIsLonding] = useState(true);

    const [openSnakebarOnDeleteSus, setOpenSnakebarOnDeleteSus] = useState(false);
    const [openSnakebarOnUpdateSus, setOpenSnakebarOnUpdateSus] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("userShop") != null) {
                Axios.post("/api/getMyProducts", JSON.stringify({ shopId: localStorage.getItem("userShop") }), HEADERS)
                    .then(res => {
                        filterAllProduct(res.data)
                        setIsLonding(false)
                    })
            }
        }
    }, [])

    const filterAllProduct = (allProductList) => {
        let tmpList = []
        allProductList.map(p => (p.stock == 0) && tmpList.push(p))
        allProductList.map(p => (p.stock != 0) && tmpList.push(p))
        setAllProduct(tmpList)
    }

    const deleteProduct = (productId) => {
        console.log(productId);
        setIsLonding(true)
        Axios.post("/api/deleteProduct", JSON.stringify({ productId }), HEADERS)
            .then(res => {
                filterAllProduct(res.data)
                setIsLonding(false)
                setOpenSnakebarOnDeleteSus(true)
            })
    }

    const updateProduct = (newProductList) => {
        filterAllProduct(newProductList)
        setOpenSnakebarOnUpdateSus(true)
    }

    return (
        <div>

            <SnakeBar snakeStatus={openSnakebarOnDeleteSus} setSnakeStatus={setOpenSnakebarOnDeleteSus} wording="ลบสำเร็จ" />
            <SnakeBar snakeStatus={openSnakebarOnUpdateSus} setSnakeStatus={setOpenSnakebarOnUpdateSus} wording="แก้ไขเรียบร้อย"/>

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
                        <div>
                            <TotalDiv>
                                ทั้งหมด <BoldSpan>{allProduct.length}</BoldSpan> รายการ
                            </TotalDiv>
                            <div>
                                {
                                    allProduct.map(item => {
                                        return (
                                            <ProductCard
                                                key={item._id}
                                                product={item}
                                                deleteProduct={deleteProduct}
                                                updateProduct={updateProduct}
                                            />)
                                    })
                                }
                            </div>
                        </div>

                    :
                    <NoItem wording="ไม่มีสินค้า" />
            }
        </div>

    )
}

const TotalDiv = styled.div`
    text-align: right;
    font-size: 20px;
    margin: 30px 0 30px 0;
    color: #185341;
`

const BoldSpan = styled.span`
    font-weight: bold;
    font-size: 21px;
    margin: 8px;
`