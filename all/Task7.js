// Write an implementation of a function that flattens a nested object. The method takes an object and returns a new flattened object where every nested key-value pair is converter to a flat level i.e child key is concatenated to a parent key with a dot between them.

// Below is the sample

// *input*

// <pre><code class="javascript">
// {
//   "keyOne": "value One",
//   "keyTwo": "value Two",
//   "keyThree": "value Three",
//   "keyFour": {
//     "keyA": true,
//     "keyB": false,
//     "keyC": {
//       "keyCOne": "key C one value",
//       "keyCTwo": "key C two value",
//       "keyCThree": 1234
//     }
//   }
// }

// </code></pre>

// *Output:* 

// <pre><code class="javascript">
// {
//   "keyOne": "value One",
//   "keyTwo": "value Two",
//   "keyThree":"value Three",
//   "keyFour.keyA": true,
//   "keyFour.keyB": false,
//   "keyFour.keyC.keyCOne": "key C one value",
//   "keyFour.keyC.keyCTwo": "key C two value",
//   "keyFour.keyC.keyCThree": 1234
// }
// </code></pre>


// Note: Do not modify the original object, return a new object.


function flattenObject(obj, parentKey, resultData) {
    
    for(let key in obj) {


      // creating of new key for new key-value pair

        const newKey = parentKey ? `${parentKey}.${key}` : key


        // condition check if value of current key is object then recursive call should be made

        if(obj[key] && typeof obj[key] == 'object') {      

            // recursive call

            flattenObject(obj[key], newKey, resultData)

        }
        else {

            //add new key
            
            resultData[newKey] = obj[key]       
        }

    }    

    return resultData;


}

const inputData = {
    "keyOne": "value One",
    "keyTwo": "value Two",
    "keyThree": "value Three",
    "keyFour": {
      "keyA": true,
      "keyB": false,
      "keyC": {
        "keyCOne": "key C one value",
        "keyCTwo": "key C two value",
        "keyCThree": 1234
      }
    }
  }


let resultData= {}
console.log(flattenObject(inputData,'',resultData));

