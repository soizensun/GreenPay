import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Progress } from 'semantic-ui-react'
import { AiTwotoneDelete, AiTwotoneEdit, AiOutlineClose } from "react-icons/ai";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import EditProject from './EditProject'
import { Grid, Popup } from 'semantic-ui-react'
import CustomButton from '../../util/CustomButton'
import Axios from 'axios';
import NumberFormat from 'react-number-format';

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function ProjectCard(props) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopup2Open, setIsPopup2Open] = useState(false);
    const [isActivateStatus, setIsActivateStatus] = useState(props.project.isActivate);

    return (
        <Card isActivateStatus={isActivateStatus}>
            <div>
                {
                    (props.project.isWeeklyProject) ? <Badge backgroundColor="#F1C40F" color="#273746">ประจำสัปดาห์</Badge> : ""
                }
                {
                    (props.project.isClose) ? <Badge backgroundColor="#ABB2B9">ผ่านมาแล้ว</Badge> : <Badge backgroundColor="#90B099">กำลังระดมทุน</Badge>
                }
                <Name>{props.project.name}</Name>
            </div>

            <BudgetDetail>
                <NumberFormat value={props.project.budget} displayType={'text'} thousandSeparator={true} renderText={value =>
                    <div>
                        <CurrentBudget>ยอด {value} บาท </CurrentBudget>
                    </div>
                } />

                <NumberFormat value={props.project.targetBudget} displayType={'text'} thousandSeparator={true} renderText={value =>
                    <div>
                        เป้าหมาย {value} บาท
                    </div>
                } />

            </BudgetDetail>

            <Control>
                <Popup
                    wide
                    position="bottom right"
                    size='small'
                    on='click'
                    open={isPopup2Open}
                    onClose={() => setIsPopup2Open(false)}
                    onOpen={() => setIsPopup2Open(true)}
                    trigger={
                        <CloseProject
                            disabled={props.project.isWeeklyProject || props.project.isClose}
                        >
                            <AiOutlineClose />
                        </CloseProject>
                    }
                >
                    <ConfirmPopup>
                        ยืนยันการปิดการระดมทุน ?
                    </ConfirmPopup>

                    <Grid columns='equal'>
                        <Grid.Column>
                            <span onClick={() => setIsPopup2Open(false)} style={{ cursor: "pointer" }}>
                                <CustomButton
                                    buttonText="ยกเลิก"
                                    width="100px"
                                    height="40px"
                                    backgroundColor="#D5D8DC"
                                    color="#1C2833" />
                            </span>

                        </Grid.Column>
                        <Grid.Column>
                            <span
                                onClick={() => {
                                    // setIsActivateStatus(!isActivateStatus)
                                    setIsPopup2Open(false)
                                    Axios.post("/api/switchIsCloseProject", JSON.stringify({ projectId: props.project._id }), HEADERS)
                                        .then(res => {
                                            props.updateProjectVisibleCase(res.data)
                                        })
                                }}
                                style={{ cursor: "pointer" }}>
                                <CustomButton
                                    buttonText="ยืนยัน"
                                    width="100px"
                                    height="40px"
                                    backgroundColor="#E59866" />
                            </span>
                        </Grid.Column>
                    </Grid>
                </Popup>

                {
                    (isActivateStatus) ?
                        <Eye
                            disabled={props.project.isWeeklyProject}
                            onClick={() => {
                                setIsActivateStatus(!isActivateStatus)
                                Axios.post("/api/switchIsActivateProject", JSON.stringify({ projectId: props.project._id }), HEADERS)
                                    .then(res => {
                                        props.updateProjectVisibleCase(res.data)
                                    })
                            }}>
                            <RiEyeLine />
                        </Eye>
                        :
                        <CloseEye
                            disabled={props.project.isWeeklyProject}
                            onClick={() => {
                                setIsActivateStatus(!isActivateStatus)
                                Axios.post("/api/switchIsActivateProject", JSON.stringify({ projectId: props.project._id }), HEADERS)
                                    .then(res => {
                                        props.updateProjectVisibleCase(res.data)
                                    })
                            }}>
                            <RiEyeCloseLine />
                        </CloseEye>
                }

                <EditProject
                    buttonStyle={
                        <EditBTN>
                            <AiTwotoneEdit />
                        </EditBTN>
                    }
                    project={props.project}
                    updateProject={props.updateProject}
                />

                <Popup
                    wide
                    position="bottom right"
                    size='small'
                    on='click'
                    open={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    onOpen={() => setIsPopupOpen(true)}
                    trigger={
                        <DeleteBTN disabled={props.project.isWeeklyProject}>
                            <AiTwotoneDelete />
                        </DeleteBTN>
                    }
                >
                    <ConfirmPopup>
                        ยืนยันการลบ ?
                    </ConfirmPopup>

                    <Grid columns='equal'>
                        <Grid.Column>
                            <span onClick={() => setIsPopupOpen(false)} style={{ cursor: "pointer" }}>
                                <CustomButton
                                    buttonText="ยกเลิก"
                                    width="100px"
                                    height="40px"
                                    backgroundColor="#D5D8DC"
                                    color="#1C2833" />
                            </span>

                        </Grid.Column>
                        <Grid.Column>
                            <span onClick={() => {
                                Axios.post("/api/deleteProject", JSON.stringify({ projectId: props.project._id }), HEADERS)
                                    .then(res => {
                                        props.updateProject(res.data)
                                    })
                                setIsPopupOpen(false)
                            }} style={{ cursor: "pointer" }}>
                                <CustomButton
                                    buttonText="ลบ"
                                    width="100px"
                                    height="40px"
                                    backgroundColor="#E74C3C" />
                            </span>
                        </Grid.Column>
                    </Grid>
                </Popup>

            </Control>

        </Card>
    )
}

const Card = styled.div`
    height: auto;
    border: 1px solid #CDCDCF;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 7px;
    cursor: pointer;
    padding: 30px;
    background-color: ${props => {
        if (!props.isActivateStatus)
            return "#EAECEE";
    }};

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
        transition: 0.3s;
    }
`

const Badge = styled.span`
    background-color: ${props => props.backgroundColor || "#5C6E9A"};
    margin: 0 5px 10px 0;
    padding: 3px 10px 3px 10px;
    font-size: 13px;
    font-weight: normal;
    color: ${props => props.color || "white"};
    border-radius: 10px;
`

const Name = styled.div`
    width: 250px;
    margin: 10px 0 0 0; 
    font-size: 19px;
    color: #185341;
    font-weight: bold;
`

const CurrentBudget = styled.span`
    font-size: 18px;
    color: #185341;
`

const Control = styled.div`
    font-size: 26px;
    display: flex;
`

const EditBTN = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    cursor: pointer;
    width: 55px;
    height: 55px;
    color: #F1C40F;
    
    &:hover {
        color: white;
        background-color: #F1C40F;
        transition: 0.3s;
    }
`

const BudgetDetail = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 16px;
`

const DeleteBTN = styled.button`
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    cursor: pointer;
    width: 55px;
    height: 55px;
    color: #E74C3C;
    border: none;
    background: none;

    &:hover {
        color: white;
        background-color: #E74C3C;
        transition: 0.3s;
    }

    &:disabled, .submitBTN[disabled] {
        border: 1px solid #999999;
        background-color: #cccccc;
        color: #666666;
        cursor: no-drop;
        border: none;
        background: none;
    }
`

const Eye = styled.button`
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    cursor: pointer;
    width: 55px;
    height: 55px;
    color: #208A1E;
    border: none;
    background: none;

    &:hover {
        color: white;
        background-color: #208A1E;
        transition: 0.3s;
    }

    &:disabled, .submitBTN[disabled] {
        border: 1px solid #999999;
        background-color: #cccccc;
        color: #666666;
        cursor: no-drop;
        border: none;
        background: none;
    }
`

const CloseEye = styled.button`
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    cursor: pointer;
    width: 55px;
    height: 55px;
    color: #208A1E;
    border: none;
    background: none;

    &:hover {
        color: white;
        background-color: #208A1E;
        transition: 0.3s;
    }

    &:disabled, .submitBTN[disabled] {
        border: 1px solid #999999;
        background-color: #cccccc;
        color: #666666;
        cursor: no-drop;
        border: none;
        background: none;
    }
`

const CloseProject = styled.button`
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    cursor: pointer;
    width: 55px;
    height: 55px;
    color: #E59866;
    border: none;
    background: none;

    &:hover {
        color: white;
        background-color: #E59866;
        transition: 0.3s;
    }

    &:disabled, .submitBTN[disabled] {
        border: 1px solid #999999;
        background-color: #cccccc;
        color: #666666;
        cursor: no-drop;
        border: none;
        background: none;
    }
`

const ConfirmPopup = styled.div`
    text-align: center;
    margin: 10px 0 20px 0;
    font-size: 16px;
    font-family: Prompt;
`
