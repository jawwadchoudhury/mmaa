import { FunctionComponent, useContext, useState, useEffect } from "react";
import CartContext from "./context/CartContext";
import {getProductPrice, getProductDescription, getProductImage, getProductName, getProductQuantity, getProductSize} from "../utils/computed";
import Link from 'next/link'
import { Be_Vietnam_Pro, Unbounded } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faTrashCan, faXmark, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { faStripe } from "@fortawesome/free-brands-svg-icons";

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
                    var slugid = price.product.id.slice(5)
                    //@ts-ignore
                    subtotal += Number(getProductQuantity(price) * getProductPrice(price))
                    return <div className="w-full bg-[#303030] shadow-xl p-4 flex mb-4" key={price.id}>
                      
                      <Link href={{pathname: '/products/[slug]', query: {slug: slugid}}} className="basketimg">
                        {/* @ts-ignore */}
                      <img src={price.product.images[0]} style={{
                        borderRadius: '10%',
                        width: '100%'
                      }}/>
                      </Link>
                      <div className="pl-4 relative top-[25%] w-[200%]">
                      <Link href={{pathname: '/products/[slug]', query: {slug: slugid}}}>
                        <h1 className="baskettext text-[3vw] text-white"><b>{getProductName(price.product)}</b></h1>
                        <p className="basketsizetext text-[2vw] text-white">Size: {getProductSize(price)}</p>
                      </Link>
                        <div className="flex">
                        <p className="baskettext text-[2.75vw] text-white pr-2">Quantity:</p>
                        <select id={price.id} value={getProductQuantity(price)} onChange={(e) => changeQuantity(price.id, Number(e.target.value))} className="baskettext text-[3vw]">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select>
                        </div>
                        <div className="flex">
                          <p className="baskettext text-[3vw] text-white"><b>£{getProductPrice(price)}</b></p>
                          <button onClick={() => removeItem(price.id)} className="binbutton text-[2.5vw] hover:cursor-pointer ml-3 text-[#c02d2d] duration-200 ease-in-out hover:text-[#a12727]"><FontAwesomeIcon icon={faTrashCan}/></button>
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
                  ? (<><p className="subtotaltext text-white ml-4 text-[3vw] mb-5">Subtotal: £{subtotal.toFixed(2)}<br/>Delivery: £2.79<br/>Total: £{(subtotal + 2.79).toFixed(2)}</p><button onClick={() => checkout()} className="checkbutton bg-green-700 text-white px-4 py-3 rounded-[20px] text-[2.5vw] table mx-auto duration-300 ease-in-out hover:scale-[1.02]"><FontAwesomeIcon icon={faLock}/> Check Out - £{(subtotal + 2.79).toFixed(2)}</button><div className="table mx-auto text-white text-[2vw]"><div className="flex"><p className="securedtext relative top-[.35vw] pr-[0.35em]">Secured with</p> <FontAwesomeIcon icon={faStripe} className="stripetext text-white text-[4vw] relative align-middle"/></div></div><p className="spendtext text-white table mx-auto text-[1.5vw]">Spend £{(40 - subtotal).toFixed(2)} more to get free shipping on this order!</p></>)
                  : (<><p className="subtotaltext text-white ml-4 text-[3vw] mb-5">Subtotal: £{subtotal.toFixed(2)}<br/>Delivery: £0.00<br/>Total: £{(subtotal + 0.00).toFixed(2)}</p><button onClick={() => checkout()} className="checkbutton bg-green-700 text-white px-4 py-3 rounded-[20px] text-[2.5vw] table mx-auto duration-300 ease-in-out hover:scale-[1.02]"><FontAwesomeIcon icon={faLock}/> Check Out - £{(subtotal + 0.00).toFixed(2)}</button><div className="table mx-auto text-white text-[2vw]"><div className="flex"><p className="securedtext relative top-[.35vw] pr-[0.35em]">Secured with</p> <FontAwesomeIcon icon={faStripe} className="stripetext text-white text-[4vw] relative align-middle"/></div></div></>)
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