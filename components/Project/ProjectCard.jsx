import React from 'react'
import styled from 'styled-components'

export default function ProjectCard(props) {
    return (
        <Card>
            {props.project.name}
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