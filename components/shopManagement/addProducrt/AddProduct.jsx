import React, { useState, createRef } from 'react'
import { Form, Button, Select, TextArea } from 'semantic-ui-react'
import Skeleton from '@material-ui/lab/Skeleton';
import CustomButton from '../../util/CustomButton'
import { storage } from "../../../public/firebase";
import styled from 'styled-components'

export default function AddProduct() {
    let fileInputRef = createRef();

    const [open, setOpen] = useState(false)

    const [recipientName, setRecipientName] = useState('');
    const [recipientSirName, setRecipientSirName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [houseNumber, setHouseNumber] = useState('')
    const [moo, setMoo] = useState('')
    const [road, setRoad] = useState('')
    const [subDistrict, setSubDistrict] = useState('');
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    const [postCode, setPostCode] = useState('');

    const [mainPicture, setMainPicture] = useState(null);
    const [preview, setPreview] = useState(null);

    const upload = (e) => {
        if (e.target.files[0] != undefined) {
            setMainPicture(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]))
        }
        else {
            setPreview("https://indianbankseauction.com/PropertyImages/nopreview.jpeg")
        }
    }

    const submit = () => {
        console.log(mainPicture);
        const uploadTask = storage.ref(`productImages/${mainPicture.name}`).put(mainPicture)
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => { console.log("upload image", error) },
            () => {
                storage
                    .ref("productImages")
                    .child(mainPicture.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url)
                    })
            }
        )
    }

    return (
        <div>
            
            <div style={{ padding: "20px 70px 50px 70px", fontFamily: 'Prompt' }}>

                <Form size="large">

                    <ImageForm>
                        <Border>
                            <Center style={{ marginBottom: "20px" }}>
                                <Image imageUrl={preview} />
                            </Center>
                            <Center>
                                <Button
                                    as="label"
                                    content="เลือกรูปภาพ"
                                    labelPosition="right"
                                    icon="file"
                                    htmlFor="file"
                                    style={{ fontFamily: "Prompt" }}
                                />
                                <Form.Input required id="file" type="file"
                                    onChange={upload} style={{ width: "0px" }} hidden />
                            </Center>
                        </Border>
                    </ImageForm>

                    <Form.Group>
                        <Form.Input required label='ชื่อสินค้า' width={16} value={recipientName}
                            onChange={e => setRecipientName(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Input required label='ราคา' width={8} type="number" value={houseNumber}
                            onChange={e => setHouseNumber(e.target.value)} />
                        <Form.Input label='Green Price' width={8} type="number" value={moo}
                            onChange={e => setMoo(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Input label='ประเภท' width={8} value={road} control={Select}
                            onChange={e => setRoad(e.target.value)} />
                        <Form.Input required label='จำนวนสินค้าในคลัง' width={8} type="number" value={province}
                            onChange={e => setProvince(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Input required label='คำอธิบาย' width={16} value={province} control={TextArea}
                            onChange={e => setProvince(e.target.value)} />
                    </Form.Group>

                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <div></div>
                        <span content='Submit'>
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
        </div>
    )
}

const Image = styled.div`
    width: 200px;
    height: 200px;
    background-image: url(${props => props.imageUrl || "https://indianbankseauction.com/PropertyImages/nopreview.jpeg"});
    background-size: 200px 200px;
`

const ImageForm = styled.div`
    /* padding: 20px; */
    display: flex;
    justify-content: center;
`

const Center = styled.div`
    display: flex;
    justify-content: center;
`

const Border = styled.div`
    width: 300px; 
    /* box-shadow: 1px 1px 5px #ABB2B9; */
    border: 1px solid #DEDEDF;
    border-radius: 5px;
    padding: 20px
`