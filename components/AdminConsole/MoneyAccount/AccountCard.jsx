import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Controller from './Controller'

export default function AccountCard(props) {
    return (
        <Card>
            <Name>ร้าน {props.shop.name}</Name>

            <AccountDetail>
                <div>
                    ชื่อบัญชี <DetailContainer>{props.shop.accountName}</DetailContainer>
                </div>
                <div>
                    เบอร์ promptpay <DetailContainer>{props.shop.promptpayNumber}</DetailContainer>
                </div>
            </AccountDetail>

            <Controller shop={props.shop} promptpayNumber={props.shop.promptpayNumber}/>
        </Card>
    )
}

const Card = styled.div`
    height: 90px;
    border: 1px solid #CDCDCF;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 7px;
    /* cursor: pointer; */
    padding: 0 30px 0 30px;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
        transition: 0.3s;
    }
`

const Name = styled.div`
    width: 250px;
    margin: 0 0 0 30px; 
    font-size: 19px;
    color: #185341;
    font-weight: bold;
`

const AccountDetail = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 16px
`

const DetailContainer = styled.span`
    font-weight: bold;
    padding: 5px;
    color: #185341;
`