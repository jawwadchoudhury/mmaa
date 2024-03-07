import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import Stripe from "stripe";
import _ from "lodash"
import '@/styles/index.css'
import '@/styles/Navbar.css'
import '@/lib/font'
import '@fortawesome/fontawesome-svg-core/styles.css'
import CartContext, { CartContextProps } from "@/components/context/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  const [items, setItems] = useState<Stripe.Price[]>([]);

  const remove = (id: string) => {
    let i = _.reject(items, (item) => {
      return item.id === id;
    })
    setItems(i)
  }

  const add = (p: Stripe.Price) => {
    let i = _.union(items, [p])
    setItems(i)
  }

  const cartContext: CartContextProps = {
    items: items,
    add: add,
    remove: remove
  }

  return <CartContext.Provider value={cartContext}><Component {...pageProps} /></CartContext.Provider>;
}
