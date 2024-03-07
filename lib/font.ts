import { Acme, Be_Vietnam_Pro, Kanit, Unbounded } from 'next/font/google'

export const acme = Acme({
    subsets: ['latin'], 
    weight: ["400"]
})

export const bvp = Be_Vietnam_Pro({
    subsets: ['latin'], 
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
  })

export const kanit = Kanit({
    subsets: ['latin'], 
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
  })

export const unbounded = Unbounded({
    subsets: ['latin'], 
    weight: ["200", "300", "400", "500", "600", "700", "800", "900"]
  })