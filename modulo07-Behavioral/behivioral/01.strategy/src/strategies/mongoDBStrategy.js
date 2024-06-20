import MongoDB from 'mongodb';
export default class MongoDBStrategy {
  #instance
  constructor(connectionString) {
    const {pathname: dbName} = new URL(connectionString)
    this.connectionString = connectionString.replace(dbName, '');
    this.db = dbName.replace(/\W/, '');
    this.collection = 'warriors'
  }

  async connect() {
  
    const cliente = new MongoDB.MongoClient(this.connectionString, {
      
    })
    await cliente.connect();
    const db = cliente.db(this.db).collection(this.collection);
    this.#instance = db;
  }

  async create(item) {
    return this.#instance.insertOne(item);
  }
  async read(item) {
    return this.#instance.find(item).toArray();
  }

  async clearData() {
    return this.#instance.deleteMany();
  }
}