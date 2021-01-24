import { promise_hightlight } from '../merge/animate.js';
import Rectangle  from '../merge/rectangle.js'




// selectors 
var canvas = document.getElementById("myCanvas");
canvas.width = 1200;
canvas.height = 870;

// getting the magic brush
export var ctx = canvas.getContext("2d");

export var rectArray = [];

export function generateArray() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(rectArray.length != 0) {
        rectArray.length = 0;
    }
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

}



export function startSorting() {
    async function mergeAnimate(arr, k, aux1, i, aux2, j) {
        return new Promise(async (resolve) => {
            if(i < aux1.length && j < aux2.length) {
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
                arr[k] = aux1[i];
                await replace(k, arr[k]);            
                await mergeAnimate(arr, k+1, aux1, i+1, aux2, j);
            }else if(j < aux2.length){                        
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
            i=0, j=0, k=l;

            await  mergeAnimate(arr, k, aux1, i, aux2, j);
            
            resolve();        
        })
    }


    function verticalMove(arr, low, high) {
        return new Promise((resolve) => {
            setTimeout(() => {

                for(var j=low; j<= high; j++) {
                    ctx.clearRect(arr[j].x, arr[j].y-15, arr[j].width, arr[j].height+15);
                    arr[j].draw(arr[j].x, (800 - arr[j].height), arr[j].width, arr[j].height, "yellow");
                }
                
                resolve();
                
            }, 900 );
            
        });
    }

    function replace(k, rect) {
    
        return new Promise((resolve) => {
            setTimeout(() => {
                ctx.clearRect(rect.x, rect.y-15, rect.width, rect.height+15);
                
                var x = (100 * k + 50); 

                rect.draw(x, 400-rect.height, rect.width, rect.height, "green");
                resolve();
            }, 1000)
            
        })
    }

    async function mergeSort(arr, low, high) {
        await promise_hightlight(low, "yellow", high); 
        if(low == high) {
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

