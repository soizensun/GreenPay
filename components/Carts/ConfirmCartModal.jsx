import React, { useState } from 'react'
import { Button, Header, Form, Modal, Divider } from 'semantic-ui-react'

export default function ConfirmCartModal(props) {
    const [open, setOpen] = useState(false)

    const inlineStyle = {
        height: "auto",
        top: "auto",
        left: "auto",
        bottom: "auto",
        right: "auto",
        fontFamily: 'Prompt'
    };

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
                size="large"
                style={inlineStyle}
            >
                <Header style={{ fontFamily: "Prompt" }} textAlign='center'>สร้างที่อยู่จัดส่ง</Header>
                <div style={{ padding: "20px 70px 50px 70px", fontFamily: 'Prompt' }}>

                    {
                        (typeof window !== "undefined") ?
                            localStorage.getItem('totalPrice')
                            : ""
                    }
                    {
                        (typeof window !== "undefined") ?
                            localStorage.getItem('greenPrice')
                            : ""
                    }

                </div>
            </Modal>
        </div>
    )
}
