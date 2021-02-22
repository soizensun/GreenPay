import React, { useState, useEffect } from 'react'
import { Modal, Divider, Dropdown, Grid } from 'semantic-ui-react'
import styled from 'styled-components'
import ProgressBar from 'react-bootstrap/ProgressBar'

let HEADERS = { headers: { "Content-Type": "application/json" } }

export default function ProjectDetailModal(props) {
    const [open, setOpen] = useState(false)


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
                onClose={() => {
                    setOpen(false)
                }}
                onOpen={() => setOpen(true)}
                size="large"
                style={inlineStyle}
            >
                <Modal.Content>

                    <Grid>
                        <Grid.Column width={8}>
                            <Head>
                                <BadgeContainer>
                                    {
                                        (props.project.isWeeklyProject) ? <Badge backgroundColor="#F1C40F" color="#273746">ประจำสัปดาห์</Badge> : ""
                                    }
                                    {
                                        (props.project.isClose) ? <Badge backgroundColor="#ABB2B9">ผ่านมาแล้ว</Badge> : <Badge backgroundColor="#90B099">กำลังระดมทุน</Badge>
                                    }
                                </BadgeContainer>

                                <Name>{props.project.name} </Name>
                                <Location>{props.project.location}</Location>
                            </Head>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <AccountDetail>
                                <ProgessLabel>ความคืบหน้า</ProgessLabel>
                                <ProgressBar
                                    label={`${((props.project.budget / props.project.targetBudget) * 100).toFixed(1)}%`}
                                    now={(props.project.budget / props.project.targetBudget) * 100}
                                    style={{ height: "30px", margin: "0 0 15px 0", backgroundColor: 'white' }}
                                    variant="warning"
                                />
                                <div> ยอดเงินบริจาคขณะนี้ : {props.project.budget} บาท </div>
                                <div> เป้าหมาย : {props.project.targetBudget} บาท </div>
                            </AccountDetail>
                        </Grid.Column>

                    </Grid>
                    <Divider horizontal style={{ margin: "25px" }}>รายละเอียดโปรเจค</Divider>
                    <div style={{ textAlign: 'center', fontSize: "18px", padding: '10px 20px 10px 20px' }}>
                        {props.project.description}
                    </div>

                    <Divider horizontal style={{ margin: "25px" }}>รูปภาพที่เกี่ยวข้องกับโปรเจค</Divider>
                    <PreviewPicContainer>
                        {(props.project.mainPicture) ? props.project.mainPicture.map(pic => <Image imageUrl={pic} />) : ""}
                    </PreviewPicContainer>

                </Modal.Content>
            </Modal>
        </div>
    )
}

const AccountDetail = styled.div`
    width: 500px;
    text-align: center;
    font-size: 16px;
    background-color: #D8E3DB;
    padding: 20px 30px 20px 30px;
    border-radius: 10px;
`

const Name = styled.div`
    margin: 20px 0 0 0; 
    font-size: 24px;
    color: #185341;
    font-weight: bold;
`

const Location = styled.div`
    margin: 5px 0 0 0; 
    font-size: 19px;
    color: #185341;
    font-weight: bold;
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

const ProgessLabel = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`

const Head = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const BadgeContainer = styled.div`
    margin: 10px 0 15px 0;
`

const PreviewPicContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const Image = styled.div`
    width: 180px;
    height: 180px;
    background-image: url(${props => props.imageUrl || "https://indianbankseauction.com/PropertyImages/nopreview.jpeg"});
    background-size: 180px 180px;
    margin: 11px;
`