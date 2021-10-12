let jumpSearchArray = []

function jumpSearch(arr) {
    const data = js(arr);

    animateJumpSearchArray(arr);
    
    setTimeout(() => {
        initiateDijkstras(data);
    }, 5500);

}

function js(arr) {
    let len = arr.length;
    let block = Math.ceil(Math.sqrt(len));
    let i = 0;

    while (block < len) {
        jumpSearchArray.push(i);
        let thiefValue = parseInt(arr[i].children[0].value);
        if (thiefValue === targetThief) {
            return arr[i];
        }

        else if (targetThief > thiefValue) {
            i = (i + block) - 1;
        }
        else if (targetThief < thiefValue) {
            block = block - 2;
            i = i - block;
            break;
        }
    }

    while (block > 0){
        jumpSearchArray.push(i);
        let thiefValue = parseInt(arr[i].children[0].value);
        if (thiefValue == targetThief) {
            return arr[i];
        }
        else {
            i++;
            block--; 
        }
    }
    console.log('Sad news for ya :(, their is no such value in array');
}



function animateJumpSearchArray(arr) {
    let prevNode;

    arr.forEach(element => {
        element.children[0].style.background = 'var(--light)';
    });

    for (let i = 0; i < jumpSearchArray.length; i++) {
        setTimeout(() => {
            if (prevNode) {
                prevNode.children[0].style.background = 'var(--light)';
            }

            arr[jumpSearchArray[i]].children[0].style.background = '#f48b29';
            prevNode = arr[jumpSearchArray[i]];
        }, 1000 * i);

    }
}