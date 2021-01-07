import React, { useEffect, useState } from 'react'
import CustomButton from "./CustomButton";
import styled from "styled-components";
import Axios from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function ProductDetail(props) {
    const [count, setCount] = useState(1);
    const [stock, setStock] = useState(0)
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Axios.post("/api/getProductDetail", JSON.stringify({ productId: props.productId }), HEADERS)
            .then((res) => {
                console.log(res.data);
                setProduct(res.data)
                setStock(res.data.stock)
                setIsLoading(false)
            })
    }, [])


    return (
        <>
            {
                isLoading ?
                    <DetailContainer>
                        <SubContainerImage>
                            <Skeleton animation="wave" variant="rect" width={250} height={250} />
                        </SubContainerImage>

                        <SubContainerDetail>
                            <div style={{ flexGrow: "5" }}>
                                <Skeleton animation="wave" variant="text" width={150} height={45}/>
                                <Skeleton animation="wave" variant="text" width={250} height={45}/>
                                <br />
                                <Skeleton animation="wave" variant="text" width={200} height={45}/>
                                <Skeleton animation="wave" variant="text" width={250} height={45}/>
                            </div>
                            <div style={{ flexGrow: "6" }}>
                                <div style={{ textAlign: "center", fontSize: "18px" }}>
                                    <Counter>
                                        <span onClick={() => { if (count > 1) setCount(count - 1) }} >
                                            <CustomButton buttonText="-" width="30px" height="30px" backgroundColor="#2E4053" />
                                        </span>
                                        <ShowCount>{count}</ShowCount>
                                        <span onClick={() => { if (count < stock) setCount(count + 1) }} >
                                            <CustomButton buttonText="+" width="30px" height="30px" backgroundColor="#2E4053" />
                                        </span>
                                    </Counter>
                                    จำนวนสินค้าในคลัง : -
                                    <div style={{ marginTop: "10px" }}>
                                        <CustomButton buttonText="เพิ่มลงตะกร้า"></CustomButton>
                                    </div>
                                </div>
                            </div>
                        </SubContainerDetail>
                    </DetailContainer>
                    :
                    <DetailContainer>
                        <SubContainerImage>
                            <Image mainPicture={product.mainPicture} />
                        </SubContainerImage>

                        <SubContainerDetail>
                            <div style={{ flexGrow: "5" }}>
                                <NameLabel>{product.name}</NameLabel>
                                <PriceLabel>{product.price} บาท (Green Point {10 / 100 * product.price} บาท) </PriceLabel>
                                <br />
                                <DescriptionLabel>รายละเอียดสินค้า</DescriptionLabel>
                                <Description>{product.description}</Description>

                            </div>
                            <div style={{ flexGrow: "6" }}>
                                <div style={{ textAlign: "center", fontSize: "18px" }}>
                                    <Counter>
                                        <span onClick={() => { if (count > 1) setCount(count - 1) }} >
                                            <CustomButton buttonText="-" width="30px" height="30px" backgroundColor="#2E4053" />
                                        </span>
                                        <ShowCount>{count}</ShowCount>
                                        <span onClick={() => { if (count < stock) setCount(count + 1) }} >
                                            <CustomButton buttonText="+" width="30px" height="30px" backgroundColor="#2E4053" />
                                        </span>
                                    </Counter>
                            จำนวนสินค้าในคลัง : {stock}
                                    <div style={{ marginTop: "10px" }}>
                                        <CustomButton buttonText="เพิ่มลงตะกร้า"></CustomButton>
                                    </div>
                                </div>
                            </div>
                        </SubContainerDetail>
                    </DetailContainer>
            }

        </>
    )

}

const DetailContainer = styled.div`
    display: flex;
    align-items: stretch;
    margin-top: 50px;
    margin-right: 20px;
    margin-left: 20px;
    margin-bottom: 30px;
    /* background-color: greenyellow; */

`

const SubContainerImage = styled.div`
    flex-grow: 3;
    /* background-color: red; */
    text-align: center;
    display: flex;
    justify-content: center;
`

const SubContainerDetail = styled.div`
    flex-grow: 7;
    padding-top: 20px;
    display: flex;

    display: flex;
    align-items: stretch;
    /* background-color: green; */
`

const Image = styled.div`

    width: 250px;
    height: 250px;
    background-image: url(${(props) => props.mainPicture || "https://backend.tops.co.th/media//catalog/product/3/4/3415581119183_e29-03-2019.jpg"});
    background-size: 250px 250px;
`

const NameLabel = styled.div`
    font-size: 22px;
    margin-top: 20px;
    font-weight: bold;
    /* background-color: red; */
`

const PriceLabel = styled.div`
    font-size: 20px;
    margin-top: 20px;
    /* background-color: red; */
`

const DescriptionLabel = styled.div`
    font-size: 18px;
    margin-top: 20px;
    font-weight: bold;
`

const Counter = styled.div`
    margin-top: 20px;
    margin-bottom: 40px;
`
const ShowCount = styled.span`
    margin: 10px
`

const Description = styled.div`
    margin-top: 10px;
    font-size: 19px;
`