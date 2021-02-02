import React, { useEffect, useState } from 'react'
import IncomeCard from "./IncomeCard";
import Axios from 'axios'

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function MyIncome() { 
    const [incomeList, setIncomeList] = useState([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("userShop") != null) {
                Axios.post("/api/getMyIncome", JSON.stringify({ shopId: localStorage.getItem("userShop") }), HEADERS)
                    .then(res => {
                        setIncomeList(res.data)
                    })
            }
        }
    }, [])
    
    return (
        <div>
            {
                incomeList.map(aList => <IncomeCard aList={aList}/>)
            }
        </div>
    )
}
