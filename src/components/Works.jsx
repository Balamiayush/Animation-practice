import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LayoutWrapper = ({ children }) => (
  <div className="max-w-7xl mx-auto px-4">{children}</div>
)

const Works = () => {
    const worksRef = useRef(null)
    const imageRefs = useRef([])
    
    const data = [
        { img:'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=900&fit=crop', title:"Project One" },
        { img:'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800&h=900&fit=crop', title:"Project Two" },
        { img:'https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800&h=900&fit=crop', title:"Project Three" },
        { img:'https://images.unsplash.com/photo-1618004652321-13a63e576b80?w=800&h=900&fit=crop', title:"Project Four" },
        { img:'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&h=900&fit=crop', title:"Project Five" },
    ]
    
    useGSAP(() => {
        imageRefs.current.forEach((img) => {
            if (!img) return
            
            // Create a timeline for each image
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: img,
                    start: "top bottom", // Starts when image enters viewport
                    end: "bottom top",   // Ends when image leaves viewport
                    scrub: 1,            // Smoothly follows scroll (increase for more "weight")
                }
            })

            tl.to(img, { scale: 0.8, ease: "none" }) // Shrink as it hits the center
              .to(img, { scale: 1, ease: "none" })   // Grow back as it leaves
        })
    }, { scope: worksRef })
    
    return (
        <section ref={worksRef} className='w-full min-h-screen bg-[#101010] py-20'>
            <LayoutWrapper>
                <h3 className='text-[3vw] font-bold text-white mb-20'>Best Works</h3>
                <div className="flex flex-col gap-[20vh]">
                    {data.map((item, index) => (
                        <div key={index} className="flex flex-col items-center gap-6">
                            <div className="overflow-hidden rounded-md">
                                <img 
                                    ref={el => imageRefs.current[index] = el}
                                    src={item.img} 
                                    className='w-[45vw] h-[55vw] object-cover' 
                                    alt={item.title}
                                />
                            </div>
                            <h3 className='text-[2vw] text-white opacity-80'>{item.title}</h3>
                        </div>
                    ))}
                </div>
            </LayoutWrapper>
        </section>
    )
}

export default Works