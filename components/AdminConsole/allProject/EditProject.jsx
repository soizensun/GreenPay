import React, { useState, useEffect } from 'react'
import { Modal, Form, Button, Select, TextArea, Loader, Header, Grid } from 'semantic-ui-react'
import styled from 'styled-components'
import CustomButton from '../../util/CustomButton'
import { storage } from '../../../public/firebase'
import Axios from 'axios';

const inlineStyle = {
    height: "auto",
    top: "auto",
    left: "auto",
    bottom: "auto",
    right: "auto",
    fontFamily: 'Prompt'
};

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function EditProject(props) {
    const [open, setOpen] = useState(false)

    const [name, setName] = useState(props.project.name);
    const [projectLocation, setProjectLocation] = useState(props.project.location);
    const [budget, setBudget] = useState(props.project.budget);
    const [targetBudget, setTargetBudget] = useState(props.project.targetBudget);
    const [description, setDescription] = useState(props.project.description);
    const [mainPicture, setMainPicture] = useState(props.project.mainPicture);

    const [previewPic, setPreviewPic] = useState(props.project.mainPicture);

    const editProject = () => {
        let urlList = []

        if (mainPicture.length != 0) {
            mainPicture.map(pic => {
                if (typeof (pic) == 'object') {
                    const uploadTask = storage.ref(`projectImages/${pic.name}`).put(pic)
                    uploadTask.on(
                        "state_changed",
                        snapshot => { },
                        error => { console.log("upload image", error) },
                        () => {
                            storage
                                .ref("projectImages")
                                .child(pic.name)
                                .getDownloadURL()
                                .then(url => {

                                    urlList.push(url)

                                    if (urlList.length == mainPicture.length) {
                                        console.log(urlList);

                                        let body = {
                                            _id: props.project._id,
                                            name,
                                            location: projectLocation,
                                            mainPicture: urlList,
                                            description,
                                            budget,
                                            targetBudget
                                        }

                                        Axios.post('api/updateProject', JSON.stringify(body), HEADERS)
                                            .then(res => {
                                                setOpen(false)
                                                props.updateProject(res.data)
                                            })
                                    }

                                })
                        }
                    )
                }
                else {
                    urlList.push(pic)
                    if (urlList.length == mainPicture.length) {
                        console.log(urlList);

                        let body = {
                            _id: props.project._id,
                            name,
                            location: projectLocation,
                            mainPicture: urlList,
                            description,
                            budget,
                            targetBudget
                        }

                        Axios.post('api/updateProject', JSON.stringify(body), HEADERS)
                            .then(res => {
                                setOpen(false)
                                props.updateProject(res.data)
                            })
                    }
                }
            })
        }
        else {
            let body = {
                _id: props.project._id,
                name,
                location: projectLocation,
                mainPicture,
                description,
                budget,
                targetBudget
            }

            Axios.post('api/updateProject', JSON.stringify(body), HEADERS)
                .then(res => {
                    setOpen(false)
                    props.updateProject(res.data)
                })
        }

    }

    const upload = (e) => {
        if (e.target.files != 0) {
            let tmpPreviewPicList = []
            let tmpPicList = []

            for (let index = 0; index < e.target.files.length; index++) {
                const pic = e.target.files[index];
                tmpPreviewPicList.push(URL.createObjectURL(pic))
                tmpPicList.push(pic)
            }
            let newPreviewList = previewPic.concat(tmpPreviewPicList)
            let newPicList = mainPicture.concat(tmpPicList)

            setMainPicture(newPicList)
            setPreviewPic(newPreviewList)
        }
        else {
            setPreviewPic(["https://indianbankseauction.com/PropertyImages/nopreview.jpeg"])
        }
    }

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
                <Header style={{ fontFamily: "Prompt" }} textAlign='center'>แก้ไขรายละเอียดโครงการ</Header>
                <div style={{ padding: "30px 60px 30px 60px" }}>
                    <Modal.Content >
                        <Form size="large" onSubmit={editProject}>
                            <Form.Group>
                                <Form.Input required label='ชื่อโครงการ' width={16} value={name}
                                    onChange={e => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Input required label='สถานที่' width={16} type="สถานที่" value={projectLocation}
                                    onChange={e => setProjectLocation(e.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Input required label='ยอดเงินปัจจุบันในโครงการ' type="number" width={8} value={budget}
                                    onChange={(e, { value }) => setBudget(value)} />
                                <Form.Input required label='ยอดเงินเป้าหมาย' width={8} type="number" value={targetBudget}
                                    onChange={e => setTargetBudget(e.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Input required label='คำอธิบายโครงการ' width={16} value={description} control={TextArea}
                                    onChange={e => setDescription(e.target.value)} />
                            </Form.Group>
                            <Border>
                                <Center>
                                    <Button
                                        as="label"
                                        content="เลือกรูปภาพ"
                                        labelPosition="right"
                                        icon="file"
                                        htmlFor="file"
                                        style={{ fontFamily: "Prompt" }}
                                    />
                                    <input multiple id="file" type="file"
                                        onChange={upload} style={{ width: "0px" }} hidden />
                                </Center>
                                <PreviewPicContainer>
                                    {previewPic.map(pic => <Image imageUrl={pic} />)}
                                </PreviewPicContainer>
                                {
                                    (previewPic.length != 0) &&
                                    <Center style={{ margin: "15px" }}>
                                        <span onClick={() => {
                                            setMainPicture([])
                                            setPreviewPic([])
                                        }}>
                                            <CustomButton
                                                backgroundColor="#E74C3C"
                                                buttonText="ลบรูปทั้งหมด"
                                                height="30px"
                                                width="130px"
                                            />

                                        </span>

                                    </Center>
                                }

                            </Border>



                            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                <div></div>
                                <span content='Submit'>
                                    <CustomButton
                                        color="#FDFEFE"
                                        height="40px"
                                        width="180px"
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
    width: 180px;
    height: 180px;
    background-image: url(${props => props.imageUrl || "https://indianbankseauction.com/PropertyImages/nopreview.jpeg"});
    background-size: 180px 180px;
    margin: 11px;
`

const Border = styled.div`
    /* box-shadow: 1px 1px 5px #ABB2B9; */
    border: 1px solid #DEDEDF;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 30px;
`

const Center = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px;
`

const PreviewPicContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`