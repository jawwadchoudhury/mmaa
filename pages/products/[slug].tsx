import { Unbounded, Be_Vietnam_Pro } from "next/font/google";
import { GetServerSideProps, Metadata, NextPage } from "next";
import Stripe from "stripe"
import Navbar from "@/components/Navbar";
import { getProductImage, getProductName, getProductPrice } from "@/utils/computed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";

const bvp = Be_Vietnam_Pro({
  subsets: ['latin'], 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export const getServerSideProps: GetServerSideProps = async (context) => {
    const stripe = new Stripe(process.env.SECRET_KEY ?? '', {
        apiVersion: "2023-10-16"
      })
    
    const slug = "prod_" + context.query.slug
    var product
    var small
    var medium
    var large
    try {
        product = await stripe.products.retrieve(slug.toString())
        const prices = await stripe.prices.list({
            product: product.id,
            expand: ['data.product']
        })
        small = prices.data.find(x => x.nickname?.toLowerCase() === "small")
        medium = prices.data.find(x => x.nickname?.toLowerCase() === "medium")
        large = prices.data.find(x => x.nickname?.toLowerCase() === "large")
        // price = await stripe.prices.retrieve(slug.toString())
        // const product = await stripe.products.retrieve(price.product.toString())
        // price.product = product
    } catch(e) {
        console.log(e)
        // return {
        //     notFound: true
        // }
    }
    
    return {
        props: {
            product,
            small,
            medium,
            large
        }
    }
}

type Props = {
    product: any
    small: any
    medium: any
    large: any
}

export const metadata: Metadata = {
    title: "Slug"
}

const ProductSlug: NextPage<Props> = ({product, small, medium, large}) => {
    const [ size, setSize ] = useState("M")

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

    const sizeHandling = (size:any) => {
        if (size == "S") {
            addToCart(small)
        } else if (size == "L") {
            addToCart(large)
        } else {
            addToCart(medium)
        }
    }
    //if (error) router.push('/404')
    return (
        <>
        <Head>
            <title>MMAA &#124; {getProductName(product)}</title>
        </Head>
        <Navbar />
        <main className="w-[100%] pt-[120px] text-white">
        <div className="flex">
            <Image src={product.images[0]} width={512} height={512} alt={getProductName(product)} className="w-[30vw]"/>
            <div className={bvp.className}>
                <p>{getProductName(product)}</p>
                <p>£{getProductPrice(medium)}</p>
                <form className="block">
                    <label>Size:</label><br/>
                    <input type="radio" name="size" value="S" onChange={() => setSize("S")} className="checked:accent-white h-4 w-4"/><span> Small</span><br/>
                    <input type="radio" name="size" value="M" onChange={() => setSize("M")} checked={size === "M"} className="checked:accent-white h-4 w-4"/><span> Medium</span><br/>
                    <input type="radio" name="size" value="L" onChange={() => setSize("L")} className="checked:accent-white h-4 w-4"/><span> Large</span><br/>
                </form>
                <button onClick={() => sizeHandling(size)} className="bsktbtn relative w-[50%] bg-green-700 py-2 rounded-[20px] text-[1.75vw]"><FontAwesomeIcon icon={faShoppingBasket} /> Add to Basket</button>
            </div>
        </div>
        </main>
        </>
    );
}

export default ProductSlug;