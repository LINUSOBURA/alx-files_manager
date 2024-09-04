const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || '127.0.0.1';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';

    this.url = `mongodb://${this.host}:${this.port}/`;
    this.dbconnected = false;
    this.db = null;
    MongoClient.connect(this.url, { useUnifiedTopology: true }, (err, client) => {
      if (err) {
        console.log(err);
      } else {
        this.db = client.db(this.database);
        this.dbconnected = true;
      }
    });
  }

  isAlive() {
    return this.dbconnected;
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
