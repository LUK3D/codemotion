export class CodeMotion {
     el:HTMLElement|null;

     frames:Array<string> = [];
     animatedProps:Array<string> = [];

     frameTemplate = `
        @keyframes myAnim {
            from {
                {from}
            }
            to {
                {to}
            }
        }
     `;
 
    constructor(selector: string){
        this.el = document.querySelector(selector);
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

 

    setFrame(){
        let keyframe:Array<string> = [];

        this.animatedProps.forEach(prop => {
            //@ts-ignore
            keyframe.push(`${prop}:${this.el?.style[prop]}`);
        });

        if(keyframe.length>0){
            this.frames.push(keyframe.join('; ')+';');
        }

        
       
    }


    play(){
        this.el!.classList.add('myAnimation');
        let anim = this.frameTemplate.split('{from}').join(this.frames[0]).split('{to}').join(this.frames[1]);
        document.body.innerHTML +=`<style>${anim} .myAnimation{ animation: myAnim 2s alternate-reverse 0s infinite; } </style>`;
    }

    stop(){

    }

    
}