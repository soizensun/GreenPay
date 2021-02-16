import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Progress } from 'semantic-ui-react'
import { AiTwotoneDelete, AiTwotoneEdit, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import EditProject from './EditProject'
import { Grid, Popup } from 'semantic-ui-react'
import CustomButton from '../../util/CustomButton'
import Axios from 'axios';

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function ProjectCart(props) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isActivateStatus, setIsActivateStatus] = useState(props.project.isActivate);

    return (
        <Card>
            <Name>{props.project.name}</Name>
            {/* <Location>{props.project.location}</Location> */}
            <BudgetDetail>
                <div>
                    <CurrentBudget>ยอด {props.project.budget} บาท </CurrentBudget>
                </div>
                <div>
                    ต้องการ {props.project.targetBudget} บาท
                </div>
            </BudgetDetail>

            <Control>
                {
                    (isActivateStatus) ?
                        <CloseEye
                            disabled={props.project.isWeeklyProject}
                            onClick={() => {
                                setIsActivateStatus(!isActivateStatus)
                                Axios.post("/api/switchIsActivateProject", JSON.stringify({ projectId: props.project._id }), HEADERS)
                                    .then(res => {
                                        props.updateProjectVisibleCase(res.data)
                                    })
                            }}>
                            <AiOutlineEyeInvisible />
                        </CloseEye>
                        :
                        <Eye
                            disabled={props.project.isWeeklyProject}
                            onClick={() => {
                                setIsActivateStatus(!isActivateStatus)
                                Axios.post("/api/switchIsActivateProject", JSON.stringify({ projectId: props.project._id }), HEADERS)
                                    .then(res => {
                                        props.updateProjectVisibleCase(res.data)
                                    })
                            }}>
                            <AiOutlineEye />
                        </Eye>
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

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
        transition: 0.3s;
    }
`

const Name = styled.div`
    width: 250px;
    /* margin: 0 0 0 30px;  */
    font-size: 19px;
    color: #185341;
    font-weight: bold;
`

const Location = styled.div`
    width: 150px;
    font-size: 18px;
    color: #185341;
`

const Budget = styled.div`
    /* margin: 0 0 0 30px;  */
    font-size: 14px;
    color: #185341;
    
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

const ConfirmPopup = styled.div`
    text-align: center;
    margin: 10px 0 20px 0;
    font-size: 16px;
    font-family: Prompt;
`