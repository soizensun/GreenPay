import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Label } from 'semantic-ui-react'
import styled from 'styled-components'

let HEADERS = { headers: { "Content-Type": "application/json" } }

export default function AddressSection() {
    const [address, setAddress] = useState({});

    useEffect(() => {
        (localStorage.getItem("userToken") != undefined) ?
            Axios.post('api/getAddress', JSON.stringify({ "tokenId": localStorage.getItem("userToken") }), HEADERS)
                .then(res => {
                    console.log(res.data);
                    setAddress(res.data)
                })
            : ""
    }, [])

    return (
        <Container>
            <AddressHeader>
                รายละเอียดการจัดส่ง
            </AddressHeader>
            {/* <div style={{textAlign: "right"}}>
                <div style={{ marginBottom: "9px" }}>
                    <span>ชื่อผู้รับ </span>
                    <Label size="medium" basic>{address.recipientName}</Label>
                    <span> นามสกุลผู้รับ </span>
                    <Label size="medium" basic>{address.recipientSirName}</Label>
                </div>
                <div style={{ marginBottom: "9px" }}>
                    <span>บ้านเลขที่ </span>
                    <Label size="medium" basic>{address.houseNumber}</Label>
                    <span> หมู่ </span>
                    <Label size="medium" basic>{address.moo}</Label>
                    <span> ถนน </span>
                    <Label size="medium" basic>{address.road}</Label>
                </div>
                <div>
                    <span> ตำบล </span>
                    <Label size="medium" basic>{address.subDistrict}</Label>
                    <span> อำเภอ </span>
                    <Label size="medium" basic>{address.district}</Label>
                    <span> จังหวัด </span>
                    <Label size="medium" basic>{address.province}</Label>
                    <span> รหัสไปรษณีย์ </span>
                    <Label size="medium" basic>{address.postCode}</Label>
                </div>
            </div> */}
            {
                (address) ?
                    <div style={{ textAlign: "right" }}>
                        {address.houseNumber}, {address.moo}, {address.road}, {address.subDistrict}, {address.district}, {address.province}, {address.postCode}
                    </div>
                    :
                    <div>fff</div>
            }


        </Container>
    )
}

const Container = styled.div`
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 5px;

    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    /* box-shadow: 1px 1px 3px #ABB2B9; */
    font-size: 16px;
    background-color: #90B099;
    color: white;
    border-radius: 0px 0px 10px 10px;
    display: flex;
    justify-content: space-between
`
const AddressHeader = styled.div`
    /* padding-bottom: 15px; */
    padding-left: 20px;
`
