import React, {useEffect, useRef} from 'react'
import { OrthographicCamera, useHelper } from '@react-three/drei'
import { DirectionalLightHelper, SpotLightHelper } from 'three'

const Lights = () => {

  const dLight = useRef()

  //useHelper(dLight, SpotLightHelper, 'red')

  useEffect(()=>{
    dLight.current.shadow.bias = -0.01
  },[dLight.current])

  return (
    <>
        <ambientLight args={[0xFFFFFF, 0.6]}/>
        <spotLight castShadow ref={dLight} args={[0xFFFFFF,100,20,0.3]} position={[-3,0,2]} lookAt={[0,0,0]}/>
    </>
  )
}

export default Lights