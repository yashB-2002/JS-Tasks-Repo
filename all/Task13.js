// task#4457 create a deep copy of object

const first_person = {
    name: "User",
    age: 24,
    address: {
      apartment: "Development",
      city: "Delhi"
    }
  };
  
  const first_person_string = JSON.stringify(first_person); // JSON STRING representation of our first person
  const second_person = JSON.parse(first_person_string); // creates whole new object 
  
  second_person.age = 22;
  second_person.address.apartment = "Dev";
  console.log(first_person);
  console.log(second_person);