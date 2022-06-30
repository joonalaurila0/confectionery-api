### About The Project

API for [Ecommerce client](https://github.com/oscarl0000/confectionery-store)

#### Built With

* Tested on NodeJS 17.3.0 and npm 8.4.1

* [NestJS](https://github.com/nestjs/nest)
* [TypeORM](https://github.com/typeorm/typeorm)
* [PostgreSQL](https://github.com/postgres/postgres)

#### Quick Start

For running in production:

```console
$ npm i
$ npm run build
$ npm run build:client
$ npm run start:prod
```

alternatively:

```console
$ npm i
$ npm run build
$ node tools.js
$ npm run start:prod
```

#### About running in production and tools.js

If you're on linux, to run this application on production, build the API with `npm run build` and then build the client with `npm run build:client`. If these were succesful, API was built into `dist/` and client was built into `client/dist/`. You can now run the client with `npm run start:prod`, this will serve the client from `client/dist/` from the API.

alternatively for macOS and Windows environments, install the packages first for the api with `npm run install` and then for the client, `npm --prefix ./client run install` which install packages for the client, pointing to the `client/` directory. To build the api and the client you follow similar steps with `npm run build` to build the api and `npm --prefix ./client run build` to build the client. Run `npm run start:prod` to run the application in production, this serves the client from `client/dist/` and runs the api from `dist/`.

Note for windows users: you might have to use `npm run --prefix <directory> --cwd <your path> <command>`

Tools.js serves to build the client for linux machines, specifically tested on Debian 11, and also handle installing packages and cleaning. It can take `--remove-modules` as argument to remove `node_modules/` from the client. Tools.js can also take `--all-tests` as argument, which prompts it run `npm run test` on the client and the api.

#### Resources

The `res/` directory has the schema for database and also data for testing the application.

#### About

Tested to work on Node v17.3.0 and 12.22.5 in Debian 11, 5.10.0-10-amd64 release of linux kernel.

#### What is the client/ directory?

It is directory for the client, you're meant to place the client there

### Docker deployment

To run the docker deployment:
```console
docker-compose up
```

To run the docker deployment from a script with additional tests:
```console
sh res/startup.sh
```

To clean up the docker deployment:
```console
sh res/clean.sh
```

The application can be deployed in docker by using `docker-compose up` and desired flags. Dockerfile builds on a NodeJS version 16.14.0 and alpine, it builds both the api and the client and runs the application on production as a start point. Application serving port is set to be 3000 by default. The docker-compose.yml also pulls and sets up an image of postgres 14.1 that runs on port 5432 as is by default in postgres. Database is initialized with the `init.sql` file from `res/` directory. Be sure to modify the docker-compose.yml to your liking, by default it expects you to have an ready built image of the application.

`res/` directory also has shell scripts for deploying and cleaning up the docker deployment, use this with precaution. `startup.sh` runs `docker-compose up -d` and runs a couple of  tests for the containers.

#### Prerequisites

Node +v16.5.0
npm 8.5.5
