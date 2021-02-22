import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import { Dropdown, Loader } from 'semantic-ui-react'
import CustomButton from '../../util/CustomButton'
import ProjectCard from './ProjectCard'
import SnakeBar from '../../util/CustomSnakeBar'

let HEADERS = { headers: { "Content-Type": "application/json" } }

export default function AllProject() {
    const [allProject, setAllProject] = useState([]);
    const [weeklyProject, setWeeklyProject] = useState({});
    const [options, setOptions] = useState([]);

    const [dropdownChange, setDropdownChange] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [changeWeeklySnakebarStatus, setChangeWeeklySnakebarStatus] = useState(false);
    const [editSnakebarStatus, setEditSnakebarStatus] = useState(false);
    const [visibelSnakebarStatus, setVisibelSnakebarStatus] = useState(false);

    useEffect(() => {
        Axios.get('api/getAllProject', HEADERS)
            .then(res => {
                setAllProject(res.data)

                let weeklyProjects = res.data.filter(project => project.isWeeklyProject)

                setWeeklyProject(weeklyProjects[0])
            })

        Axios.get('api/getAllProject', HEADERS)
            .then(res => buildOption(res.data))
    }, [])

    const buildOption = datas => {
        let options = []

        let filteredProject = datas.filter(project => !project.isClose && project.isActivate)

        filteredProject.map((a, index) => {
            let tmpJson = {}
            tmpJson.key = index
            tmpJson.text = a.name
            tmpJson.value = {
                id: a._id,
                name: a.name,
                location: a.location,
                isWeeklyProject: a.isWeeklyProject
            }

            options.push(tmpJson)
        })

        setOptions(options)
    }

    const handleDropdown = (e, { value }) => {
        setWeeklyProject(value)
        setDropdownChange(true)
    }

    return (
        <div>

            <SnakeBar snakeStatus={changeWeeklySnakebarStatus} setSnakeStatus={setChangeWeeklySnakebarStatus} wording="เปลี่ยนโครงการประจำสัปดาห์สำเร็จ" />

            <SnakeBar snakeStatus={editSnakebarStatus} setSnakeStatus={setEditSnakebarStatus} wording="ทำรายการสำเร็จ" />

            <SnakeBar snakeStatus={visibelSnakebarStatus} setSnakeStatus={setVisibelSnakebarStatus} wording="บันทึก" />

            <div style={{ textAlign: 'center', margin: " 20px 0 50px 0", fontSize: "17px" }}>
                <p> โครงการประจำสัปดาห์ </p>
                <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
                    {weeklyProject.name} {weeklyProject.location}
                </div>
                <div>
                    <div style={{ margin: "10px 0 5px 0", fontSize: "15px" }}> เปลี่ยนโครงการประจำสัปดาห์ </div>
                    <Dropdown
                        placeholder='เลือกโครงการอื่นๆ'
                        selection
                        onChange={handleDropdown}
                        options={options}
                    />
                </div>
                {
                    (dropdownChange) &&
                    <div
                        onClick={() => {
                            setIsLoading(true)
                            Axios.post("/api/updateWeeklyProject", JSON.stringify({ projectId: weeklyProject.id }), HEADERS)
                                .then(res => {
                                    setAllProject(res.data)
                                    setDropdownChange(false)
                                    setIsLoading(false)
                                    setChangeWeeklySnakebarStatus(true)
                                })
                        }}
                        style={{ textAlign: 'center', margin: "20px 0 10px 0" }}>

                        <CustomButton
                            buttonText="บันทึก"
                            color="#FDFEFE"
                            height="40px"
                            width="110px"
                            backgroundColor="#185341"
                        />
                    </div>
                }
                <Loader active={isLoading} inline size='small' />
            </div>

            {
                allProject.map(project =>
                    <ProjectCard
                        project={project}
                        updateProject={(newAllProject) => {
                            setAllProject(newAllProject)
                            setEditSnakebarStatus(true)
                            buildOption(newAllProject)
                        }}
                        updateProjectVisibleCase={(newAllProject) => {
                            setAllProject(newAllProject)
                            setVisibelSnakebarStatus(true)
                            buildOption(newAllProject)
                        }}
                    />
                )
            }
        </div>
    )
}
