const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const checkToken = (req, res) => {
  console.log('req.user', req.user)
  res.json(req.exp)
}

const dataController = {
  async create (req, res, next) {
    try {
      const user = await User.create(req.body)
      console.log(req.body)
      // token will be a string
      const token = createJWT(user)
      // send back the token as a string
      // which we need to account for
      // in the client
      res.locals.data.user = user
      res.locals.data.token = token
      next()
    } catch (e) {
      console.log('you got a database problem')
      res.status(400).json(e)
    }
  },
  async login (req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) throw new Error()
      const match = await bcrypt.compare(req.body.password, user.password)
      if (!match) throw new Error()
      res.locals.data.user = user
      res.locals.data.token = createJWT(user)
      next()
    } catch {
      res.status(400).json('Bad Credentials')
    }
  }
}


const apiController = {
  auth (req, res) {
    res.json(res.locals.data.token)
  }
}


const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Extract and return user information, including balance
    const { _id, name, email, balance } = user;
    res.json({ _id, name, email, balance });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUserBalance = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { newBalance } = req.body;

    // Fetch the user from the database
    const user = await User.findById(userId);

    // Update the user's balance
    user.balance = newBalance;
    await user.save();

    // Send a success response
    res.status(200).json({ message: 'User balance updated successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error updating user balance:', error);
    res.status(500).json({ error: 'An error occurred while updating user balance' });
  }
};


module.exports = {
  checkToken,
  dataController,
  apiController,
  updateUserBalance,
  getUser
}

/* -- Helper Functions -- */

function createJWT (user) {
  return jwt.sign(
    // data payload
    {  user },
    process.env.SECRET,
    { expiresIn: '24h' }
  )
}