import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import ProjectCard from '../components/Project/ProjectCard'
import MainLayout from '../layouts/MainLayout'

let HEADERS = { headers: { "Content-Type": "application/json" } }

export default function Project() {
    const [allProject, setAllProject] = useState([]);
    const [weeklyProject, setWeeklyProject] = useState({});

    useEffect(() => {
        Axios.get('api/getAllProject', HEADERS)
        .then(res => {
            setAllProject(res.data)

            let weeklyProjects = res.data.filter(project => project.isWeeklyProject)

            setWeeklyProject(weeklyProjects[0])
        })
    }, [])


    return (
        <MainLayout>
            {
                allProject.map(project =>
                    <ProjectCard
                        project={project}
                    />
                )
            }
            
        </MainLayout>
    )
}

const Test = styled.div`
    background-color: red;
`


