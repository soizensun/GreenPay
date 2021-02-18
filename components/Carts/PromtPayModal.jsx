import React, { useState, useEffect } from 'react'
import { Modal, Divider, Dropdown, Header } from 'semantic-ui-react'
import CustomButton from '../util/CustomButton';
import styled from 'styled-components'

const inlineStyle = {
    height: "auto",
    top: "auto",
    left: "auto",
    bottom: "auto",
    right: "auto",
    fontFamily: 'Prompt'
};

export default function PromtPayModal(props) {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <Modal
                closeIcon
                dimmer="blurring"
                open={open}
                trigger={props.buttonStyle}
                onClose={() => {
                    setOpen(false)
                }}
                onOpen={() => setOpen(true)}
                size="tiny"
                style={inlineStyle}
            >
                <Modal.Content>
                    <MiddleDivSection>
                        Promptpay
                    </MiddleDivSection>
                    <SubContainerImage>
                        {
                            (typeof window !== "undefined") ?
                                <Image mainPicture={`https://promptpay.io/0845858267/${parseInt(localStorage.getItem('greenPrice')) + parseInt(localStorage.getItem('totalPrice'))}`} />
                                : ""
                        }
                    </SubContainerImage>
                    <MiddleDivSection>
                        ราคา {parseInt(localStorage.getItem('greenPrice')) + parseInt(localStorage.getItem('totalPrice'))} บาท
                    </MiddleDivSection>
                    <MiddleDivSection>
                        <span onClick={() => {window.location.reload();}}>
                            <CustomButton buttonText="เสร็จสิ้น" />
                        </span>
                    </MiddleDivSection>

                </Modal.Content>
            </Modal>
        </div>
    )
}

const SubContainerImage = styled.div`
    flex-grow: 3;
    /* background-color: red; */
    text-align: center;
    display: flex;
    justify-content: center;
`


const Image = styled.div`
    width: 250px;
    height: 250px;
    background-image: url(${(props) => props.mainPicture || "https://backend.tops.co.th/media//catalog/product/3/4/3415581119183_e29-03-2019.jpg"});
    background-size: 250px 250px;
`

const MiddleDivSection = styled.div`
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px
`