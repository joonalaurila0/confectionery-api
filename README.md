## Description

NestJS backend API for the bookstore client using TypeORM and PostgreSQL that uses 'bookstore' database

## User functionality

User is created with the functionality coming from UserRepository and signing in happens through /auth endpoint's signIn service function that validates the user and generates a JWT Token with a payload to the user



## Endpoints

# /users

getUsers

getUserById

createUser

updateUser

updateUserRole

deleteUserById

# /product

getProducts

getProductById

createProduct

updateProduct

updateStatus

deleteProductById

# /orders

getOrders

getOrderById

createOrder

deleteOrder

# /checkout

// nothing implemented yet

# /cart 

getCart

addToCart

removeItem

# /auth

signIn
