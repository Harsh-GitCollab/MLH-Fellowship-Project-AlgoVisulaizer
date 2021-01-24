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
var notesPane = document.getElementsByClassName('notes')[0];

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
            addNotes();
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
            addNotes();
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
            addNotes();
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
            addNotes();
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
        addNotes();
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
        addNotes('bub');
        
    }
    else if(id === 'ins') {
        btnArray.length = 0;
        btnArray.push('ins');
        addNotes('ins');

    }else if(id === "sel") {
        btnArray.length = 0;
        btnArray.push('sel');
        addNotes('sel');

    }else if(id === "mer") {
        btnArray.length = 0;
        btnArray.push('mer');
        addNotes('mer');
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


// function to add notes to the notes pane

function addNotes(id) {
    if(id === 'bub') {
        
        removeAllChildNodes(notesPane);
        var node1 = document.createElement('h1');
        node1.style.cssText = "text-align: center; color: black;  margin-bottom: 100px; margin-top: 20px;";

        var node1Text = document.createTextNode('Bubble Sort Algorithm');
        node1.appendChild(node1Text);

        notesPane.appendChild(node1);

        var pseudoCode = document.createElement('p');
        pseudoCode.style.cssText = "background: rgb(118, 218, 243); white-space: pre; font-size: 20px";
        var pseudoCodeText = document.createTextNode(" do\n\tswapped = false\n\n\tfor i=1 to indexOfLastSotedElement-1\n\n\t\tif leftElement > rightElement\n\t\t\tswap(leftElement, rightElement)\n\t\t\tswapped = true\n\nwhile swapped");
        pseudoCode.appendChild(pseudoCodeText);
        notesPane.appendChild(pseudoCode);
        
    }else if(id === 'ins') {
        removeAllChildNodes(notesPane);
        var node1 = document.createElement('h1');
        node1.style.cssText = "text-align: center; color: black;  margin-bottom: 100px; margin-top: 20px;";

        var node1Text = document.createTextNode('Insertion Sort Algorithm');
        node1.appendChild(node1Text);

        notesPane.appendChild(node1);

        var pseudoCode = document.createElement('p');
        pseudoCode.style.cssText = "background: rgb(118, 218, 243); white-space: pre; font-size: 20px";
        var pseudoCodeText = document.createTextNode("mark first element as sorted\n\nfor each unsorted element x\n\textract the element x\n\n\tfor j = last index down to 0\n\t\tif current element j > x\n\t\t\tmove sorted element to the right by 1\n\n\t\tbreak loop and insert x here");
        pseudoCode.appendChild(pseudoCodeText);
        notesPane.appendChild(pseudoCode);
    }else if(id === 'sel') {
        removeAllChildNodes(notesPane);
        var node1 = document.createElement('h1');
        node1.style.cssText = "text-align: center; color: black;  margin-bottom: 100px; margin-top: 20px;";

        var node1Text = document.createTextNode('Selection Sort Algorithm');
        node1.appendChild(node1Text);

        notesPane.appendChild(node1);

        var pseudoCode = document.createElement('p');
        pseudoCode.style.cssText = "background: rgb(118, 218, 243); white-space: pre; font-size: 20px";
        var pseudoCodeText = document.createTextNode("repeat num of elements - 1 times\n\n\tset the first element as the minimum\n\n\tfor each of the unsorted elements\n\n\t\t\tif element < currentMinimum \n\t\t\tset element as new minimum\n\n\tswap minimum with first unsorted partition");
        pseudoCode.appendChild(pseudoCodeText);
        notesPane.appendChild(pseudoCode);
    }else if(id === 'mer') {
        removeAllChildNodes(notesPane);
        var node1 = document.createElement('h1');
        node1.style.cssText = "text-align: center; color: black;  margin-bottom: 100px; margin-top: 20px;";

        var node1Text = document.createTextNode('Merge Sort Algorithm');
        node1.appendChild(node1Text);

        notesPane.appendChild(node1);

        var pseudoCode = document.createElement('p');
        pseudoCode.style.cssText = "background: rgb(118, 218, 243); white-space: pre; font-size: 20px";
        var pseudoCodeText = document.createTextNode("split each element into partion of size 1\n\nrecursively merge adjacent partitions\n\tfor i = leftPartIndex to rightPartIndex\n\n\t\tif leftPartHeadValue <= rightPartHeadValue\n\t\t\tcopy left partPartHeadValue\n\n\t\telse: copy rightPartHeadValue\n\ncopy elements back to original array");
        pseudoCode.appendChild(pseudoCodeText);
        notesPane.appendChild(pseudoCode);
    }
}



