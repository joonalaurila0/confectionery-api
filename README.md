<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>


# About The Project

Simple Ecommerce API

# Built With

* [NestJS](https://github.com/nestjs/nest)
* [TypeORM](https://github.com/typeorm/typeorm)
* [PostgreSQL](https://github.com/postgres/postgres)

# Endpoints

## **/users**

### GET
  - fetch
  - fetchById
  - getRoleByUser

### POST
- createUser
- changePassword
- changeEmail

### PATCH
- updateUserRole

### DELETE
- remove


## **/product**

### GET
- fetch
- fetchById

### POST
- create

### PATCH
- update

### DELETE
- remove

## **/orders**

### GET
- fetch
- fetchAll
- fetchById
- fetchOrderItems

### POST
- create
- addPaymentIntent
- getInvoice
- addOrderItems

### UPDATE
- update

### DELETE
- removeOrder

## **/cart**

### GET
- fetchCart
- fetchCartItems
- fetchProductPrice

### POST
- createCart
- addToCart
- removeCartItem
- clearCart

## **/category**

### GET
- fetch

### POST
- create

### PATCH
- update

### DELETE
- remove

## **/promotions**

### GET
- fetchAll
- sendStream

### POST
- create

### PATCH
- update

### DELETE
- remove

## **/auth**

### POST
- signIn
