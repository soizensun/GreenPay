import React, { useState, useEffect } from 'react'
import { Modal, Divider, Header, Grid } from 'semantic-ui-react'
import CustomButton from '../../util/CustomButton';
import Axios from 'axios'
import styled from 'styled-components'

const inlineStyle = {
    height: "auto",
    top: "auto",
    left: "auto",
    bottom: "auto",
    right: "auto",
    fontFamily: 'Prompt'
};

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function ShopDetailModal(props) {
    const [open, setOpen] = useState(false)
    const [shopOwner, setShopOwner] = useState({});

    useEffect(() => {
        console.log(props.shop.ownerId);

        Axios.post("/api/getUserById", JSON.stringify({ userId: props.shop.ownerId }), HEADERS)
            .then(res => {
                setShopOwner(res.data);
            })
    }, [])

    return (
        <div>
            <Modal
                closeIcon
                dimmer="blurring"
                open={open}
                trigger={props.buttonStyle}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                size="large"
                style={inlineStyle}
            >
                <Header style={{ fontFamily: "Prompt" }} textAlign='center'>รายละเอียดร้านค้า</Header>
                <Modal.Content>
                    <div style={{ padding: "10px" }}>
                        <Grid columns={2} divided>
                            <Grid.Column width={9}>
                                <Title>รายละเอียดร้าน
                                        {
                                        (props.shop.isActivate) ? <Badge backgroundColor="#90B099">ยืนยันเรียบร้อย</Badge> : <Badge backgroundColor="#F1C40F">รอการยืนยัน</Badge>
                                    }
                                </Title>
                                <Grid columns={8}>
                                    <Grid.Column width={5}>
                                        <div style={{ display: "flex", justifyContent: 'center' }}>
                                            <Image imageUrl={props.shop.logo} />
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column width={11}>
                                        <MainContent>
                                            <Content><SubLabel>ชื่อร้าน</SubLabel>{props.shop.name}</Content>
                                            <Content><SubLabel>คำอธิบาย</SubLabel>{props.shop.description}</Content>
                                            <Content><SubLabel>ชื่อบัญชี</SubLabel>{props.shop.accountName}</Content>
                                            <Content><SubLabel>เบอร์ promptpay</SubLabel>{props.shop.promptpayNumber}</Content>
                                        </MainContent>

                                    </Grid.Column>
                                </Grid>
                            </Grid.Column>

                            <Grid.Column width={7}>
                                <Title>รายละเอียดเจ้าของร้าน</Title>
                                <MainContent>
                                    <Content><SubLabel>ชื่อ</SubLabel>{shopOwner.displayName}</Content>
                                    <Content><SubLabel>อีเมล</SubLabel>{shopOwner.email}</Content>
                                    <Content><SubLabel>เบอร์โทรศัพท์</SubLabel>{shopOwner.phoneNumber}</Content>
                                </MainContent>

                            </Grid.Column>
                        </Grid>
                    </div>
                </Modal.Content>
            </Modal>
        </div>
    )
}

const Image = styled.div`
    width: 120px;
    height: 120px;
    background-image: url(${props => props.imageUrl || "https://firebasestorage.googleapis.com/v0/b/greenpay1234.appspot.com/o/00001.png?alt=media&token=3b8a8e86-2373-48e8-9bd8-b8912459b84f"});
    background-size: 120px 120px;
    border-radius: 100px;
    margin: 0 20px 0 20px;
`

const SubLabel = styled.span`
    font-size: 18px;
    color: #ABB2B9;
    margin-right: 15px;
`

const Content = styled.span`
    padding: 5px;
`

const Title = styled.div`
    font-size: 18px;
    padding: 0 0 30px 0;
    /* text-align: center; */
    font-weight: bold;
`

const MainContent = styled.div`
    font-size: 16px;
    display: flex;
    flex-direction: column;
`
const Badge = styled.span`
    background-color: ${props => props.backgroundColor || "#5C6E9A"};
    margin: 10px;
    padding: 3px 10px 3px 10px;
    font-size: 14px;
    font-weight: normal;
    color: white;
    border-radius: 10px;
`