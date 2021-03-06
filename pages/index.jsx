import { useEffect, useState } from 'react'
import MainLayout from "../layouts/MainLayout";
import Axios from 'axios'
import CustomButton from '../components/CustomButton'
import ProductCard from '../components/ProductCard'
import styled from "styled-components";

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function Home() {
  const [allProduct, setAllProduct] = useState([]);

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
                    imageUrl={item.mainPicture}
                    name={item.name}
                    price={item.price}
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





