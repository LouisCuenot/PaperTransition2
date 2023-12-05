import React, { useEffect, useState, useMemo } from 'react'
import { shaderMaterial, useTexture} from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'

import planeMaterialFrag from './shaders/planeMaterial.frag?raw'
import planeMaterialVert from './shaders/planeMaterial.vert?raw'
import { useRef } from 'react'
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'


const PlaneMaterial = shaderMaterial(
  {
    uTime:0,
    uDecalage:0.3,
    uTexture: new THREE.Texture(),
    uEnroulement:4
  },
  planeMaterialVert,
  planeMaterialFrag
)

extend({PlaneMaterial})

const Scene = () => {

  const [planeWidth, setPlaneWidth] = useState(window.innerWidth/window.innerHeight)

  const [currentTween, setCurrentTween] = useState([])
  const [isShaderCompiled, setIsShaderCompiled] = useState(false)

  const paperTexture = useTexture('paperTexture.jpg')

  const planeMaterialRef = useRef()
  const standardMatRef = useRef()
  const testRef = useRef()

  const standardMatRef1 = useRef()
  const testRef1 = useRef()

  const standardMatRef2 = useRef()
  const testRef2 = useRef()

  

  const {gl} = useThree()

  useFrame((state, delta)=>{
    if(planeMaterialRef.current){
      planeMaterialRef.current.uniforms.uTime.value += delta
      planeMaterialRef.current.uniforms.uDecalage.value = Math.sin(state.clock.elapsedTime*2)*0.15+0.15
      planeMaterialRef.current.uniforms.uEnroulement.value = Math.sin(state.clock.elapsedTime*2)*3 +3
    }
    if(standardMatRef.current.userData.shader){
      //console.log(standardMatRef.current)
      //console.log(standardMatRef.current.userData.shader)
      //standardMatRef.current.userData.shader.uniforms.uDecalage.value = Math.sin(state.clock.elapsedTime*2)*0.15+0.15
      //standardMatRef.current.userData.shader.uniforms.uEnroulement.value = Math.sin(state.clock.elapsedTime*2)*3 +3
    }
    if(currentTween[0]){
      currentTween.forEach(tween=>tween.update())
    }
  })

  useEffect(()=>{
    if(standardMatRef.current.userData.shader){

      const tweenGroup = new TWEEN.Group()

    

      //new TWEEN.Tween(testRef.current.position, tweenGroup)
      //  .to({x:0}, 2000)
      //  .easing(TWEEN.Easing.Cubic.Out)
      //  .start()

        const emmissiveITween = new TWEEN.Tween(standardMatRef.current, tweenGroup)
        .to({emissiveIntensity:0}, 1000)
        .easing(TWEEN.Easing.Cubic.Out)
        .onUpdate(()=>console.log('slt'))
        .onComplete(()=>{
          //setCurrentTween([])
          //standardMatRef.current.emmisiveIntensity = 15
          console.log(standardMatRef.current)
        })

        new TWEEN.Tween(standardMatRef.current.userData.shader.uniforms.uPosX, tweenGroup)
        .to({value:0}, 3000)
        .easing(TWEEN.Easing.Cubic.Out)
        .start()
      
        new TWEEN.Tween(standardMatRef.current.userData.shader.uniforms.uDecalage, tweenGroup)
        .to({value:0.01},5000)
        .easing(TWEEN.Easing.Cubic.Out)
        .start()

        new TWEEN.Tween(standardMatRef.current.userData.shader.uniforms.uEnroulement, tweenGroup)
        .to({value:0.01},5000)
        .easing(TWEEN.Easing.Cubic.Out)
        .start()
        .onComplete(()=>{
          console.log('yo')
          emmissiveITween.start()
        })

        setCurrentTween([...currentTween,tweenGroup])

        setTimeout(()=>{
          const tweenGroup = new TWEEN.Group()

    

      //new TWEEN.Tween(testRef.current.position, tweenGroup)
      //  .to({x:0}, 2000)
      //  .easing(TWEEN.Easing.Cubic.Out)
      //  .start()

        const emmissiveITween = new TWEEN.Tween(standardMatRef.current, tweenGroup)
        .to({emissiveIntensity:0}, 1000)
        .easing(TWEEN.Easing.Cubic.Out)
        .onUpdate(()=>console.log('slt'))
        .onComplete(()=>{
          setCurrentTween([])
          //standardMatRef.current.emmisiveIntensity = 15
          console.log(standardMatRef.current)
        })

        new TWEEN.Tween(standardMatRef.current.userData.shader.uniforms.uPosX, tweenGroup)
        .to({value:0}, 3000)
        .easing(TWEEN.Easing.Cubic.Out)
        .start()
      
        new TWEEN.Tween(standardMatRef.current.userData.shader.uniforms.uDecalage, tweenGroup)
        .to({value:0.01},5000)
        .easing(TWEEN.Easing.Cubic.Out)
        .start()

        new TWEEN.Tween(standardMatRef.current.userData.shader.uniforms.uEnroulement, tweenGroup)
        .to({value:0.01},5000)
        .easing(TWEEN.Easing.Cubic.Out)
        .start()
        .onComplete(()=>{
          console.log('yo')
          emmissiveITween.start()
        })
        },50)


        
        
  
        

    }
  },[isShaderCompiled])

  const handleClick = () => {

    const tweenGroup = new TWEEN.Group()
    
    new TWEEN.Tween(standardMatRef.current.userData.shader.uniforms.uPosX, tweenGroup)
        .to({value:planeWidth}, 5000)
        .delay(500)
        .easing(TWEEN.Easing.Cubic.In)
        .start()
        .onComplete(()=>setCurrentTween([]))
      
        new TWEEN.Tween(standardMatRef.current.userData.shader.uniforms.uDecalage, tweenGroup)
        .to({value:0.4},4000)
        .easing(TWEEN.Easing.Cubic.In)
        .start()

        new TWEEN.Tween(standardMatRef.current.userData.shader.uniforms.uEnroulement, tweenGroup)
        .to({value:20},4000)
        .easing(TWEEN.Easing.Cubic.In)
        .start()
        
        
  
        setCurrentTween([...currentTween,tweenGroup])

  }

  useEffect(()=>gl.setClearColor(0x00FFFF),[gl])

  useEffect(()=>{
    const handleResize = () => {
      setPlaneWidth(window.innerWidth/window.innerHeight)
    }



    window.addEventListener('resize', ()=>handleResize())
    return window.removeEventListener('resize',()=>handleResize())
  },[])

  const uniforms = useMemo(() => ({
    uDecalage: { value: 0.4  },
    uEnroulement: {value : 10 },
    uPlaneWidth: { value : planeWidth},
    uPosX:{ value: planeWidth },
  }), [planeWidth])

  const uniforms1 = useMemo(() => ({
    uDecalage: { value: 0.4  },
    uEnroulement: {value : 10 },
    uPlaneWidth: { value : planeWidth},
    uPosX:{ value: planeWidth },
  }), [planeWidth])

  const uniforms2 = useMemo(() => ({
    uDecalage: { value: 0.4  },
    uEnroulement: {value : 10 },
    uPlaneWidth: { value : planeWidth},
    uPosX:{ value: planeWidth },
  }), [planeWidth])

  return (
    <>
  
        {
          /*
            <mesh position-z={-3} >
            <planeGeometry args={[2,1,256,256]}/>
            <planeMaterial 
              ref={planeMaterialRef} 
              uTime={0}
              uDecalage={0.3}
              uTexture={paperTexture}
              uEnroulement={4}
            />
            </mesh>
          */
        }
        

        <mesh
          castShadow
          receiveShadow
          ref={testRef}
          onClick={()=>handleClick()}
        >
            <planeGeometry args={[planeWidth,1,256,256]}/>
            <meshStandardMaterial 
              emissive={0xFFFFFF}
              emissiveIntensity={0}
              roughness={0.8}
              metalness={0}
              flatShading
              shadowBias={-0.01}
              ref={standardMatRef}
              side={THREE.DoubleSide}
              onBeforeCompile={shader => {
                shader.uniforms.uDecalage = uniforms.uDecalage;
                shader.uniforms.uEnroulement = uniforms.uEnroulement;
                shader.uniforms.uPlaneWidth = uniforms.uPlaneWidth;
                shader.uniforms.uPosX = uniforms.uPosX;
                shader.vertexShader = shader.vertexShader.replace(
                  'void main() {',
                  `
                  #define M_PI 3.1415926535897932384626433832795

                  uniform float uDecalage;
                  uniform float uEnroulement;
                  uniform float uPlaneWidth;
                  uniform float uPosX;
                  void main() {
                  `
                )
                shader.vertexShader = shader.vertexShader.replace(
                  '#include <begin_vertex>',
                  `
                  #include <begin_vertex>
                  transformed.x += -(-step(uDecalage, (uv.x*uPlaneWidth))+1.0) * (((uv.x*uPlaneWidth)-uDecalage) - cos(((uv.x*uPlaneWidth) - uDecalage) * (M_PI*uEnroulement * (uv.y))  - M_PI *0.5) * 0.05 * ((uv.x*uPlaneWidth) *  0.1 +  0.9)) + uPosX ;
                  transformed.z += (1.0-step(uDecalage, (uv.x*uPlaneWidth))) * (sin(((uv.x*uPlaneWidth) - uDecalage)* (M_PI*uEnroulement * (uv.y))  - M_PI * 0.5) * 0.05 * ((uv.x*uPlaneWidth) *  0.1 +  0.9) + 0.045);
                  transformed.y += (-(-step(uDecalage, (uv.x*uPlaneWidth))+1.0) * (((uv.x*uPlaneWidth) / -uDecalage) + 1.0 ) *0.15*(uv.y)) * smoothstep(0.05*uPlaneWidth,0.2*uPlaneWidth, uDecalage);
                  `
                );

                standardMatRef.current.userData.shader = shader
                setIsShaderCompiled(true)
            }}
              color={0xFFFFFF}  
              needsUpdate={true}
            />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          ref={testRef1}
          onClick={()=>handleClick()}
          position-z={-0.05}
          position-x={-0.05}
        >
            <planeGeometry args={[planeWidth,1,256,256]}/>
            <meshStandardMaterial 
              emissive={0xFFFFFF}
              emissiveIntensity={0}
              roughness={0.8}
              metalness={0}
              flatShading
              shadowBias={-0.01}
              ref={standardMatRef1}
              side={THREE.DoubleSide}
              onBeforeCompile={shader => {
                shader.uniforms.uDecalage = uniforms1.uDecalage;
                shader.uniforms.uEnroulement = uniforms1.uEnroulement;
                shader.uniforms.uPlaneWidth = uniforms1.uPlaneWidth;
                shader.uniforms.uPosX = uniforms1.uPosX;
                shader.vertexShader = shader.vertexShader.replace(
                  'void main() {',
                  `
                  #define M_PI 3.1415926535897932384626433832795

                  uniform float uDecalage;
                  uniform float uEnroulement;
                  uniform float uPlaneWidth;
                  uniform float uPosX;
                  void main() {
                  `
                )
                shader.vertexShader = shader.vertexShader.replace(
                  '#include <begin_vertex>',
                  `
                  #include <begin_vertex>
                  transformed.x += -(-step(uDecalage, (uv.x*uPlaneWidth))+1.0) * (((uv.x*uPlaneWidth)-uDecalage) - cos(((uv.x*uPlaneWidth) - uDecalage) * (M_PI*uEnroulement * (uv.y ))  - M_PI *0.5) * 0.05 * ((uv.x*uPlaneWidth) *  0.1 +  0.9)) + uPosX ;
                  transformed.z += (1.0-step(uDecalage, (uv.x*uPlaneWidth))) * (sin(((uv.x*uPlaneWidth) - uDecalage)* (M_PI*uEnroulement * (uv.y ))  - M_PI * 0.5) * 0.05 * ((uv.x*uPlaneWidth) *  0.1 +  0.9) + 0.045);
                  transformed.y += (-(-step(uDecalage, (uv.x*uPlaneWidth))+1.0) * (((uv.x*uPlaneWidth) / -uDecalage) + 1.0 ) *0.15*(uv.y)) * smoothstep(0.05*uPlaneWidth,0.2*uPlaneWidth, uDecalage);
                  `
                );

                standardMatRef.current.userData.shader = shader
                setIsShaderCompiled(true)
            }}
              color={0xAAAAAA}  
              needsUpdate={true}
            />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          ref={testRef2}
          onClick={()=>handleClick()}
          position-z={-0.1}
          position-x={-0.1}
        >
            <planeGeometry args={[planeWidth,1,256,256]}/>
            <meshStandardMaterial 
              emissive={0xFFFFFF}
              emissiveIntensity={0}
              roughness={0.8}
              metalness={0}
              flatShading
              shadowBias={-0.01}
              ref={standardMatRef2}
              side={THREE.DoubleSide}
              onBeforeCompile={shader => {
                shader.uniforms.uDecalage = uniforms2.uDecalage;
                shader.uniforms.uEnroulement = uniforms2.uEnroulement;
                shader.uniforms.uPlaneWidth = uniforms2.uPlaneWidth;
                shader.uniforms.uPosX = uniforms2.uPosX;
                shader.vertexShader = shader.vertexShader.replace(
                  'void main() {',
                  `
                  #define M_PI 3.1415926535897932384626433832795

                  uniform float uDecalage;
                  uniform float uEnroulement;
                  uniform float uPlaneWidth;
                  uniform float uPosX;
                  void main() {
                  `
                )
                shader.vertexShader = shader.vertexShader.replace(
                  '#include <begin_vertex>',
                  `
                  #include <begin_vertex>
                  transformed.x += -(-step(uDecalage, (uv.x*uPlaneWidth))+1.0) * (((uv.x*uPlaneWidth)-uDecalage) - cos(((uv.x*uPlaneWidth) - uDecalage) * (M_PI*uEnroulement * (uv.y))  - M_PI *0.5) * 0.05 * ((uv.x*uPlaneWidth) *  0.1 +  0.9)) + uPosX ;
                  transformed.z += (1.0-step(uDecalage, (uv.x*uPlaneWidth))) * (sin(((uv.x*uPlaneWidth) - uDecalage)* (M_PI*uEnroulement * (uv.y))  - M_PI * 0.5) * 0.05 * ((uv.x*uPlaneWidth) *  0.1 +  0.9) + 0.045);
                  transformed.y += (-(-step(uDecalage, (uv.x*uPlaneWidth))+1.0) * (((uv.x*uPlaneWidth) / -uDecalage) + 1.0 ) *0.15*(uv.y)) * smoothstep(0.05*uPlaneWidth,0.2*uPlaneWidth, uDecalage);
                  `
                );

                standardMatRef.current.userData.shader = shader
                setIsShaderCompiled(true)
            }}
              color={0x222222}  
              needsUpdate={true}
            />
        </mesh>
       
    </>
  )
}

export default Scene