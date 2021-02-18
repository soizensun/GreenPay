import React, { useState, useEffect } from 'react'
import { Modal, Form, Button, Select, TextArea, Loader, Header, Grid } from 'semantic-ui-react'
import styled from 'styled-components'
import CustomButton from '../../util/CustomButton';
import { storage } from "../../../public/firebase";
import Axios from 'axios';

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function ProductDetailModal(props) {
    const [open, setOpen] = useState(false)

    const [isAddProductLoading, setIsAddProductLoading] = useState(false);

    const [name, setName] = useState(props.product.name);
    const [greenPrice, setGreenPrice] = useState(props.product.greenPrice);
    const [price, setPrice] = useState(props.product.price);
    const [tagId, setTagId] = useState(props.product.tagId);
    const [stock, setStock] = useState(props.product.stock);
    const [description, setDescription] = useState(props.product.description);
    const [mainPicture, setMainPicture] = useState(props.product.mainPicture);

    const [preview, setPreview] = useState(props.product.mainPicture);
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

    const editProduct = () => {

        if (typeof (mainPicture) == 'object') {

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
                            let body = {
                                _id: props.product._id,
                                shopId: props.product.shopId,
                                name,
                                tagId,
                                price,
                                stock,
                                description,
                                mainPicture: url,
                                morePicture: ["morePicture1 path", "morePicture2 path"],
                                greenPrice
                            }

                            Axios.post('api/updateProduct', JSON.stringify(body), HEADERS)
                                .then(res => {
                                    setOpen(false)
                                    props.updateProduct(res.data)
                                })
                        })
                }
            )
        }
        else {

            let body = {
                _id: props.product._id,
                shopId: props.product.shopId,
                name,
                tagId,
                price,
                stock,
                description,
                mainPicture,
                morePicture: ["morePicture1 path", "morePicture2 path"],
                greenPrice
            }

            Axios.post('api/updateProduct', JSON.stringify(body), HEADERS)
                .then(res => {
                    setOpen(false)
                    props.updateProduct(res.data)
                })
        }
    }

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
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                size="large"
                style={inlineStyle}
            >
                <Header style={{ fontFamily: "Prompt" }} textAlign='center'>แก้ไขรายละเอียดสินค้า</Header>
                <div style={{ padding: "30px 60px 30px 60px" }}>
                    <Modal.Content >
                        <Form size="large" onSubmit={editProduct} style={{ paddingTop: "20px" }}>
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
                                                    <Form.Input id="file" type="file"
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
                                            <Form.Input required label='ประเภท' width={8} control={Select} options={productTags} value={tagId}
                                                onChange={(e, { value }) => setTagId(value)} />
                                            <Form.Input required label='จำนวนสินค้าในคลัง' width={8} type="number" value={stock}
                                                onChange={e => setStock(e.target.value)} />
                                        </Form.Group>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <div style={{marginTop: "25px"}}>
                                <Form.Group>
                                    <Form.Input required label='คำอธิบาย' width={16} value={description} control={TextArea}
                                        onChange={e => setDescription(e.target.value)} />
                                </Form.Group>
                            </div>


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
                    </Modal.Content>
                </div>

            </Modal>
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
    display: flex;
    justify-content: center;
`

const Center = styled.div`
    display: flex;
    justify-content: center;
`

const Border = styled.div`
    width: 300px;
    /* border: 1px solid #DEDEDF; */
    border-radius: 5px;
    padding: 10px
`