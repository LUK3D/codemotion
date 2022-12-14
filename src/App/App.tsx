import { ActionIcon, Button, Code, ColorPicker, Dialog, Drawer, Group, NumberInput, Popover, Slider, TextInput } from '@mantine/core';
import { useEffect} from 'react'
import './App.css'
import { CodeMotion } from '../codemotion'
import { cmStates } from '../codemotion/codemotionStates';
import { Prism } from '@mantine/prism';
let motion:CodeMotion;


function App() {

  const codeMState = cmStates();



  function moveElementX(value?:number){
    if(value)
    codeMState.setPosition({...codeMState.position,x:value})
    motion.translate(codeMState.position);
  }

  function moveElementY(value?:number){
    if(value)
    codeMState.setPosition({...codeMState.position,y:value})
    motion.translate(codeMState.position);
  }



  function rotateElement(value?:number){
    if(value)
    motion.rotate(value);
  }
  function scaleElement(value?:number){
    if(value)
    motion.scale(value);
  }
  function changeBackground(value:string){
    motion.color(value);
  }

  function play(){
    codeMState.setIsPlaying(!codeMState.isPlaying);
    motion.play();
  }
  function stop(){
    codeMState.setIsPlaying(!codeMState.isPlaying);
    motion.stop();
  }

  function addKeyFram(){
    motion.setFrame(codeMState.timelinePosition??0);
    codeMState.setTimelineSteps([...codeMState.timelineSteps,{label:`${codeMState.timelinePosition}%`,value:codeMState.timelinePosition!}]);
  }
  function playBackPreview(val:number){
    codeMState.setTimelinePosition(val)
    motion.playbackPreview(val??0);
  }
  //@ts-ignore
 

  useEffect(()=>{
    if(!motion)
     motion = new CodeMotion('#subject');
     moveElementX(parseInt(motion.el!.style.left.replace('px','')));
     moveElementY(parseInt(motion.el!.style.top.replace('px','')));
     codeMState.setPosition({x:parseInt(motion.el!.style.left.replace('px','')), y:parseInt(motion.el!.style.top.replace('px',''))});

     moveElementX(parseInt(motion.el!.style.left.replace('px','')));
    moveElementY(parseInt(motion.el!.style.top.replace('px','')));


  //@ts-ignore
  document.ismoving = false;

    document.addEventListener('pointerup', (e)=>{
      console.log("Largou")
    //@ts-ignore
      document.ismoving = (false);
    })
    document.getElementById('subject')!.addEventListener('pointerdown', (e)=>{
      console.log("Cliquei")
      //@ts-ignore
      document.ismoving = (true);
      
    })

    document.addEventListener('pointermove', (e)=>{
      
      //@ts-ignore
      if(document.ismoving){
        //@ts-ignore
      console.log(e.x, e.y);
      //@ts-ignore
      motion.el!.classList.remove('myAnimation');
      codeMState.setPosition({y:e.y,x:e.x})
      motion.el!.style.bottom = e.y + 'px';
      motion.el!.style.left = e.x + 'px';
      //@ts-ignore
      motion.el!.style.right = null;
      }
      //@ts-ignore

      console.log("Moving",document.ismoving);

    })


  },[]);



  function exportCode(){
    motion.formatCode();
    codeMState.setCode(motion.sourceAnimation);
  }
 


  return (
    <div className="w-screen h-screen bg-dark-800  flex">
      

      <div className="scene w-fulll h-full flex justify-center items-center w-full overflow-hidden relative">
          <div id='subject'  style={{
            right:codeMState.position.x,
            top:codeMState.position.y,
          }} className="subject w-40 h-40 shadow-2xl bg-white rounded-lg absolute ">
          </div>

          <div className="timeline absolute bottom-0 right-0 w-full flex flex-col pb-20 px-30 z-20">
            <div className="flex mb-4 justify-center">
            <ActionIcon onClick={()=>addKeyFram()} variant='filled' size={40}>
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
              </div>
            </ActionIcon>
            <ActionIcon className={codeMState.isPlaying?'hidden':'flex'} onClick={()=>play()} variant='filled' size={40}>
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>

              </div>
            </ActionIcon>
            <ActionIcon color={'yellow'} className={codeMState.isPlaying?'flex':'hidden'} onClick={()=>stop()} variant='filled' size={40}>
              <div className='p-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
              </svg>

              </div>
            </ActionIcon>
            </div>
          <Slider
          color={'yellow'}
            marks={codeMState.timelineSteps}
            onChange={(val)=>{playBackPreview(val)}}
          />
          </div>
      </div>

      <div className="toolbox w-[500px] h-full bg-dark-500  rounded-lg shadow-2xl p-5 flex flex-col text-gray-200" >
        <p className="text-2xl font-bold w-full  pb-4 mb-4">Properties</p>
        <div className='flex flex-col my-4  pt-2 '>
          <div className='w-full flex flex-col text-xs '>
                <p className='text-sm'>Position</p>
                <p className='opacity-60'>Move the element on the Horizontal and Vertical Axis</p>
          </div>
          <div className='flex'>
          <NumberInput
            label="Horizontal"
            value={codeMState.position.x}
            onChange={(e)=>moveElementX(e)}
          />
          <NumberInput
            label="Vertical"
            value={codeMState.position.y}
            onChange={(e)=>moveElementY(e)}
            
          />
          </div>
        
        </div>

        <NumberInput
        label="Rotation"
        description="Rotate the element in degree"
        placeholder="Your age"
        onChange={(e)=>rotateElement(e)}
        className='mb-2'
        />
        <NumberInput
        label="Scale"
        description="Scale the element in degree"
        placeholder="Your age"
        onChange={(e)=>scaleElement(e)}
        className='mb-2'
        />

        <Popover width={300} position="bottom" withArrow shadow="md">
          <Popover.Target>
           <div className='w-full flex mt-2'>
              <div className='w-full flex flex-col text-xs '>
                <p className='text-sm'>Background Color</p>
                <p className='opacity-60'>Defines the element background</p>
              </div>
              <button className='w-9 h-9 rounded-md bg-white flex flex-col text-black'>
              <div className='w-full h-full'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className='w-full h-full'>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                </svg>
              </div>
            </button>
           </div>
          </Popover.Target>
          <Popover.Dropdown>
          <ColorPicker className='w-full' onChange={(e)=>changeBackground(e)} format="hex" swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']} />
          </Popover.Dropdown>
        </Popover>
        
     
      </div>


      <ActionIcon onClick={()=>{
        codeMState.setShowCode(true);
        exportCode();
      }} variant='filled' size={40} className="top-10 right-[500px] fixed">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>

              </div>
            </ActionIcon>
      


      <Drawer
        opened={codeMState.showCode}
        onClose={() => codeMState.setShowCode(false)}
        title="Animation COde"
        padding="xl"
        size="xl"
      >

        <div className="w-full h-full pb-20 ">
          <Prism language="css" withLineNumbers={true} className='h-full w-full overflow-y-auto '>{codeMState.code }</Prism>
        </div>
        
      </Drawer>

{/* 
      <Dialog
        opened={codeMState.showCode}
        withCloseButton
        onClose={() => codeMState.setShowCode(false)}
        size="lg"
        radius="md"
        position={{}}
      >
        <p>
        Subscribe to email newsletter
        </p>

        <Group align="flex-end">
          <TextInput placeholder="hello@gluesticker.com" style={{ flex: 1 }} />
        </Group>
      </Dialog> */}
      
    </div>
  )
}

export default App
