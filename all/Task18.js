// Complete the methods below; they should work for all base cases.

// Prerequisite: Deep dive is needed in Promise before implementation and handling all edge cases.


// class MyPromise {
//     constructor(executor) {
//          Your code here
//     }

//     then(onFulfilled, onRejected) {
//          Your code here
//     }

//     catch(onRejected) {
//          Your code here
//     }

//     static resolve(value) {`
//          Your code here
//     }

//     static reject(reason) {
//          Your code here
//     }
// }

// const promise = new MyPromise((resolve, reject) => {
//     setTimeout(() => resolve('Resolved!'), 1000);
// });

// promise.then(value => console.log(value)); // Output: Resolved!


class Promise{

    // Initial states
    constructor(executor) {

        this.status = 'pending'; // to keep track of current status of promise
        this.value= '';  // value to pass on to the callbacks for executing them
        this.handlers = [];
        


// Resolve function to change the promise state to 'fullfilled
     const resolve = (value) => {

        // if status is pending update it to fullfilled and call the callback for resolve promise
        if(this.status === 'pending') {
            this.status = 'fullfilled';
            this.value = value;
            this.handlers.forEach(cb => cb.onFulfilled(value))
        }
     };

 // Reject function to change the promise state to 'rejected'
     const reject = (value) => {

        // if status is pending update it to rejected and call the callback for rejected promise
        if(this.status === 'pending') {
            this.status = 'rejected';
            this.value = value;
            this.handlers.forEach(cb => cb.onRejected(value))
        }
     };

      // here executed the executor function
      executor(resolve,reject);
    }

    // Method to run callbacks for fulfilled and rejection case
    then(onFulfilled, onRejected) {
        return new Promise((resolve,reject) => {
            if(this.status=='fullfilled') {
                setTimeout(()=>{
                    resolve(onFulfilled(this.value))
                })
            }
            else if(this.status=='rejected') {
                setTimeout(()=>{
                    reject(onRejected(this.value))
                })
            } 
            else{
                this.handlers.push({onFulfilled,onRejected})
            }
        })
    }

}

// example
const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('resolved'), 1000);
});

promise.then(value => console.log(value))
