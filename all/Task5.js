// Write a function that takes an array of arrays (with arbitrary depth) and returns the sum of all numbers.

// NOTE: do not use any of these for, forEach
 
// function sumNestedArray(arr) {
//      Your code here
// }

// console.log(sumNestedArray([1, [2, [3, 4]], 5])); // Output: 15


// main function 
function sumNestedArray(arr) {

    // let flatenedarray = flatten(arr);
    let flatenedarray = flattenReduce(arr) // function flattens the nested array into single array
    // console.log(flatenedarray);

    return flatenedarray.reduce((acc,curr)=>acc+curr,0); // calculate sum of single array elements
}

function flatten(ary) {
    return ary.reduce(function(a, b) {
      if (Array.isArray(b)) {
        console.log(a);
        return a.concat(flatten(b))
      }
      return a.concat(b)
    }, [])
}

let flattenReduce = (ary) => ary.reduce((a, b) => a.concat(Array.isArray(b) ? flattenReduce(b) : b), [])

console.log(sumNestedArray([1, [2, [3, 4,[5,6,4]]], 5]));


// [1, [2, [3, 4]], 5]
// []->acc, curr-1
// [1]->acc, curr-[2,[3,4]]
// new ary = [2,[3,4]]
// [1,2]->acc, curr-[3,4]
// new ary ->[3,4]
// [1,2,3,4]-> acc, curr-5
// final value -> [1,2,3,4,5] -> flattend array