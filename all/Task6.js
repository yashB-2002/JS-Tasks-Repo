// Write a function to convert the source file to the result file.

// The source file contains the array of objects and every object has 3 properties batch_id, name, and contact. Convert this array to another array that has an object having the key of batch_id and the array value of all the objects with the same batch_id.

// Note: also remove the batch_id from every object

//! Source.json file
const source_json = [{
    "batch_id": "123",
    "name": "Tony",
    "contact": "9872276210"
  },
  {
    "batch_id": "231",
    "name": "Steve",
    "contact": "7876543210"
  },
  {
    "batch_id": "123",
    "name": "Bruce",
    "contact": "6776543210"
  },
  {
    "batch_id": "321",
    "name": "Clint",
    "contact": "8954643210"
  },
  {
    "batch_id": "123",
    "name": "Peter",
    "contact": "7666543210"
  },
  {
    "batch_id": "231",
    "name": "Phil",
    "contact": "8896543210"
  },
  {
    "batch_id": "321",
    "name": "Nick",
    "contact": "9876521210"
  }
]

const result_json = [
    {
      "123": [
        {
          "name": "Tony",
          "contact": "9872276210"
        },
        {
          "name": "Bruce",
          "contact": "6776543210"
        },
        {
          "name": "Peter",
          "contact": "7666543210"
        }
      ]
    },
    {
      "231": [
        {
          "name": "Steve",
          "contact": "7876543210"
        },
        {
          "name": "Phil",
          "contact": "8896543210"
        }
      ]
    },
    {
      "321": [
        {
          "name": "Nick",
          "contact": "9876521210"
        },
        {
          "name": "Clint",
          "contact": "8954643210"
        }
      ]
    }
  ]


  // function to get users based on the similar batch id


  function groupSimilarObject(input) {
    const mapOfSimilarUsers = fillMap(input); // function returns filled map with key as batch id and value as an array of users with same batch id
    let answerArray = []; // array to store the final array

    console.log(mapOfSimilarUsers);


    mapOfSimilarUsers.forEach((arr, id) => {
        let answerObj = {}; // object to store the users with same batch id

        let array = arr.map(user => ({
            name: user.name,
            contact: user.contact
        }));

        answerObj[id] = array;
        answerArray.push(answerObj); // pushing each object in final answer array
    });

    return answerArray; // returning answer
}

function fillMap(input) {
  return input.reduce((map, user) => {

    // simply checking if batch id is present in map previously if yes add user in the array for this batch id otherwise create a new batchid and add current user to it.
    map.set(user.batch_id, map.get(user.batch_id) ? [...map.get(user.batch_id), user] : [user]);
    
    return map;

}, new Map()); // initial value of reducer function is new map()
}

console.log(groupSimilarObject(source_json));