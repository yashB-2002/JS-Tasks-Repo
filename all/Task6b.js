// Implement a calculator to perform the following operation
// 1. Square, sqr Root 
// 2. Log, ln
// 3. sin, tan, and cos
// 4. X to the power Y
// 5. Area of the circle.

// Note:
// * handle cases for a negative number
// * use proper variable declaration


class Calculator {
    // Function to calculate square
    square(x) {
        try {
            return x * x;
        } catch (error) {
            console.error("Error in square operation:", error);
            return NaN; 
        }
    }

    // Function to calculate square root
    squareRoot(x) {
        try {
            if (x < 0) {
                throw new Error("Square root of a negative number is undefined.");
            }
            return Math.sqrt(x);
        } catch (error) {
            console.error("Error in square root operation:", error.message);
            return NaN; 
        }
    }

    // Function to calculate natural logarithm (ln)
    naturalLogarithm(x) {
        try {
            if (x <= 0) {
                throw new Error("Natural logarithm of a non-positive number is undefined.");
            }
            return Math.log(x);
        } catch (error) {
            console.error("Error in natural logarithm operation:", error.message);
            return NaN;
        }
    }

    // Function to calculate base-10 logarithm (log)
    logarithm(x) {
        try {
            if (x <= 0) {
                throw new Error("Logarithm (base 10) of a non-positive number is undefined.");
            }
            return Math.log10(x);
        } catch (error) {
            console.error("Error in logarithm (base 10) operation:", error.message);
            return NaN; 
        }
    }

    // Function to calculate sine
    sine(x) {
        try {
            return Math.sin(x);
        } catch (error) {
            console.error("Error in sine operation:", error);
            return NaN; 
        }
    }

    // Function to calculate cosine
    cosine(x) {
        try {
            return Math.cos(x);
        } catch (error) {
            console.error("Error in cosine operation:", error);
            return NaN; 
        }
    }

    // Function to calculate tangent
    tangent(x) {
        try {
            return Math.tan(x);
        } catch (error) {
            console.error("Error in tangent operation:", error);
            return NaN; 
        }
    }

    // Function to calculate x to the power y
    power(x, y) {
        try {
            return Math.pow(x, y);
        } catch (error) {
            console.error("Error in power operation:", error);
            return NaN; 
        }
    }

    // Function to calculate area of a circle
    areaOfCircle(radius) {
        try {
            if (radius < 0) {
                throw new Error("Radius cannot be negative for calculating area.");
            }
            return Math.PI * this.square(radius);
        } catch (error) {
            console.error("Error in area of circle calculation:", error.message);
            return NaN; 
        }
    }
}

// Example usage:
const calculator = new Calculator();

console.log("Square of 5:", calculator.square(5));
console.log("Square root of 25:", calculator.squareRoot(25));
console.log("Square root of -25:", calculator.squareRoot(-25)); 
console.log("Natural logarithm of 10:", calculator.naturalLogarithm(10));
console.log("Logarithm (base 10) of 100:", calculator.logarithm(100));
console.log("Sine of 90 degrees (in radians):", calculator.sine(Math.PI / 2));
console.log("Cosine of 0 degrees (in radians):", calculator.cosine(0));
console.log("Tangent of 45 degrees (in radians):", calculator.tangent(Math.PI / 4));
console.log("2 to the power 3:", calculator.power(2, 3));
console.log("Area of a circle with radius 5:", calculator.areaOfCircle(5));
