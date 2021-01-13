import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import styled from 'styled-components'
import CustomButton from "./CustomButton";
import { Dropdown } from 'semantic-ui-react'
import { AiTwotoneDelete } from "react-icons/ai";

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function CartShop(props) {
    const [shop, setShop] = useState({})
    const [products, setProducts] = useState([])
    const [amount, setAmount] = useState([]);
    const [shipings, setShipings] = useState([]);
    const [value, setValue] = useState();

    useEffect(async () => {

        Axios.post("/api/getShopDetail", JSON.stringify({ shopId: props.shop.shopId }), HEADERS)
            .then(res => {
                let tmpArray = []

                res.data.shipping.map(type => {
                    let tmpShippingObj = {}
                    tmpShippingObj.key = type.type
                    tmpShippingObj.text = type.type + ` (${type.price} บาท)`
                    tmpShippingObj.value = type.price

                    tmpArray.push(tmpShippingObj)
                })
                setShipings(tmpArray);
                setShop(res.data)
            })

        let tmpShopArray = []
        let tmpAmountArray = []

        props.shop.product.map(product => {
            const resPromise = Axios.post('/api/getProductDetail', JSON.stringify({ productId: product.productId }), HEADERS)
            tmpShopArray.push(resPromise)
            tmpAmountArray.push(product.amount)
        })

        const res = await Promise.allSettled(tmpShopArray)
            .then(r =>
                r.map(r => {
                    return r.value.data
                })
            );
        await setProducts(res)
        await setAmount(tmpAmountArray)

    }, [])


    return (
        <div>

            <ShopContainer>
                <ShopNameLabel>
                    ร้าน {shop.name}
                    <div>
                        <label>เลือกช่องทางการส่ง </label>
                        <Dropdown
                            placeholder='เลือกช่องทางการส่ง'
                            selection
                            options={shipings}
                            style={{ marginRight: "30px", marginLeft: "10px" }}
                            onChange={(e, { value }) => console.log(value)}
                        />
                    </div>

                </ShopNameLabel>
                {
                    (products.length != 0) ?
                        products.map((product, index) =>

                            <ProductContainer>
                                <ProductImage imageUrl={product.mainPicture} />
                                <ProductName>
                                    {product.name}
                                </ProductName>
                                <ProductAmount>
                            
                                    <Counter>
                                        <span>
                                            <CustomButton buttonText="-" width="30px" height="30px" backgroundColor="#6495ED" />
                                        </span>
                                        <ShowCount>{amount[index]}</ShowCount>
                                        <span>
                                            <CustomButton buttonText="+" width="30px" height="30px" backgroundColor="#6495ED" />
                                        </span>
                                    </Counter>
                                </ProductAmount>
                                <ProductPrice>
                                    {product.price + product.greenPrice} บาท (+ {product.greenPrice} บาท)
                                </ProductPrice>
                                <ProductAmountPrice>
                                    รวม {(product.price + product.greenPrice) * amount[index]} บาท
                                </ProductAmountPrice>
                                <ProductDeleteIcon>
                                    <span onClick={() => {


                                        (localStorage.getItem("userToken") != null) ?

                                            Axios.post('api/addOrDeleteAProductInCart', JSON.stringify({
                                                "tokenId": localStorage.getItem("userToken"),
                                                "productId": product._id,
                                                "amount": (amount[index]) * -1
                                            }), HEADERS)
                                                .then(res => {
                                                    console.log(res.data);
                                                    window.location.reload();
                                                })
                                                .catch(err => {
                                                    console.log(err);
                                                })
                                            : ""

                                        let a = [...products]
                                        a.splice(products.indexOf(product), 1);
                                        setProducts(a)
                                    }}>
                                        <AiTwotoneDelete />
                                    </span>

                                </ProductDeleteIcon>

                            </ProductContainer>
                        )
                        : ""
                }

            </ShopContainer>


        </div>
    )
}

const ShopContainer = styled.div`
    box-shadow: 1px 1px 3px #ABB2B9;
    /* border-style: solid;
    border-width: 1px; */
    border-radius: 5px;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 10px;
    margin-left: 30px;
    margin-right: 30px;
    /* background-color: #F8F9F9; */
`

const ProductContainer = styled.div`
    height: 120px;
    font-size: 17px;
    display: flex;
    align-items: stretch;
    align-items: center;
    padding-bottom: 20px;
    padding-top: 20px;

    /* &:hover{
        box-shadow: 1px 1px 5px 1px #F4F7F5;
        transition: 0.3s;
        background-color: #F4F7F5;
    } */
`

const HeaderContainer = styled.div`
    height: 60px;
    font-size: 18px;
    display: flex;
    align-items: stretch;
    align-items: center;
    color: #679072;
    margin-bottom: 10px;
`

const ProductImage = styled.div`
    /* flex-grow: 1; */
    margin-left: 30px;
    margin-right: 50px;
    width: 100px;
    height: 100px;
    background-image: url(${props => props.imageUrl || "https://backend.tops.co.th/media//catalog/product/3/4/3415581119183_e29-03-2019.jpg"});
    background-size: 100px 100px;

`

const ProductName = styled.div`
    width: 200px;
    flex-grow: 2;
`
const ProductAmount = styled.div`
    /* width: 70px; */
    flex-grow: 1;
    
`

const ProductPrice = styled.div`
    width: 100px;
    flex-grow: 1;
    /* background-color: red; */
`

const ProductAmountPrice = styled.div`
    flex-grow: 1;
`

const ProductDeleteIcon = styled.div`
    /* flex-grow: 1; */
    margin-right: 30px;
    font-size: 28px;
    color: #EC7063;
`

const ShopNameLabel = styled.div`
    font-size: 17px;
    padding-left: 37px;
    padding-bottom: 20px;
    padding-top: 20px;
    color: white;
    background-color: #679072;
    border-radius: 5px 5px 0px 0px;
    border-color: #679072;
    display: flex;
    justify-content: space-between;
    align-items: center;

`

const Counter = styled.div`
    margin-top: 15px;
    margin-bottom: 15px;
`

const ShowCount = styled.span`
    margin: 10px;
`