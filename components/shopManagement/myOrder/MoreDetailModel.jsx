
import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal, Header, Divider } from 'semantic-ui-react'

export default function moreDetailModel(props) {
    const [open, setOpen] = useState(false)


    const inlineStyle = {
        height: "auto",
        top: "auto",
        left: "auto",
        bottom: "auto",
        right: "auto",
        fontFamily: 'Prompt'
    };

    return (
        <Modal
            closeIcon
            dimmer="blurring"
            open={open}
            trigger={props.buttonStyle}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            size="small"
            style={inlineStyle}
        >
            <Header style={{ fontFamily: "Prompt" }} textAlign='center'>รายละเอียดเพิ่มเติม</Header>
            <Modal.Content>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Label>รายละเอียดผู้สั่ง</Label>
                    <Content>
                        <span style={{ padding: "5px" }}><SubLabel>ชื่อ</SubLabel>{props.onwerAddress.recipientName}</span>
                        <span style={{ padding: "5px" }}><SubLabel>อีเมล</SubLabel>{props.onwerAddress.recipientSirName}</span>
                        <span style={{ padding: "5px" }}><SubLabel>เบอร์โทรศัทพ์</SubLabel>{props.onwerAddress.phoneNumber}</span>
                    </Content>
                </div>
                <Divider/>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Label>ที่อยู่การจัดส่ง</Label>
                    <Content>
                        <span style={{ padding: "5px" }}><SubLabel>บ้านเลขที่</SubLabel>{props.onwerAddress.houseNumber}</span>
                        <span style={{ padding: "5px" }}><SubLabel>หมู่</SubLabel>{props.onwerAddress.moo || '-'}</span>
                        <span style={{ padding: "5px" }}><SubLabel>ถนน</SubLabel>{props.onwerAddress.road || '-'}</span>
                        <span style={{ padding: "5px" }}><SubLabel>ตำบล</SubLabel>{props.onwerAddress.subDistrict || '-'}</span>
                        <span style={{ padding: "5px" }}><SubLabel>อำเภอ</SubLabel>{props.onwerAddress.district}</span>
                        <span style={{ padding: "5px" }}><SubLabel>จังหวัด</SubLabel>{props.onwerAddress.province}</span>
                        <span style={{ padding: "5px" }}><SubLabel>รหัสไปรษณย์</SubLabel>{props.onwerAddress.postCode}</span>
                    </Content>
                </div>
            </Modal.Content>
        </Modal>
    )
}

const Label = styled.div`
    font-size: 17px;
    justify-content: center;
    align-items: center;
    width: 350px;
    display: flex;
    /* background-color: red; */
`

const Content = styled.div`
    font-size: 16px;
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    /* background-color: green; */
`

const SubLabel = styled.span`
    font-size: 18px;
    color: #ABB2B9;
    margin-right: 15px;
    
`

