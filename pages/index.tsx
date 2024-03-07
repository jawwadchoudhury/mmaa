import { Unbounded, Be_Vietnam_Pro } from "next/font/google";
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

  const response = await stripe.prices.list({
    limit: 10,
    expand: ['data.product']
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
  prices: Stripe.Price[]
}

const Home: NextPage<Props> = ({prices}) => {
//   var { items, remove, add } = useContext(CartContext)
//   const [ loading, setLoading ] = useState(true)

  
//   const checkout = async() => {
//     if (items?.length == 0) {
//       alert("You have no items in your basket!")
//     } else {
//     const lineItems = items?.map(p => {
//         return {
//             price: p.id,
//             quantity: 1
//         }
//     })

  

//     const res = await fetch('/api/checkout', {
//       method: 'POST',
//       body: JSON.stringify({lineItems: lineItems})
//     })

//     const b = await res.json()
//     window.location.href = b.session.url
//   }
// }

//   function removeItem(id: string): void {
//     if (items?.length == 1) {
//       localStorage.removeItem("basket")
//     } else {
//       var lsb = localStorage.getItem("basket") || ""
//       var basket = JSON.parse(lsb)
//       //@ts-ignore
//       const obj = basket.find(x => x.id === id)
//       const index = basket.indexOf(obj)
//       if (index > -1) {
//         basket.splice(index, 1)
//         localStorage.setItem("basket", JSON.stringify(basket))
//       }

//     }
//     if (remove) {
//       remove(id)
//     }
//   }

//   var subtotal = 0

  
//   useEffect(() => {
//     var lsb = localStorage.getItem("basket") || ""
    
//     if (lsb.length >= 1) {
//       var basket = JSON.parse(lsb)
//       basket.forEach((x:any) => {
//         //@ts-ignore
//         if (!items?.includes(x)) {
//           items?.push(x)
//         }
        
        
        
//       });
//       const ids = items?.map(({id}) => id)
//       const filtered = items?.filter(({id}, index) => !ids?.includes(id, index+1))
//       items = filtered
//       setLoading(false)
//     } else { setLoading(false) }
    
//   }, [])

//   if (loading) {
//     return null
//   }

  return (
    <>
    {/* <div className="bg-[#333] fixed w-full z-20 top-0 left-0">
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
                  items?.map((price) => {
                    subtotal += Number(getProductPrice(price))
                    return <div className="w-full bg-[#303030] shadow-xl p-4 flex mb-4" key={price.id}>
                      <img src={getProductImage(price.product)} width={'30%'} className="basketimg" style={{
                        borderRadius: '10%'
                      }}/>
                      <div className="pl-4 relative top-[25%]">
                        <h1 className="baskettext text-[3vw] text-white">{getProductName(price.product)}</h1>
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
              items?.length == 0
              ? (<p className="yhniiyb text-[2.5vw] text-white leading-[90vh]">You have no items in your basket</p>)
              : (<button onClick={() => checkout()} className="bg-green-700 text-white px-4 py-3 rounded-[20px] text-[1.5rem] table mx-auto"><FontAwesomeIcon icon={faLock}/> Check Out - £{subtotal}</button>)
            }

            
             <label htmlFor="check" className="close-menu text-white duration-200 ease-in-out"><FontAwesomeIcon icon={faXmark} /></label>
             </div>
           </span>

           <label htmlFor="check" className="open-menu text-white duration-200 ease-in-out opacity-[65%] text-[1.25rem]"><FontAwesomeIcon icon={faBasketShopping} /></label>
            </ul>
        </div> */}
    <Navbar />
    
    <main className="w-[100%] pt-[120px]">
        
        
        <div className="flex flex-row flex-wrap justify-center">
          {prices.map(p => 
            <Card price={p} key={p.id}/>
          )}
          <div className="item mx-4 my-8 ">
              <div className="relative top-[85%] mx-[5%]">
                <h1 className="float-left">Product Name</h1>
                <p className="float-right">£13.37</p>
              </div>
              <a><button className="bsktbtn relative bg-green-700 w-[100%] rounded-b-[20px] text-lg py-1"><p><FontAwesomeIcon icon={faShoppingBasket} /> Add to Cart</p></button></a>
          </div>
          <div className="item mx-4 my-8">
              <div className="relative top-[85%] mx-[5%]">
                <h1 className="float-left">Product Name</h1>
                <p className="float-right">£13.37</p>
              </div>
              <a><button className="bsktbtn relative bg-green-700 w-[100%] rounded-b-[20px] text-lg py-1"><p><FontAwesomeIcon icon={faShoppingBasket} /> Add to Cart</p></button></a>
          </div>
          <div className="item mx-4 my-8">
              <div className="relative top-[85%] mx-[5%]">
                <h1 className="float-left">Product Name</h1>
                <p className="float-right">£13.37</p>
              </div>
              <a><button className="bsktbtn relative bg-green-700 w-[100%] rounded-b-[20px] text-lg py-1"><p><FontAwesomeIcon icon={faShoppingBasket} /> Add to Cart</p></button></a>
          </div>
          <div className="item mx-4 my-8">
              <div className="relative top-[85%] mx-[5%]">
                <h1 className="float-left">Product Name</h1>
                <p className="float-right">£13.37</p>
              </div>
              <a><button className="bsktbtn relative bg-green-700 w-[100%] rounded-b-[20px] text-lg py-1"><p><FontAwesomeIcon icon={faShoppingBasket} /> Add to Cart</p></button></a>
          </div>
          <div className="item mx-4 my-8">
              <div className="relative top-[85%] mx-[5%]">
                <h1 className="float-left">Product Name</h1>
                <p className="float-right">£13.37</p>
              </div>
              <a><button className="bsktbtn relative bg-green-700 w-[100%] rounded-b-[20px] text-lg py-1"><p><FontAwesomeIcon icon={faShoppingBasket} /> Add to Cart</p></button></a>
          </div>
          <div className="item mx-4 my-8">
              <div className="relative top-[85%] mx-[5%]">
                <h1 className="float-left">Product Name</h1>
                <p className="float-right">£13.37</p>
              </div>
              <a><button className="bsktbtn relative bg-green-700 w-[100%] rounded-b-[20px] text-lg py-1"><p><FontAwesomeIcon icon={faShoppingBasket} /> Add to Cart</p></button></a>
          </div>
        </div>
    </main>
    </>
  );
}

export default Home;