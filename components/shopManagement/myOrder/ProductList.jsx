import React, { useEffect, useState } from 'react'
import { Checkbox } from 'semantic-ui-react'
import styled from 'styled-components'

export default function ProductList(props) {
    const [checkBoxStatus, setCheckBoxStatus] = useState(false);

    return (
        <div>
            <ProductContainer onClick={() => setCheckBoxStatus(!checkBoxStatus)}>

                <ProductName>
                    {props.product.name}
                </ProductName>

                <div>
                    {
                        // (props.amount <= props.product.stock) ?
                            <span style={{ marginRight: "30px", fontSize: "25px", color: "#185341", fontWeight: "bold" }}>
                                {props.amount}
                            </span>
                            // :
                            // <span style={{ marginRight: "30px", fontSize: "25px", color: "#E74C3C", fontWeight: "bold" }}>
                            //     {props.amount}
                            // </span>
                    }
                    ชิ้น
                </div>
                {/* <div>สินค้าในคลัง {props.product.stock} ชิ้น</div> */}
                <div><Checkbox checked={checkBoxStatus} /></div>

            </ProductContainer>
        </div>
    )
}

const ProductContainer = styled.div`
    height: 60px;
    font-size: 17px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px 0 40px;
    cursor: pointer;
    margin: 1px;

    &:hover{
        transition: 0.3s;
        background-color: #F4F7F5;
    }
`

const ProductName = styled.div`
    font-size: 17px;
    width: 400px;
    /* font-weight: bold; */
`

