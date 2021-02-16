import React, { useState, createRef } from 'react'
import MainLayout from "../layouts/MainLayout";
import { Divider, Grid, Sticky, Ref } from 'semantic-ui-react'
import styled from 'styled-components'
import MyOrders from '../components/shopManagement/myOrder/MyOrders'
import MyProducts from '../components/shopManagement/myProduct/myProducts'
import AddProduct from '../components/shopManagement/addProducrt/AddProduct'
import MyIncome from '../components/shopManagement/myIncome/MyIncome'
import Myshop from '../components/shopManagement/myShop/Myshop'

export default function ShopManagement() {
    const contextRef = createRef()
    const [tab, setTab] = useState('myProduct');

    const switchRender = () => {
        switch (tab) {
            case 'myProduct':
                return <MyProducts />
            case 'addProduct':
                return <AddProduct />
            case 'myOrder':
                return <MyOrders />
            case 'myIncome':
                return <MyIncome/>
            case 'myAccount':
                return <Myshop/>
        }
    }

    return (
        <MainLayout>
            <Ref innerRef={contextRef}>
                <Container>
                    <Grid>
                        <Grid.Column width={3}>
                            <Sticky context={contextRef} pushing>
                                <HeaderContainer>
                                    <Label>
                                        จัดการร้านค้า
                                    </Label>
                                </HeaderContainer>
                                <TabContainer>
                                    <Tab active={tab === "myProduct"} onClick={() => setTab("myProduct")}>
                                        สินค้าของฉัน
                                    </Tab>
                                    <Tab active={tab === "addProduct"} onClick={() => setTab("addProduct")}>
                                        เพิ่มสินค้าใหม่
                                    </Tab>
                                    <Tab active={tab === "myOrder"} onClick={() => setTab("myOrder")}>
                                        คำสั่งซื้อของฉัน
                                    </Tab>
                                    <Tab active={tab === "myIncome"} onClick={() => setTab("myIncome")}>
                                        รายรับของฉัน
                                    </Tab>
                                    <Tab active={tab === "myAccount"} onClick={() => setTab("myAccount")}>
                                        ร้านของฉัน
                                    </Tab>
                                </TabContainer>
                            </Sticky>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <div>
                                {switchRender()}
                            </div>
                        </Grid.Column>
                    </Grid>
                </Container>
            </Ref>
        </MainLayout>
    )
}

const TabContainer = styled.div`
    /* background-color: red; */
    text-align: center;
    /* height: 150px; */
    /* box-shadow: 1px 1px 5px #ABB2B9; */
    /* border: 1px solid; */
    border-radius: 10px;
    margin: 5px;
    cursor: pointer;
    padding: 10px 24px 10px 24px;
`

const Tab = styled.div`
    border-radius: 5px;
    margin: 15px 0 15px 0;
    font-size: 17px;
    padding: 10px;

    ${({ active }) => active && `
        background: #185341;
        color: white;
        transition: 0.3s;
    `}
`

const Container = styled.div`
    padding: 20px 30px 0 30px;
`

const Label = styled.div`
    font-size: 20px;
    font-weight: bold;
`

const HeaderContainer = styled.div`
    text-align: center;
    /* border: 1px solid; */
    /* box-shadow: 1px 1px 5px #ABB2B9; */
    border-radius: 10px;
    margin: 5px;
    cursor: pointer;
    padding: 24px;
`
