import { PerspectiveCamera, OrthographicCamera } from '@react-three/drei'
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
    <OrthographicCamera makeDefault zoom={790} position={[0,0,0.9]} args={[-0.5,0.5,0.5,-0.5,0.1,100]}/>
  )
}

export default Camera