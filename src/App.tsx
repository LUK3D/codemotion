import { useEffect } from 'react'
import './App.css'
import { CodeMotion } from './codemotion'

function App() {

  let motion:CodeMotion;

  useEffect(()=>{
     motion = new CodeMotion('#subject');
  },);

  function rotateElement(value:string){
    motion.rotate(parseInt(value));
  }
  function scaleElement(value:string){
    motion.scale(parseInt(value));
  }
  function changeBackground(value:string){
    motion.color(value);
  }

  function play(){
    motion.play();
  }

  function addKeyFram(){
    motion.setFrame();
  }


  return (
    <div className="w-screen h-screen bg-dark-800  flex">

      <div className="scene w-fulll h-full flex justify-center items-center w-full">
          <div id='subject' className="subject w-40 h-40 shadow-2xl bg-white rounded-lg">
          </div>
      </div>

      <div className="toolbox w-[500px] h-full bg-dark-500  rounded-lg shadow-2xl p-10 flex flex-col text-white" >
        <p className="text-2xl font-bold w-full  pb-4 mb-4">Properties</p>
        <p>Rotate</p>
        <input type="range"  onChange={(e)=>rotateElement(e.target.value)} name="" id="" />
        <p>Scale</p>
        <input type="range" onChange={(e)=>scaleElement(e.target.value)} name="" id="" />
        <input className="mt-4" type="text" onChange={(e)=>changeBackground(e.target.value)} name="" id="" />

        <div className='w-full flex justify-between mt-4'>
          <button onClick={()=>addKeyFram()}  className='border px-4 py-2 rounded-md'>Add KeyFrame</button>
          <button onClick={()=>play()} className='border px-4 py-2 rounded-md'>Play</button>
        </div>

      </div>
      
    </div>
  )
}

export default App
