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
    path.push(curr.value);

    // recurse on left and right using optional chaining
    curr?.left && walk(curr.left, path);
    curr?.right && walk(curr.right, path);

    //post
    return path;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
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
const result = pre_order_search(testTree);

// Log the result
console.log("Pre-order traversal result:", result);

/*
lets go over the callstack for this function as its very important
so walk(1, path) is called first
stack: walk(1)

then we call walk on curr.left

stack:
walk(2)
walk(1)

then left again

stack:

walk(4)
walk(2)
walk(1)

since walk(4) is undefined for curr.left and curr.right nothing happens and we pop walk(4) from the stack

now the stack is 

stack:
walk(2)
walk(1)

walk(curr.left, path) hits its base case and thus we start running walk.right

stack:
walk(5)
walk(2)
walk(1)

left fully processed.
walk(3)
walk(1)

then:
walk(6)
walk(3)
walk(1)

walk(7)
walk(3)
walk(1)


*/


