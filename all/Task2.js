// Make a Calculator that takes function and variables as an argument and returns values based on the calculation of the function provided to it.
// Do this for all the functions implemented.
// Add more function tests: temperature conversion, area, etc.

// Note: 
// * Verify and validate the number of arguments allowed as per the requirement of function provided
// * Handle use of arrow functions


/// make method of validator(value,'num'/'toCel')
const validateInputs = (type, args, totalCount, expectedTypes) => {
    if(args.length !== totalCount) {
        throw new Error(`Invalid number of arguments for ${type}. Expected ${totalCount}, but got ${args.length}.`);
    }
    for(let i = 0; i < totalCount; i++) {
        if(typeof args[i] !== expectedTypes[i]) {
            throw new Error(`Invalid input type for argument ${i+1} of ${type}. but got ${expectedTypes[i]}, received ${typeof args[i]}.`);
        }
    }
}

const calculator = (cb, variables) => {
    const type = variables[0];
    const args = variables.slice(1);

    switch(type) {
        case 'toCel':
        case 'toFah':
            validateInputs(type, args, 1, ['number']);
            break;
        case 'sq':
            validateInputs(type, args, 1, ['number']);
            break;
        case 'rect':
            validateInputs(type, args, 2, ['string', 'number']);
            break;
        default:
            throw new Error('Invalid operation type.');
    }

    return cb(...args);
}

// Utility methods
const tempConvertorCelToFah = (cel) => {
    return Number((cel * 9 / 5) + 32).toFixed(2);
}

const tempConvertorFahToCel = (f) => {
    return Number((f - 32) * 5 / 9).toFixed(2);
}

const areaOfSquare = (side) => {
    return side * side;
}

const areaOfRectangle = (l, b) => {
    return l * b;
}

// Example usage
try {
    const toCel = calculator(tempConvertorFahToCel, ['toCel', 342]);
    console.log('To Celsius:', toCel);
    
    const toFah = calculator(tempConvertorCelToFah, ['toFah', 100]);
    console.log('To Fahrenheit:', toFah);

    const sqArea = calculator(areaOfSquare, ['sq', 4]);
    console.log('Square Area:', sqArea);

    const rectArea = calculator(areaOfRectangle, ['rect', 5, 4]);
    console.log('Rectangle Area:', rectArea);
} catch(e) {
    console.error('Error:', e.message);
}
