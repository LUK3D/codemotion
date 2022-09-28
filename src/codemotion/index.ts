import { IVector2 } from "../types";

import {css_beautify} from 'js-beautify';

export class CodeMotion {
     el:HTMLElement|null;

     frames:Array<string> = [];
     animatedProps:Array<string> = [];

     frameTemplate =
`
@keyframes myAnim {
    {frames}
}
`;

    sourceAnimation = '';
 
    constructor(selector: string){
        this.el = document.querySelector(selector);
    }      

    translate(pos:IVector2){
        if(this.el){
            
            // this.el.style.transform = `translate(${pos.x}px,${pos.y}px)`; 
            this.el.style.top = `${pos.y}px`; 
            this.el.style.left = `${pos.x}px`; 
            this.addAnimatedProp('top'); 
            this.addAnimatedProp('left'); 
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
            this.resetStartAt();
        }  
    }


    playbackPreview(timelinePosition:number){
        document.documentElement.style.setProperty('--startAt', '-'+(100/timelinePosition)+'s');
        
    }

    resetStartAt(){
        document.documentElement.style.removeProperty('--startAt');
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
            this.appendAnimationStyle();
        }
        
    }

    appendAnimationStyle(){
        this.getAnimationStyle().remove();
        this.el!.classList.add('myAnimation');
        let anim = this.frameTemplate.split('{frames}').join(this.frames.join(' '));
        document.getElementById('myStyles')!.innerHTML +=`<style>${anim} .myAnimation{ 
            animation: myAnim 2s linear 0s infinite; 
            animation-play-state: paused;
            animation-delay: var(--startAt);
        } </style>`;
    }

    getAnimationStyle(){
        let styles = document.getElementsByTagName('style');
        return styles[styles.length-1]!;
    }


    formatCode(){
        this.el!.classList.add('myAnimation');
        let anim = this.frameTemplate.split('{frames}').join(this.frames.join(' '));
this.sourceAnimation = `
${
css_beautify(
`
${anim} 
.myAnimation{ 
animation: myAnim 2s linear 0s infinite; 
}
`,{ indent_level: 2, space_around_combinator: true, space_around_selector_separator:true })
}
`;
    }


    play(){
      
       this.formatCode();

    


        document.getElementById('myStyles')!.innerHTML +='<style>' + this.sourceAnimation + '</style>';


        this.el!.classList.add('myAnimation');

   
        
        // console.log(document.styleSheets.item(1));
    }

    stop(){
        this.getAnimationStyle().remove();
    }

    
}