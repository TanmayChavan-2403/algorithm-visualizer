function initiateDijkstras(fNode){
    let s, f;
    nodes.map((row, rowIdx) => {
        row.map((node, nodeIdx) => {
            if (node.isStart) {
                s = node;
            }
        });
    });
    nodes.map(row => {
        row.map(node => {
            if (node.thiefId == fNode.children[0].value){
                f = node;
                targetNode = node;
            }
        });
    });

    //Code to make every input nodes in thief selections to white
    const inputNodes = document.querySelectorAll('.thief-id');
    inputNodes.forEach(node => {
        node.style.background = 'var(--light)';
    });

    //Code to make Target element's Background to green in order to highlight it
    fNode.children[0].style.background = '#289672';

    const shortestPath = dijkstras(s, f);
    for (let i = 0; i <= shortestPath.length; i++) {
        if (i === shortestPath.length) {
            setTimeout(() => {
                result(getShortestPath())
            }, 50 * i);

        }
        else {
            setTimeout(() => {
                if (!shortestPath[i].isStart && !shortestPath[i].isFinish) {
                    const visitedNode = document.getElementById(`${shortestPath[i].nodeId}`);
                    visitedNode.style.background = '#1597bb';
                    visitedNode.style.border = '1px solid #8fd6e1';
                    visitedNode.style.animation = 'showup 1s';
                }
            }, 50 * i);
        }
    }
}

function result(path) {
    for (let i = 0; i < path.length; i++) {
        setTimeout(() => {
            var currNode = document.getElementById(`${path[i].nodeId}`);
            if (i === path.length - 2) {
                let pr = path[i].row;
                let pc = path[i].col;
                let tr = targetNode.row;
                let tc = targetNode.col;
                var img = document.createElement('img');
                img.src = 'Images/gun.png';
                currNode.appendChild(img);

                if (Math.sign(pr - tr) === 1) {
                    currNode.style.transform = 'rotate(270deg)';
                }
                else if (Math.sign(pr - tr) === -1) {
                    currNode.style.transform = 'rotate(90deg)';
                }
                else if (Math.sign(pc - tc) === 1) {
                    currNode.style.transform = 'rotateY(180deg)';
                }
            }
            if ( path[i].isFinish && !path[i].targetNode ){
                var node = document.getElementById(`${path[i].nodeId}`);
                var img = node.getElementsByTagName('img')[0];
                img.src = 'Images/handcuffs.png';
                // img.src = 'Images/caught.png';
            }
            if (!path[i].isStart && !path[i].isFinish) {
                // const currNode = document.getElementById(`${path[i].nodeId}`);
                currNode.style.background = '#e84545';
                currNode.style.animation = `showupWall .2s, bgAnimation 3s infinite .5s`;
            }
            if (path[i].isFinish && path[i].thiefId == targetNode.thiefId ){
                var node = document.getElementById(`${path[i].nodeId}`);
                node.style.background = 'white';
                var img = node.getElementsByTagName('img')[0];
                img.src = 'Images/boss.png';
            }
            if (path.length - 2 === i) {
                currNode.style.background = 'none';
            }
        }, 50 * i);
    }


}

// Dijkstras algoritm to find shortest route between source and destination
function dijkstras(s, f) {
    var startNode = s;
    var finishNode = f;
    var visitedNodes = []
    console.log('s-> ', startNode, 'f-> ', finishNode);
    startNode.distance = 0;

    var unvisitedNodes = getAllNodes(nodes);
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();

        if (closestNode.isWall) continue;

        if (closestNode.distance === Infinity) return visitedNodes;

        closestNode.isVisited = true;
        visitedNodes.push(closestNode);


        if (closestNode === finishNode) {
            console.log(targetNode)
            return visitedNodes
        }
        const data = updateNeighbours(closestNode, nodes);
    }
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateNeighbours(node, nodes) {
    const neighbours = getNeighbours(node, nodes);
    const updatedNeighbours = []
    for (neighbour of neighbours) {
        neighbour.distance = node.distance + 1;
        if (!neighbour.prevNode) {
            neighbour.prevNode = node;
        }
        if (neighbour.isStart) {
            neighbour.prevNode = null;
        }
    }
}

function getNeighbours(node, nodes) {
    let neighbours = [];
    let { row, col } = node;
    if (row - 1 >= 0) {           // Top
        neighbours.push(nodes[row - 1][col]);
    }
    if (row + 1 <= 11) {         // Bottom
        neighbours.push(nodes[row + 1][col]);
    }
    if (col + 1 <= 29) {           // Right
        neighbours.push(nodes[row][col + 1]);
    }
    if (col - 1 >= 0) {            // Left
        neighbours.push(nodes[row][col - 1]);
    }
    return neighbours
}

function getAllNodes() {
    const grid = []
    for (let row = 0; row <= 11; row++) {
        for (let col = 0; col <= 29; col++) {
            grid.push(nodes[row][col])
        }
    }
    return grid;
}

function getShortestPath() {
    const path = [];
    var currNode = targetNode;
    while (currNode !== null) {
        path.unshift(currNode)
        currNode = currNode.prevNode;
    }
    return path
}