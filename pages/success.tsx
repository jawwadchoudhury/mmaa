import { Inter } from "next/font/google";
import { GetServerSideProps, NextPage } from "next";
import Stripe from "stripe"
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// var wl = window.location
// var url = new URL(wl.toString());
// var session_id = url.searchParams.get("session_id")

export const getServerSideProps: GetServerSideProps = async (context) => {
    const stripe = new Stripe(process.env.SECRET_KEY ?? '', {
        apiVersion: "2023-10-16"
      })
    
    const session_id = context.query.session_id
    const session = await stripe.checkout.sessions.retrieve(`${session_id}`)
    const pi = session.payment_intent?.toString()
    const order_number = pi?.replace('pi_', '')
    return {
        props: {
            order_number
        }
    }
}

type Props = {
    order_number: any
}



const Home: NextPage<Props> = ({order_number}) => {
    const [ loading, setLoading ] = useState(true)
    useEffect(() => {
        localStorage.removeItem("basket")
        setLoading(false)
    }, [])
    
    if(loading) {
        return null
    }

    return (
        <main>
            <p>Thank you for ordering! Keep reference of your order number: {order_number}</p>
        </main>
    );
}

export default Home;