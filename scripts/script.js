// imports 
import { generateArray as bubGenerateArray, startAnimation as bubAnimate } from './bubble/canvas.js'
import {generateArray as insGenerateArray, startSorting as insAnimate} from './insertion/canvas.js'
import { generateArray as selGenerateArray, startSorting as selAnimate } from './selection/canvas.js'
import { generateArray as merGenerateArray, startSorting as merAnimate} from './merge/canvas.js'



// DOM elements

export var bubble_sort = document.getElementById('bub');
export var insertion_sort = document.getElementById('ins');
export var selection_sort = document.getElementById('sel');
export var merge_sort = document.getElementById('mer');

var play_btn = document.getElementById("play");

// toggle button to check if animation if running
export var isPlaying = false;

// check the session storage
if(sessionStorage.getItem("btnClicked") != null) {
    if(sessionStorage.getItem("btnClicked") === "bub") {
        window.onload = () => {
            bubble_sort.style.color = "black";
            insertion_sort.style.color = "white";
            selection_sort.style.color = "white";
            merge_sort.style.color = "white";
    
            bubGenerateArray();
            insertKey("bub");
        
            sessionStorage.removeItem("btnClicked");
        }
    } else if(sessionStorage.getItem("btnClicked") === "ins") {
        window.onload = () => {
            bubble_sort.style.color = "white";
            insertion_sort.style.color = "black";
            selection_sort.style.color = "white";
            merge_sort.style.color = "white";

            insGenerateArray();
            insertKey("ins");
        
            sessionStorage.removeItem("btnClicked");
        }
    }else if(sessionStorage.getItem("btnClicked") === "sel") {
        window.onload = () => {
            bubble_sort.style.color = "white";
            insertion_sort.style.color = "white";
            selection_sort.style.color = "black";
            merge_sort.style.color = "white";

            selGenerateArray();
            insertKey("sel");
            
            sessionStorage.removeItem("btnClicked");
        }
    }else if(sessionStorage.getItem("btnClicked") === "mer") {
        window.onload = () => {
            bubble_sort.style.color = "white";
            insertion_sort.style.color = "white";
            selection_sort.style.color = "white";
            merge_sort.style.color = "black";

            merGenerateArray();
            insertKey('mer');
        
            sessionStorage.removeItem("btnClicked");
            
        }
    }
}

// event listeners for all the btns

bubble_sort.addEventListener("click", () => {
    if(isPlaying === false) {
        bubble_sort.style.color = "black";
        insertion_sort.style.color = "white";
        selection_sort.style.color = "white";
        merge_sort.style.color = "white";

        bubGenerateArray();
        insertKey("bub");
        
    }else {
        sessionStorage.setItem("btnClicked", "bub");
        location.reload();
        
    }
});


insertion_sort.addEventListener("click", () => {
    if(isPlaying === false) {
        bubble_sort.style.color = "white";
        insertion_sort.style.color = "black";
        selection_sort.style.color = "white";
        merge_sort.style.color = "white";
        insGenerateArray();
        insertKey("ins");
    }else {
        sessionStorage.setItem("btnClicked", "ins");
        location.reload();
        
    }
});

selection_sort.addEventListener("click", () => {
    if(isPlaying === false) {
        bubble_sort.style.color = "white";
        insertion_sort.style.color = "white";
        selection_sort.style.color = "black";
        merge_sort.style.color = "white";
        selGenerateArray();
        insertKey("sel");
    }else {
        sessionStorage.setItem("btnClicked", "sel");
        location.reload();
        
    }
})

merge_sort.addEventListener("click", () => {
    if(isPlaying === false) {
        bubble_sort.style.color = "white";
        insertion_sort.style.color = "white";
        selection_sort.style.color = "white";
        merge_sort.style.color = "black";
        merGenerateArray();
        insertKey("mer");
    }else {
        sessionStorage.setItem("btnClicked", "mer");
        location.reload();
        
    }
})




play_btn.addEventListener("click", sort);

// delete the nodes inside the notes pane
// removes all child nodes
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


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
        isPlaying = true;
        bubAnimate();        
    }else if(btnArray[0] == 'ins') {
        isPlaying = true;
        insAnimate();
    }else if(btnArray[0] == 'sel') {
        isPlaying = true;
        selAnimate();
    }else if(btnArray[0] == 'mer') {
        isPlaying = true;
        merAnimate();
    }
}


