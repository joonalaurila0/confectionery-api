### About The Project

API for [Ecommerce client](https://github.com/oscarl0000/confectionery-store)

REST API built with NestJS 8.4.1 and TypeScript 4.7.4 for the [confectionary-store](https://github.com/oscarl0000/confectionery-store) client, interfaces with PostgreSQL 14.0 with TypeORM 0.3.7 to serve data to the client. API also has Swagger/OpenAPI to give definitions of the routes. Payment gateway is handled through Stripe API and client uses jwt's for authentication of the users, this is implemented through Passport libraries. Integration and end-to-end testing is implemented through jest, sinon and supertest.

* Swagger UI at: `localhost:3000/api`.

#### Built With

* Tested on node 17.3.0 and npm 8.4.1

* [NestJS](https://github.com/nestjs/nest) v8.4.7
* [TypeORM](https://github.com/typeorm/typeorm) 0.3.7
* [PostgreSQL](https://github.com/postgres/postgres) v14.0

#### Quick Start



```console
$ npm install
$ npm run build
$ npm --prefix ./client install
$ npm --prefix ./client run build
$ npm run start:prod
```

### Integration tests

```console
$ npm run test
```

### End-to-end tests

```console
$ npm run test:e2e
```

#### About running in production and tools.js

To deploy this application, install the packages first for the api with `npm run install` and then for the client, `npm --prefix ./client run install` which install packages for the client, pointing to the `client/` directory (client is assumed to be in the directory). To build the api and the client you follow similar steps with `npm run build` to build the api and `npm --prefix ./client run build` to build the client. Run `npm run start:prod` to run the application in production, this serves the client from `client/dist/` and runs the api from `dist/`.

Note for windows users: you might have to use `npm run --prefix <directory> --cwd <your path> <command>`

#### Resources

The `res/` directory has the schema for database and also data for testing and running the application.

#### About

Tested to work on Node v17.3.0 and v12.22.5 in Debian 11, 5.10.0-10-amd64 release of linux kernel.

#### What is the client/ directory?

It is directory for the client, you're meant to place the client there

### Docker deployment

To run the docker deployment:
```console
$ docker-compose up
```

To clean up the docker deployment:
```console
$ sh res/clean.sh
```

The application can be deployed in docker by using `$ docker-compose up` and desired flags. Dockerfile builds on a NodeJS version 16.14.0 and alpine, it builds both the api and the client and runs the application on production as a start point. Application serving port is set to be 3000 by default. The docker-compose.yml also pulls and sets up an image of postgres 14.1 that runs on port 5432 as is by default in postgres. Database is initialized with the `init.sql` file from `res/` directory. Be sure to modify the docker-compose.yml to your liking, by default it expects you to have an ready built image of the application.

`res/` directory also has shell scripts for deploying and cleaning up the docker deployment, use this with precaution. `startup.sh` runs `docker-compose up -d` and runs a couple of  tests for the containers.

### Note on data.sql

In the res/ directory, data.sql contains both insertation.sql and schema.sql contents. This file can be used for deploying the application.

**NOTE: This does not go over sequences and views! Those can also be modified with 'reassigned owned' as long as you're using +v8.2**.

To change the ownership from postgres to another user, remember to change table ownerships as well.
```bash
$ sudo -u postgres psql -d bookstore -c 'ALTER DATABASE bookstore OWNER to <user>;'
$ sudo -u postgres psql -d bookstore -c 'ALTER SCHEMA bookstore OWNER to <user>;'
```

```sql
ALTER TABLE public.cart OWNER to <another_user>;
ALTER TABLE public."cart-item" OWNER to <another_user>;
ALTER TABLE public.category OWNER to <another_user>;
ALTER TABLE public.images OWNER to <another_user>;
ALTER TABLE public."order-item" OWNER to <another_user>;
ALTER TABLE public.orders OWNER to <another_user>;
ALTER TABLE public.product_categories OWNER to <another_user>;
ALTER TABLE public.products OWNER to <another_user>;
ALTER TABLE public.promotions OWNER to <another_user>;
ALTER TABLE public.typeorm_metadata OWNER to <another_user>;
ALTER TABLE public.users OWNER to <another_user>;
```

#### Prerequisites

PostgreSQL +14.0 (or Docker)  
TypeScript +4.7.4  
Node +v16.5.0  
npm +8.5.5  
