// Write an implementation of a function that generate a query string URL of object.The method take object and URL as parameter and return string ,where every key-value pair converted into query string.

// Below as sample

// *input*

// <pre><code class="javascript">
// {
//   "keyOne": "value One",
//   "keyTwo": "value Two",
//   "keyThree": "value Three",
// }

// url:"https://localhost:400",
// </code></pre> 

// *Output:* 

// <pre><code class="javascript">
// https://localhost:400?keyOne=value one&keyTwo=value Two&keyThree=value Three
// </code></pre>


// Note: Do not modify the original object, return a new object.

function generateQueryString(obj,url) {

    // check if the obj is valid object or not
    if (!obj || typeof obj !== 'object') {
        throw new Error('First argument must be an object');
    }

    // check if the url is in correct format or not
    if (typeof url !== 'string' || url.trim() === '') {
        throw new Error('Second argument must be a non-empty string');
    }

    // generating array from obj object
    let objArray = Object.entries(obj)

    // looping the array and destructure key-value from it
    const queryString = objArray.map(([key, value]) => {
        return `${key.trim()}=${value.trim()}`
    }).join('&');

    // appending url in the query strings generated
    return `${url}?${queryString}`;
    


} 
    const input_data = {
        "keyOne": "  value One",
        "keyTwo": "value Two",
        "keyThree": "value Three",
      }
    
    
      try {
        console.log(generateQueryString(input_data, "http://localhost:4000")); // http://localhost:4000?keyOne=%20%20value%20One&keyTwo=value%20Two&keyThree=value%20Three
    } catch (error) {
        console.error(error.message);
    }