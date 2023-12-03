import { PerspectiveCamera } from '@react-three/drei'
import React, { useEffect, useState } from 'react'

const Camera = () => {

    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)

    useEffect(()=>{
        const resizeHandler = () => {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
        }

        window.addEventListener('resize',()=>resizeHandler())

        return window.removeEventListener('resize', ()=>resizeHandler())
    },[])


  return (
    <PerspectiveCamera makeDefault position={[0,0,5]} args={[60, width/height,1,1000]}/>
  )
}

export default Camera