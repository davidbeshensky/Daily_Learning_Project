function qs(arr, lo, hi) {
    if (lo >= hi) {
        return;
    }
    const pivotIdx = partition(arr, lo, hi);
    //repeat on one side and the other side not including pivot.
    qs(arr, lo, pivotIdx - 1);
    qs(arr, pivotIdx + 1, hi);
}
function partition(arr, lo, hi) {
    const pivot = arr[hi];
    let idx = lo - 1;
    for (let i = lo; i < hi; ++i) {
        //each elmnt compared to pivot. 
        if (arr[i] <= pivot) {
            idx++;
            const tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp;
        }
    }
    idx++;
    arr[hi] = arr[idx];
    arr[idx] = pivot;
    return idx;
}
export default function quick_sort(arr) {
    qs(arr, 0, arr.length - 1);
}