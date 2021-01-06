import React, { useEffect, useState } from 'react'
import MainLayout from "../layouts/MainLayout";
import CustomButton from "../components/CustomButton";
import styled from "styled-components";

export default function FoodDetail(props) {
    const [count, setCount] = useState(1);
    const [stock, setStock] = useState(0)


    return (
        <>
            <DetailContainer>
                <SubContainerImage>
                    <Image mainPicture={props.product.mainPicture} />
                </SubContainerImage>

                <SubContainerDetail>
                    <div style={{ flexGrow: "5" }}>
                        <NameLabel>{props.product.name}</NameLabel>
                        <PriceLabel>{props.product.price} บาท (Green Point {10 / 100 * props.product.price} บาท) </PriceLabel>
                        <br />
                        <DescriptionLabel>รายละเอียดสินค้า</DescriptionLabel>
                        <Description>{props.product.description}</Description>

                    </div>
                    <div style={{ flexGrow: "6" }}>
                        <div style={{ textAlign: "center", fontSize: "18px" }}>
                            <Counter>
                                <span
                                    onClick={() => {
                                        setCount(count - 1)
                                        setStock(stock + 1)
                                    }}
                                >
                                    <CustomButton buttonText="-" width="30px" height="30px" backgroundColor="#2E4053" />
                                </span>
                                <ShowCount>{count}</ShowCount>
                                <span
                                    onClick={() => {
                                        setCount(count + 1)
                                        setStock(stock - 1)
                                    }}
                                >
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
        </>
    )

}

const DetailContainer = styled.div`
    display: flex;
    align-items: stretch;
    margin-top: 90px;
    margin-right: 20px;
    margin-left: 20px;
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