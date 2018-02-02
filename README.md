This is a simple office library service created for learning purposes

- configure

```sh
npm install
```

- run in a dev environment (setups DB as docker image, creates DB structure and populates "demo" data for development)

```sh
npm run start:dev
```

- run in a production-like environment (runs the app using docker-compose, also includes "demo" data)

```sh
npm run start:prod
```

- run tests

```sh
npm test
```

- uninstall (remove docker containers)

```
npm run uninstall
```
