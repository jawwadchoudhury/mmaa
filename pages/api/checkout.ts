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
    var shr = 'shr_1Orn8nAbOyVnZGBHPVecsILP'
    var success_url = 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}'
    var callback = 'http://localhost:3000/'
    var pub_success_url = 'https://mmaa.vercel.app/success?session_id={CHECKOUT_SESSION_ID}'
    var pub_callback = 'https://mmaa.vercel.app/'
    //@ts-ignore
    if (body.subtotal > 40) {
      shr = 'shr_1Orn8nAbOyVnZGBHPVecsILP'
    } else {
      shr = 'shr_1Opwh6AbOyVnZGBHUENu7gaA'
    }

    var session = await stripe.checkout.sessions.create({
      success_url: pub_success_url,
      cancel_url: pub_callback,
      line_items: body.lineItems,
      mode: 'payment',
      phone_number_collection: {
        enabled: true
      },
      shipping_address_collection: {
        allowed_countries: ["GB"]
      },
      shipping_options: [{shipping_rate: shr}],
      allow_promotion_codes: true,
    })
    
    res.status(201).json({session})
  } catch (e) {
    // @ts-ignore
    res.status(500).json({message: e.message})
  }
}
