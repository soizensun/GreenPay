import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import ShopList from './ShopList'
import styled from 'styled-components'
import NoItem from '../../util/NoItem'

let HEADERS = { headers: { "Content-Type": "application/json" } }


export default function AllShop() {
    const [allShop, setAllShop] = useState([]);
    const [activeShop, setActiveShop] = useState([]);
    const [nonActiveShop, setNonActiveShop] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        Axios.get('api/getAllShop', HEADERS)
            .then(res => {
                filtering(res.data)
            })
    }, [])

    const filtering = (shops) => {
        setAllShop(shops)

        let tmpActiveArray = []
        let tmpNotActiveArray = []
        shops.map(shop => {
            if (shop.isActivate) tmpActiveArray.push(shop)
            else tmpNotActiveArray.push(shop)
        })

        setActiveShop(tmpActiveArray);
        setNonActiveShop(tmpNotActiveArray);
    }

    const switchRender = () => {
        switch (filter) {
            case 'all':
                return (allShop.length == 0) ? <NoItem />
                    :
                    allShop.map(shop => <ShopList shop={shop} updateShopList={(newShopList) => filtering(newShopList)} />)
            case 'newShop':
                return (nonActiveShop.length == 0) ? <NoItem />
                    :
                    nonActiveShop.map(shop => <ShopList shop={shop} updateShopList={(newShopList) => filtering(newShopList)} />)
            case 'confirmedShop':
                return (activeShop.length == 0) ? <NoItem />
                    :
                    activeShop.map(shop => <ShopList shop={shop} updateShopList={(newShopList) => filtering(newShopList)} />)
        }
    }

    return (
        <div>

            <TabContainer>
                <Tab active={filter === "all"} onClick={() => setFilter("all")}>
                    ร้านค้าทั้งหมด
                </Tab>
                <Tab active={filter === "newShop"} onClick={() => setFilter("newShop")}>
                    ร้านค้าที่รอยืนยัน
                </Tab>
                <Tab active={filter === "confirmedShop"} onClick={() => setFilter("confirmedShop")}>
                    ร้านค้าที่ยืนยันเรียบร้อย
                </Tab>
            </TabContainer>
            <Detail>
                {
                    switchRender()
                }
            </Detail>

        </div>
    )
}

const TabContainer = styled.div`
    /* text-align: center; */
    border-radius: 10px;
    margin: 25px 0 0 0;
    cursor: pointer;
    /* padding: 10px; */
`

const Tab = styled.span`
    border-radius: 5px;
    margin: 5px;
    font-size: 17px;
    padding: 10px;

    ${({ active }) => active && `
        background: #90B099;
        color: white;
        transition: 0.3s;
    `}
`

const Detail = styled.div`
    /* background-color: red; */
    margin: 30px 0 0 0;
`
