// Write an “assertObjectsEqual” function from scratch which take two object and string as parameter and return string.
// The examples below represent different use cases.
// Task#1888
// Success Case:
// *Input*
// <pre><code class="javascript">
// var expected = {foo: 5, bar: 6};
// var actual = {foo: 5, bar: 6}
// assertObjectsEqual(actual, expected, ‘detects that two objects are equal’);
// </code></pre>

// Output:
// <pre><code class="javascript>
// Passed
// </code></pre>

// Failure Case:
// *Input*
// <pre><code class="javascript>
// var expected = {foo: 6, bar: 5};
// var actual = {foo: 5, bar: 6}
// assertObjectsEqual(actual, expected, ‘detects that two objects are equal’);
// </code></pre>

// *Output*
// <pre><code class="javascript>
// FAILED Expected {“foo”:6,”bar”:5}, but got {“foo”:5,”bar”:6}
// </code></pre>


function assertObjectsEqual(actual, expected, message) {
    // Helper function to compare two objects
    function isEqual(obj1, obj2) {

        // check for both the objects
        if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || !obj1 || !obj2) return false;
        if (obj1 === obj2) return true;

        // taking out keys from the both the objects
        let keys1 = Object.keys(obj1);
        let keys2 = Object.keys(obj2);

        // check if length of both the key are same or not
        if (keys1.length !== keys2.length) return false;

        // looping in keys for obj1
        for (let key of keys1) {
            // if value for particular key is not same in both object then return false
            if (!(key in obj2) || obj1[key] !== obj2[key]) return false;
        }

        return true;
    }

    isEqual(actual, expected) ? console.log('Passed') : console.log(`FAILED Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`);
}
var expected1 = { foo: 5, bar: 6 };
var actual1 = { foo: 5, bar: 6 };
assertObjectsEqual(actual1, expected1, 'detects that two objects are equal');

var expected2 = { foo: 6, bar: 5 };
var actual2 = { foo: 5, bar: 6 };
assertObjectsEqual(actual2, expected2, 'detects that two objects are equal');
