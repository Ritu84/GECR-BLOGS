import React, { useContext } from 'react'
import lightPageNotFoundImage from "../imgs/404-light.png"
import darkPageNotFoundImage from "../imgs/404-dark.png"
import {Link} from "react-router-dom"
import lightFullLogo from "../imgs/full-logo-light.png"
import darkFullLogo from "../imgs/full-logo-dark.png"
import { ThemeContext } from '../App'

const PageNotFound = () => {
  let {theme} = useContext(ThemeContext)
  return (
    <section className='h-cover relative p-10 flex flex-col items-center gap-20 text-center '>

        <img src={theme == "light" ? darkPageNotFoundImage:lightPageNotFoundImage} className='select-none border-2 border-grey w-72 aspect-square
        object-cover rounded'/>
        <h1 className='text-xl font-gelasio leading-7'>Page Not Found</h1>
        <p className='text-dark-grey text-xl leading-7 -mt-8'>The page you are searching for does not exists. Go back to the <Link to="/" className="text-black underline">Home page</Link>. </p>

        <div className='mt-auto'>
            <img src={theme=="light"?darkFullLogo:lightFullLogo} className='h-8 object-contain block mx-auto select-none'/>
            <p className='dark-grey'>Read millions of stories around the world </p>

        </div>

    </section>
  )
}

export default PageNotFound