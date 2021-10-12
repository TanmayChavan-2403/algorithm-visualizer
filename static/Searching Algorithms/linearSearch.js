let linSearchArray = []

function linearSearch(arr) {

    if (thiefCounter < thiefIds.length) {
        alert(`Please deploy ${thiefIds.length - thiefCounter} more thieves`);
        return;
    }

    let thiefs = []
    for (let i = 0; i < thiefIds.length; i++) {
        thiefs.push(document.getElementById(`t${i}`));
    }

    const thiefFound = startLinearSearch(thiefs);
    let prevNode;
    for (let i = 0; i < linSearchArray.length; i++) {
        setTimeout(() => {
            if (prevNode) {
                prevNode.children[0].style.background = 'var(--light)';
            }
            linSearchArray[i].children[0].style.background = '#f05945';
            prevNode = linSearchArray[i];

        }, 700 * i);
    }

    setTimeout(() => {
        initiateDijkstras(thiefFound);
    }, 4000);
}

function startLinearSearch(thiefs) {
    for (thief of thiefs) {
        linSearchArray.push(thief);
        if (thief.children[0].value == targetThief) {
            return thief;
        }
    }
}

