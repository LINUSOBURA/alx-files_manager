const sha1 = require('sha1');
const dbClient = require('../utils/db');

class UserController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Missing password' });
    }

    const existingUser = await dbClient.db.collection('users').findone({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = sha1(password);

    const newUser = {
      email,
      password: hashedPassword,
    };

    try {
      const result = await dbClient.db.collection('users').insertOne(newUser);
      return res.status(201).json({ id: result.insertedId, email });
    } catch (err) {
      return res.status(500).json({ message: 'An error occured while creating the user' });
    }
  }
}

module.exports = UserController;
