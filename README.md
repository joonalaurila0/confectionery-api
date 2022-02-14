### About The Project

API for Ecommerce client

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
