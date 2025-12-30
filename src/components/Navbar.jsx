import React from 'react'

const Navbar = () => {
  return (
    <nav className=' w-full text-white flex justify-between items-center'>
       <div className="logo">
        <img src="https://bigbracketshq.com/assets/bigbrackets-Bh03Bawf.svg" alt="" />
        </div> 
            <ul className='flex gap-8'>
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Portfolio</li>
                <li>Testimonials</li>
                <li>Blog</li>
                <li>Contact</li>
            </ul>
        
    </nav>
  )
}

export default Navbar