import React from 'react'
import styled from 'styled-components'

export default function CustomButton(props) {
    return (
        <div>
            <PrimaryButton
                width={props.width}
                height={props.height}
                backgroundColor={props.backgroundColor}
            >
                {props.buttonText || "primaryButton"}
            </PrimaryButton>
        </div>
    )
}

const PrimaryButton = styled.button`
    background-color: ${props => {
        if(props.backgroundColor) 
            return props.backgroundColor + "af" 
        else return "#3949ABaf"
        } };
    color: white;
    width: ${props => props.width || "200px"};
    height: ${props => props.height || "45px"};
    border: solid 1.5px ${props => props.backgroundColor || "#3949AB" }; ;
    font-size: 17px;
    border-radius: 7px;
    transition: .6s;
    overflow: hidden;

    &:hover {
        background: ${props => props.backgroundColor || "#3949AB" };
        cursor: pointer;
        color: rgb(255, 255, 255)
    }

    &:disabled, .submitBTN[disabled] {
        border: 1px solid #999999;
        background-color: #cccccc;
        color: #666666;
        cursor: no-drop;
    }
`
