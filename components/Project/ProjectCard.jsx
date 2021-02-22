import React from 'react'
import styled from 'styled-components'
import ProgressBar from 'react-bootstrap/ProgressBar'
import ProjectDetailModal from './ProjectDetailModal'

export default function ProjectCard(props) {
    return (
        <div>
            <ProjectDetailModal
                buttonStyle={
                    <Card>
                        <div>
                            {
                                (props.project.isWeeklyProject) ? <Badge backgroundColor="#F1C40F" color="#273746">ประจำสัปดาห์</Badge> : ""
                            }
                            {
                                (props.project.isClose) ? <Badge backgroundColor="#ABB2B9">ผ่านมาแล้ว</Badge> : <Badge backgroundColor="#90B099">กำลังระดมทุน</Badge>
                            }
                            <Name>{props.project.name}</Name>
                        </div>
                        <AccountDetail>
                            <ProgressBar
                                label={`${((props.project.budget / props.project.targetBudget) * 100).toFixed(1)}%`}
                                now={(props.project.budget / props.project.targetBudget) * 100}
                                style={{ height: "30px", margin: "0 0 15px 0" }}
                                variant="warning"
                            />
                            <div> ยอดเงินบริจาคขณะนี้ : {props.project.budget} บาท </div>
                            <div> เป้าหมาย : {props.project.targetBudget} บาท </div>
                        </AccountDetail>
                    </Card>
                }
                project={props.project}
            />

        </div>

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
    /* background-color: gainsboro; */

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
        transition: 0.3s;
    }
`

const Name = styled.div`
    width: 450px;
    margin: 10px 0 0 0; 
    font-size: 19px;
    color: #185341;
    font-weight: bold;
`

const AccountDetail = styled.div`
    width: 500px;
    text-align: center;
    font-size: 16px;
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