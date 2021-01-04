import MainLayout from "../layouts/MainLayout";
import Axios from 'axios'
import CustomButton from '../components/CustomButton'
import ProductCard from '../components/ProductCard'

export default function Home() {

  return (
    <div>
      <MainLayout>

        <main>
          <div style={{ height: "4000px", marginTop: "100px"}}>
            {/* <CustomButton/>
            asdfasdfbbbb */}
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
          </div>

        </main>
      </MainLayout>
    </div>
  )
}




