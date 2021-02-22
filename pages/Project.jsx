import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import ProjectCard from '../components/Project/ProjectCard'
import MainLayout from '../layouts/MainLayout'
import { Grid } from 'semantic-ui-react'
import CustomButton from '../components/util/CustomButton'
import NoItem from '../components/util/NoItem'
import ProjectDetailModal from '../components/Project/ProjectDetailModal'
import Skeleton from '@material-ui/lab/Skeleton';

let HEADERS = { headers: { "Content-Type": "application/json" } }

export default function Project() {
    const [allProject, setAllProject] = useState([]);
    const [weeklyProject, setWeeklyProject] = useState({});
    const [tabStatus, setTabStatus] = useState("allProject");
    const [activateList, setActivateList] = useState([]);
    const [closedList, setClosedList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Axios.get('api/getAllProject', HEADERS)
            .then(res => {
                setIsLoading(false)

                let allProject = res.data.filter(project => project.isActivate)
                setAllProject(allProject)

                let activateList = allProject.filter(project => !project.isClose)
                setActivateList(activateList)

                let closedList = allProject.filter(project => project.isClose)
                setClosedList(closedList)

                let weeklyProjects = res.data.filter(project => project.isWeeklyProject)
                setWeeklyProject(weeklyProjects[0])
            })
    }, [])


    const renderList = () => {
        switch (tabStatus) {
            case 'allProject':
                return (isLoading) ?
                    <div>
                        {
                            [1, 2, 3].map(a =>
                                <div style={{ margin: "10px 15px 10px 15px" }}>
                                    <Skeleton animation="wave" variant="rect" height={150} />
                                </div>)
                        }
                    </div>
                    :
                    (allProject.length == 0) ?
                        <NoItem wording="ไม่มีรายการโปรเจค" />
                        :
                        allProject.map(project => <ProjectCard project={project} />)
            case 'currentProject':
                return (activateList.length == 0) ? <NoItem wording="ไม่มีรายการโปรเจคที่กำลังระดมทุน" />
                    : activateList.map(project => <ProjectCard project={project} />)
            case 'pastProject':
                return (closedList.length == 0) ? <NoItem wording="ไม่มีรายการโปรเจคที่ผ่านมา" />
                    : closedList.map(project => <ProjectCard project={project} />)
        }
    }

    return (
        <MainLayout>

            <Grid>
                <Grid.Column width={11}>
                    <WeeklyProject>
                        <div style={{ fontSize: '15px', fontWeight: 'bold' }}>โครงการประจำสัปดาห์</div>
                        <div>(Project of This Week)</div>

                        <div>
                            <div style={{ fontWeight: "bold", fontSize: "23px", margin: '30px' }}>
                                {weeklyProject.name} {weeklyProject.location || "ชื่อโครงการประจำสัปดาห์"}
                            </div>
                        </div>

                        <div style={{ fontSize: "16px", marginBottom: "40px" }}>
                            <div>
                                ยอดเงินบริจาคขณะนี้ : <span style={{ fontWeight: 'bold' }}>{weeklyProject.budget}</span> บาท
                            </div>
                            <div>
                                เป้าหมาย : <span style={{ fontWeight: 'bold' }}>{weeklyProject.targetBudget}</span> บาท
                            </div>
                        </div>
                        <div>
                            <ProjectDetailModal
                                buttonStyle={
                                    <span>
                                        <CustomButton
                                            buttonText="ดูรายละเอียด"
                                            color="#FDFEFE"
                                            height="45px"
                                            width="290px"
                                            backgroundColor="#185341" />
                                    </span>

                                }
                                project={weeklyProject}
                            />
                        </div>
                    </WeeklyProject>
                </Grid.Column>

                <Grid.Column width={5}>
                    <Slogan>
                        <div style={{ margin: "0 0 25px 0" }}>จัดเรียงโดย</div>
                        <Tab active={tabStatus == "allProject"}
                            onClick={() => {
                                setTabStatus('allProject')
                                // filterAllProject()
                            }}>
                            โปรเจคทั้งหมด
                        </Tab>
                        <Tab active={tabStatus == "currentProject"}
                            onClick={() => {
                                setTabStatus('currentProject')
                                // filterAllProject()
                            }}>
                            โปรเจคที่กำลังระดมทุน
                        </Tab>
                        <Tab active={tabStatus == "pastProject"}
                            onClick={() => {
                                setTabStatus('pastProject')
                                // filterAllProject()
                            }}>
                            โปรเจคที่ผ่านมา
                        </Tab>
                    </Slogan>
                </Grid.Column>
            </Grid>

            <div style={{ margin: "0 21px 0 21px" }}>
                {renderList()}
            </div>

        </MainLayout >
    )
}

const WeeklyProject = styled.div`
  height: 300px;
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ECF1ED;
  margin: 10px 0 10px 30px;
  border-radius: 10px;
`

const Slogan = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 10px 30px 10px 0px;
  font-size: 20px;
  border-radius: 10px;
  background-color: #D8E3DB;
`

const Tab = styled.div`
    border-radius: 5px;
    margin: 5px;
    font-size: 17px;
    padding: 10px;
    color: balck;
    width: 80%;
    text-align: center;

    ${({ active }) => active && `
        background: #185341;
        color: white;
        transition: 0.3s;
    `}
`