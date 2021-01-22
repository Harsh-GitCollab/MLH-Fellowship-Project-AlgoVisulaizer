// imports 
import { generateArray as bubGenerateArray, startAnimation as bubAnimate } from './bubble/canvas.js'
import {generateArray as insGenerateArray, startSorting as insAnimate} from './insertion/canvas.js'
import { generateArray as selGenerateArray, startSorting as selAnimate } from './selection/canvas.js'
import { generateArray as merGenerateArray, startSorting as merAnimate} from './merge/canvas.js'



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

selection_sort.addEventListener("click", () => {
    selGenerateArray();
    insertKey("sel");
})

merge_sort.addEventListener("click", () => {
    merGenerateArray();
    insertKey("mer");
})


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

    }else if(id === "sel") {
        btnArray.length = 0;
        btnArray.push('sel');

    }else if(id === "mer") {
        btnArray.length = 0;
        btnArray.push('mer');
    }
} 

function sort() {
    if(btnArray[0] == 'bub') {
        bubAnimate();
    }else if(btnArray[0] == 'ins') {
        insAnimate();
    }else if(btnArray[0] == 'sel') {
        selAnimate();
    }else if(btnArray[0] == 'mer') {
        merAnimate();
    }
}



