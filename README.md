# GoBarber

Third version of the GoBarber application that was develop in Rocketseat bootcamp.

## Installing Dependencies

- Docker

For you are able to run the application, first you must install [docker](https://docs.docker.com/engine) on your OS.

- Node

You can install node using [nvm](https://github.com/nvm-sh/nvm) or accessing [node](https://nodejs.org/en/). I recommend install it using nvm.

- Yarn

Access the [yarn install docs](https://classic.yarnpkg.com/pt-BR/docs/install/#debian-stable)

## Running Application

- You must up the application containers. To make it, in you terminal run:

```console
docker-compose -f docker-compose-dev.yml up
```

- Now, rename the ormconfig.example.json to ormconfig.json and set your database configuration.
- After configure the orm, you must create a database using the same name you has setted on ormconfig.json (You can use IDE to make it).
- Execute the migrations. In you terminal run:

```console
yarn typeorm migration:run
```

- Finaly, Execute the application. In your terminal run:

```console
yarn dev:server
```
