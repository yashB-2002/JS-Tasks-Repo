// You are given a nested JSON object representing a company's organizational structure. The structure includes departments, employees, and their respective details. Your task is to write a function that performs the following operations:
 
// 1. **Add a new employee** to a specified department.
// 2. **Remove an employee** from a specified department.
// 3. **Update an employee's information** in a specified department.
// 4. **Find all employees** within a specified department.
 
// The JSON object structure is as follows:
 
// ```json
// {
//   "company": {
//     "departments": [
//       {
//         "name": "Engineering",
//         "employees": [
//           { "id": 1, "name": "Alice", "role": "Engineer" },
//           { "id": 2, "name": "Bob", "role": "Senior Engineer" }
//         ]
//       },
//       {
//         "name": "HR",
//         "employees": [
//           { "id": 3, "name": "Carol", "role": "HR Manager" }
//         ]
//       }
//     ]
//   }
// }
// ```
 
// ### Function Signature
 
// ```javascript
// function manageCompany(jsonObject, operation, departmentName, employee) {
// your code here
// }
// ```
 
// ### Parameters
// - `jsonObject`: The JSON object representing the company's organizational structure.
// - `operation`: The operation to perform. It can be one of `"add"`, `"remove"`, `"update"`, or `"find"`.
// - `departmentName`: The name of the department where the operation is to be performed.
// - `employee`: An object representing the employee's information. This parameter is used for `"add"` and `"update"` operations.
 
// ### Example Usage
 
// 1. **Add a new employee to the Engineering department**:
//    ```javascript
//    const jsonObject = {
//      "company": {
//        "departments": [
//          {
//            "name": "Engineering",
//            "employees": [
//              { "id": 1, "name": "Alice", "role": "Engineer" },
//              { "id": 2, "name": "Bob", "role": "Senior Engineer" }
//            ]
//          },
//          {
//            "name": "HR",
//            "employees": [
//              { "id": 3, "name": "Carol", "role": "HR Manager" }
//            ]
//          }
//        ]
//      }
//    };
//    manageCompany(jsonObject, "add", "Engineering", { "id": 4, "name": "Dave", "role": "Intern" });
//    ```
 
// 2. **Remove an employee from the HR department**:
//    ```javascript
//    manageCompany(jsonObject, "remove", "HR", { "id": 3 });
//    ```
 
// 3. **Update an employee's information in the Engineering department**:
//    ```javascript
//    manageCompany(jsonObject, "update", "Engineering", { "id": 2, "name": "Robert", "role": "Lead Engineer" });
//    ```
 
// 4. **Find all employees in the Engineering department**:
//    ```javascript
//    const employees = manageCompany(jsonObject, "find", "Engineering");
//    console.log(employees); // [{ "id": 1, "name": "Alice", "role": "Engineer" }, { "id": 2, "name": "Bob", "role": "Senior Engineer" }]
//    ```


function manageCompany(jsonObject, operation, departmentName, employee = null) {
    const departments = jsonObject.company.departments;

    // Find the department by name
    const department = departments.find(dep => dep.name === departmentName);
    if (!department) {
        throw new Error(`Department ${departmentName} not found`);
    }

    switch (operation) {
        case 'add':

        // if employee is not there
            if (!employee) {
                throw new Error('Employee object should not be empty.');
            }

            // push the employee to the array
            department.employees.push(employee);
            break;
        
        case 'remove':
            // employee check
            if (!employee || !employee.id) {
                throw new Error('Employee object should have id with it');
            }

            // find the index of the employee to be removed
            const removeIndex = department.employees.findIndex(emp => emp.id === employee.id);
            
            // if employee not found
            if (removeIndex === -1) {
                throw new Error(`Employee with id ${employee.id} not found in ${departmentName}`);
            }

            // if found then remove from the orginal array
            department.employees.splice(removeIndex, 1);
            break;
        
        case 'update':
            if (!employee || !employee.id) {
                throw new Error('Employee object should have id with it.');
            }

            // finding the index
            const updateIndex = department.employees.findIndex(emp => emp.id === employee.id);
            if (updateIndex === -1) {
                throw new Error(`Employee with id ${employee.id} not found in ${departmentName}`);
            }
            // console.log(department.employees[updateIndex])
            
            // updating the values at that index
            department.employees[updateIndex] = { ...department.employees[updateIndex], ...employee };
            // console.log(department.employees[updateIndex]);
            break;
        
        case 'find':
            return department.employees;

        default:
            throw new Error(`Unknown operation: ${operation}`);
    }

    return jsonObject;
}

const companyStructure = {
    "company": {
        "departments": [
            {
                "name": "Engineering",
                "employees": [
                    { "id": 1, "name": "Alice", "role": "Engineer" },
                    { "id": 2, "name": "Bob", "role": "Senior Engineer" }
                ]
            },
            {
                "name": "HR",
                "employees": [
                    { "id": 3, "name": "Carol", "role": "HR Manager" }
                ]
            }
        ]
    }
};

// Add a new employee to the Engineering department
manageCompany(companyStructure, "add", "Engineering", { "id": 4, "name": "Eve", "role": "Intern" });

// Remove an employee from the HR department
manageCompany(companyStructure, "remove", "HR", { "id": 3 });

// Update an employee's information in the Engineering department
manageCompany(companyStructure, "update", "Engineering", { "id": 2, "name": "Robert", "role": "Lead Engineer" });

// Find all employees in the Engineering department
const employees = manageCompany(companyStructure, "find", "Engineering");
console.log(employees);