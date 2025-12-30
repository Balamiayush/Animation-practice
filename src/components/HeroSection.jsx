import React from 'react'
import Navbar from './Navbar.jsx'
import LayoutWrapper from '../utils/LayoutWrapper.jsx'
const HeroSection = () => {
  return (
    <section className='w-full h-screen bg-[#101010] py-4 '>
        <LayoutWrapper>
        <Navbar />    
        
        </LayoutWrapper>
    </section>
  )
}

export default HeroSection