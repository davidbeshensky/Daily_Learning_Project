interface BinaryNode<T> {
    value: T;
    left?: BinaryNode<T>;
    right?: BinaryNode<T>;
}

function walk(curr: BinaryNode<number> | null, path: number[]) {
    // base case
    if (!curr) {
        return path;
    }
    //recurse
    //pre
    // recurse on left and right using optional chaining
    curr?.left && walk(curr.left, path); //walk left till we cant walk left.
    path.push(curr.value);
    curr?.right && walk(curr.right, path);

    //post
    return path;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
return walk(head, []);
}

// the tree represented in our test
//         1
//       /   \
//      2     3
//     / \   / \
//    4   5 6   7
const testTree: BinaryNode<number> = {
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
const result = in_order_search(testTree);

// Log the result
console.log("in-order traversal result:", result);