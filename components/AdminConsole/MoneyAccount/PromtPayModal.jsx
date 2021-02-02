import React, { useState } from 'react'
import { Modal } from 'semantic-ui-react'
import CustomButton from '../../util/CustomButton';
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
                        {<Image mainPicture={`https://promptpay.io/${props.promptpayNumber}/${props.total}`} />}
                    </SubContainerImage>

                    <MiddleDivSection>
                        ราคา {props.total} บาท
                    </MiddleDivSection>

                </Modal.Content>
            </Modal>
        </div>
    )
}

const SubContainerImage = styled.div`
    flex-grow: 3;
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