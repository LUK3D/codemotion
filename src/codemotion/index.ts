import { IVector2 } from "../types";

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

    translate(pos:IVector2){
        if(this.el){
            this.el.style.transform = `translate(${pos.x}px,${pos.y}px)`; 
            this.addAnimatedProp('transform'); 
        }

    }
    rotate(degree:number){
        if(this.el){
            this.el.style.rotate = `${degree}deg`; 
            this.addAnimatedProp('rotate'); 
        }

    }

    scale(size:number){
        if(this.el){
            this.el.style.scale = `${size*0.05}`; 
            this.addAnimatedProp('scale');   
        }
    }
    color(hexColor:string){
        if(this.el){
            this.el.style.background = hexColor; 
            this.addAnimatedProp('background');   
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

    getAnimationStyle(){
        let styles = document.getElementsByTagName('style');
        return styles[styles.length-1]!;
    }


    play(){
        this.el!.classList.add('myAnimation');
        let anim = this.frameTemplate.split('{frames}').join(this.frames.join(' '));
        document.getElementById('myStyles')!.innerHTML +=`<style>${anim} .myAnimation{ animation: myAnim 2s alternate-reverse 0s infinite; } </style>`;
        let styles = document.getElementsByTagName('style');
        console.log(styles[styles.length-1]!.innerHTML)
        
        // console.log(document.styleSheets.item(1));
    }

    stop(){
        this.getAnimationStyle().remove();
    }

    
}