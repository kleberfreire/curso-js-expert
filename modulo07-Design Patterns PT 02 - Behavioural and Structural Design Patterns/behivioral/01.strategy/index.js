import ContextStrategy from "./src/base/contextStrategy.js";
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js";
import PostgresStrategy from "./src/strategies/postgresStrategy.js";

const postgresConnectionString = "postgres://kleber:senha0001@localhost:5432/heroes";
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString));
await postgresContext.connect();

const mongoDBConnectionString = "mongodb://kleber:senhaadmin@localhost:27017/heroes";
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString));

await mongoDBContext.connect();

// const mongoDBStrategy = new ContextStrategy(new MongoDBStrategy());

const data = [
  {name: 'Kleber',  type: 'transaction'},
  {name: 'mariasilva',  type: 'activityLog'}
]

// await postgresContext.create(data[0]);
// const responsePostgres = await postgresContext.read(data[0]);
// console.log(responsePostgres);


// await mongoDBContext.create(data[1]);
// const responseMongoDB = await mongoDBContext.read(data[1]);
// console.log(responseMongoDB);

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoDBContext
}


for (const {name, type} of data) {
  const context = contextTypes[type];
  await context.create({name: name + Date.now(), type});

  console.log(type, context.dbStrategy.constructor.name)
  
  const response = await context.read({name});
  console.log(response);
}