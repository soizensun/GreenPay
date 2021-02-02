import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import styled from 'styled-components'
import { AiOutlineQrcode } from "react-icons/ai";
import CustomButton from '../../util/CustomButton'
import PromtPayModal from './PromtPayModal';

let HEADERS = { headers: { "Content-Type": "application/json" } }

export default function Controller(props) {
    const [orderList, setOrderList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        Axios.post("/api/getOrderForTransfer", JSON.stringify({ shopId: props.shop._id }), HEADERS)
            .then(res => {
                setOrderList(res.data)
                calculate(res.data)

            })
    }, [])

    const calculate = (orderList) => {
        let summ = 0
        orderList.forEach(order => {
            order.products.forEach(product => {
                Axios.post("/api/getProductDetail", JSON.stringify({ productId: product.productId }), HEADERS)
                    .then(r => {
                        summ += r.data.price
                        setTotalPrice(summ);
                    })
            })
        })
    }

    const transfer = () => {
        Axios.post('/api/transferMoney', JSON.stringify({ receivedMoney: totalPrice, shopId: orderList[0].shopId }), HEADERS)
            .then(res => {
                console.log(res.data);
                setTotalPrice(0)
            })
    }

    return (
        <Container>
            <PromtPayModal
                buttonStyle={
                    <QrcodeBTN hidden={(totalPrice != 0) ? false : true}>
                        <AiOutlineQrcode />
                    </QrcodeBTN>}
                total={totalPrice}
                promptpayNumber={props.promptpayNumber}
            />

            <div>
                ยอดที่ต้องโอน <MoneySpan>{(totalPrice != 0) ? totalPrice : "-"}</MoneySpan> บาท
            </div>

            <BtnSpan onClick={transfer}>
                <CustomButton
                    buttonText="โอนเสร็จสิ้น"
                    width="120px"
                    backgroundColor="#90B099"
                    disabled={(totalPrice != 0) ? false : true} />
            </BtnSpan>
        </Container>
    )
}

const Container = styled.div`
    font-size: 17px;
    display: flex;
    align-items: center;
`

const MoneySpan = styled.span`
    margin: 0 10px 0 10px;
    font-weight: bold;
`

const BtnSpan = styled.span`
    margin: 0 0 0 22px;
`
const QrcodeBTN = styled.div`
    margin: 30px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    cursor: pointer;
    width: 55px;
    height: 55px;
    color: #F1C40F;
    font-size: 25px;

    &:hover {
        color: white;
        background-color: #F1C40F;
        transition: 0.3s;
    }
`