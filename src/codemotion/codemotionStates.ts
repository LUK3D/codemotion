import { useState } from "react";
import { ITimeLineSteps, IVector2 } from "../types";

/**Codemotion States */
export const cmStates = ()=>{
const [position,setPosition] = useState<IVector2>({x:0,y:0});
const [rotation,setRotation] = useState<number>(0);
const [scale,setScale] = useState<IVector2>({x:0,y:0});
const [color,setColor] = useState<String>('#ffffff');
const [timelineSteps,setTimelineSteps] = useState<Array<ITimeLineSteps>>([]);
const [timelinePosition,setTimelinePosition] = useState<number>();
const [isPlaying,setIsPlaying] = useState<boolean>(false);

return  {
    position, setPosition,
    rotation,setRotation,
    scale,setScale,
    color,setColor,
    timelineSteps,setTimelineSteps,
    timelinePosition,setTimelinePosition,
    isPlaying,setIsPlaying
};
}

