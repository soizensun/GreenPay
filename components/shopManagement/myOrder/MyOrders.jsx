import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import OrderList from '../myOrder/OrderList'

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
        console.log(orders[no]._id);
        Axios.post('api/closeOrder', JSON.stringify({ orderId: orders[no]._id }), HEADERS)
            .then(res => {
                console.log(res.data);
                window.location.reload()
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

                    : <div>no order</div>
            }
        </div>
    )
}
