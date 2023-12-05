import { Canvas } from '@react-three/fiber'
import './App.css'
import Scene from './Components/Scene/Scene'
import Controls from './Components/Controls/Controls'
import Lights from './Components/Lights/Lights'
import Camera from './Components/Camera/Camera'


function App() {


  return (

      <Canvas 
        shadows
      >
        <Scene/>
        {
          <Controls/>
        }
        
        <Lights/>
        <Camera/>

      </Canvas>

  )
}

export default App
