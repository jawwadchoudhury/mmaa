import { getProductImage, getProductName, getProductPrice } from "@/utils/computed"
import { FunctionComponent, useContext, useState, useEffect } from "react"
import Stripe from "stripe"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import CartContext from "./context/CartContext"
import { Rubik } from "next/font/google"
import Link from "next/link"

const rubik = Rubik({
    subsets: ['latin'], 
    weight: ["300", "400", "500", "600", "700", "800", "900"]
})

type CardProps = {
    price: Stripe.Price
}
const Card: FunctionComponent<CardProps> = ({price}) => {

    const slugid = price.id.slice(6)
    return (
        
        <Link href={{pathname: '/products/[slug]', query: {slug: slugid}}}>
        <div className={rubik.className}>
            <div className="item mx-4 my-4 inline-block" style={{
                //@ts-ignore
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .7) 80%, rgba(0, 0, 0, 0.7) 100%), url(${price.product.images[0]})`
            }}>
                <div className="relative top-[75%] mx-[7%]">
                <h1 className="cardtext float-left w-[60%] text-[1.75vw] mt-[5%] align-middle">{getProductName(price.product)}</h1>
                <p className="pricetext float-right text-[3.5vw] flex mt-[5%] align-middle">£{getProductPrice(price)}</p>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default Card