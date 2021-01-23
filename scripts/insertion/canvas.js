import Rectangle  from '../insertion/rectangle.js'
import {promise_hightlight, promise_swap, sortingOver} from '../insertion/animate.js'



var canvas = document.getElementById("myCanvas");
canvas.width = 1200;
canvas.height = 870;

export var ctx = canvas.getContext("2d");

export function graph() {
    for(var i=0; i <= 18; i++) {
        ctx.beginPath();
        ctx.moveTo(50 * i, 0);
        ctx.lineTo(50 * i, 550);
        ctx.stroke();
    }

    for(var i=0; i <= 11; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 50 * i);
        ctx.lineTo(880, 50 * i );
        ctx.stroke();
    }
    
}

export var rectArray = [];

export function generateArray() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var color = "red";
    var x = 50, y , height = 10, width = 50;
    var values = [];
    for(var i=0; i<12; i++) {
        var randomNum = Math.floor((Math.random() * 50) + 1);
        values.push(randomNum);
    }


    // genesis

    for(var i=0; i<12; i++) {
        
        height = 10 * values[i];
        y = 550 - height;
        rectArray.push(new Rectangle(x, y, width, height, color, values[i] ));
        rectArray[i].draw(x,y, width, height, color);
        x = x + width + 50;
    }
    graph();
    console.log("-------------------------  the genesis is over ------------------------------------");
}



export function startSorting() {

    var current_index = 0, prev_index = null;

    function insert(rectIndex, prev_index, buffer_x1, buffer_x2) {
        return new Promise(async (resolve) => {
            await promise_hightlight(rectIndex, "red", prev_index);
            await promise_swap(rectIndex, prev_index, buffer_x1, buffer_x2);

            if(rectIndex != 0) {
                [rectArray[rectIndex], rectArray[prev_index]] = [rectArray[prev_index], rectArray[rectIndex]];
                rectIndex -= 1;
                prev_index -=1;
            }
            
            if(rectIndex != 0 && rectArray[rectIndex].value < rectArray[prev_index].value) {
                buffer_x1 = rectArray[prev_index].x;
                buffer_x2 = rectArray[rectIndex].x;
                await insert(rectIndex, prev_index, buffer_x1, buffer_x2);
                resolve();
            } else {
                debugger;
                resolve();
            }
        } )
    }


    async function animate(rectIndex) {

        if(rectIndex <= 11) {
            if(rectIndex == 0) {
                await promise_hightlight(rectIndex, "yellow");        
                await promise_hightlight( rectIndex, "green");
                
                await animate(rectIndex + 1);
                
        
            }
            else {
                await promise_hightlight(rectIndex, "yellow");
                
                if(rectArray[rectIndex].value < rectArray[rectIndex-1].value) {
                    await promise_hightlight(rectIndex, "red");
                    
                    await promise_hightlight(rectIndex, "red", rectIndex-1);

                    var buffer_x1 = rectArray[rectIndex-1].x;
                    var buffer_x2 = rectArray[rectIndex].x;

                    await insert(rectIndex, rectIndex-1, buffer_x1, buffer_x2);
                    await animate(rectIndex + 1);  
                                
                    
                }else {
                    await promise_hightlight(rectIndex, "green");
                    await animate(rectIndex + 1);
                }

                if(rectIndex == 11) {
                    sortingOver();
                } 
                
            }
        }
        
        
    }

    animate(current_index);
}

