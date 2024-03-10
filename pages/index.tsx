import { Unbounded, Be_Vietnam_Pro, Rubik } from "next/font/google";
import { GetServerSideProps, NextPage } from "next";
import Stripe from "stripe"
import Card from "@/components/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faBasketShopping, faXmark, faTrashCan, faLock } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from "react";
import CartContext from "@/components/context/CartContext";
import Link from "next/link";
import { getProductImage, getProductName, getProductPrice } from "@/utils/computed";
import { faStripe } from "@fortawesome/free-brands-svg-icons";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

const bvp = Be_Vietnam_Pro({
  subsets: ['latin'], 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

const unbounded = Unbounded({
  subsets: ['latin'], 
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"]
})

const rubik = Rubik({
  subsets: ['latin'], 
  weight: ["300", "400", "500", "600", "700", "800", "900"]
})


export const getServerSideProps: GetServerSideProps = async (context) => {
  const stripe = new Stripe(process.env.SECRET_KEY ?? '', {
    apiVersion: "2023-10-16"
  })

  const response = await stripe.products.list({
    limit: 10,
    expand: ['data.default_price']
  })

  const prices = response.data.filter(prices => {
    return prices.active;
  })

  return {
    props: {
      prices
    },
  }
}

type Props = {
  prices: Stripe.Product[]
}

const Home: NextPage<Props> = ({prices}) => {
  return (
    <>
    <Navbar />
    
    <main className="w-[100%] pt-[120px]">
        
        
        <div className="flex flex-row flex-wrap justify-center">
          {/* {
            prices.map(p => 
              <Card price={p} key={p.id}/>
            )
          } */}
          {
            prices.map(p =>
              <ProductCard product={p} key={p.id}/>
             )
          }


          {
            [...Array(6)].map((e, i) => 
            <div className={rubik.className} key={i}>
                <div className="item mx-4 my-4 inline-block">
                    <div className="relative top-[75%] mx-[7%]">
                    <h1 className="cardtext float-left w-[60%] text-[1.75vw] mt-[5%] align-middle">Test Product</h1>
                    <p className="pricetext float-right text-[3.5vw] flex mt-[5%] align-middle">£13.37</p>
                    </div>
                </div>
            </div>
            )
          }

        </div>
    </main>
    </>
  );
}

export default Home;