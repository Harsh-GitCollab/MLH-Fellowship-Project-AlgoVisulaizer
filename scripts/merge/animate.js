import { ctx, rectArray, graph } from '../merge/canvas.js'

export function promise_hightlight(low, c, high) {
    return new Promise( (resolve) => {
        setTimeout( () => { 
            
            for(var j=0; j<10; j++) {
                ctx.clearRect(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height);
                if(j >= low && j <= high) {
                    rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "yellow" );
                }else {
                    rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "rgb(204, 255, 255)" ); 
                }
                
            }
            
            
            graph();
            resolve();
        }, 1000 );
    } )
}