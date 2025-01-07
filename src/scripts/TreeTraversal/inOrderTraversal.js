"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = in_order_search;
function walk(curr, path) {
    // base case
    if (!curr) {
        return path;
    }
    //recurse
    //pre
    // recurse on left and right using optional chaining
    (curr === null || curr === void 0 ? void 0 : curr.left) && walk(curr.left, path); //walk left till we cant walk left.
    path.push(curr.value);
    (curr === null || curr === void 0 ? void 0 : curr.right) && walk(curr.right, path);
    //post
    return path;
}
function in_order_search(head) {
    return walk(head, []);
}
// the tree represented in our test
//         1
//       /   \
//      2     3
//     / \   / \
//    4   5 6   7
var testTree = {
    value: 1,
    left: {
        value: 2,
        left: {
            value: 4,
        },
        right: {
            value: 5,
        },
    },
    right: {
        value: 3,
        left: {
            value: 6,
        },
        right: {
            value: 7,
        },
    },
};
// Perform pre-order search on the test tree
var result = in_order_search(testTree);
// Log the result
console.log("in-order traversal result:", result);
