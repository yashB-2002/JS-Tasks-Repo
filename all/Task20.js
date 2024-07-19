// Complete the methods below; they should work for all base cases.

// Prerequisite: Deep dive is needed in Event Emitter before implementation and handling all edge cases.

// # Create the EventEmitter Class:
// Start by defining a class called EventEmitter. This class will hold all the necessary methods and properties to manage events and their listeners.

// # Initialize the Events Storage:
// Inside the constructor of the class, initialize an empty object to store events. This object will map event names to arrays of listener functions.

// # Add a Listener (on method):
// Implement a method called on to register a listener for a specific event. This method takes two arguments: the event name and the listener function. If the event doesn't exist in the storage object, initialize it as an empty array. Then, push the listener function to the array corresponding to the event name.

// # Emit an Event (emit method):
// Implement a method called emit to trigger all listeners for a specific event. This method takes the event name as its first argument and any additional arguments to pass to the listeners. If the event exists in the storage object, loop through the array of listeners and call each function with the provided arguments.

// # Remove a Listener (off method):
// Implement a method called off to remove a specific listener for an event. This method takes the event name and the listener function as arguments. If the event exists in the storage object, filter the array of listeners to remove the specified listener function.

// class EventEmitter {
//     constructor() {
//          Your code here
//     }

//     on(event, listener) {
//          Your code here
//     }

//     emit(event, ...args) {
//          Your code here
//     }

//     off(event, listener) {
//          Your code here
//     }
// }

// const emitter = new EventEmitter();
// const greet = (name) => console.log(`Hello, ${name}`);
// emitter.on('greet', greet);
// emitter.emit('greet', 'Alice'); // Output: Hello, Alice
// emitter.off('greet', greet);
// emitter.emit('greet', 'Bob'); // No output




// Function to validate the types of event and callback
function validator(event, expectedType, receivedType, callback, expectedType2, receivedType2) {
    if (typeof event !== expectedType) {
        console.log(`Type of event should be ${expectedType} but received ${receivedType}.`);
    }
    if (typeof callback !== expectedType2) {
        console.log(`Type of callback should be ${expectedType2} but received ${receivedType2}.`);
    }
}

class EventEmitter {

    // to initialize the map
    constructor() {
        this.map = new Map();
    }

    // Method to store an event and its callback
    on(event, callback) {
        validator(event, 'string', typeof event, callback, 'function', typeof callback);

        // if input event is not there add the new event with empty array in it
        if (!this.map.has(event)) {
            this.map.set(event, []);
        }

        // if event is present then register new callback in already present array of callbacks for this event
        this.map.get(event).push(callback);
    }

    // Method to remove an event and its callback
    off(event, callback) {
        validator(event, 'string', typeof event, callback, 'function', typeof callback);

        // if map has a particular event then remove input callback from event's callbacks array 
        if (this.map.has(event)) {
            const callbacks = this.map.get(event).filter(cb => cb !== callback);
            this.map.set(event, callbacks);
        }
    }

    // Method to emit an event and execute there callbacks
    emit(event, ...args) {

        // if event is present in map then call all the callbacks present in its array 
        if (this.map.has(event)) {
            this.map.get(event).forEach(callback => {
                setTimeout(() => callback(...args), 0);
            });

        } 
        
        // if particular event is not there in map then no callback to call
        else {
            console.log(`No such event found: ${event}`);
        }
    }
}

// examples
const emitter = new EventEmitter();
const greet = (...names) => console.log(`Hello, ${names.join(' ')}`);
emitter.on('greet', greet);
emitter.emit('greet', 'Alice', 'Sharma'); 
emitter.off('greet', greet);
emitter.emit('greet', 'Bob'); 
emitter.emit('greeting', 'hops'); 

const emitter2 = new EventEmitter();
const greet2 = (age) => console.log(`Hello, ${age}`);
emitter2.on('greet', greet2);
emitter2.emit('greet', 56); 
// emitter2.off('greet', greet2);
emitter2.emit('greet', 32);


