"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = pre_order_search;
function walk(curr, path) {
    // base case
    if (!curr) {
        return path;
    }
    //recurse
    //pre
    path.push(curr.value);
    // console.log("walk(curr.left, path) : ", walk(curr.left, path));
    // console.log("curr.left: ", curr.left);
    // console.log("path, ", path);
    // recurse on left and right using optional chaining
    (curr === null || curr === void 0 ? void 0 : curr.left) && walk(curr.left, path);
    (curr === null || curr === void 0 ? void 0 : curr.right) && walk(curr.right, path);
    //post
    return path;
}
function pre_order_search(head) {
    return walk(head, []);
}
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
var result = pre_order_search(testTree);
// Log the result
console.log("Pre-order traversal result:", result);
