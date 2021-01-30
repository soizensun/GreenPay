import React from 'react'

export default function SubLayout(props) {
    return (
        <div style={{ paddingBottom: "70px" }}>
            {props.children}
        </div>
    )
}
