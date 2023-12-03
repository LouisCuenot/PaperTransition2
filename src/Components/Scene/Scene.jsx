import React, { useEffect } from 'react'
import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'

import planeMaterialFrag from './shaders/planeMaterial.frag?raw'
import planeMaterialVert from './shaders/planeMaterial.vert?raw'
import { useRef } from 'react'

const PlaneMaterial = shaderMaterial(
  {
    uTime:0,
    uDecalage:0.7
  },
  planeMaterialVert,
  planeMaterialFrag
)

extend({PlaneMaterial})

const Scene = () => {

  const planeMaterialRef = useRef()

  useFrame((state, delta)=>{
    if(planeMaterialRef.current){
      planeMaterialRef.current.uniforms.uTime.value += delta
      planeMaterialRef.current.uniforms.uDecalage.value = Math.sin(state.clock.elapsedTime*2)*0.5+0.5
    }
  })

  useEffect(()=>{
    if(planeMaterialRef.current){
      planeMaterialRef.current.side = 2
    }
  },[planeMaterialRef.current])

  return (
    <>
  
        <mesh>
            <planeGeometry args={[1,1,64,64]}/>
            <planeMaterial 
              ref={planeMaterialRef} 
              uTime={0}
              uDecalage={0.7}
            />
        </mesh>
    </>
  )
}

export default Scene