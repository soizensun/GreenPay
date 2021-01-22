import { useEffect, useState } from 'react'
import MainLayout from "../layouts/MainLayout";
import Axios from 'axios'
import ProductCard from '../components/index/ProductCard'
import styled from "styled-components";
import { useRecoilValue } from 'recoil';
import {currentUser as currentUserAtom} from '../recoil/atoms'

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function Home() {
  const [allProduct, setAllProduct] = useState([]);
  const currentUser = useRecoilValue(currentUserAtom)

  useEffect(() => {
    Axios.get("/api/getAllProduct", HEADERS)
      .then((res) => {
        setAllProduct(res.data)
      })
  }, [])

  return (
    <div>
      <MainLayout>
        <main>
          <ProductContainer>
            {
              allProduct.map(item => {
                return (
                  <ProductCard
                    shopId={item.shopId}
                    imageUrl={item.mainPicture}
                    name={item.name}
                    price={item.price + item.greenPrice}
                    greenPrice={item.greenPrice}
                    id={item._id}
                  />)
              })
            }
          </ProductContainer>
        </main>

      </MainLayout>
    </div>
  )
}

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px;
`





