import React, { useState } from 'react'
import styled from 'styled-components'
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import { Grid, Popup } from 'semantic-ui-react'
import CustomButton from '../../util/CustomButton'
import ProductDetailModal from './ProductDetailModal'
import Axios from 'axios';
import NumberFormat from 'react-number-format';

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function ProductCard(props) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);


    return (
        <div style={{ width: "100%" }}>
            <Card>
                <Image imageUrl={props.product.mainPicture} />
                <Name>{props.product.name || "product name"}</Name>
                <Stock color={props.product.stock}>สินค้าในคลัง {props.product.stock || "-"} ชิ้น</Stock>
                <NumberFormat value={props.product.price || "-"} displayType={'text'} thousandSeparator={true} renderText={value => <Price>{value} บาท</Price>} />

                <Control>
                    <ProductDetailModal
                        buttonStyle={
                            <EditBTN>
                                <AiTwotoneEdit />
                            </EditBTN>}
                        product={props.product}
                        updateProduct={props.updateProduct}
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
                            <DeleteBTN>
                                <AiTwotoneDelete />
                            </DeleteBTN>
                        }
                    >
                        <ConfirmPopup>
                            ยืนยันการลบ ?
                        </ConfirmPopup>

                        <Grid columns='equal'>
                            <Grid.Column>
                                <span onClick={() => setIsPopupOpen(false)} style={{cursor: "pointer"}}>
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
                                    props.deleteProduct(props.product._id)
                                    setIsPopupOpen(false)
                                }} style={{cursor: "pointer"}}>
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
        </div>
    )
}

const Card = styled.div`
    height: 150px;
    border: 1px solid #CDCDCF;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 7px;
    /* cursor: pointer; */
    padding: 0 30px 0 30px;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
        transition: 0.3s;
    }
`

const Image = styled.div`
    width: 120px;
    height: 120px;
    background-image: url(${props => props.imageUrl || "https://backend.tops.co.th/media//catalog/product/3/4/3415581119183_e29-03-2019.jpg"});
    background-size: 120px 120px;
`

const Name = styled.div`
    width: 250px;
    margin: 0 0 0 30px; 
    font-size: 19px;
    color: #185341;
    font-weight: bold;
`

const Price = styled.div`
    font-size: 19px;
`

const Stock = styled.div`
    font-size: 19px;
    color: ${props => props.color || "#E74C3C"};
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

const DeleteBTN = styled.div`
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    cursor: pointer;
    width: 55px;
    height: 55px;
    color: #E74C3C;

    &:hover {
        color: white;
        background-color: #E74C3C;
        transition: 0.3s;
    }
`

const ConfirmPopup = styled.div`
    text-align: center;
    margin: 10px 0 20px 0;
    font-size: 16px;
    font-family: Prompt;
`