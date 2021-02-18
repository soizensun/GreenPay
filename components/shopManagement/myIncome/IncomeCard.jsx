import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

export default function IncomeCard(props) {
    return (
        <Card>
            <Date>
                {moment(props.aList.receivedDate).format('วันที่ D MMMM YYYY ')}
            </Date>
            <Time>
                {moment(props.aList.receivedDate).format('เวลา h:mm:ss a')}
            </Time>
            <Income>
                ได้รับ <span style={{fontWeight: "bold", padding: "10px"}}>{props.aList.receivedMoney}</span> บาท
            </Income>

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

const Date = styled.div`
    margin: 0 0 0 30px; 
    font-size: 19px;
    color: #185341;
    font-weight: bold;
`

const Income = styled.div`
    margin: 0 30px 0 0; 
    font-size: 18px;
    color: #185341;
`

const Time = styled.div`
    margin: 0 30px 0 0; 
    font-size: 18px;
    color: #185341;
`
