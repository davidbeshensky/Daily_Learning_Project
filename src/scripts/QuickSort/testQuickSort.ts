import QuickSort from './QuickSort';

function testQuickSort() {
    const arr = [5, 2, 9, 1, 5, 6];
    console.log("Original array:", arr);
    QuickSort(arr);
    console.log("Sorted array:", arr);

    // Add more test cases
    const arr2 = [3, 1, 4, 1, 5, 9, 2, 6, 5];
    console.log("Original array:", arr2);
    QuickSort(arr2);
    console.log("Sorted array:", arr2);

    const arr3: any = [];
    console.log("Original array:", arr3);
    QuickSort(arr3);
    console.log("Sorted array:", arr3);
}

testQuickSort();
