import { ctx, rectArray, graph } from '../insertion/canvas.js'


export function promise_hightlight(current_index, c, prev_index) {
    return new Promise( (resolve) => {
        setTimeout( () => {
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            
            if(prev_index != undefined) {
                for( var j = 0; j < 12; j++) {
                    rectArray[current_index].draw(rectArray[current_index].x, rectArray[current_index].y, rectArray[current_index].width, rectArray[current_index].height, c );
                    rectArray[prev_index].draw(rectArray[prev_index].x, rectArray[prev_index].y, rectArray[prev_index].width, rectArray[prev_index].height, "green" );
    
    
                    if(j != current_index && j != prev_index) {
                        rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "rgb(153, 255, 204)");
                    }
                }
            }else {
                 for( var j = 0; j < 12; j++) {
                    rectArray[current_index].draw(rectArray[current_index].x, rectArray[current_index].y, rectArray[current_index].width, rectArray[current_index].height, c );
        
                    if( j !=  current_index) {
                        rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "rgb(153, 255, 204)");
                    }
                }
            }
            
            graph();
            resolve();
        }, 1000 );
    } )
}


function swap(current_index, prev_index, buffer_x1, buffer_x2, callBack) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
        
    
    for(var j=0; j< 12; j++) {
        if(j != current_index && j != prev_index) {
            rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "rgb(152, 255, 204)");
        }
        
        
    }

    rectArray[current_index].update(buffer_x1, "backward");
    rectArray[prev_index].update(buffer_x2, "forward");

    
    graph();
    
    
    if(rectArray[current_index].x > buffer_x1 && rectArray[prev_index].x < buffer_x2) {
    
      var requestId =   window.requestAnimationFrame(() => {swap(current_index, prev_index,  buffer_x1, buffer_x2, callBack)});
        
    }else if(rectArray[current_index].x <= buffer_x1 && rectArray[prev_index].x >= buffer_x2) {
        
        callBack();
        window.cancelAnimationFrame(requestId);
    }
}


export function promise_swap(current_index, prev_index, buffer_x1, buffer_x2) {
    return new Promise( (resolve) => {
        window.requestAnimationFrame(() => {swap(current_index, prev_index, buffer_x1, buffer_x2, () => {resolve()}) });    
    } )
}

export function sortingOver() {
    
    ctx.clearRect(0, 0, innerWidth, innerHeight );
    for(var j = 0; j < 12; j++) {
        rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "green"); 
    }
    graph();
        
}