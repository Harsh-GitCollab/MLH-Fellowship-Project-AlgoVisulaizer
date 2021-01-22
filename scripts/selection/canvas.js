import Rectangle  from '../selection/rectangle.js'
import { promise_hightlight, promise_swap } from '../selection/animate.js';

var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
    var color = "red";
    var x = 50, y , height = 10, width = 50;
    var values = [10, 15, 20, 30, 25, 35, 50, 1,  45, 10];

    // genesis

    for(var i=0; i<10; i++) {
        
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
    var current_index = 0, mn_index;

    function find_min_idx(idx) {
        let min = idx;
        for(let j=idx+1; j < 10; j++) {
            if(rectArray[j].value < rectArray[min].value) {
                min = j;
            }
        }
        return min;
    }

    async function animate(rectIndex) {
        if(rectIndex < 10) {
            await promise_hightlight(rectIndex, "black");
            var mn_index = find_min_idx(rectIndex);

            if(mn_index != rectIndex) {
                await promise_hightlight(rectIndex, "red", mn_index);
                var buffer_x1 = rectArray[rectIndex].x;
                var buffer_x2 = rectArray[mn_index].x;
                await promise_swap(rectIndex, mn_index, buffer_x1, buffer_x2);
                [rectArray[rectIndex], rectArray[mn_index]] = [rectArray[mn_index], rectArray[rectIndex]];
                mn_index = rectIndex;
            }
            
            await promise_hightlight( mn_index, "green");
            
            await animate(rectIndex + 1);

        }
        
        
        
    }

    function promise_animate (index) {
        return new Promise( async (resolve) => {
            debugger;
            await animate(index);
            resolve();  // since asyncAwait function is a asynchronous so we cannot directly resolve() it
            debugger;
        })
    }

    promise_animate(current_index);
}
