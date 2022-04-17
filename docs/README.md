# HR APP
________
## About
Hr App is an application for employee management. It offers functionality for viewing/adding/editing/deleteing employees, teams and roles as well as authorization.

## Tech Stack
**MEVN** (MongoDB/Express/Vue/Node)

## Frontend architecture
Client side is an SPA composed of 3 main views *Employees.vue*, *Teams.vue*, *Roles.vue*, a view for authentication *Auth.vue* and a 404 view *NotFound.vue*, *TheHeader.vue* component which includes the navigation links and a *ThePagination.vue* component.

Main views use 2 components, a FormComponent and a ListComponent. 
-- Each FormComponent uses *BaseForm.vue* component which serves as basic styling for forms. There are 3 FormComponents, one for each view: *EmployeeForm.vue*, *TeamForm.vue*, *RoleForm.vue*.
-- ListComponent named *ListItems.vue* has a child component *ListItem.vue* and renders it for every item passed to *ListItems.vue* from main views. Every *ListItem.vue* has 2 buttons (styled through *BaseButton.vue*) one for editing and another one for deleting an item. The "Edit" button opens the same FormComponent which is populated with item data.

## Backend architecture
Server side is composed of middlewares for employees, teams, roles, users and another one for error handling. Each middleware has routes made with Express Router. Employees, teams and roles middlewares have all the same structure that consists of 4 routes that GET/POST/PUT/DELETE requests. Afferent controllers have functions for creating/deleting/editing an item and getting all items from database.

**Authorization**
Users middleware has two routes, one for signup and another one for login. Passwords are hashed with *bcrypt*. User login data is transfered to the frontend using *jsonwebtoken* which is used afterwards for detecting user status to authorize editing/adding/deleting items.

## Database architecture
Database is composed of 4 collections: employees, teams, roles, users.

**Employee schema**
Id: Object
Name: String 
Surname: String
Email: String
Birthdate: String
Team: Object(name: String,  manager: String)
Role: String

**Team schema**
Id: Object
Name: String 
Manager: String
createdAt: String
updatedAt: String

**Role schema**
Id: Object
Name: String
createdAt: String
updatedAt: String

**User schema**
Id: Object
Email: String
Password: String
Status: String

#### Pagination
The tehnique used for retrieving limited amount of documents from database (currently set to 10).

## Constraints
- Unauthorized users and authorized users with status of *guest* can only view data.
- Only authorized users with status of *admin* can add/edit/delete data.
- Roles with the same name are not allowed, a role can't be deleted if there are employees that have that role assigned.
- Teams with the same name are not allowed, however a manager can be assigned to multiple teams and a team can't be deleted if there are employees in it.

## Data flow
Let's take for example creating an employee (the same logic applies for roles and teams).

On the frontend user enters data in *EmployeeForm.vue* component: name, surname, email, birthdate, chooses a role from available roles (fetched from database) and a team (each team has a manager so the manager will be selected automatically based on the selected team), then user clicks on *Create* button the *EmployeeForm.vue* then has functions for validating entered data, if it doesn't pass validation then it shows for every separate input if there's something wrong with entered data else data is sent to the parent component, which is *Employees.vue* that then calls a function *addEmployee()* which is sending a post request to the server and waiting for a response.
On the backend the server receives the request and firstly decodes the users's token stored in the Authorization header to check for users status. If the user has admin status then it continues to the *create()* function were creates a new employee using Employee model, add it to the database and sending back to the client a response. If something went wrong it sends a response with the error message and status code.
On the frontend the response contains saved item and it's added to the *items* array on frontend, if an error occured then *TheDialog.vue* will pop up showing the error message.

The same logic applies to teams and roles with some additional checks.

## Installation

In every folder type:
```
npm install
```
Then in the backend folder type:
```
npm start
```
Then in the frontend folder type:
```
npm run serve
```

