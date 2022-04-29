# Crypto Market

## Description
A Crypto market platform built with NestJS and NextJS.

### Requirements

To be able to run the project, first there is some requirements as follow:

- Docker and Docker Compose
- Move .env.example to .env with variables filled

### Installation

To run the project, the following command must be executed:

```
$ docker-compose up --build -d
```

It will build the following containers:

- crypto-market-front
- crypto-market-node
- crypto-market-db

By default, every startup time, the container `crypto-market-node` will seed the user to create an admin role user, with the default credentials of:

```
email: admin@example.com
password: changeme
```

### Routes

To know which routes and socket events are supported, please check the postman collection.
