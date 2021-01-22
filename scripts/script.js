// imports 
import { generateArray as bubGenerateArray, startAnimation as bubAnimate } from './bubble/canvas.js'
import {generateArray as insGenerateArray, startSorting as insAnimate} from './insertion/canvas.js'



// DOM elements

var bubble_sort = document.getElementById('bub');
var insertion_sort = document.getElementById('ins');
var selection_sort = document.getElementById('sel');
var merge_sort = document.getElementById('mer');

var play_btn = document.getElementById("play");

bubble_sort.addEventListener("click", () => {
    bubGenerateArray();
    insertKey("bub");
});


insertion_sort.addEventListener("click", () => {
    insGenerateArray();
    insertKey("ins");
});


play_btn.addEventListener("click", sort);

// the array to store the clicked btn 
var btnArray = [];

function insertKey(id) {
    if(id === 'bub') {
        btnArray.length = 0;
        btnArray.push("bub");
        
    }
    else if(id === 'ins') {
        btnArray.length = 0;
        btnArray.push('ins');
    }
} 

function sort() {
    if(btnArray[0] == 'bub') {
        bubAnimate();
    }else if(btnArray[0] == 'ins') {
        insAnimate();
    }
}



