const redis = require('redis');

class RedisClient {
  constructor() {
    this.redisClient = redis.createClient();
    this.redisClient.on('error', (err) => {
      console.log('Error:', err);
    });

    this.redisconnected = false;
    this.redisClient.on('connect', () => {
      this.redisconnected = true;
    });
  }

  isAlive() {
    return this.redisconnected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.redisClient.get(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.redisClient.set(key, value, 'EX', duration, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.redisClient.del(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
