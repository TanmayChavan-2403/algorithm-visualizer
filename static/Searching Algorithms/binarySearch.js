let binSearchArray = []

function binarySearch(arr) {

    arr.forEach(div => {
        div.getElementsByTagName('input')[0].style.background = 'var(--light)';
    });

    let data = bs(arr, 0, arr.length - 1, targetThief);

    animateBinarySearchAlgorithm(arr);
    setTimeout(() => {
        initiateDijkstras(data);
    }, 5000);

}

function bs(bArray, left, right, target) {
    while (left <= right) {
        let mid = Math.floor(left + (right - left) / 2);
        const divValue = parseInt(bArray[mid].children[0].value);

        binSearchArray.push([left, right, mid]);
        if (divValue == target) {
            return bArray[mid];
        }

        else if (target > divValue) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return 'Not found';
}

function animateBinarySearchAlgorithm(arr) {
    let prevNode1, prevNode2, prevNode3;
    for (let i = 0; i < binSearchArray.length; i++) {
        setTimeout(() => {

            if (prevNode1) {
                prevNode1.style.background = 'var(--light)';
                prevNode2.style.background = 'var(--light)';
                prevNode3.style.background = 'var(--light)';
            }

            if (binSearchArray[i][0] === binSearchArray[i][1] === binSearchArray[i][2]) {
                arr[binSearchArray[i][0]].getElementsByTagName('input')[0].style.background = '#a685e2';
            }
            else if (binSearchArray[i][0] === binSearchArray[i][2]) {
                arr[binSearchArray[i][0]].getElementsByTagName('input')[0].style.background = '#949cdf';
            }
            else if (binSearchArray[i][1] === binSearchArray[i][2]) {
                arr[binSearchArray[i][1]].getElementsByTagName('input')[0].style.background = '#949cdf';
            }
            arr[binSearchArray[i][2]].getElementsByTagName('input')[0].style.background = '#f48b29';
            arr[binSearchArray[i][0]].getElementsByTagName('input')[0].style.background = '#f0c929';
            arr[binSearchArray[i][1]].getElementsByTagName('input')[0].style.background = '#f0c929';

            prevNode1 = arr[binSearchArray[i][0]].getElementsByTagName('input')[0];
            prevNode2 = arr[binSearchArray[i][1]].getElementsByTagName('input')[0];
            prevNode3 = arr[binSearchArray[i][2]].getElementsByTagName('input')[0];

        }, 1000 * i);

    }
}