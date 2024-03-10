import { Unbounded, Be_Vietnam_Pro, Rubik } from "next/font/google";
import Navbar from "@/components/Navbar";
import Head from "next/head";

const bvp = Be_Vietnam_Pro({
  subsets: ['latin'], 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

const unbounded = Unbounded({
  subsets: ['latin'], 
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"]
})

const rubik = Rubik({
  subsets: ['latin'], 
  weight: ["300", "400", "500", "600", "700", "800", "900"]
})

const NotFound = () => {
  return (
    <>
    <Head>
        <title>MMAA | 404</title>
    </Head>
    <Navbar />
    
    <main className="w-[100%]">
        <h1 className="text-white select-none table pt-[50vh] mx-auto align-middle text-center leading-[1rem]"><p className={unbounded.className}><b className="text-[4rem]">404</b></p><p className={bvp.className}><b className="text-[1.4rem]">Page not found</b></p></h1>
    </main>
    </>
  );
}

export default NotFound;