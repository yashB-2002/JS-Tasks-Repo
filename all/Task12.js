// You are given an array of n elements and a sum value, you have to calculate the total number of ways to calculate the given sum using the elements of the array by using only addition(+) and subtraction operator(-).

// Constraints:
// <pre>
// Value of n should lie between [1,15]
// </pre>
// Sample Input:
// <pre>

// arr => [-1, 9, 8, -3, 4]
// value sum => 5
// </pre>
// Sample Output:
// <pre>
// 8
// </pre>
// Explanation:
// <pre>
// The ways to get 5 as sum are:
// (+)-3 (+)9 (+)-1 
// (+)-3 (+)8 
// (-)-3 (-)8 (+)9 (-)-1 
// (+)4 (-)-1 
// (+)4 (-)8 (+)9 
// (+)4 (-)-3 (+)8 (-)9 (+)-1 
// (-)4 (+)9 
// (-)4 (+)8 (-)-1
// </pre> 


// method to calculate the total ways to find the target sum using the elements
function findTotalWays(arr, idx, currsum,targetSum) {

    // base condition
    if(targetSum == currsum && idx == arr.length) {
        return 1 // return 1 if matched condition is hit as it counts to final answer
    }

    // out of bound condition
    if (idx >= arr.length) {
        return 0; // return 0 because out of bound condition is there it does not count to final total ways
    }

    // considering every case whether to include element(inc/dec) in the currsum and case when curr element is not included 
    return findTotalWays(arr, idx + 1, currsum + arr[idx], targetSum)
             + findTotalWays(arr, idx + 1, currsum - arr[idx], targetSum)
             +findTotalWays(arr, idx + 1, currsum, targetSum)


}

// example
console.log(findTotalWays([-1, 9, 8, -3, 4], 0,0,5))