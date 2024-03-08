import { Unbounded, Be_Vietnam_Pro } from "next/font/google";
import { GetServerSideProps, NextPage } from "next";
import Stripe from "stripe"
import Navbar from "@/components/Navbar";
import { getProductImage, getProductName, getProductPrice } from "@/utils/computed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useEffect } from "react";

const bvp = Be_Vietnam_Pro({
  subsets: ['latin'], 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

const unbounded = Unbounded({
  subsets: ['latin'], 
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"]
})


export const getServerSideProps: GetServerSideProps = async (context) => {
    const stripe = new Stripe(process.env.SECRET_KEY ?? '', {
        apiVersion: "2023-10-16"
      })
    
    const slug = "price_" + context.query.slug
    var price
    var error = false
    try {
        price = await stripe.prices.retrieve(slug.toString())
        const product = await stripe.products.retrieve(price.product.toString())
        price.product = product
    } catch(e) {
        return {
            notFound: true
        }
    }
    
    return {
        props: {
            price: price,
            error: error || null
        }
    }
}

type Props = {
    price: any
}
const ProductSlug: NextPage<Props> = ({price}) => {
   
    const addToCart = (p: Stripe.Price) => {
        var lsb = localStorage.getItem("basket") || ""
        //@ts-ignore
        p.quantity = 1
        if (lsb.length >= 1) {
            var basket = JSON.parse(lsb)
            const obj = basket.find((x:any) => x.id === p.id)
            var index = basket.indexOf(obj)
            if (index == -1) {
                basket.push(p)
            } else {
                if(basket[index].quantity >= 6) {
                    basket[index].quantity = 6
                } else {
                    basket[index].quantity += 1
                }
            }
            localStorage.setItem("basket", JSON.stringify(basket))
        } else {
            localStorage.setItem("basket", JSON.stringify([p]))
        }
        window.dispatchEvent(new Event("storage"))
    }
    //if (error) router.push('/404')
    return (
        <>
        <Navbar />
        <main className="w-[100%] pt-[120px] text-white">
            <p>{getProductName(price.product)}</p>
            <p>£{getProductPrice(price)}</p>
            <img src={price.product.images[0]}/>
            {/* @ts-ignore */}
            <button onClick={() => addToCart(price)} className="bsktbtn relative w-[50%] bg-green-700 py-2 rounded-[20px] text-[1.75vw]"><FontAwesomeIcon icon={faShoppingBasket} /> Add to Basket</button>
        </main>
        </>
    );
}

export default ProductSlug;