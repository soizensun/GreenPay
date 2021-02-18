import React, { useState, createRef } from 'react'
import MainLayout from "../layouts/MainLayout";
import { Grid, Sticky, Ref } from 'semantic-ui-react'
import MoneyAccount from '../components/AdminConsole/moneyAccount/MoneyAccount'
import AllShop from '../components/AdminConsole/allShop/AllShop'
import AddProject from '../components/AdminConsole/newProject/AddProject'
import AllProject from '../components/AdminConsole/allProject/AllProject'
import styled from 'styled-components'

export default function AdminConsole() {
    const contextRef = createRef()
    const [tab, setTab] = useState('allShop');

    const switchRender = () => {
        switch (tab) {
            case 'allShop':
                return <AllShop/>
            case 'moneyAccount':
                return <MoneyAccount/>
            case 'addProject':
                return <AddProject/>
            case 'allProject':
                return <AllProject/>
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
                                        Admin Console
                                    </Label>
                                </HeaderContainer>
                                <TabContainer>
                                    <Tab active={tab === "allShop"} onClick={() => setTab("allShop")}>
                                        เกี่ยวกับร้านค้า
                                    </Tab>
                                    <Tab active={tab === "moneyAccount"} onClick={() => setTab("moneyAccount")}>
                                        รายละเอียดการบัญชี
                                    </Tab>
                                    <Tab active={tab === "addProject"} onClick={() => setTab("addProject")}>
                                        เพิ่มโครงการใหม่
                                    </Tab>
                                    <Tab active={tab === "allProject"} onClick={() => setTab("allProject")}>
                                        โครงการทังหมด
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
