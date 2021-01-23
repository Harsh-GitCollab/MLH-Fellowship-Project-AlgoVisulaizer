import { promise_hightlight } from '../merge/animate.js';
import Rectangle  from '../merge/rectangle.js'



// selectors 
var canvas = document.getElementById("myCanvas");
canvas.width = 1200;
canvas.height = 870;

// getting the magic brush
export var ctx = canvas.getContext("2d");

export function graph() {
    for(var i=0; i <= 25; i++) {
        ctx.beginPath();
        ctx.moveTo(50 * i, 0);   // vertical
        ctx.lineTo(50 * i, 900);
        ctx.stroke();
    }

    for(var i=0; i <=  2; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 300 * i);  // horizontal 
        ctx.lineTo(1200, 300 * i );
        ctx.stroke();
    }
}


export var rectArray = [];

export function generateArray() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var color = "red";
    var x = 50, y , height = 5, width = 50;
    var values = [];
    for(var i=0; i<12; i++) {
        var randomNum = Math.floor((Math.random() * 50) + 1);
        values.push(randomNum);
    }
    // genesis

    for(var i=0; i<12; i++) {
        
        height = 5 * values[i];
        y = 400 - height;
        rectArray.push(new Rectangle(x, y, width, height, color, values[i] ));
        rectArray[i].draw(x,y, width, height, color);
        x = x + width + 50;
    }
    graph();
    console.log("-------------------------  the genesis is over ------------------------------------");

}



export function startSorting() {
    async function mergeAnimate(arr, k, aux1, i, aux2, j) {
        return new Promise(async (resolve) => {
            if(i < aux1.length && j < aux2.length) {
                console.log("since " + (i) + " and " + (j) + " is less than  " + (aux1.length) + " , " + (aux2.length));
                if(aux1[i].value < aux2[j].value) {
                        
                    arr[k]  = aux1[i];
                    await replace(k,  arr[k]);
                    await mergeAnimate(arr, k+1, aux1, i+1, aux2, j);

                }else {
                    
                    arr[k] = aux2[j];
                    await replace(k, arr[k]);
                    await mergeAnimate(arr, k+1, aux1, i, aux2, j+1);
                }
                

            }else if(i < aux1.length) {
                console.log("aux1 is something left");
                        
                arr[k] = aux1[i];
                await replace(k, arr[k]);            
                await mergeAnimate(arr, k+1, aux1, i+1, aux2, j);
            }else if(j < aux2.length){
                console.log("aux2 is something left");
                        
                arr[k] = aux2[j];
                await replace(k, arr[k]);            
                await mergeAnimate(arr, k+1, aux1, i, aux2, j+1)
            }

            resolve();
        })
    }



    async function merge(arr, l, m, h) {
        return new Promise(async (resolve) => {
            var i, j, k;
            var n1 = m -l + 1;
            var n2 = h - (m + 1) + 1;

            const  aux1 = [], aux2 = [];

            await verticalMove(arr, l , h);

            for(var i=0; i<n1; i++) {
                aux1.push(new Rectangle(arr[l + i].x, arr[l + i].y, arr[l + i].width, arr[l + i].height, arr[l + i].color, arr[l + i].value ));
            
            } 

            for(var i=0; i<n2; i++) {
                aux2.push(new Rectangle(arr[m+1+i].x, arr[m+1+i].y, arr[m+1+i].width, arr[m+1+i].height, arr[m+1+i].color, arr[m+1+i].value  ));
            }
        
            console.log(aux1);
            console.log(aux2);

        

            i=0, j=0, k=l;

            await  mergeAnimate(arr, k, aux1, i, aux2, j);
            
            resolve();

                


        
        })
    }


    function verticalMove(arr, low, high) {
        return new Promise((resolve) => {
            setTimeout(() => {

                for(var j=low; j<= high; j++) {
                    ctx.clearRect(arr[j].x, arr[j].y, arr[j].width, arr[j].height);
                    console.log("Look here!!!!!!!");
                    console.log(arr[j])
                    debugger;
                    arr[j].draw(arr[j].x, (800 - arr[j].height), arr[j].width, arr[j].height, "yellow");
                }
                
                resolve();
                
            }, 900 );
            
        });
    }

    function replace(k, rect) {
        console.log(rect);
        return new Promise((resolve) => {
            setTimeout(() => {
                ctx.clearRect(rect.x, rect.y, rect.width, rect.height);
                
                var x = (100 * k + 50); 

                rect.draw(x, 400-rect.height, rect.width, rect.height, "green");
                resolve();
            }, 1000)
            
        })
    }

    async function mergeSort(arr, low, high) {
        await promise_hightlight(low, "yellow", high); 
        if(low == high) {
            
            debugger;

            return;
        }else {
            
            var mid = Math.floor(low + ((high-low)/2));
            await mergeSort(arr, low, mid);
            await mergeSort(arr, mid+1, high);
            await merge(rectArray, low, mid, high);
        }
    }

    mergeSort(rectArray, 0, 11);

}

