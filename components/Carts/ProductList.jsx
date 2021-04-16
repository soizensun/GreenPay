import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import styled from 'styled-components'
import CustomButton from "../util/CustomButton";
import { AiTwotoneDelete } from "react-icons/ai";
import { Grid, Popup } from 'semantic-ui-react'

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function ProductCartList(props) {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (

        <div>
            <ProductContainer>
                <ProductImage imageUrl={props.product.mainPicture} />

                <ProductName>
                    {props.product.name}
                </ProductName>

                <ProductAmount>
                    {
                        (props.amount > props.product.stock) ?
                            <div style={{ display: "flex", flexDirection: "column", color: "#E74C3C", fontSize: "15px" }}>
                                <div>สินค้าในคลังไม่พอ</div>
                                <div>กรุณาลบออกจากตะกร้า</div>
                                {props.disableNextBtn()}
                            </div>

                            :
                            <Counter>
                                <span onClick={() => {
                                    (localStorage.getItem("userToken") != null) ?
                                        Axios.post('api/addOrDeleteAProductInCart', JSON.stringify({
                                            "tokenId": localStorage.getItem("userToken"),
                                            "productId": props.product._id,
                                            "amount": -1
                                        }), HEADERS)
                                            .then(res => {
                                                console.log(res.data);
                                                window.location.reload();
                                            })
                                            .catch(err => {
                                                console.log(err);
                                            })
                                        : ""
                                }}>
                                    <CustomButton buttonText="-" width="30px" height="30px" backgroundColor="#17202A" />
                                </span>
                                <ShowCount>{props.amount}</ShowCount>
                                <span onClick={() => {
                                    (localStorage.getItem("userToken") != null) ?
                                        Axios.post('api/addOrDeleteAProductInCart', JSON.stringify({
                                            "tokenId": localStorage.getItem("userToken"),
                                            "productId": props.product._id,
                                            "amount": 1
                                        }), HEADERS)
                                            .then(res => {
                                                console.log(res.data);
                                                window.location.reload();
                                            })
                                            .catch(err => {
                                                console.log(err);
                                            })
                                        : ""
                                }} >
                                    <CustomButton buttonText="+" width="30px" height="30px" backgroundColor="#17202A" disabled={props.amount == props.product.stock} />
                                </span>
                            </Counter>
                    }

                </ProductAmount>

                <ProductPrice>
                    ราคา {props.product.price + props.product.greenPrice} บาท/ชิ้น
                </ProductPrice>

                <ProductAmountPrice>
                    ราคารวม {(props.product.price + props.product.greenPrice) * props.amount} บาท
                </ProductAmountPrice>

                <Popup
                    wide
                    position="bottom right"
                    size='small'
                    on='click'
                    open={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    onOpen={() => setIsPopupOpen(true)}
                    trigger={
                        <ProductDeleteIcon>
                            <DeleteBTN>
                                <AiTwotoneDelete />
                            </DeleteBTN>
                        </ProductDeleteIcon>
                    }
                >
                    <ConfirmPopup>
                        ยืนยันการลบ ?
                    </ConfirmPopup>

                    <Grid columns='equal'>
                        <Grid.Column>
                            <span onClick={() => setIsPopupOpen(false)} style={{ cursor: "pointer" }}>
                                <CustomButton
                                    buttonText="ยกเลิก"
                                    width="100px"
                                    height="40px"
                                    backgroundColor="#D5D8DC"
                                    color="#1C2833" />
                            </span>

                        </Grid.Column>
                        <Grid.Column>
                            <span onClick={() => {
                                (localStorage.getItem("userToken") != null) ?
                                    Axios.post('api/addOrDeleteAProductInCart', JSON.stringify({
                                        "tokenId": localStorage.getItem("userToken"),
                                        "productId": props.product._id,
                                        "amount": (props.amount) * -1
                                    }), HEADERS)
                                        .then(res => {
                                            window.location.reload();
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        })
                                    : ""
                            }}
                                style={{ cursor: "pointer" }}>
                                <CustomButton
                                    buttonText="ลบ"
                                    width="100px"
                                    height="40px"
                                    backgroundColor="#E74C3C" />
                            </span>
                        </Grid.Column>
                    </Grid>
                </Popup>

            </ProductContainer>
        </div>
    )
}

const ProductContainer = styled.div`
    height: 90px;
    font-size: 17px;
    display: flex;
    align-items: stretch;
    align-items: center;
    padding-bottom: 20px;
    padding-top: 20px;

    /* &:hover{
        box-shadow: 1px 1px 5px 1px #F4F7F5;
        transition: 0.3s;
        background-color: #F4F7F5;
    } */
`

const ProductImage = styled.div`
    /* flex-grow: 1; */
    margin-left: 30px;
    margin-right: 50px;
    width: 70px;
    height: 70px;
    background-image: url(${props => props.imageUrl || "https://backend.tops.co.th/media//catalog/product/3/4/3415581119183_e29-03-2019.jpg"});
    background-size: 70px 70px;

`

const ProductName = styled.div`
    width: 180px;
    flex-grow: 2;
`
const ProductAmount = styled.div`
    flex-grow: 1;
`

const ProductPrice = styled.div`
    width: 100px;
    flex-grow: 1;
`

const ProductAmountPrice = styled.div`
    width: 100px;
    flex-grow: 1;
`

const ProductDeleteIcon = styled.div`
    margin-right: 30px;
    font-size: 28px;
    color: #EC7063;
`

const Counter = styled.div`
    margin-top: 15px;
    margin-bottom: 15px;
`

const ShowCount = styled.span`
    margin: 10px;
`

const DeleteBTN = styled.div`
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    /* margin: 5px; */
    width: 55px;
    height: 55px;
    color: #E74C3C;

    &:hover {
        color: white;
        background-color: #E74C3C;
        transition: 0.3s;
    }
`

const ConfirmPopup = styled.div`
    text-align: center;
    margin: 10px 0 20px 0;
    font-size: 16px;
    font-family: Prompt;
`
