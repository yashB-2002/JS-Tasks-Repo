// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.


// Example 1:

// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
// Example 2:

// Input: intervals = [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 

// Constraints:

// 1 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= starti <= endi <= 104


function mergeIntervals(intervals) {
    if (intervals.length <= 1) return intervals;

    // sort on the basis of start time
    intervals.sort((a, b) => a[0] - b[0]);

    // final merged array 
    const merged = [];

    // starting of with the first interval
    let [start, end] = intervals[0];

    // looping 
    for (let i = 1; i < intervals.length; i++) {
        
        // getting each interval from the array
        const [nextStart, nextEnd] = intervals[i];

        // if current interval can be merged then update the ending time
        if (nextStart <= end) {
            end = Math.max(end, nextEnd);
        } else {
            // interval can not be merged
            merged.push([start, end]);
            [start, end] = intervals[i];
        }
    }

    // last interval should also be added
    merged.push([start, end]);

    return merged;
}

let intervals1 = [[1,3],[2,6],[8,10],[15,18]];
console.log("Output:", mergeIntervals(intervals1));

let intervals2 = [[1,4],[4,5]];
console.log("Output:", mergeIntervals(intervals2));
