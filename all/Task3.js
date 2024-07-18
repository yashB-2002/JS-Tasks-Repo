// Implement a calculator function that performs basic calculation operations but the number of arguments provided is not known beforehand.
// ex: Addition of 9,4,12,16,23 and 43


// validator method to check errors 
function validateArguments(type, args,operationsSupported) {
    if (args.length === 0) {
        throw new Error('No arguments provided.');
    }
    if (!args.every(arg => typeof arg === 'number')) {
        throw new Error('All arguments must be numbers.');
    }
    if (operationsSupported.indexOf(type) === -1) {
        throw new Error('Invalid operation type.');
    }
}

// main function
function calculator(type, ...args) {
    let operationsSupported = ['add', 'sub', 'mult', 'div']; // operation supportedin the array
    validateArguments(type, args,operationsSupported); // validate first
    
    let answer;
    
    switch(type) {
        case 'add':
            answer = args.reduce((acc, num) => acc + num);
            break;
        case 'sub':
            answer = args.reduce((acc, num) => acc - num);
            break;
        case 'mult':
            answer = args.reduce((acc, num) => acc * num);
            break;
        case 'div':
            answer = args.reduce((acc, num) => acc / num);
            break;
        default:
            throw new Error('Invalid operation type.');
    }

    return answer;
}

console.log(calculator('add', 2, 1, 3, 4, 21)); 
console.log(calculator('sub', 10, 2, 1, 3)); 
console.log(calculator('mult', 2, 3, 4)); 
console.log(calculator('div', 64, 4, 4, 4)); 
