import React from 'react'
import styled from 'styled-components'
import { MdHourglassEmpty } from "react-icons/md";

export default function NoItem(props) {
    return (
        <Container>
            {/* <MdHourglassEmpty style={{margin: "50px"}}/> */}
            {props.wording || "ไม่มีรายการ"}
        </Container>
    )
}

const Container = styled.div`
    height: 20vh;
    /* background-color: red; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    color: #D5D8DC;
`