"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = quick_sort;
function qs(arr, lo, hi) {
    if (lo >= hi) {
        return;
    }
    var pivotIdx = partition(arr, lo, hi);
    //repeat on one side and the other side not including pivot.
    qs(arr, lo, pivotIdx - 1);
    qs(arr, pivotIdx + 1, hi);
}
function partition(arr, lo, hi) {
    var pivot = arr[hi];
    var idx = lo - 1;
    for (var i = lo; i < hi; ++i) {
        //each elmnt compared to pivot. 
        if (arr[i] <= pivot) {
            idx++;
            var tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp;
        }
    }
    idx++;
    arr[hi] = arr[idx];
    arr[idx] = pivot;
    return idx;
}
function quick_sort(arr) {
    qs(arr, 0, arr.length - 1);
}
