import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import AccountCard from './AccountCard'
import Skeleton from '@material-ui/lab/Skeleton';
import NoItem from '../../util/NoItem';
import styled from 'styled-components'
import moment from 'moment'

let HEADERS = { headers: { "Content-Type": "application/json" } }

export default function MoneyAccount() {
    const [allShop, setAllShop] = useState([]);
    const [isLonding, setIsLonding] = useState(true);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        Axios.get('api/getAllShop', HEADERS)
            .then(res => {
                setAllShop(res.data)
                setIsLonding(false)
            })

        var today = moment().format('วันที่ D MMMM YYYY');
        setCurrentDate(today)
    }, [])

    return (
        <div>
            {
                (allShop.length !== 0) ?
                    (isLonding) ?
                        <div>
                            <div style={{ margin: "10px 15px 10px 15px" }}>
                                <Skeleton animation="wave" variant="rect" height={150} />
                            </div>
                            <div style={{ margin: "10px 15px 10px 15px" }}>
                                <Skeleton animation="wave" variant="rect" height={150} />
                            </div>
                            <div style={{ margin: "10px 15px 10px 15px" }}>
                                <Skeleton animation="wave" variant="rect" height={150} />
                            </div>
                            <div style={{ margin: "10px 15px 10px 15px" }}>
                                <Skeleton animation="wave" variant="rect" height={150} />
                            </div>
                        </div>
                        :
                        <div>
                            <DateDiv>
                                {currentDate}
                            </DateDiv>
                            <div style={{textAlign: 'center', marginBottom: "40px", color: "#E74C3C"}}>* โอนไม่เกิน 20.00 น. ของแต่ละวัน</div>
                            
                            {
                                allShop.map(shop =>
                                    <AccountCard shop={shop} />
                                )
                            }
                        </div>
                    :
                    <NoItem wording="ไม่มีรายการ" />
            }
        </div>
    )
}

const DateDiv = styled.div`
    text-align: center;
    font-size: 25px;
    margin: 40px 0 10px 0;
    font-weight: bold;
`

