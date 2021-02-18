import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import styled from 'styled-components'
import { FiCheckCircle } from "react-icons/fi";

export default function CustomSnakeBar(props) {

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={props.snakeStatus} autoHideDuration={4000} onClose={() => props.setSnakeStatus(false)}>
            <Alert color={props.color}>
                <span style={{ marginRight: "10px" }}>{props.icon || <FiCheckCircle />}</span>
                {props.wording || "สำเร็จ"}
            </Alert>
        </Snackbar>
    )
}

const Alert = styled.div`
    padding: 10px 25px 10px 25px;
    background-color: white;
    border: ${props => {
        if(props.color)
            return "2px solid " + props.color
        else return "2px solid #679072"
    }};
    border-radius: 5px;
    font-size: 16px;
    color: ${props => props.color || "#679072"};
    font-weight: bold
`
