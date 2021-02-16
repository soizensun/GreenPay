import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProductList from './ProductList'
import { FiMoreVertical } from "react-icons/fi";
import { Grid, Popup } from 'semantic-ui-react'
import CustomButton from '../../util/CustomButton'
import MoreDetailModel from './MoreDetailModel';
import moment from 'moment'
import Axios from 'axios';

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function OrderList(props) {
    const [products, setProducts] = useState([]);
    const [amountList, setAmountList] = useState([]);
    const [onwerOrder, setOnwerOrder] = useState({});
    const [onwerAddress, setOnwerAddress] = useState({});

    useEffect(async () => {
        let tmpShopArray = []
        let tmpAmountArray = []

        props.order.products.map(product => {
            const resPromise = Axios.post('/api/getProductDetail', JSON.stringify({ productId: product.productId }), HEADERS)
            tmpShopArray.push(resPromise)
            tmpAmountArray.push(product.amount)
        })

        const res = await Promise.allSettled(tmpShopArray)
            .then(r =>
                r.map(r => {
                    return r.value.data
                })
            );
        await setProducts(res)
        await setAmountList(tmpAmountArray)

        Axios.post("/api/getUserById", JSON.stringify({ userId: props.order.userId }), HEADERS)
            .then(res => {
                setOnwerOrder(res.data)
                Axios.post("/api/getAddressById", JSON.stringify({ addressId: res.data.addressId }), HEADERS)
                    .then(res => {
                        setOnwerAddress(res.data)
                    })
            })

    }, [])

    return (
        <OrderItem>
            <Header>
                <span>
                    คำสั่งซื้อที่ {props.count}
                    <OrderName>{onwerAddress.recipientName} {onwerAddress.recipientSirName}</OrderName>
                </span>

                <OrderAddress>
                    <span style={{ marginRight: "20px" }}>
                        {moment(props.order.createdAt).format('D MMMM YYYY เวลา h:mm:ss a')}
                    </span>
                    {/* <FiMoreVertical style={{fontSize: "20px"}}/> */}
                </OrderAddress>

                <div>
                    <MoreDetailModel
                        buttonStyle={
                            <span style={{ marginRight: "8px" }}>
                                <CustomButton
                                    buttonText="รายละเอียดเพิ่มเติม"
                                    height="40px"
                                    color="#185341"
                                    backgroundColor="#FDFEFE" />
                            </span>
                        }
                        onwerAddress={onwerAddress}
                    />

                    <Popup
                        wide
                        position="bottom right"
                        size='small'
                        trigger={
                            <span>
                                <CustomButton
                                    buttonText="เสร็จสิ้น"
                                    width="100px"
                                    height="40px"
                                    backgroundColor="#185341" />
                            </span>
                        } on='click'>
                        <ConfirmPopup>
                            ยืนยันการปิดคำสั่งซื้อ ?
                        </ConfirmPopup>

                        <Grid columns='equal'>
                            <Grid.Column>
                                <span>
                                <CustomButton
                                        buttonText="ยกเลิก"
                                        width="100px"
                                        height="40px"
                                        backgroundColor="#D5D8DC"
                                        color="#1C2833" />
                                </span>
                            </Grid.Column>
                            <Grid.Column>
                                <span onClick={() => props.closeOrder(props.count - 1)}>
                                    <CustomButton
                                        buttonText="ยืนยัน"
                                        width="100px"
                                        height="40px"
                                        backgroundColor="#185341" />
                                </span>
                            </Grid.Column>
                        </Grid>
                    </Popup>

                </div>


            </Header>
            {
                (products.length != 0) &&
                products.map((product, index) =>
                    <ProductList key={index} product={product} amount={amountList[index]} />
                )
            }
        </OrderItem>
    )
}

const OrderItem = styled.div`
    /* box-shadow: 1px 1px 3px #ABB2B9; */
    border: 1px solid #CDCDCF;
    border-radius: 5px;
    align-items: center;
    margin: 0 0 10px 0;

`

const Header = styled.div`
    font-size: 17px;
    padding: 20px 20px 20px 25px;
    color: white;
    background-color: #90B099;
    border-radius: 5px 5px 0px 0px;
    border-color: #90B099;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: -1px;
`

const OrderName = styled.span`
    margin-left: 20px;

`

const OrderAddress = styled.div`
    /* margin-right: 20px; */
`

const ConfirmPopup = styled.div`
    text-align: center;
    margin: 10px 0 20px 0;
    font-size: 16px;
    font-family: Prompt;
`