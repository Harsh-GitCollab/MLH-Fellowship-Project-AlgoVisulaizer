import Rectangle  from '../bubble/rectangle.js'
import {promise_hightlight, promise_swap, sortingOver} from '../bubble/animate.js'



// selectors 
var canvas = document.getElementById("myCanvas");
canvas.width = 1200;
canvas.height = 870;

// getting the magic brush
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
    for(var i=0; i<13; i++) {
        var randomNum = Math.floor((Math.random() * 50) + 1);
        values.push(randomNum);
    }

    // genesis

    for(var i=0; i<13; i++) {
        
        height = 10 * values[i];
        y = 550 - height;
        rectArray.push(new Rectangle(x, y, width, height, color, values[i] ));
        rectArray[i].draw(x,y, width, height, color);
        x = x + width + 50;
    }
    graph();
    console.log("-------------------------  the genesis is over ------------------------------------");

}



export var lastIndex = 9;

export function startAnimation() {
    var rectPointer = 0, asyncAwaitRepeatindex = 0,  isUnsorted = true;
    
    async function animate(rectIndex) {
        
        if(rectIndex < lastIndex-1) {
            
            await promise_hightlight(rectIndex, "black");
            
            if( rectArray[rectIndex].value > rectArray[rectIndex+1].value ) {
                isUnsorted = true;
                await promise_hightlight(rectIndex, "red");
                console.log("error");
                var buffer_x1 = rectArray[rectIndex].x;
                var buffer_x2 = rectArray[rectIndex+1].x;
                
                await promise_swap(rectIndex, buffer_x1, buffer_x2);
                
                [rectArray[rectIndex], rectArray[rectIndex+1]] = [rectArray[rectIndex+1], rectArray[rectIndex]]; 
            }                                                    
            await promise_hightlight(rectIndex, "green");               
            await animate(rectIndex+1);
        }
        else if(rectIndex == lastIndex-1) {
            
            await promise_hightlight(rectIndex, "black");
            
            if( rectArray[rectIndex].value > rectArray[rectIndex+1].value ) {
                await promise_hightlight(rectIndex, "red");
                
                isUnsorted = true;
                console.log("error");
                var buffer_x1 = rectArray[rectIndex].x;
                var buffer_x2 = rectArray[rectIndex+1].x;
                
                await promise_swap(rectIndex, buffer_x1, buffer_x2);
                
                [rectArray[rectIndex], rectArray[rectIndex+1]] = [rectArray[rectIndex+1], rectArray[rectIndex]]; // this I am doing because 
            }                                                   // after swapping rectArray[i+1] will go to rectArray[i]'s place and the 
            await promise_hightlight(rectIndex, "green"); 
            lastIndex -= 1;              // highlight function will higligh | | |
            rectPointer = 0;
            
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


    async function asyncAwaitRepeat(index) {
        if(index < 9) {

            await promise_animate(rectPointer);
            debugger;
            if(isUnsorted == true) {
                isUnsorted = false;
                await asyncAwaitRepeat(index + 1);
        
            }else {
                await sortingOver();
                await sortingOver();
            }
            
            
            

        }
    }

    asyncAwaitRepeat(asyncAwaitRepeatindex);
}



