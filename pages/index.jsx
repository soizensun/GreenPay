import { useEffect, useState } from 'react'
import MainLayout from "../layouts/MainLayout";
import Axios from 'axios'
import ProductCard from '../components/index/ProductCard'
import styled from "styled-components";
import { Divider, Grid, Sticky, Ref } from 'semantic-ui-react'
import CustomButton from '../components/util/CustomButton'
import Link from 'next/link'

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function Home() {
  const [allProduct, setAllProduct] = useState([]);
  const [weeklyProject, setWeeklyProject] = useState({});

  useEffect(() => {
    Axios.get("/api/getAllProduct", HEADERS)
      .then((res) => {
        setAllProduct(res.data)
      })

    Axios.get('api/getWeeklyProject', HEADERS)
      .then(res => {
        setWeeklyProject(res.data)
      })
  }, [])

  return (
    <div>
      <MainLayout>
        <Grid>
          <Grid.Column width={5}>
            <Slogan>
              <div style={{ textAlign: "center" }}>
                <div>Your pay</div>
                <div>develop the green</div>
              </div>

            </Slogan>
          </Grid.Column>

          <Grid.Column width={11}>
            <WeeklyProject>
              <div style={{ textAlign: "center" }}>
                <Topic>
                  <div>โครงการประจำสัปดาห์</div>
                  <div>(Project of This Week)</div>
                </Topic>

                <div>
                  <div style={{ fontWeight: "bold", fontSize: "20px" }}>"{weeklyProject.name} {weeklyProject.location}"</div>
                  <div style={{ marginBottom: "40px" }}>จำนวนเงินเป้าหมาย {weeklyProject.targetBudget} บาท</div>
                </div>

                <Link href="/Project">
                  <div>
                    <CustomButton
                      buttonText="ดูโปรเจคอื่นเพิ่มเติม"
                      color="#FDFEFE"
                      height="45px"
                      width="290px"
                      backgroundColor="#185341"
                    />
                  </div>
                </Link>

              </div>
            </WeeklyProject>
          </Grid.Column>
        </Grid>

        <Divider horizontal style={{ margin: "20px" }}>สินค้าทั้งหมด</Divider>

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

const Slogan = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 10px 30px;
  color: white;
  font-size: 22px;
  border-radius: 10px;

  background-size: cover;
  background-position: center center;
  background-image: url(${props => props.imageUrl || "https://firebasestorage.googleapis.com/v0/b/greenpay1234.appspot.com/o/Environment.jpg?alt=media&token=53e9706c-d9f8-48fb-bb0d-d60216f680de"});

`

const WeeklyProject = styled.div`
  height: 300px;
  display: flex;
  justify-content: space-around;
  /* align-items: center; */
  flex-direction: column;
  background-color: #D8E3DB;
  margin: 10px 30px 10px 0;
  border-radius: 10px;
`

const Topic = styled.p`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 50px;
`