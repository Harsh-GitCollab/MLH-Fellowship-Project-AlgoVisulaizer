import Rectangle  from '../bubble/rectangle.js'
import { promise_hightlight, promise_swap } from '../selection/animate.js';


var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export var ctx = canvas.getContext("2d");

export var rectArray = [];

export function generateArray() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(rectArray.length != 0) {
        rectArray.length = 0;
    }
    var color = "red";
    var x = 50, y , height = 10, width = 50;
    var values = [];
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
}


export function startSorting() {
    var current_index = 0, mn_index;

    function find_min_idx(idx) {
        let min = idx;
        for(let j=idx+1; j < 12; j++) {
            if(rectArray[j].value < rectArray[min].value) {
                min = j;
            }
        }
        return min;
    }

    async function animate(rectIndex) {
        if(rectIndex < 12) {
            await promise_hightlight(rectIndex, "yellow");
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
            await animate(index);
            resolve();  
        })
    }

    promise_animate(current_index);
}

