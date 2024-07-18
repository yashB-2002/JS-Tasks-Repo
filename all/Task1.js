// Implement a method that takes an expression and performs the calculation accordingly.
// example: calculation of [ 1+(2+3)*4-10/2 ]

// Note: Verify that BODMAS is applied in case of complex queries and the correct result is returned.



//? approach 
function infixEvaluation(str) {
    let opstack = []; // stack to keep track of operators
    let valstack = []; // stack to keep track of values

    // utility function
    function applyOperation(val1, val2, operator) {
        switch(operator) {
            case '+': return val1 + val2;
            case '-': return val1 - val2;
            case '*': return val1 * val2;
            case '/': return val1 / val2;
            default: throw new Error("Unsupported operator: " + operator);
        }
    }

    // loop through string
    for(let cha = 0; cha < str.length; cha++) {
        let ch = str[cha]; // curr character

        // extract number from character
        if(!isNaN(Number(ch))) {
            let dig = ch;
            // loop to check if num>9 or not
            while(cha + 1 < str.length && !isNaN(Number(str[cha + 1]))) {
                dig += str[cha + 1];
                cha++;
            }
            valstack.push(Number(dig));


        }
        // check if opstack is empty and if ch == opening bracket then push curr char 
        else if(opstack.length === 0 || ch === '(' || opstack[opstack.length - 1] === '(') {
            opstack.push(ch);
        }
        // if ch == closing bracket
        else if(ch === ')') {

            // calculate values until opening bbracket appears on the top of the stack
            while(opstack[opstack.length - 1] !== '(') {
                let val2 = valstack.pop();
                let val1 = valstack.pop();
                let operator = opstack.pop();
                valstack.push(applyOperation(val1, val2, operator));
            }
            opstack.pop(); // Remove '('
        } 
        
        // if ch == + or - perform opeation which is on top of opstack with values in valstack
        else {
            if(ch === '+' || ch === '-') {
                while(opstack.length > 0 && (opstack[opstack.length - 1] === '+' || opstack[opstack.length - 1] === '-' || opstack[opstack.length - 1] === '*' || opstack[opstack.length - 1] === '/')) {
                    let val2 = valstack.pop();
                    let val1 = valstack.pop();
                    let operator = opstack.pop();
                    valstack.push(applyOperation(val1, val2, operator));
                }
                opstack.push(ch);
            } else if(ch === '*' || ch === '/') {
                while(opstack.length > 0 && (opstack[opstack.length - 1] === '*' || opstack[opstack.length - 1] === '/')) {
                    let val2 = valstack.pop();
                    let val1 = valstack.pop();
                    let operator = opstack.pop();
                    valstack.push(applyOperation(val1, val2, operator));
                }
                opstack.push(ch);
            }
        }
    }

    // perform all the operation left in opstack till only 1 value is left in valstack
    while(opstack.length > 0) {
        let val2 = valstack.pop();
        let val1 = valstack.pop();
        let operator = opstack.pop();
        valstack.push(applyOperation(val1, val2, operator));
    }

    return valstack.pop();
}

console.log(infixEvaluation("2*(5*(3+6))/15-2"));
// console.log("2+3".length);