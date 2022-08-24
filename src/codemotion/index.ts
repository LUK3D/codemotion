export class CodeMotion {
     el:HTMLElement|null;

     frames:Array<string> = [];
     animatedProps:Array<string> = [];

     frameTemplate = `
        @keyframes myAnim {
            {frames}
        }
     `;
 
    constructor(selector: string){
        this.el = document.querySelector(selector);
    }      

    rotate(degree:number){
        if(this.el){
            this.el.style.rotate = `${degree}deg`; 
            this.addAnimatedProp('rotate'); 
            console.log('rotating',this.animatedProps);        
        }

    }

    scale(size:number){
        if(this.el){
            this.el.style.scale = `${size*0.05}`; 
            this.addAnimatedProp('scale');   
            console.log('scalling',this.animatedProps);        

        }
    }
    color(hexColor:string){
        if(this.el){
            this.el.style.background = hexColor; 
            this.addAnimatedProp('background');   
            console.log('backgrounding',this.animatedProps);        

        }
    }

    addAnimatedProp(prop:string){
        if(!this.animatedProps.includes(prop)){
            this.animatedProps.push(prop);
        }  
    }

 

    setFrame(timelinePosition:number){
        let keyframe:Array<string> = [];

        this.animatedProps.forEach(prop => {
            //@ts-ignore
            keyframe.push(`${prop}:${this.el?.style[prop]}`);
        });

        console.log(this.animatedProps);
        console.log(keyframe);

        if(keyframe.length>0){
            this.frames.push(`${timelinePosition}% { ${keyframe.join('; ')+';'} }` );
        }

        
       
    }


    play(){
        this.el!.classList.add('myAnimation');
        let anim = this.frameTemplate.split('{frames}').join(this.frames.join(' '));
        document.body.innerHTML +=`<style>${anim} .myAnimation{ animation: myAnim 2s alternate-reverse 0s infinite; } </style>`;
    }

    stop(){

    }

    
}