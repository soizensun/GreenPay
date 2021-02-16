import React, { useState, useEffect } from 'react'
import { Modal, Divider, Dropdown } from 'semantic-ui-react'
import AddressSection from '../Carts/AddressSection'
import CustomButton from '../util/CustomButton';
import styled from 'styled-components'
import PromtPayModal from './PromtPayModal'
import Axios from 'axios';

let HEADERS = { headers: { "Content-Type": "application/json" } }

export default function ConfirmCartModal(props) {
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [hasAddress, setHasAddress] = useState(false);

    useEffect(() => {
        Axios.get('api/getWeeklyProject', HEADERS)
            .then(res => {
                setSelectedOption(res.data)
            })

        Axios.get('api/getAllProject', HEADERS)
            .then(res => {
                let options = []
                res.data.map((a, index) => {
                    let tmpJson = {}
                    tmpJson.key = index
                    tmpJson.text = a.name
                    tmpJson.value = {
                        id: a._id,
                        name: a.name,
                        location: a.location
                    }

                    options.push(tmpJson)
                })

                setOptions(options)
            })
    }, [])

    const handleDropdown = (e, { value }) => {
        setSelectedOption(value)
    }

    const checkAddress = (address) => {
        setHasAddress(address.moo != undefined)
    }

    const confirmAction = () => {

        if (hasAddress) {
            if (typeof window !== "undefined") {
                Axios.post('api/confirmCart', JSON.stringify({
                    projectId: selectedOption._id,
                    budget: parseInt(localStorage.getItem('greenPrice')),
                    tokenId: localStorage.getItem("userToken")
                }), HEADERS)
                    .then(r => {
                        console.log(r.data);
                    })
            }
        }

    }

    const inlineStyle = {
        height: "auto",
        top: "auto",
        left: "auto",
        bottom: "auto",
        right: "auto",
        fontFamily: 'Prompt'
    };

    return (
        <div>
            <Modal
                closeIcon
                dimmer="blurring"
                open={open}
                trigger={props.buttonStyle}
                onClose={() => {
                    setOpen(false)
                }}
                onOpen={() => setOpen(true)}
                size="large"
                style={inlineStyle}
            >
                <Modal.Content>
                    <div style={{ padding: "0 0 20px 0", fontFamily: 'Prompt' }}>

                        <div style={{ margin: "0 30px 0 30px", fontSize: "16px", textAlign: "center" }}>
                            <div >
                                โครงการที่จะได้รับเงินบริจาค
                            </div>
                            <div style={{ marginBottom: "20px", fontWeight: "bold", fontSize: "22px" }}>
                                {selectedOption.name} {selectedOption.location}
                            </div>
                        </div>


                        <div style={{ margin: "0 30px 30px 30px" }}>
                            <div style={{ marginBottom: "5px" }}>
                                หรือ เลือกโครงการอื่นๆ
                            </div>
                            <Dropdown
                                placeholder='เลือกโครงการอื่นๆ'
                                fluid
                                selection
                                onChange={handleDropdown}
                                options={options}
                            />
                        </div>

                        <AddressSection checkAddress={checkAddress} />

                        <MiddleDivSection>
                            <Container>
                                <div style={{ marginBottom: "20px", fontWeight: "bold" }}>
                                    สรุปยอดสั่งซื้อทั้งหมด
                                </div>
                                <PriceList>
                                    <span>
                                        ราคาสินค้าจริง :
                                </span>
                                    <span style={{ fontWeight: "bold" }}>
                                        {
                                            (typeof window !== "undefined") ?
                                                localStorage.getItem('totalPrice')
                                                : ""
                                        }
                                        <span style={{ marginLeft: "10px" }}>บาท</span>
                                    </span>
                                </PriceList>

                                <PriceList>
                                    <span>
                                        Green Price :
                                </span>
                                    <span style={{ fontWeight: "bold" }}>
                                        {
                                            (typeof window !== "undefined") ?
                                                localStorage.getItem('greenPrice')
                                                : ""
                                        }
                                        <span style={{ marginLeft: "10px" }}>บาท</span>
                                    </span>
                                </PriceList>
                                <Divider style={{ backgroundColor: "white" }} />
                                <PriceList>
                                    <span>
                                        ยอดรวมสินค้าทั้งหมด :
                                </span>
                                    <span style={{ fontWeight: "bold" }}>
                                        {
                                            (typeof window !== "undefined") ?
                                                parseInt(localStorage.getItem('greenPrice')) + parseInt(localStorage.getItem('totalPrice'))
                                                : ""
                                        }
                                        <span style={{ marginLeft: "10px" }}>บาท</span>
                                    </span>
                                </PriceList>

                            </Container>
                        </MiddleDivSection>

                        <div style={{ display: 'flex', justifyContent: "space-between", margin: "30px 0 0 0" }}>
                            <span onClick={() => { window.location.reload() }}>
                                <CustomButton
                                    color="#1C2833"
                                    height="40px"
                                    width="200px"
                                    backgroundColor="#F5B041"
                                    buttonText="ย้อนกลับ"
                                />
                            </span>

                            <PromtPayModal buttonStyle={
                                <span onClick={confirmAction}>
                                    <CustomButton
                                        disabled={!hasAddress}
                                        color="#F6F9F7"
                                        height="40px"
                                        width="200px"
                                        backgroundColor="#185341"
                                        buttonText="ยืนยันการสั่งซื้อ"
                                    />
                                </span>
                            } />

                        </div>

                    </div>
                </Modal.Content>
            </Modal>
        </div>
    )
}
const MiddleDivSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* color: white; */
    /* margin-top: 20px; */
    background-color: #CFDDD3;
    padding: 20px;
`

const Container = styled.div`
    font-size: 17px;
`

const PriceList = styled.div`
    width: 300px; 
    margin: 0 0 10px 0; 
    display: flex; 
    justify-content: space-between;
`

