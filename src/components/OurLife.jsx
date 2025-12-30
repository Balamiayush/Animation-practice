import React, { useRef, useMemo } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Mock LayoutWrapper component
const LayoutWrapper = ({ children }) => (
  <div className="max-w-7xl mx-auto px-4">{children}</div>
)

const OurLife = () => {
  const data = [
    {
      img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=900&fit=crop',
      title: 'Project One',
      position: 'top-left'
    },
    {
      img: 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800&h=900&fit=crop',
      title: 'Project Two',
      position: 'top-right'
    },
    {
      img: 'https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800&h=900&fit=crop',
      title: 'Project Three',
      position: 'bottom-left'
    },
    {
      img: 'https://images.unsplash.com/photo-1618004652321-13a63e576b80?w=800&h=900&fit=crop',
      title: 'Project Four',
      position: 'bottom-right'
    },
    {
      img: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&h=900&fit=crop',
      title: 'Project Five',
      position: 'center'
    },
  ]
  
  const containerRef = useRef(null)
  const itemsRef = useRef([])
  
 const animationConfig = useMemo(() => {
  return data.map((item) => {
    switch (item.position) {
      case 'top-left':
        return { x: -300, y: -500, group: 'a' }

      case 'top-right':
        return { x: 800, y: -500, group: 'a' }

      case 'bottom-left':
        return { x: -400, y: -100, group: 'b' }

      case 'bottom-right':
        return { x: 450, y: 80, group: 'b' }

      case 'center':
        return { x: 0, y: -200, group: 'c' }

      default:
        return { x: 0, y: 0, group: 'c' }
    }
  })
}, [data])

  
useGSAP(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top top',
      end: '+=200%',
      scrub: 1,
      pin: true,
      markers: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    }
  })

  // 🔹 Group elements
  const groups = {
    a: [],
    b: [],
    c: [],
  }

  itemsRef.current.forEach((el, i) => {
    if (!el) return
    groups[animationConfig[i].group].push({
      el,
      config: animationConfig[i],
    })
  })

  // 🔹 Animate GROUP A (a + a together)
  groups.a.forEach(({ el, config }) => {
    tl.to(
      el,
      {
        x: config.x,
        y: config.y,
        scale: 1.5,
        opacity: 0.7,
        ease: 'power2.out',
        duration: 1,
      },
      0 // SAME TIME
    )
  })

  // 🔹 Animate GROUP B (after A finishes)
  groups.b.forEach(({ el, config }) => {
    tl.to(
      el,
      {
        x: config.x,
        y: config.y,
        scale: 1.5,
        opacity: 0.7,
        ease: 'power2.out',
        duration: 1,
      },
      1 // AFTER GROUP A
    )
  })

  // 🔹 Animate GROUP C (after B finishes)
  groups.c.forEach(({ el, config }) => {
    tl.to(
      el,
      {
        x: config.x,
        y: config.y,
        scale: 1.5,
        opacity: 0.7,
        ease: 'power2.out',
        duration: 1,
      },
      '+=1' // AFTER GROUP B
    )
  })
}, [animationConfig])

  return (
    <section ref={containerRef} className='w-full  bg-gradient-to-b from-gray-900 to-black py-20 relative overflow-hidden h-screen' >
      <LayoutWrapper>
        <h3 className='text-5xl font-bold text-white mb-20 text-center'>Our Life</h3>
        <div className="flex justify-center  items-end h-screen">
          {data.map((item, index) => (
            <div 
              key={index}
              ref={el => itemsRef.current[index] = el}
              className="flex flex-col items-center gap-4 will-change-transform"
            >
              <div className="overflow-hidden rounded-lg shadow-2xl">
                <img
                  src={item.img}
                  className='w-40 h-52 object-cover transition-transform hover:scale-105'
                  alt={item.title}
                  loading="lazy"
                />
              </div>
              <h3 className='text-xl text-white font-semibold'>{item.title}</h3>
            </div>
          ))}
        </div>
      </LayoutWrapper>
      
    </section>
  )
}

export default OurLife