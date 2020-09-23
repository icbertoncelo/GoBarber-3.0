# GoBarber

Third version of the GoBarber application that was develop in Rocketseat bootcamp.

## Installing Dependencies

- Docker

For you are able to run the application, first you must install [docker](https://docs.docker.com/engine) on your OS.

- Node

You can install node using [nvm](https://github.com/nvm-sh/nvm) or accessing [node](https://nodejs.org/en/). I recommend install it using nvm.

- Yarn

Access the [yarn install docs](https://classic.yarnpkg.com/pt-BR/docs/install/#debian-stable)

## Running application

Before all:

- Rename the 'ormconfig.example.json' file to 'ormconfig.json' and set your database configuration.
- After configure the orm, you must create a database using the same name you has setted on ormconfig.json (You can use IDE to make it).
- Now, you must configure the credentials to send emails in development mode in your '.env' file. To make it, you need to access [Ethereal](https://ethereal.email/) and create an account. This is necessary because sometimes the createTestAccount method fall and crash the send email service.

## Running with yarn (Recommended)

In this case you up only the services containers. To make it, in you terminal run:

- You must build and up the services containers
- After build a first time, you can run withot --build flag
- In you terminal run:

```console
docker-compose -f docker-compose-services.yml up --build
```

- Execute the migrations. In you terminal run:

```console
yarn typeorm migration:run
```

- Finaly, Execute the application. In your terminal run:

```console
yarn dev:server
```

### Running with docker

In this case docker will execute the server and all services.

- You must build and up the application containers
- After build a first time, you can run withot --build flag
- In you terminal run:

```console
docker-compose up --build
```

- docker exec -it gostack-server /bin/sh
- Rodar migrations

```console
yarn typeorm migration:run
```
