Send post request via curl:
```bash
curl -d '{"query":"query { events }"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:3000/graphql
```
The request without **-H "Content-Type: application/json"** does not work.

# Install and connect Mongo DB
```bash
docker pull mongo
docker run --name some-mongo --rm -e MONGO_INITDB_DATABASE=test -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=rootpassword -p 5080:27017 -d mongo
```

To repair:
```bash
docker run -it -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=rootpassword --rm mongo mongo --host 172.17.0.2 test
```

```bash
docker run --name some-postgres --rm -e POSTGRES_DB=test -e POSTGRES_USER=root -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

To manage and repair
```bash
docker exec -it some-postgres psql test root
```

or

```bash
docker run --name some-adminer --rm -p 8080:8080 -d adminer
```

CREATE DATABASE remark_db;
create user test_user with encrypted password 'qwerty';
GRANT ALL PRIVILEGES ON DATABASE remark_db TO test_user;


127.0.0.1:5080

To start need to install
```bash
npm install --save express express-graphql graphql mongoose pg-promise
```
Install nodemon to automatically restart server, when i change something
```
npm install --save-dev nodemon
```
