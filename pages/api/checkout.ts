// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getProductPrice } from "@/utils/computed";

type Data = {
  session?: Stripe.Checkout.Session
  message?: string
};

type LineItem = {
  price: string
  quantity: number
}

type Req = {
  lineItems: LineItem[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method != 'POST') {
    res.status(405).json({message: "POST method required"})
  }

  try {
    const body: Req = JSON.parse(req.body)
    const stripe = new Stripe(process.env.SECRET_KEY ?? '', {
      apiVersion: "2023-10-16"
    })

    var session
    // var success_url = 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}'
    // var callback = 'http://localhost:3000/'
    var success_url = 'https://mmaa.vercel.app/success?session_id={CHECKOUT_SESSION_ID}'
    var callback = 'https://mmaa.vercel.app/'
    //@ts-ignore
    if (body.subtotal > 40) {
      session = await stripe.checkout.sessions.create({
        success_url: success_url,
        cancel_url: callback,
        line_items: body.lineItems,
        mode: 'payment',
        phone_number_collection: {
          enabled: true
        },
        shipping_address_collection: {
          allowed_countries: ["GB"]
        },
        shipping_options: [{shipping_rate: 'shr_1Orn8nAbOyVnZGBHPVecsILP'}],
        allow_promotion_codes: true,
      })
    } else {
      session = await stripe.checkout.sessions.create({
        success_url: success_url,
        cancel_url: callback,
        line_items: body.lineItems,
        mode: 'payment',
        phone_number_collection: {
          enabled: true
        },
        shipping_address_collection: {
          allowed_countries: ["GB"]
        },
        shipping_options: [{shipping_rate: 'shr_1Opwh6AbOyVnZGBHUENu7gaA'}],
        allow_promotion_codes: true,
      })
    }
    
    res.status(201).json({session})
  } catch (e) {
    // @ts-ignore
    res.status(500).json({message: e.message})
  }
}
