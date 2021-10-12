var sortingAlgorithm;
var selectedAlgorithm;
var targetNode;
var targetThief;
var isStart = false;
var isFinish = false;
var thiefCounter = 0;
var isMousePressed = false;
var nodes = []
var thiefIds = []

window.onload = function () {
    createField();
}

function createField() {

    let field = document.getElementById('field');
    let id = 1;
    for (let row = 0; row <= 11; row++) {
        let rowNodes = []
        for (let col = 0; col <= 29; col++) {
            const currentNode = {
                row,
                col,
                isStart,
                isFinish,
                isWall: false,
                distance: Infinity,
                isVisited: false,
                nodeId: id,
                prevNode: null,
                thiefId: null,
            };
            rowNodes.push(currentNode)
            id++
        }
        nodes.push(rowNodes)
    }

    nodes.map((r, rowIdx) => {
        r.map((node, nodeIdx) => {

            const { row, col } = node;
            const extraClassName = isFinish ? 'isFinish' : isStart ? 'isStart' : '';
            field.innerHTML += ` <div class='node ${extraClassName}' id='${node.nodeId}'
            onclick='deployPoliceAndThief(${row}, ${col})'
            onmousedown ='mouseDown( ${row}, ${col} )'
            onmouseenter = 'createWall( ${row}, ${col} )'
            onmouseup = 'mouseUp( ${row}, ${col} )'
             ></div> `;
        });
    });
}

function mouseUp(r, c) { isMousePressed = false; }
function mouseDown(r, c) { isMousePressed = true; }
function createWall(r, c) {
    if (!isMousePressed) return;
    if (!nodes[r][c].isStart && !nodes[r][c].isFinish && !nodes[r][c].isWall) {
        let startNode = document.getElementById(`${nodes[r][c].nodeId}`);
        const img = document.createElement('img');
        img.src = 'Images/wall.png';
        startNode.appendChild(img);
        // startNode.style.background = '#150e56';
        startNode.style.animation = 'popup .5s'
        nodes[r][c].isWall = true;
    }

}

function catchThief() {
    if (selectedAlgorithm === 'LinearSerach') {
        linearSearch(thiefIds);
    }

    else if (sortingAlgorithm === 'QuickSort') {
        quickSort(thiefIds);
    }
    else if (sortingAlgorithm === 'BubbleSort') {
        bubbleSort(thiefIds);
    }
    else if (sortingAlgorithm === 'SelectionSort') {
        selectionSort(thiefIds);
    }
    
}

function checkForThiefDeploys() {
    thiefIds = [];
    const values = document.querySelectorAll('.thief-id');
    var counter = 0
    values.forEach((div) => {
        if ( div.value === ''){
            counter++;
        }
        else{
            thiefIds.push(div.value);
        }
    })
    if (counter !== 0){
        alert(`Please fill ${counter} more field`);
        return;
    }
    console.log(thiefIds);
    console.log('Now its ready to move ahead :) ');
    selectTarget();
}


function deployPoliceAndThief(r, c) {

    if (!isStart) {
        isStart = true;
        let img = document.createElement('img');
        img.src = 'Images/police.png';
        const startNode = document.getElementById(`${nodes[r][c].nodeId}`);
        // startNode.style.background = '#289672';
        startNode.appendChild(img);
        nodes[r][c].isStart = true;
    }

    else if (thiefCounter < thiefIds.length && !nodes[r][c].isStart && !nodes[r][c].isWall) {
        let img = document.createElement('img');
        img.src = 'Images/thief.png';
        const finishNode = document.getElementById(`${nodes[r][c].nodeId}`);
        finishNode.appendChild(img);
        // finishNode.style.background = '#810000';
        nodes[r][c].isFinish = true;
        nodes[r][c].thiefId = thiefIds[thiefCounter];
        thiefCounter += 1;
    }
}


function validateNumber() {
    const inputVal = document.getElementById('thiefPopulation');
    if ( isNaN(inputVal.value) ){
        alert('Please enter only Numeric values');
        inputVal.value = '';
    }
    else if(inputVal.value < 0 || inputVal.value > 7 || inputVal.value === '') {
        alert('Please select number in range of 0 - 7 ');
        inputVal.value = '';
    }
    else {
        const thiefContianer = document.querySelector('.thief');
        thiefContianer.style.transform = 'translateY(-100%)';
        const thiefSelectionContainer = document.querySelector('.thieves-number');
        for (let i = 0; i < inputVal.value; i++) {
            let div = document.createElement('div');
            div.classList.add('thieve-input');
            div.id = `t${i}`
            div.style.left = `${i * 150}px`;
            div.innerHTML = `<input type="text" class="thief-id">`;
            thiefSelectionContainer.appendChild(div);
            // console.log(thiefSelectionContainer);
        }

    }
}

function chooseAlgo(algorithm, container) {
    if (algorithm === 'LinearSerach') {
        selectedAlgorithm = 'LinearSerach';
    }

    else if (algorithm === 'QuickSort' || algorithm === 'BubbleSort' || algorithm === 'SelectionSort') {
        sortingAlgorithm = algorithm;
    }

    else {
        const sortingAlgoContainer = document.querySelector('.sorting-algorithms');
        sortingAlgoContainer.style.visibility = 'visible';
        selectedAlgorithm = algorithm;
    }
    
    const algoContainer = document.querySelector(`.${container}`);
    algoContainer.style.transform = 'translateY(100%)';
}

function selectTarget() {
    const container = document.querySelector('.thief-target-selection-container');
    container.style.opacity = '1';
    container.style.pointerEvents = 'all';
}

function submitTarget() {
    const targetValue = document.querySelector('.sub-container-input');
    console.log(targetValue);
    if (isNaN(targetValue.children[1].value)){
        alert('Please enter only Numberic values');
        targetValue.children[1].value = '';
        return;
    }
    else if (targetValue.children[1].value === '') {
        document.querySelector('.sub-continer-warning').style.opacity = '1';
        return;
    }

    targetThief = parseInt(targetValue.children[1].value);
    const container = document.querySelector('.thief-target-selection-container');
    container.style.opacity = '0';
    container.style.pointerEvents = 'none';

}