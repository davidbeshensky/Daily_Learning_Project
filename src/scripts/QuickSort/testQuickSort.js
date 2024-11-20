"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QuickSort_1 = require("./QuickSort");
function testQuickSort() {
    var arr = [5, 2, 9, 1, 5, 6];
    console.log("Original array:", arr);
    (0, QuickSort_1.default)(arr);
    console.log("Sorted array:", arr);
    // Add more test cases
    var arr2 = [3, 1, 4, 1, 5, 9, 2, 6, 5];
    console.log("Original array:", arr2);
    (0, QuickSort_1.default)(arr2);
    console.log("Sorted array:", arr2);
    var arr3 = [];
    console.log("Original array:", arr3);
    (0, QuickSort_1.default)(arr3);
    console.log("Sorted array:", arr3);
}
testQuickSort();
