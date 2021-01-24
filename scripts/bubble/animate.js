import { ctx, rectArray, graph, lastIndex } from '../bubble/canvas.js'           

// promise highlight

export function promise_hightlight(i, c) {
    return new Promise( (resolve) => {
        setTimeout( () => {
            ctx.clearRect(0, 0, innerWidth, innerHeight);

            for( var j = 0; j < 12; j++) {
                rectArray[i].draw(rectArray[i].x, rectArray[i].y, rectArray[i].width, rectArray[i].height, c );
                rectArray[i + 1].draw(rectArray[i + 1].x, rectArray[i + 1].y, rectArray[i + 1].width, rectArray[i + 1].height, c );

                if(j > lastIndex) {
                    rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "green");
                }

                if(j != i && j != i+1 && j <= lastIndex) {
                    rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "rgb(152, 255, 204)");
                }
            }
            graph();
            resolve();
        }, 800 );
    } )
}


// Sorting over

export function sortingOver() {
    
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight );
    for(var j = 0; j < 12; j++) {
        rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "green"); 
    }
    graph();
        
} 

// swap function 

export function swap(idx, buffer_x1, buffer_x2, callBack) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    console.log("we are in the swap function");
    console.log("i is" + idx);
    console.log(rectArray[idx].x);
    console.log(rectArray[idx+1].x);

    
    rectArray[idx].update(buffer_x2, "forward");
    rectArray[idx+1].update(buffer_x1, "backward");
    
    
    for(var j=0; j< 12; j++) {
        if(j != idx && j != idx+1 && j <= lastIndex) {
            rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "rgb(153, 255, 204)");
        }
        if(j > lastIndex) {
            rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "green");
        }
    }
    graph();
    
    
    if(rectArray[idx].x < buffer_x2 && rectArray[idx+1].x > buffer_x1) {
    
      var requestId =   window.requestAnimationFrame(() => {swap(idx, buffer_x1, buffer_x2, callBack)});
        
    }else if(rectArray[idx].x >= buffer_x2 && rectArray[idx+1].x <= buffer_x1) {
        
        console.log(requestId);
        callBack();
        window.cancelAnimationFrame(requestId);
    }
}


// promise_swap
export function promise_swap(idx, buffer_x1, buffer_x2) {
    return new Promise( (resolve) => {
        window.requestAnimationFrame(() => {swap(idx, buffer_x1, buffer_x2, () => {resolve()}) });    
    } )
}