docker run \
  --name postgres \
  -e POSTGRES_USER=kleber \
  -e POSTGRES_PASSWORD="senha0001" \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

  docker logs postgres
  docker exec -it postgres psql --username kleber --dbname heroes
  CREATE TABLE warriors (id serial PRIMARY KEY, name VARCHAR(255) not null, type VARCHAR(255) not null);
  SELECT * FROM warriors;
  

  docker run \
    --name mongodb \
    -e MONGO_INITDB_ROOT_USERNAME=kleber \
    -e MONGO_INITDB_ROOT_PASSWORD="senhaadmin" \
    -p 27017:27017 \
    -d \
    mongo:4

  docker logs mongodb