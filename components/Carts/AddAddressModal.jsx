import React, { useState } from 'react'
import { Header, Form, Modal, Divider } from 'semantic-ui-react'
import CustomButton from "../util/CustomButton";
import Axios from "axios";

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function AddAddressModal(props) {
    const [open, setOpen] = useState(false)

    const [recipientName, setRecipientName] = useState('');
    const [recipientSirName, setRecipientSirName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [houseNumber, setHouseNumber] = useState('')
    const [moo, setMoo] = useState('')
    const [road, setRoad] = useState('')
    const [subDistrict, setSubDistrict] = useState('');
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    const [postCode, setPostCode] = useState('');

    const inlineStyle = {
        height: "auto",
        top: "auto",
        left: "auto",
        bottom: "auto",
        right: "auto",
        fontFamily: 'Prompt'
    };

    const handleSubmit = () => {


        if (localStorage.getItem("userToken") !== undefined) {
            let body = {
                recipientName,
                recipientSirName,
                phoneNumber,
                houseNumber,
                moo,
                road,
                subDistrict,
                district,
                province,
                postCode,
                tokenId: localStorage.getItem("userToken")
            }
            Axios.post('api/addAddress', JSON.stringify(body), HEADERS)
                .then(res => {
                    setOpen(false)
                    window.location.reload();
                })
        }
    }

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
                <Header style={{ fontFamily: "Prompt" }} textAlign='center'>สร้างที่อยู่จัดส่ง</Header>
                <div style={{ padding: "20px 70px 50px 70px", fontFamily: 'Prompt' }}>

                    <Form size="large" onSubmit={handleSubmit}>
                        <span style={{ fontSize: "17px" }}>ข้อมูลผู้รับสินค้า</span>
                        <Divider style={{ margin: "20px" }} hidden />
                        <Form.Group>
                            <Form.Input required label='ชื่อผู้รับ' width={6} value={recipientName}
                                onChange={e => setRecipientName(e.target.value)} />
                            <Form.Input required label='นามสกุล' width={6} value={recipientSirName}
                                onChange={e => setRecipientSirName(e.target.value)} />
                            <Form.Input required label='เบอร์โทรศัพท์' width={4} value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)} />
                        </Form.Group>
                        <Divider style={{ marginTop: "30px", marginBottom: "30px" }} />

                        <span style={{ fontSize: "17px" }}>ข้อมูลที่อยู่จัดส่ง</span>
                        <Divider style={{ margin: "20px" }} hidden />
                        <Form.Group>
                            <Form.Input required label='บ้านเลขที่' width={4} value={houseNumber}
                                onChange={e => setHouseNumber(e.target.value)} />
                            <Form.Input label='หมู่' width={3} type="number" value={moo}
                                onChange={e => setMoo(e.target.value)} />
                            <Form.Input label='ถนน' width={9} value={road}
                                onChange={e => setRoad(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='ตำบล/แขวง' width={8} value={subDistrict}
                                onChange={e => setSubDistrict(e.target.value)} />
                            <Form.Input required label='อำเภอ/เขต' width={8} value={district}
                                onChange={e => setDistrict(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input required label='จังหวัด' width={12} value={province}
                                onChange={e => setProvince(e.target.value)} />
                            <Form.Input required label='รหัสไปรษณีย์' width={4} type="number" value={postCode}
                                onChange={e => setPostCode(e.target.value)} />
                        </Form.Group>
                        <div style={{ display: 'flex', justifyContent: "space-between" }}>
                            <div></div>
                            <span content='Submit'>
                                <CustomButton
                                    color="#FDFEFE"
                                    height="40px"
                                    width="100px"
                                    backgroundColor="#90B099"
                                    buttonText="บันทึก"
                                />
                            </span>
                        </div>

                    </Form>
                </div>
            </Modal>
        </div>
    )
}
