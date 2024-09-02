const { resolve } = require('mongodb/lib/core/topologies/read_preference');
const redis = require('redis');

class RedisClient {
  constructor() {
    this.redisClient = redis.createClient();
    this.redisconnected = false;
  }

  connectRedis = async () => {
    this.redisClient.on('connect', () => {
      this.redisconnected = true;
    });

    this.redisClient.on('error', (err) => {
      console.log('Error ' + err);
      this.redisconnected = false;
    })
    
  }

  isAlive = () => {
    return this.redisconnected;
  }

  get = async (key) => {
    return new Promise((resolve, reject) => {
      if (!this.isAlive()) {
        this.connectRedis();
      }
      this.redisClient.get(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      })
    })
  }

  set = async (key, value, duration) => {
    return new Promise((resolve, reject) => {
      if (!this.isAlive()) {
        this.connect();
      }
      this.redisClient.set(key, value, 'EX', duration, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      })
    })
  }

  del = async (key) => {
    return new Promise((resolve, reject) => {
      if (!this.isAlive()) {
        this.connect();
      }
      this.redisClient.del(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      })
    })
    
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;