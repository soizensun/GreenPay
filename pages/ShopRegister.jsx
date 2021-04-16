import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Grid, Form, TextArea, Button, Loader } from 'semantic-ui-react'
import MainLayout from '../layouts/MainLayout'
import styled from 'styled-components'
import { storage } from '../public/firebase'
import CustomButton from '../components/util/CustomButton'

const HEADERS = { 'Content-Type': 'application/json' }

export default function ShopRegister() {
    const [currentShop, setCurrentShop] = useState({});
    const [shop, setShop] = useState({});

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [accountName, setAccountName] = useState("");
    const [promptpayNumber, setPromptpayNumber] = useState("");
    const [logo, setLogo] = useState(null);
    const [preview, setPreview] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        Axios.post('api/getForceOwnerShop', JSON.stringify({ "tokenId": localStorage.getItem("userToken") }), { headers: HEADERS })
            .then(r => {
                console.log(r.data);
                setCurrentShop(r.data)
            })
    }, []);

    const createShop = () => {

        const uploadTask = storage.ref(`/shopLogo/${logo.name}`).put(logo)
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
                        if (typeof window !== "undefined") {

                            if (localStorage.getItem("userToken") != null) {
                                setIsLoading(true)
                                let body = {
                                    tokenId: localStorage.getItem("userToken"),
                                    name,
                                    description,
                                    logo: url,
                                    accountName,
                                    promptpayNumber,
                                }

                                Axios.post('api/registerShop', body, HEADERS)
                                    .then(res => {
                                        setIsLoading(false)
                                        setCurrentShop({ isActivate: true })

                                        setName("")
                                        setDescription("")
                                        setAccountName("")
                                        setPromptpayNumber("")
                                        setPreview(null)
                                        setLogo(null)
                                    })
                            }
                        }
                    })
            }
        )
    }

    const upload = (e) => {
        if (e.target.files[0] != undefined) {
            setLogo(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]))
        }
        else {
            setLogo("https://indianbankseauction.com/PropertyImages/nopreview.jpeg")
        }
    }

    return (
        <MainLayout>

            { currentShop.isActivate != undefined && <AlertContainer>ร้านของคุณกำลังรอการยืนยันจาก admin</AlertContainer>}

            <HeaderContainer>
                <Label>
                    สมัครร้านค้า
                </Label>
            </HeaderContainer>

            <div style={{ padding: "40px", fontFamily: 'Prompt' }}>

                {/* <SnakeBar snakeStatus={openSnakebar} setSnakeStatus={setOpenSnakebar} wording="แก้ไขสำเร็จ" /> */}

                <Form size="large" onSubmit={createShop}>
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
                                buttonText="สร้างร้าน"
                                disabled={currentShop.isActivate != undefined}
                            />
                        </span>
                    </div>

                </Form>
            </div>
        </MainLayout>
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

const AlertContainer = styled.div`
    height: 100px;
    border: 1px solid #D8E3DB;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 8px;
    cursor: pointer;
    padding: 16px;
    background-color: #D8E3DB;
    font-size: 20px;
`

const HeaderContainer = styled.div`
    margin: 0 0 0 30px;
    padding: 24px;
`

const Label = styled.div`
    font-size: 20px;
    font-weight: bold;
`