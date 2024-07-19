// Implement a calculator to perform the following operation
// - Simple algebraic operations like add, subtract, multiply, divide, modulus, etc.



// function to perform calculate task for different operations
function calculate(n1, n2, type) {
    switch (type) {
        case 'add':
            return n1 + n2;
        case 'sub':
            return n1 - n2;
        case 'mult':
            return n1 * n2;
        case 'div':
            if (n2 === 0) {
                throw new Error('Cannot divide by zero.');
            }
            return (n1 / n2).toFixed(2);
        case 'mod':
            if (n2 === 0) {
                throw new Error('Cannot perform modulus with zero.');
            }
            return n1 % n2;
        default:
            throw new Error('Unsupported operation: ' + type);
    }
}
 
// callmapper functionality to abstract the logic of calculate function
const calMapper = {
    add: (n1, n2) => calculate(n1, n2, 'add'),
    sub: (n1, n2) => calculate(n1, n2, 'sub'),
    mult: (n1, n2) => calculate(n1, n2, 'mult'),
    div: (n1, n2) => calculate(n1, n2, 'div'),
    mod: (n1, n2) => calculate(n1, n2, 'mod')
};
 
// example
try {
    let a1 = calMapper.add(1, 2);
    let a2 = calMapper.sub(3, 4);
    let a3 = calMapper.mult(5, 6);
    let a4 = calMapper.mod(5, 2);
    console.log(a1, a2, a3, a4);
} catch (error) {
    console.error(error);
}
 
