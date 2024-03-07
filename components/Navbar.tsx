import { FunctionComponent, useContext, useState, useEffect } from "react";
import CartContext from "./context/CartContext";
import {getProductPrice, getProductDescription, getProductImage, getProductName} from "../utils/computed";
import Link from 'next/link'
import { Acme, Be_Vietnam_Pro, Kanit, Unbounded } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faTrashCan, faXmark, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { faStripe } from "@fortawesome/free-brands-svg-icons";

const acme = Acme({
    subsets: ['latin'], 
    weight: ["400"]
})

const kanit = Kanit({
    subsets: ['latin'], 
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

const bvp = Be_Vietnam_Pro({
    subsets: ['latin'], 
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
  })

  const unbounded = Unbounded({
    subsets: ['latin'], 
    weight: ["200", "300", "400", "500", "600", "700", "800", "900"]
  })

  
const Navbar: FunctionComponent = () => {
    var { items, remove } = useContext(CartContext)
    const [ loading, setLoading ] = useState(true)
    const [ basket, setBasket ] = useState([{id: "Hello", product: "World"}])

    
    const checkout = async() => {
      if (basket.length == 0) {
        alert("You have no items in your basket!")
      } else {
        //@ts-ignore
      const lineItems = basket.map(p => {
          return {
              //@ts-ignore
              price: p.id,
              //@ts-ignore
              quantity: p.quantity
          }
      })

      const res = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({lineItems: lineItems, subtotal: subtotal})
      })
  
      const b = await res.json()
      window.location.href = b.session.url
    }
  }
  
    function removeItem(id: string): void {
      var lsb = localStorage.getItem("basket") || ""
      if (lsb.length >= 1) {
        const rbsk = JSON.parse(lsb)
      if (rbsk.length == 1) {
        localStorage.removeItem("basket")
        setBasket([])
      } else {
        var lsb = localStorage.getItem("basket") || ""
        var basket = JSON.parse(lsb)
        //@ts-ignore
        const obj = basket.find(x => x.id === id)
        const index = basket.indexOf(obj)
        if (index > -1) {
          basket.splice(index, 1)
          localStorage.setItem("basket", JSON.stringify(basket))
          window.dispatchEvent(new Event("storage"))
        }
      }
    }
    }

    function changeQuantity(id: string, qnt: Number): void {
      var lsb = localStorage.getItem("basket") || ""
      var basket = JSON.parse(lsb)
      //@ts-ignore
      const obj = basket.find(x => x.id === id)
      const index = basket.indexOf(obj)
      if (index > -1) {
        //@ts-ignore
        basket[index].quantity = qnt
        localStorage.setItem("basket", JSON.stringify(basket))
        window.dispatchEvent(new Event("storage"))
      }
    }
  
    var subtotal = 0
  
    
    useEffect(() => {
      var lsb = localStorage.getItem("basket") || ""
      
      if (lsb.length >= 1) {
        setBasket(JSON.parse(lsb))
      } else {
        setBasket([])
      }

      setLoading(false)

      
    }, [])

    useEffect(() => {
      function checkLsb() {
        var lsb = localStorage.getItem("basket") || ""
        if (lsb) {
          setBasket(JSON.parse(lsb))
        }
      }

      window.addEventListener('storage', checkLsb)
    })
  
    if (loading) {
      return null
    }

    return(
        <div className="bg-[#333] fixed w-full z-20 top-0 left-0">
            <ul className="navigation max-w-[90vw] flex flex-wrap justify-between items-center relative mx-auto py-8">
                <Link href='/' className="logo select-none">
                    <div className="leading-[1.5rem] font-bold pt-1 text-white duration-300 ease-in-out hover:scale-[1.02] hover:bg-gradient-to-r from-[#3aa9b4] from-0% via-[#a11dfd] via-35% to-[#fca845] to-100% bg-clip-text hover:text-transparent">
                        <h1 className="text-[2.5rem] tracking-[0.125em] text-center pl-1"><p className={unbounded.className}>MMAA</p></h1>
                        <h1 className="text-[.79rem] font-bold text-center"><p className={bvp.className}>Make Merch Affordable Again</p></h1>
                    </div>
                </Link>
                <input type="checkbox" id="check"/>
                
                <span className="menu flex [&>li>a]:transition [&>li>a]:duration-200 [&>li>a]:ease-in-out pt-[60px]">
                <div className={bvp.className}>
                
                
                {
                  basket.map((price) => {
                    //@ts-ignore
                    subtotal += Number(getProductPrice(price) * price.quantity)
                    return <div className="w-full bg-[#303030] shadow-xl p-4 flex mb-4" key={price.id}>
                      <img src={getProductImage(price.product)} width={'30%'} className="basketimg" style={{
                        borderRadius: '10%'
                      }}/>
                      <div className="pl-4 relative top-[25%]">
                        <h1 className="baskettext text-[3vw] text-white">{getProductName(price.product)}</h1>
                        <div className="flex">
                        <p className="baskettext text-white">Quantity:</p>
                        {/*@ts-ignore*/}
                        <select id={price.id} value={price.quantity} onChange={(e) => changeQuantity(price.id, Number(e.target.value))} className="baskettext">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select>
                        </div>
                        <div className="flex">
                          <p className="baskettext text-[3vw] text-white">£{getProductPrice(price)}</p>
                          <button onClick={() => removeItem(price.id)} className="text-[1.1rem] hover:cursor-pointer ml-3 text-[#a11dfd]"><FontAwesomeIcon icon={faTrashCan}/></button>
                        </div>
                      </div>
                    </div>
                  }
                  )
                }
            
            {
              //@ts-ignore
              basket.length == 0
              ? (<p className="yhniiyb text-[2.5vw] text-white leading-[90vh]">You have no items in your basket</p>)
              : (
                <>
                {
                  //@ts-ignore
                  subtotal < 40
                  ? (<><p className="text-white ml-4 text-[2vw]">Subtotal: £{subtotal}<br/>Delivery: £2.79<br/>Total: £{(subtotal + 2.79).toFixed(2)}</p><button onClick={() => checkout()} className="bg-green-700 text-white px-4 py-3 rounded-[20px] text-[2vw] table mx-auto"><FontAwesomeIcon icon={faLock}/> Check Out - £{(subtotal + 2.79).toFixed(2)}</button><div className="table mx-auto text-white text-[1.5vw]">Secured with <FontAwesomeIcon icon={faStripe} className="text-white text-[3vw] relative top-[.65vw]"/></div><p className="text-white table mx-auto text-[1.5vw]">Spend £{(40 - subtotal).toFixed(2)} more to get free shipping on this order!</p></>)
                  : (<><p className="text-white ml-4 text-[2vw]">Subtotal: £{subtotal}<br/>Delivery: £0.00<br/>Total: £{(subtotal).toFixed(2)}</p><button onClick={() => checkout()} className="bg-green-700 text-white px-4 py-3 rounded-[20px] text-[2vw] table mx-auto"><FontAwesomeIcon icon={faLock}/> Check Out - £{(subtotal).toFixed(2)}</button><div className="table mx-auto text-white text-[1.5vw]">Secured with <FontAwesomeIcon icon={faStripe} className="text-white text-[3vw] relative top-[7px]"/></div></>)
                }
                
                </>
              )
            }

            
             <label htmlFor="check" className="close-menu text-white duration-200 ease-in-out"><FontAwesomeIcon icon={faXmark} /></label>
             </div>
           </span>

           <label htmlFor="check" className="open-menu text-white duration-200 ease-in-out opacity-[65%] text-[1.25rem]"><FontAwesomeIcon icon={faBasketShopping} /></label>
            </ul>
        </div>
    )
}

export default Navbar