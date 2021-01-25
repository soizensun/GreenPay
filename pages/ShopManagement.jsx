import React, { useState } from 'react'
import MainLayout from "../layouts/MainLayout";
import { Grid } from 'semantic-ui-react'
import styled from 'styled-components'
import MyOrders from '../components/shopManagement/myOrder/MyOrders'

export default function ShopManagement() {
    const [tab, setTab] = useState('myProduct');

    const switchRender = () => {
        switch (tab) {
            case 'myProduct':
                return <div> <MyOrders/> </div>
            case 'addProduct':
                return <div> tab2  </div>
            case 'myOrder':
                return <div> <MyOrders/> </div>
            case 'myIncome':
                return <div> tab2 </div>
            case 'myAccount':
                return <div> tab2 </div>
        }
    }


    return (
        <MainLayout>
            <Container>

                <Grid>
                    <Grid.Column width={3}>
                        <div>
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
                                บัญชีของฉัน
                            </Tab>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <div style={{ height: "800px" }}>
                            { switchRender() }
                        </div>
                    </Grid.Column>
                </Grid>
            </Container>
        </MainLayout>
    )
}

const Tab = styled.div`



    ${({ active }) => active && `
        background: gray;
        color: white;
    `}
`

const Container = styled.div`
    padding: 20px 30px 0 30px;
`
