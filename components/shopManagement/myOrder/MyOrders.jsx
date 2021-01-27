import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import OrderList from '../myOrder/OrderList'
import NoItem from '../../util/NoItem'

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function MyOrders() {
    const [shop, setShop] = useState({});
    const [orders, setOrders] = useState([]);

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
                    })
            }
        }
    }, [])

    const closeOrder = (no) => {
        Axios.post('api/closeOrder', JSON.stringify({ orderId: orders[no]._id }), HEADERS)
            .then(res => {
                setOrders(res.data);
            })
    }

    return (
        <div>
            {
                (orders.length !== 0) ?
                    <div>
                        {
                            orders.map((order, index) =>
                                <OrderList order={order} count={index + 1} closeOrder={closeOrder} />
                            )
                        }
                    </div>
                    : 
                    <NoItem wording="no order"/>
            }
        </div>
    )
}
