let sortedArray = [];
let pivotArray = [];

function quickSort() {
    if (thiefCounter < thiefIds.length) {
        alert(`Please deploy ${thiefIds.length - thiefCounter} more thieves`);
        return;
    }

    let thiefs = new Array();
    for (let i = 0; i < thiefIds.length; i++) {
        thiefs.push(document.getElementById(`t${i}`))
    }

    qs(thiefs, 0, thiefIds.length - 1);
    animatedSortedArray(sortedArray);
    
    // setTimeout(() => {
    //     binarySearch(thiefs);
    // }, 2000);

    switch (selectedAlgorithm) {
        case 'JumpSearch':
            setTimeout(() => {
                jumpSearch(thiefs);
            }, thiefIds.length * 2 * 1000);
            break;

        case 'BinarySearch':
            setTimeout(() => {
                binarySearch(thiefs);
            }, thiefIds.length * 2 * 1000);
            break;
        default:
            setTimeout(() => {
                binarySearch(thiefs);
            }, thiefIds.length * 2 * 1000);
    }


}

function qs(thiefs, l, r) {
    if (l >= r) {
        return;
    }
    let p = partition(thiefs, l, r);
    // console.log('a->',p, l, p-r);
    qs(thiefs, l, p - 1);
    // console.log('b->',p, l, p+1);
    qs(thiefs, p + 1, r);
}

function partition(thiefs, l, r) {
    let pivot = thiefs[r];
    let i = l;
    for (let j = l; j < r; j++) {
        // console.log('Going for ', thiefs[j].children[0].value, ' ', pivot.children[0].value);
        if (parseInt(thiefs[j].children[0].value) < parseInt(pivot.children[0].value)) {
            // temp = thiefs[j].offsetLeft;
            // thiefs[j].style.left = thiefs[i].offsetLeft;
            // thiefs[i].style.left = temp;
            sortedArray.push([thiefs[j], thiefs[i], pivot]);
            [thiefs[i], thiefs[j]] = [thiefs[j], thiefs[i]];
            i++;
        }
    }
    sortedArray.push([thiefs[i], thiefs[r]]);
    [thiefs[i], thiefs[r]] = [thiefs[r], thiefs[i]];
    return i;
}

function animatedSortedArray(sortedArray) {
    var prevNode1, prevNode2, pivotNode;
    for (let i = 0; i < sortedArray.length; i++) {
        setTimeout(() => {

            if (prevNode1) {
                prevNode1.getElementsByTagName('input')[0].style.background = 'var(--light)';
                prevNode2.getElementsByTagName('input')[0].style.background = 'var(--light)';
            }
            // if (pivotNode && pivotNode !== sortedArray[i][2]){
            //     pivotNode.getElementsByTagName('input')[0].style.background = 'white';
            // }

            sortedArray[i][0].getElementsByTagName('input')[0].style.background = '#fed049';
            sortedArray[i][1].getElementsByTagName('input')[0].style.background = '#fed049';
            // sortedArray[i][2].getElementsByTagName('input')[0].style.background = '#be0000';

            let temp = sortedArray[i][0].offsetLeft;
            sortedArray[i][0].style.left = `${sortedArray[i][1].offsetLeft}px`;
            sortedArray[i][1].style.left = `${temp}px`;

            prevNode1 = sortedArray[i][0];
            prevNode2 = sortedArray[i][1];
            // pivotNode = sortedArray[i][2];
        }, 1000 * i);

    }
}