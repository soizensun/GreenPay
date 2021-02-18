import React, { useState, useEffect } from 'react'
import { Form, Button, Select, TextArea, Grid, Loader } from 'semantic-ui-react'
import styled from 'styled-components'
import CustomButton from '../../util/CustomButton'
import Axios from 'axios';
import { storage } from '../../../public/firebase'
import SnakeBar from '../../util/CustomSnakeBar'

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function AddProject() {
    const [name, setName] = useState("");
    const [projectLocation, setProjectLocation] = useState('');
    const [budget, setBudget] = useState(null);
    const [targetBudget, setTargetBudget] = useState(null);
    const [description, setDescription] = useState('');
    const [mainPicture, setMainPicture] = useState([]);

    const [previewPic, setPreviewPic] = useState([]);

    const [isAddProjectLoading, setIsAddProjectLoading] = useState(false);
    const [openSnakebar, setOpenSnakebar] = useState(false);

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

    const createProject = () => {
        setIsAddProjectLoading(true)

        let urlList = []
        if (mainPicture.length != 0) {
            mainPicture.map(pic => {
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
                                        name,
                                        location: projectLocation,
                                        description,
                                        mainPicture: urlList,
                                        budget,
                                        targetBudget
                                    }

                                    Axios.post('api/registerProject', JSON.stringify(body), HEADERS)
                                        .then(res => {
                                            // console.log(res.data);
                                            setName('')
                                            setProjectLocation('')
                                            setBudget(0)
                                            setTargetBudget(0)
                                            setDescription('')
                                            setMainPicture([])
                                            setPreviewPic([])
                                            setIsAddProjectLoading(false)
                                            setOpenSnakebar(true)
                                        })
                                }
                            })
                    }
                )
            })
        }
        else{
            let body = {
                name,
                location: projectLocation,
                description,
                mainPicture,
                budget,
                targetBudget
            }

            Axios.post('api/registerProject', JSON.stringify(body), HEADERS)
                .then(res => {
                    // console.log(res.data);
                    setName('')
                    setProjectLocation('')
                    setBudget(0)
                    setTargetBudget(0)
                    setDescription('')
                    setMainPicture([])
                    setPreviewPic([])
                    setIsAddProjectLoading(false)
                    setOpenSnakebar(true)
                })
        }

    }


    return (
        <div style={{ padding: "40px", fontFamily: 'Prompt' }}>

            <SnakeBar snakeStatus={openSnakebar} setSnakeStatus={setOpenSnakebar} wording="สร้างโครงการสำเร็จ"/>

            <Form size="large" onSubmit={createProject}>
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
                </Border>



                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                    <div></div>
                    <span content='Submit'>
                        <Loader active={isAddProjectLoading} inline size='small' style={{ marginRight: "20px" }} />
                        <CustomButton
                            color="#FDFEFE"
                            height="40px"
                            width="180px"
                            backgroundColor="#185341"
                            buttonText="สร้างโครงการ"
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
    background-image: url(${props => props.imageUrl || "https://indianbankseauction.com/PropertyImages/nopreview.jpeg"});
    background-size: 160px 160px;
    margin: 11px;
`

const ImageForm = styled.div`
    display: flex;
    justify-content: center;
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

const Border = styled.div`
    /* box-shadow: 1px 1px 5px #ABB2B9; */
    border: 1px solid #DEDEDF;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 30px;
`