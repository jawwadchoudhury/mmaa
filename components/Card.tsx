import { getProductImage, getProductName, getProductPrice } from "@/utils/computed"
import { FunctionComponent, useContext, useState, useEffect } from "react"
import Stripe from "stripe"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import CartContext from "./context/CartContext"
import { Rubik } from "next/font/google"

const rubik = Rubik({
    subsets: ['latin'], 
    weight: ["300", "400", "500", "600", "700", "800", "900"]
})

type CardProps = {
    price: Stripe.Price
}
const Card: FunctionComponent<CardProps> = ({price}) => {
    const {add, items} = useContext(CartContext);
    const [ loading, setLoading ] = useState(true)

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

    return (
        
        <div className={rubik.className}>
            <div className="item mx-4 my-8 inline-block" style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .7) 80%, rgba(0, 0, 0, 0.7) 100%), url(${getProductImage(price.product)})`
            }}>
                <button onClick={() => addToCart(price)} className="bsktbtn relative w-full bg-green-700 py-1 rounded-b-[20px] text-[1.75vw]"><FontAwesomeIcon icon={faShoppingBasket} /> Add to Basket</button>
                <div className="relative bottom-[30%] mx-[7%]">
                <h1 className="cardtext float-left w-[60%] text-[1.75vw] mt-[5%] align-middle">{getProductName(price.product)}</h1>
                <p className="pricetext float-right text-[3.5vw] flex mt-[5%] align-middle">£{getProductPrice(price)}</p>
                </div>
            </div>
        </div>
    )
}

export default Card