import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Dimmer, Loader } from 'semantic-ui-react'
import CustomButton from '../util/CustomButton'
import styled from 'styled-components'
import { BiEdit } from "react-icons/bi";
import AddAddressModal from './AddAddressModal'

let HEADERS = { headers: { "Content-Type": "application/json" } }

export default function AddressSection() {
    const [address, setAddress] = useState({});

    useEffect(() => {
        (localStorage.getItem("userToken") !== undefined) ?
            Axios.post('api/getAddress', JSON.stringify({ "tokenId": localStorage.getItem("userToken") }), HEADERS)
                .then(res => {
                    // console.log(res.data);
                    setAddress(res.data)
                })
            : ""
    }, [])

    return (
        <Container>
            <AddressHeader>
                รายละเอียดการจัดส่ง
            </AddressHeader>

            {
                (address.houseNumber !== undefined) ?
                    <div style={{ display: "flex" }}>
                        {address.houseNumber} หมู่ {address.moo} ถนน {address.road} ตำบล {address.subDistrict} อำเภอ {address.district} จังหวัด {address.province} {address.postCode}


                        <AddAddressModal buttonStyle={
                            <div></div>
                        } />

                        {/* edit address */}
                        {/* <AddAddressModal buttonStyle={
                            <BiEdit style={{color: "black", fontSize: "22px", marginLeft: "18px", cursor: "pointer"}}/>
                        }/> */}

                    </div>
                    :
                    <div style={{ display: "flex", alignItems: 'center' }}>
                        <span style={{ marginRight: "10px" }}>
                            ยังไม่มีรายละเอียดการจัดส่ง
                        </span>
                        <AddAddressModal buttonStyle={
                            <span>
                                <CustomButton
                                    color="#EAFAF1"
                                    height="40px"
                                    width="250px"
                                    backgroundColor="#17202A"
                                    buttonText="สร้างรายละเอียดการจัดส่ง"
                                />
                            </span>
                        } />
                    </div>
            }
        </Container>
    )
}

const Container = styled.div`
    /* margin: 0 0 20px 0; */
    padding: 30px 30px 30px 30px;
    font-size: 18px;
    background-color: #B0C7B7;
    /* color: white; */
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const AddressHeader = styled.div`
  /* padding-bottom: 15px; */
`
