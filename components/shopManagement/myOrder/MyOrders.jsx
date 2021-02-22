import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import OrderList from '../myOrder/OrderList'
import styled from 'styled-components'
import NoItem from '../../util/NoItem'
import SnakeBar from '../../util/CustomSnakeBar'
import Skeleton from '@material-ui/lab/Skeleton';

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function MyOrders() {
    const [shop, setShop] = useState({});
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [snakeStatus, setSnakeStatus] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("userShop") != null) {
                Axios.post("/api/getShopDetail", JSON.stringify({ shopId: localStorage.getItem("userShop") }), HEADERS)
                    .then(res => {
                        setShop(res.data)
                    })

                Axios.post("/api/getOrderList", JSON.stringify({ shopId: localStorage.getItem("userShop") }), HEADERS)
                    .then(res => {
                        setOrders(res.data)
                        setIsLoading(false)
                    })
            }
        }
    }, [])

    const closeOrder = (no) => {
        Axios.post('api/closeOrder', JSON.stringify({ orderId: orders[no]._id }), HEADERS)
            .then(res => {
                setOrders([])
                setOrders(res.data);
                setSnakeStatus(true)
            })
    }

    return (
        <div>

            <SnakeBar snakeStatus={snakeStatus} setSnakeStatus={setSnakeStatus} wording="ปิดรายการสำเร็จ" />

            {
                (isLoading) ?
                    <div>
                        <div style={{ margin: "20px 15px 35px 15px", display: "flex", justifyContent: 'space-between' }}>
                            <div></div>
                            <Skeleton animation="wave" variant="rect" height={35} width={240} />
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
                        <div style={{ margin: "10px 15px 10px 15px" }}>
                            <Skeleton animation="wave" variant="rect" height={150} />
                        </div>
                    </div>
                    :
                    <div>
                        {
                            (orders.length !== 0) ?
                                <div>
                                    <TotalDiv>
                                        ทั้งหมด <BoldSpan>{orders.length}</BoldSpan> รายการ
                                    </TotalDiv>

                                    <div>
                                        {
                                            orders.map((order, index) =>
                                                <OrderList order={order} count={index + 1} closeOrder={closeOrder} />
                                            )
                                        }
                                    </div>
                                </div>
                                :
                                <NoItem wording="ไม่มีคำสั่งสินค้า" />
                        }
                    </div>
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




