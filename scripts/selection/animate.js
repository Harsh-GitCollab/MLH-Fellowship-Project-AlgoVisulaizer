import { ctx, rectArray, graph } from '../selection/canvas.js'


export function promise_hightlight(current_index, c, mn_index) {
    return new Promise( (resolve) => {
        setTimeout( () => {
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            
            if(mn_index != undefined) {
                for( var j = 0; j < 10; j++) {
                    rectArray[current_index].draw(rectArray[current_index].x, rectArray[current_index].y, rectArray[current_index].width, rectArray[current_index].height, c );
                    rectArray[mn_index].draw(rectArray[mn_index].x, rectArray[mn_index].y, rectArray[mn_index].width, rectArray[mn_index].height, c );
    
                    if(j < current_index) {
                        rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "green");
                    }
    
                    if(j != current_index && j != mn_index && j >=  current_index) {
                        rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "turquoise");
                    }
                }
            }else {
                 for( var j = 0; j < 10; j++) {
                    rectArray[current_index].draw(rectArray[current_index].x, rectArray[current_index].y, rectArray[current_index].width, rectArray[current_index].height, c );
    
                    if(j < current_index) {
                        rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "green");
                    }
    
                    if( j >  current_index) {
                        rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "turquoise");
                    }
                }
            }
            
            graph();
            resolve();
        }, 1000 );
    } )
}


export function swap(current_index, mn_index, buffer_x1, buffer_x2, callBack) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
        
    
    for(var j=0; j< 10; j++) {
        if(j != current_index && j != mn_index && j > current_index) {
            rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "rgb(153, 255, 204)");
        }
        if(j < current_index) {
            rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "green");
        }
    }

    rectArray[current_index].update(buffer_x2, "forward");
    rectArray[mn_index].update(buffer_x1, "backward");
    graph();
    
    
    if(rectArray[current_index].x < buffer_x2 && rectArray[mn_index].x > buffer_x1) {
    
      var requestId =   window.requestAnimationFrame(() => {swap(current_index, mn_index,  buffer_x1, buffer_x2, callBack)});
        
    }else if(rectArray[current_index].x >= buffer_x2 && rectArray[mn_index].x <= buffer_x1) {
        
        callBack();
        window.cancelAnimationFrame(requestId);
    }
}


export function promise_swap(current_index, mn_index, buffer_x1, buffer_x2) {
    return new Promise( (resolve) => {
        window.requestAnimationFrame(() => {swap(current_index, mn_index, buffer_x1, buffer_x2, () => {resolve()}) });    
    } )
}