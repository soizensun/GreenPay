import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Grid, Popup } from 'semantic-ui-react'
import { FiMoreVertical } from "react-icons/fi";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import ShopDetailModal from './ShopDetailModal'
import Axios from 'axios'
import CustomButton from '../../util/CustomButton'


let HEADERS = { headers: { "Content-Type": "application/json" } }

export default function ShopList(props) {
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
    const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);


    return (

        <Card>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Image imageUrl={props.shop.logo} />
                <Name>ร้าน {props.shop.name}</Name>
            </div>

            <div style={{ fontSize: "17px" }}>
                {moment(props.shop.createdAt).format('สร้างเมื่อ D MMMM YYYY ')}
            </div>
            {
                (props.shop.isActivate) ?
                    <Control>
                        <div></div>
                        <div></div>
                        <ShopDetailModal
                            shop={props.shop}
                            buttonStyle={
                                <MoreDetailBtn>
                                    <FiMoreVertical />
                                </MoreDetailBtn>}
                        />
                    </Control>
                    :
                    <Control>

                        <Popup
                            wide
                            position="bottom right"
                            size='small'
                            on='click'
                            open={isConfirmPopupOpen}
                            onClose={() => setIsConfirmPopupOpen(false)}
                            onOpen={() => setIsConfirmPopupOpen(true)}
                            trigger={
                                <ConfirmBtn>
                                    <AiOutlineCheck />
                                </ConfirmBtn>
                            }
                        >
                            <ConfirmPopup>ยืนยันคำขอการเปิดร้าน ?</ConfirmPopup>
                            <Grid columns='equal'>
                                <Grid.Column>
                                    <span onClick={() => setIsConfirmPopupOpen(false)} style={{ cursor: "pointer" }}>
                                        <CustomButton
                                            buttonText="ยกเลิก"
                                            width="100px"
                                            height="40px"
                                            backgroundColor="#D5D8DC "
                                            color="#1C2833" />
                                    </span>

                                </Grid.Column>
                                <Grid.Column>
                                    <span onClick={() => {
                                        Axios.post('/api/confirmShop', JSON.stringify({ status: true, shopId: props.shop._id }), HEADERS)
                                            .then(res => {
                                                props.updateShopList(res.data)
                                            })
                                    }}
                                        style={{ cursor: "pointer" }}>
                                        <CustomButton
                                            buttonText="ยืนยัน"
                                            width="100px"
                                            height="40px"
                                            backgroundColor="#FFD700"
                                            color="#1C2833" />
                                    </span>
                                </Grid.Column>
                            </Grid>
                        </Popup>

                        <Popup
                            wide
                            position="bottom right"
                            size='small'
                            on='click'
                            open={isCancelPopupOpen}
                            onClose={() => setIsCancelPopupOpen(false)}
                            onOpen={() => setIsCancelPopupOpen(true)}
                            trigger={
                                <CancelBtn>
                                    <AiOutlineClose />
                                </CancelBtn>
                            }
                        >
                            <ConfirmPopup>ปฎิเสธคำขอการเปิดร้าน ?</ConfirmPopup>
                            <Grid columns='equal'>
                                <Grid.Column>
                                    <span onClick={() => setIsCancelPopupOpen(false)} style={{ cursor: "pointer" }}>
                                    <CustomButton
                                            buttonText="ยกเลิก"
                                            width="100px"
                                            height="40px"
                                            backgroundColor="#D5D8DC "
                                            color="#1C2833" />
                                    </span>

                                </Grid.Column>
                                <Grid.Column>
                                    <span onClick={() => {
                                        Axios.post('/api/ignoreShop', JSON.stringify({ shopId: props.shop._id }), HEADERS)
                                            .then(res => {
                                                props.updateShopList(res.data)
                                            })
                                    }}
                                        style={{ cursor: "pointer" }}>
                                        <CustomButton
                                            buttonText="ปฎิเสธ"
                                            width="100px"
                                            height="40px"
                                            backgroundColor="#E74C3C" />
                                    </span>
                                </Grid.Column>
                            </Grid>
                        </Popup>
                        <ShopDetailModal
                            shop={props.shop}
                            buttonStyle={
                                <MoreDetailBtn>
                                    <FiMoreVertical />
                                </MoreDetailBtn>}
                        />

                    </Control>
            }

        </Card>

    )
}

const Card = styled.div`
    height: 100px;
    border: 1px solid #CDCDCF;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 7px;
    cursor: pointer;
    padding: 0 30px 0 30px;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
        transition: 0.3s;
    }
`

const Name = styled.div`
    width: 150px;
    margin: 0 0 0 30px; 
    font-size: 19px;
    color: #185341;
    font-weight: bold;
`

const MoreDetailBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    cursor: pointer;
    width: 55px;
    height: 55px;
    color: black;
    font-size: 25px;
    
    &:hover {
        color: white;
        background-color: #90B099;
        transition: 0.3s;
    }
`

const ConfirmBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    cursor: pointer;
    width: 55px;
    height: 55px;
    color: #FFD700;
    font-size: 28px;
    font-weight: bold;
    
    &:hover {
        color: white;
        background-color: #FFD700;
        transition: 0.5s;
    }
`

const CancelBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    cursor: pointer;
    width: 55px;
    height: 55px;
    color: #E74C3C;
    font-size: 28px;
    font-weight: bold;
    
    &:hover {
        color: white;
        background-color: #E74C3C;
        transition: 0.5s;
    }
`

const Control = styled.div`
    font-size: 26px;
    display: flex;
    width: 170px;
    justify-content: space-between
`
const Image = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 100px;
    background-image: url(${props => props.imageUrl || "https://firebasestorage.googleapis.com/v0/b/greenpay1234.appspot.com/o/00001.png?alt=media&token=3b8a8e86-2373-48e8-9bd8-b8912459b84f"});
    background-size: 70px 70px;
`

const ConfirmPopup = styled.div`
    text-align: center;
    margin: 10px 0 20px 0;
    font-size: 16px;
    font-family: Prompt;
`