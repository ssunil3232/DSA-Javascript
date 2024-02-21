let arr = [64, 25, 12, 22, 11];
// Selection Sort ==> select the min and move it.
/*
    - Selects the smallest element from the unsorted portion of the array and swaps it with the first element of the unsorted part.
        -> Find the smallest, place it at the first part of next smallest.
    - Its O(N^2) complexity
	    -> Hence not recommended
    - Swap is performed in-place } i.e. no extra allocations required
*/

function selectionSort(arr) {
    let len = arr.length;
    let min_idx = 0;

    // One by one move boundary of unsorted subarray - hence (len-1)
    for (let i = 0; i < len - 1; i++) {
        // Find the minimum element in unsorted array 
        min_idx = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        let temp = arr[min_idx] // Swap the found minimum element with the first element 
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

console.log("selection", selectionSort(arr));

// Bubble Sort ==> right left swap as we go through
/*
	- Compare each array item to the item on its right
	    -> If right < left then swap
	- Its O(N^2) complexity
	    -> Hence not recommended
    - Swap is performed in-place } i.e. no extra allocations required
*/

function bubbleSort(arr) {
    let len = arr.length;
    let isSwapped = false;

    for (let i = 0; i < len; i++) {
        isSwapped = false;
        for (let j = 0; j < (len - i - 1); j++) { // (len -i -1) for each length of swap checks to decrease
            if (arr[j] > arr[j + 1]) { // if right < left
                let temp = arr[j]
                arr[j] = arr[j + 1]; // swap
                arr[j + 1] = temp;
                isSwapped = true;
            }
        }
        // IF no two elements were swapped
        // by inner loop, then break 
        if (!isSwapped) {
            break;
        }
    }
    return arr;
}

console.log("bubble", bubbleSort(arr));

// Insertion Sort ==> as we go through, insert item to correct position in sorted set.
/* 
    - Sort each item in the array, as they are encountered.
        -> Everything left is known to be sorted and on the right is unsorted
        -> current item is inserted into a place within the sorted section
    - Its O(N^2) complexity
	    -> Hence not recommended
    - Swap is performed in-place } i.e. no extra allocations required
*/

function insertionSort(arr) {
    let len = arr.length;
    for (let i = 1; i < len; i++) {
        let key = arr[i];
        let j = i - 1;

        /* Move elements of arr[0..i-1], that are  
        greater than key, to one position ahead  
        of their current position */
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr;
}
console.log("insertion", insertionSort(arr));

// Merge Sort ==> Divide and Conquor
/*
    - Merge sort is a recursive algorithm that continuously splits the array in half until it cannot be further divided
    - Its O(N lg N) complexity
	    -> Hence the SHORTEST
    - Swap is NOT performed in-place } i.e. extra allocations required
*/

function merge(arr, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;

    // Create temp arrays
    let L = new Array(n1);
    let R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (let i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (let j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    // Merge the temp arrays back into arr[l..r]
    // Initial index of first subarray
    let i = 0;
    // Initial index of second subarray
    let j = 0;
    // Initial index of merged subarray
    let k = l;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

function mergeSort(arr, l, r) {
    if (l >= r) {
        return;
    }
    let m = l + parseInt((r - l) / 2);
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);

    return arr;
}

console.log("merge", mergeSort(arr, 0, arr.length - 1));

// Quick Sort ==> another Divde and Conquer BUT picks an element as the pivot and partions at that
/*
    - Merge sort but at a pivot
    - Its O(N lg N) complexity
	    -> Hence the SHORTEST
    - Swap is NOT performed in-place } i.e. extra allocations required
*/

function partition(arr, low, high) {
    // Choosing the pivot
    let pivot = arr[high];

    // Index of smaller element and indicates the right position of pivot found so far
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        // If current element is smaller than the pivot
        if (arr[j] < pivot) {
            // Increment index of smaller element
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot to its correct position
    return i + 1; // Return the partition index
}

// The main function that implements QuickSort
function quickSort(arr, low, high) {
    if (low < high) {
        // pi is the partitioning index, arr[pi] is now at the right place
        let pi = partition(arr, low, high);

        // Separately sort elements before partition and after partition
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

console.log("quick", quickSort(arr, 0, arr.length - 1));

// Heap Sort ===> THE BEST - uses the Binary Heap Data structure
/*
    - Comparison based sorting using Binary Heap
        -> First convert array into a Binary Tree
        -> Then construct a Heap
    - Complexity is O(N lg N)
    - in-place
*/
function heapSort(arr) {
    let len = arr.length;

    // Build heap (rearrange array)
    for (let i = Math.floor(len / 2) - 1; i >= 0; i--)
        heapify(arr, len, i);

    // One by one extract an element from heap
    for (let i = len - 1; i > 0; i--) {
        // Move current root to end
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        // call max heapify on the reduced heap
        heapify(arr, i, 0);
    }
    return arr;
}

// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
function heapify(arr, N, i) {
    let largest = i; // Initialize largest as root
    let l = 2 * i + 1; // left = 2*i + 1
    let r = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (l < N && arr[l] > arr[largest])
        largest = l;

    // If right child is larger than largest so far
    if (r < N && arr[r] > arr[largest])
        largest = r;

    // If largest is not root
    if (largest != i) {
        let swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;

        // Recursively heapify the affected sub-tree
        heapify(arr, N, largest);
    }
}

console.log("heap", heapSort(arr));