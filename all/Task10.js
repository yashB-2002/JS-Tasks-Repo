// For a given expression in the form of a string, find the minimum number of brackets that can be reversed in order to make the expression balanced. The expression will only contain curly brackets.
// If the expression can't be balanced, return -1.
// 
// Example
// <pre>
// Expression: {{{{
// If we reverse the second and the fourth opening brackets, the whole expression will get balanced. Since we have to reverse two brackets to make the expression balanced, the expected output will be 2.

// Expression: {{{
// In this example, even if we reverse the last opening bracket, we would be left with the first opening bracket and hence will not be able to make the expression balanced and the output will be -1.

// </pre>

// Input Format :
// <pre>
// The first and the only line of input contains a string expression, without any spaces in between.
// </pre>

// Output Format :

// <pre>
// The only line of output will print the number of reversals required to balance the whole expression. Prints -1, otherwise.
// </pre>

// Sample Input 1:
// <pre>
// {{{
// </pre>
// Sample Output 1:
// <pre>
// -1
// </pre>

// Sample Input 2:
// <pre>
// {{{{}}
// </pre>
// Sample Output 2:
// <pre>
// 1
// </pre>


function minReversalsToBalance(expression) {
       
    let stack = []; // empty stack to keep the characters
 
    if(expression.length % 2 == 1) return -1 // if expression is of odd length then it can't be balanced

    for(let ch of expression) {
        if(ch == '{') stack.push(ch); 
        else {
            // if stack's top is '{' and incoming char is '}' then only pop out the character because it is valid sequence
            if(stack[stack.length-1] == '{' &&  ch == '}')
                stack.pop();
            else {

                // otherwise push the character
                stack.push(ch);
            }
        }
    }

    let a = 0, b = 0; // a is to keep track of number of opening brackets and b for closing brackets

    for(let ch of stack) {

        if(ch == '{') a++;
        else b++;
    }

    if(Math.ceil((a+b)/2) > 0) return 1; // formula for calculating the valid sequence or not
    else return -1
}
// Example usage:
console.log(minReversalsToBalance("{{{")); 
console.log(minReversalsToBalance("{{{{"));
console.log(minReversalsToBalance("{{{}{}"));
console.log(minReversalsToBalance("{{{{}}")); 
console.log(minReversalsToBalance("}{{}}{{{"));
