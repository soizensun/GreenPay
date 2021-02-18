import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Grid, Form, TextArea, Button, Loader } from 'semantic-ui-react'
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import { storage } from "../../../public/firebase";
import CustomButton from '../../util/CustomButton'
import Axios from 'axios'
import SnakeBar from '../../util/CustomSnakeBar'

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function Myshop() {
    const [shop, setShop] = useState({});

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [accountName, setAccountName] = useState("");
    const [promptpayNumber, setPromptpayNumber] = useState("");
    const [logo, setLogo] = useState(null);
    const [preview, setPreview] = useState(null);

    const [openSnakebar, setOpenSnakebar] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("userShop") != null) {
                Axios.post("/api/getShopDetail", JSON.stringify({ shopId: localStorage.getItem("userShop") }), HEADERS)
                    .then(res => {
                        console.log(res.data);
                        setShop(res.data)

                        setName(res.data.name)
                        setAccountName(res.data.accountName)
                        setDescription(res.data.description)
                        setPromptpayNumber(res.data.promptpayNumber)
                        setPreview(res.data.logo)
                        setLogo(res.data.logo)
                    })
            }
        }
    }, [])

    const upload = (e) => {
        if (e.target.files[0] != undefined) {
            setLogo(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]))
        }
    }

    const editProduct = () => {
        setIsLoading(true)

        if (typeof (logo) == 'object') {
            const uploadTask = storage.ref(`shopLogo/${logo.name}`).put(logo)
            uploadTask.on(
                "state_changed",
                snapshot => { },
                error => { console.log("upload image", error) },
                () => {
                    storage
                        .ref("shopLogo")
                        .child(logo.name)
                        .getDownloadURL()
                        .then(url => {
                            let body = {
                                _id: shop._id,
                                name,
                                description,
                                logo: url,
                                accountName,
                                promptpayNumber
                            }

                            Axios.post('api/updateShop', JSON.stringify(body), HEADERS)
                                .then(res => {
                                    setIsLoading(false)
                                    setOpenSnakebar(true)
                                })
                        })
                }
            )
        }
        else {
            let body = {
                _id: shop._id,
                name,
                description,
                logo,
                accountName,
                promptpayNumber
            }


            Axios.post('api/updateShop', JSON.stringify(body), HEADERS)
                .then(res => {
                    setIsLoading(false)
                    setOpenSnakebar(true)
                })
        }
    }

    return (
        <div style={{ padding: "40px", fontFamily: 'Prompt' }}>

            <SnakeBar snakeStatus={openSnakebar} setSnakeStatus={setOpenSnakebar} wording="แก้ไขสำเร็จ"/>

            <Form size="large" onSubmit={editProduct}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <ImageForm>
                                <Border>
                                    <Center style={{ marginBottom: "20px" }}>
                                        <Image imageUrl={preview} />
                                    </Center>
                                    <Center>
                                        <Button
                                            as="label"
                                            content="เลือก logo"
                                            labelPosition="right"
                                            icon="file"
                                            htmlFor="file"
                                            style={{ fontFamily: "Prompt" }}
                                        />
                                        <Form.Input id="file" type="file"
                                            onChange={upload} style={{ width: "0px" }} hidden />
                                    </Center>
                                </Border>
                            </ImageForm>
                        </Grid.Column>

                        <Grid.Column width={11}>
                            <Form.Group>
                                <Form.Input required width={16} label='ชื่อร้าน' value={name}
                                    onChange={e => setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Input required width={16} label='ชื่อบัญชี' value={accountName}
                                    onChange={e => setAccountName(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Input required width={16} label='หมายเลข promptpay' value={promptpayNumber}
                                    onChange={e => setPromptpayNumber(e.target.value)} />
                            </Form.Group>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>

                <Form.Group>
                    <Form.Input required control={TextArea} width={16} label='คำอธิบาย' value={description}
                        onChange={e => setDescription(e.target.value)} />
                </Form.Group>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                    <div></div>
                    <span content='Submit'>
                        <Loader active={isLoading} inline size='small' style={{ marginRight: "20px" }} />
                        <CustomButton
                            color="#FDFEFE"
                            height="40px"
                            width="100px"
                            backgroundColor="#185341"
                            buttonText="บันทึก"
                        />
                    </span>
                </div>

            </Form>
        </div>
    )
}

const Image = styled.div`
    width: 160px;
    height: 160px;
    border-radius: 1000px;
    background-image: url(${props => props.imageUrl || "https://indianbankseauction.com/PropertyImages/nopreview.jpeg"});
    background-size: 160px 160px;
`
const ImageForm = styled.div`
    display: flex;
    justify-content: center;
`

const Center = styled.div`
    display: flex;
    justify-content: center;
`

const Border = styled.div`
    width: 300px;
    border-radius: 5px;
    padding: 10px;
`