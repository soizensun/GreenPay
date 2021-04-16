import React, { useEffect, useState, createRef } from 'react'
import MainLayout from "../layouts/MainLayout";
import Axios from 'axios'
import styled from 'styled-components'
import ProductCard from '../components/index/ProductCard'
import { Divider, Grid, Sticky, Ref } from 'semantic-ui-react'
import Skeleton from '@material-ui/lab/Skeleton';

let HEADERS = { headers: { "Content-Type": "application/json" } }

export default function Shop() {
    const [shop, setShop] = useState({});
    const [products, setProducts] = useState([]);
    const [allType, setAllType] = useState([]);
    const [type, setType] = useState("");
    const [tag, setTag] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            Axios.post("/api/getProductDetail", JSON.stringify({ productId: localStorage.getItem('productDetail') }), HEADERS)
                .then((res) => {

                    Axios.post("/api/getShopDetail", JSON.stringify({ shopId: res.data.shopId }), HEADERS)
                        .then(res => {
                            setShop(res.data)
                        })

                    Axios.post("/api/getMyProducts", JSON.stringify({ shopId: res.data.shopId }), HEADERS)
                        .then(res => {
                            console.log(res.data);
                            setProducts(res.data);
                            setIsLoading(false)
                            filterTag(res.data)
                        })
                })
        }

    }, [])

    const filterTag = async (products) => {
        let tmp = []
        products.map(product => {
            if (!tmp.includes(product.tagId)) tmp.push(product.tagId)
        })

        let tmpPromise = []
        tmp.map(tagId => {
            const resPromise = Axios.post('/api/getProductTagById', JSON.stringify({ tagId }), HEADERS)
            tmpPromise.push(resPromise)
        })

        const res = await Promise.allSettled(tmpPromise)
            .then(r =>
                r.map(r => {
                    return r.value.data
                })
            );
        await setAllType(res)
    }

    return (
        <MainLayout>
            <Container>
                <Grid>
                    <Grid.Column width={3}>

                        <ShopDetailContainer>
                            <ImageContainer>
                                <ImageFrame>
                                    <Image imageUrl={shop.logo} />
                                </ImageFrame>
                            </ImageContainer>
                            <Label>
                                ร้าน {shop.name}
                            </Label>

                            <DescriptionContainer>
                                {shop.description}
                            </DescriptionContainer>
                            <Divider />
                            <div>
                                <TypeLabel>หมวดหมู่</TypeLabel>
                                <ProductTag
                                    active={!tag}
                                    onClick={() => {
                                        setTag(false)
                                        setType("")
                                    }}>
                                    สิ้นค้าทั้งหมด
                                </ProductTag>
                                {
                                    allType.map(aType =>
                                        <ProductTag
                                            active={aType._id == type}
                                            onClick={() => {
                                                setType(aType._id)
                                                setTag(true)
                                            }}>
                                            {aType.name}
                                        </ProductTag>
                                    )
                                }
                            </div>
                        </ShopDetailContainer>

                    </Grid.Column>

                    <Grid.Column width={13}>
                        {
                            isLoading ?
                                <ProductContainer>
                                    {
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9].map(a =>
                                            <Card>
                                                <Skeleton variant="rect" animation="wave" height="100%" width="100%" />
                                            </Card>)
                                    }
                                </ProductContainer>
                                :
                                <ProductContainer>
                                    {
                                        products.map(item => {
                                            if (!tag) {
                                                return (
                                                    <ProductCard
                                                        shopId={item.shopId}
                                                        imageUrl={item.mainPicture}
                                                        name={item.name}
                                                        price={item.price + item.greenPrice}
                                                        greenPrice={item.greenPrice}
                                                        id={item._id}
                                                    />)
                                            }
                                            else {
                                                if (item.tagId == type) {
                                                    return (
                                                        <ProductCard
                                                            shopId={item.shopId}
                                                            imageUrl={item.mainPicture}
                                                            name={item.name}
                                                            price={item.price + item.greenPrice}
                                                            greenPrice={item.greenPrice}
                                                            id={item._id}
                                                        />)
                                                }
                                            }
                                        })
                                    }
                                </ProductContainer>
                        }


                    </Grid.Column>
                </Grid>
            </Container>
        </MainLayout >
    )
}

const Container = styled.div`
    padding: 20px 30px 0 30px;
`

const Label = styled.p`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-top: 18px;
    /* color: white; */
`

const ShopDetailContainer = styled.div`
    /* text-align: center; */
    /* margin: 5px; */
    padding: 30px;
    background-color: #D0DDD4;
    /* border: 1px solid #CDCDCF; */
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Image = styled.div`
    width: 120px;
    height: 120px;
    background-image: url(${props => props.imageUrl || "https://firebasestorage.googleapis.com/v0/b/greenpay1234.appspot.com/o/00001.png?alt=media&token=3b8a8e86-2373-48e8-9bd8-b8912459b84f"});
    background-size: 120px 120px;
    border-radius: 100px;
    /* margin: 0 20px 0 20px; */
`

const ImageFrame = styled.div`
    padding: 8px;
    background-color: white;
    border-radius: 100px;
    display: flex;
    justify-content: center;
`

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
`

const DescriptionContainer = styled.p`
    margin: 0px 0 10px 0;
    text-align: center;
    font-size: 16px;
    /* color: white; */
`

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 30px;
`

const ProductTag = styled.div`
    border-radius: 5px;
    margin: 2px 0 2px 0;
    font-size: 16px;
    padding: 10px;
    cursor: pointer;

    ${({ active }) => active && `
        background: white;
        color: #185341;
        transition: 0.3s;
    `}
`

const TypeLabel = styled.div`
    margin: 0 0 25px 0;
    font-size: 17px;
    font-weight: bold;
`

const Card = styled.div`
    width: 250px;
    height: 270px;
    margin: 8px;
    border-radius: 10px;
`