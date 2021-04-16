import React, { useEffect, useState } from 'react'
import CustomButton from "../util/CustomButton";
import styled from "styled-components";
import Link from 'next/link'
import Axios from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';
import NumberFormat from 'react-number-format';

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function ProductDetail(props) {
    const [count, setCount] = useState(1);
    const [stock, setStock] = useState(0)
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Axios.post("/api/getProductDetail", JSON.stringify({ productId: props.productId }), HEADERS)
            .then((res) => {
                setProduct(res.data)
                setStock(res.data.stock)
                setIsLoading(false)
            })
    }, [])

    const addToCart = () => {
        (localStorage.getItem("userToken") != null) ?
            Axios.post('api/addOrDeleteAProductInCart', JSON.stringify({
                "tokenId": localStorage.getItem("userToken"),
                "productId": product._id,
                "amount": count
            }), HEADERS)
                .then(res => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                })
            : console.log("no user")
    }

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
                                <div style={{ flexGrow: "5", display: "flex", justifyContent: 'center', alignItems: "center", flexDirection: "column" }}>
                                    <Skeleton animation="wave" variant="text" width={250} height={45} />
                                    <Skeleton animation="wave" variant="text" width={150} height={45} />
                                    <Skeleton animation="wave" variant="text" width={200} height={45} />
                                </div>
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

                                        <div >
                                            <CustomButton buttonText="ไปที่ร้านค้า" backgroundColor="#F1C40F"></CustomButton>
                                        </div>

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
                            <NameContainer>
                                <NameLabel>{product.name}</NameLabel>

                                <NumberFormat value={product.price + product.greenPrice} displayType={'text'} thousandSeparator={true} renderText={value =>
                                    <PriceLabel>ราคารวม <span style={{ fontWeight: "bold" }}>{value}</span> บาท</PriceLabel>
                                } />
                                <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} renderText={value =>
                                    <PriceLabel2>ราคาสินค้า (ไม่รวม Green price) <span style={{ fontWeight: "bold" }}>{value}</span> บาท</PriceLabel2>
                                } />
                                <NumberFormat value={product.greenPrice} displayType={'text'} thousandSeparator={true} renderText={value =>
                                    <PriceLabel>Green price <span style={{ fontWeight: "bold" }}>{value}</span> บาท</PriceLabel>
                                } />
                                  
                            </NameContainer>
                            <div style={{ flexGrow: "6" }}>
                                <div style={{ textAlign: "center", fontSize: "18px" }}>
                                    <Counter>
                                        <span onClick={() => { if (count > 1) setCount(count - 1) }} >
                                            <CustomButton buttonText="-" width="30px" height="30px" backgroundColor="#2E4053" disabled={count == 1} />
                                        </span>
                                        <ShowCount>{count}</ShowCount>
                                        <span onClick={() => { if (count < stock) setCount(count + 1) }} >
                                            <CustomButton buttonText="+" width="30px" height="30px" backgroundColor="#2E4053" disabled={count == stock} />
                                        </span>
                                    </Counter>
                                    จำนวนสินค้าในคลัง : {stock}
                                    <div style={{ marginTop: "10px" }}>
                                        {
                                            (localStorage.getItem("userToken") != null) &&
                                            <div onClick={addToCart}>
                                                <CustomButton buttonText="เพิ่มลงตะกร้า" ></CustomButton>
                                            </div>
                                        }

                                        <Link href="/Shop" passHref>
                                            <div style={{ marginTop: "5px" }}>
                                                <CustomButton buttonText="ไปที่ร้านค้า" backgroundColor="#F1C40F" color="#2C3E50"></CustomButton>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SubContainerDetail>
                    </DetailContainer>
            }
            <div style={{ padding: "10px 100px 30px 100px" }}>
                <DescriptionLabel>รายละเอียดสินค้า</DescriptionLabel>
                <Description>{product.description}</Description>
            </div>

            {/* <Divition />
            <MoreProduct>
                afsdf
            </MoreProduct> */}

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
`

const SubContainerImage = styled.div`
    flex-grow: 3;
    text-align: center;
    display: flex;
    justify-content: center;
`

const SubContainerDetail = styled.div`
    flex-grow: 7;
    padding: 20px;
    display: flex;
    align-items: stretch;
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
`

const PriceLabel = styled.div`
    font-size: 20px;
    margin-top: 20px;
`

const PriceLabel2 = styled.div`
    font-size: 15px;
    margin-top: 20px;
`

const DescriptionLabel = styled.div`
    font-size: 18px;
    margin: 20px 0 20px 0;
    font-weight: bold;
`

const Counter = styled.div`
    margin-top: 15px;
    margin-bottom: 15px;
`
const ShowCount = styled.span`
    margin: 10px;
`

const Description = styled.div`
    margin-top: 10px;
    font-size: 18px;
`

const Divition = styled.hr`
    margin-left: 50px;
    margin-right: 50px;
    background-color: black;
`
const MoreProduct = styled.div`
    margin-top: 20px;
    margin-right: 70px;
    margin-left: 70px;
    margin-bottom: 30px;
    background-color: greenyellow;
`

const NameContainer = styled.div`
    flex-grow: 5;
    display: flex; 
    justify-content: center; 
    align-items: center;
    flex-direction: column;
`