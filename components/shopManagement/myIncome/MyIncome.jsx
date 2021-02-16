import React, { useEffect, useState } from 'react'
import IncomeCard from "./IncomeCard";
import NoItem from '../../util/NoItem'
import styled from 'styled-components'
import CustomButton from '../../util/CustomButton'
import Axios from 'axios'

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function MyIncome() {
    const [incomeList, setIncomeList] = useState([]);
    const [totalMoney, setTotalMoney] = useState(0);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("userShop") != null) {
                Axios.post("/api/getMyIncome", JSON.stringify({ shopId: localStorage.getItem("userShop") }), HEADERS)
                    .then(res => {
                        setIncomeList(res.data)
                    })

                Axios.post("/api/getShopDetail", JSON.stringify({ shopId: localStorage.getItem("userShop") }), HEADERS)
                    .then(res => {
                        setTotalMoney(res.data.totalMoney);
                    })
            }
        }
    }, [])

    const deleteIncomeHistory = () => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("userShop") != null) {
                Axios.post("/api/deleteIncomeHistory", JSON.stringify({ shopId: localStorage.getItem("userShop") }), HEADERS)
                    .then(res => {
                        setIncomeList(res.data)
                    })
            }
        }
    }

    return (
        <div>


            {
                (incomeList.length !== 0) ?
                    <FlexContainer>
                        <ClearDiv onClick={deleteIncomeHistory}>
                            <CustomButton
                                backgroundColor="#E74C3C"
                                buttonText="ล้างประวัติ"
                                height="30px"
                                width="100px"
                            />
                        </ClearDiv>
                        <TotalDiv>
                            รายรับทั้งหมด <BoldSpan>{totalMoney}</BoldSpan> บาท
                        </TotalDiv>

                    </FlexContainer>
                    :
                    <div style={{textAlign: 'center'}}>
                        <TotalDiv2>
                            รายรับทั้งหมด <BoldSpan>{totalMoney}</BoldSpan> บาท
                        </TotalDiv2>
                    </div>
            }
            {
                (incomeList.length !== 0) ?
                    <div>
                        {
                            incomeList.map(aList => <IncomeCard aList={aList} />)
                        }
                    </div>
                    :
                    <NoItem wording="ไม่มีประวิติรายรับ" />
            }
        </div>
    )
}

const TotalDiv = styled.div`
    font-size: 20px;
    margin: 30px 0 30px 0;
    color: #185341;
    padding-right: 10px;
`

const TotalDiv2 = styled.div`
    font-size: 24px;
    border: 1px solid #CDCDCF;
    border-radius: 10px;
    margin: 30px 0 10px 0;
    color: #185341;
    padding: 40px;
`

const BoldSpan = styled.span`
    font-weight: bold;
    font-size: 21px;
    margin: 8px;
`

const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const ClearDiv = styled.div`
    margin: 30px 0 30px 10px;

`