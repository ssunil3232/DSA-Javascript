let item = 10;
let arr = [2, 3, 4, 5, 10]
// Linear/Sequential Search 
/*
    - Searches from start to end
    - Complexity is O(N)
        -> Hence it is BRUTE FORCE
*/

function linearSearch(arr, x) {
    let len = arr.length;
    for (let i = 0; i < len; i++)
        if (arr[i] == x)
            return i;
    return -1;
}

console.log("linear", linearSearch(arr, item) === -1 ? false : true);

// Binary Search 
/*
    - Sorted the array then repeatedly divide the search interval in half.
    - Complexity is O(lg N)
        -> Better
    - can implement a interative or a recursive binary search
*/

//Iterative Approach - O(lg N)
function binarySearchIterative(arr, x) {
    let l = 0;
    let r = arr.length - 1;
    let mid;
    while (r >= l) {
        mid = l + Math.floor((r - l) / 2);

        // If the element is present at the middle
        // itself
        if (arr[mid] == x)
            return mid;

        // If element is smaller than mid, then
        // it can only be present in left subarray
        if (arr[mid] > x)
            r = mid - 1;

        // Else the element can only be present
        // in right subarray
        else
            l = mid + 1;
    }

    // We reach here when element is not
    // present in array
    return -1;
}

//Recursive Approach - O(lg N)
function binarySearch(arr, l, r, x) {
    if (r >= l) {
        let mid = l + Math.floor((r - l) / 2);

        // If the element is present at the middle
        // itself
        if (arr[mid] == x)
            return mid;

        // If element is smaller than mid, then
        // it can only be present in left subarray
        if (arr[mid] > x)
            return binarySearch(arr, l, mid - 1, x);

        // Else the element can only be present
        // in right subarray
        return binarySearch(arr, mid + 1, r, x);
    }

    // We reach here when element is not
    // present in array
    return -1;
}

console.log("binary", binarySearch(arr, 0, arr.length-1, item) === -1 ? false : true);
