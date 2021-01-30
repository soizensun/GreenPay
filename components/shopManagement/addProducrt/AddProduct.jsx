import React, { useState, useEffect } from 'react'
import { Form, Button, Select, TextArea, Grid, Loader } from 'semantic-ui-react'
import Skeleton from '@material-ui/lab/Skeleton';
import CustomButton from '../../util/CustomButton'
import { storage } from "../../../public/firebase";
import styled from 'styled-components'
import Axios from 'axios';

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function AddProduct() {
    const [isAddProductLoading, setIsAddProductLoading] = useState(false);

    const [name, setName] = useState("");
    const [greenPrice, setGreenPrice] = useState(null);
    const [price, setPrice] = useState(null);
    const [tagId, setTagId] = useState(null);
    const [stock, setStock] = useState(null);
    const [description, setDescription] = useState("");
    const [mainPicture, setMainPicture] = useState(null);
    const [preview, setPreview] = useState(null);
    const [productTags, setProductTags] = useState([]);

    useEffect(() => {
        Axios.get('api/getProductTag', HEADERS)
            .then(res => {
                let tmpArray = []
                res.data.map((item, index) => {
                    let tmpObj = {}
                    tmpObj.key = index
                    tmpObj.text = item.name
                    tmpObj.value = item._id
                    tmpArray.push(tmpObj)
                })

                setProductTags(tmpArray)
            })
    }, [])

    const upload = (e) => {
        if (e.target.files[0] != undefined) {
            setMainPicture(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]))
        }
        else {
            setPreview("https://indianbankseauction.com/PropertyImages/nopreview.jpeg")
        }
    }

    const addProduct = () => {
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
                        if (typeof window !== "undefined") {
                            let body = {
                                shopId: localStorage.getItem("userShop"),
                                name,
                                tagId,
                                price,
                                stock,
                                description,
                                mainPicture: url,
                                morePicture: ["morePicture1 path", "morePicture2 path"],
                                greenPrice
                            }

                            Axios.post('api/registerProduct', JSON.stringify(body), HEADERS)
                                .then(res => {
                                    console.log(res.data);
                                    setIsAddProductLoading(true)
                                    window.location.reload()
                                })
                        }
                    })
            }
        )
    }

    return (
        <div>
            <div style={{ padding: "20px 70px 50px 70px", fontFamily: 'Prompt' }}>

                <Form size="large" onSubmit={addProduct}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={6}>
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
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Form.Group>
                                    <Form.Input required label='ชื่อสินค้า' width={16} value={name}
                                        onChange={e => setName(e.target.value)} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Input required label='ราคา' width={8} type="number" value={price}
                                        onChange={e => setPrice(e.target.value)} />
                                    <Form.Input required label='Green Price' width={8} type="number" value={greenPrice}
                                        onChange={e => setGreenPrice(e.target.value)} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Input required label='ประเภท' width={8} control={Select} options={productTags}
                                        onChange={(e, { value }) => setTagId(value)} />
                                    <Form.Input required label='จำนวนสินค้าในคลัง' width={8} type="number" value={stock}
                                        onChange={e => setStock(e.target.value)} />
                                </Form.Group>

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Form.Group>
                        <Form.Input required label='คำอธิบาย' width={16} value={description} control={TextArea}
                            onChange={e => setDescription(e.target.value)} />
                    </Form.Group>

                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <div></div>
                        <span content='Submit'>
                            <Loader active={isAddProductLoading} inline size='small' style={{ marginRight: "20px" }} />
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
    width: 160px;
    height: 160px;
    background-image: url(${props => props.imageUrl || "https://indianbankseauction.com/PropertyImages/nopreview.jpeg"});
    background-size: 160px 160px;
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
    padding: 10px
`