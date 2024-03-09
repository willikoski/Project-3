# Rent A Coder
A parody website created of my classmates where you can rent their programming ability on an hourly basis.
##  Seed File To Generate A Database on MongoDB 
```javascript
require('dotenv').config();
require('./database');

const Category = require('../models/category');
const Item = require('../models/item');

(async function() {

  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'Programmers', sortOrder: 10},
    {name: 'Programs', sortOrder: 20},
    {name: 'Videos', sortOrder: 30},
    {name: 'CheatSheets', sortOrder: 40},
    {name: 'Languages', sortOrder: 50},
    {name: 'Desserts', sortOrder: 60},
    {name: 'Drinks', sortOrder: 70},
  ]);

  await Item.deleteMany({});
  const items = await Item.create([
    { name: 'Arthur', emoji: '/img/Arthur.png', category: categories[0]._id, price: 1000.95, github: 'https://github.com/arthurbernierjr' },
    { name: 'Josh', emoji: '/img/Josh.png', category: categories[0]._id, price: 400.95, github: 'https://github.com/yourusername/yourproject' },
    {name: 'Teo', emoji:'/img/Teo.png', category: categories[0], price: 300.95, github: 'https://github.com/yourusername/yourproject' },
    {name: 'Bryce', emoji: '/img/Bryce.jpg', category: categories[0], price: 13.95, github: 'https://github.com/brycesexton' },
    {name: 'Tyler', emoji: '/img/Tyler.png', category: categories[0], price: 25.95, github: 'https://github.com/tylerpierson/' },
    {name: 'Danny', emoji: '/img/Danny.jpg', category: categories[0], price: 25.99, github: 'https://github.com/dwheeler7' },
    {name: 'Jalen', emoji: '/img/Jalen.png', category: categories[0], price: 9.95, github: 'https://github.com/jalensmith17' },
    {name: 'Jeremy', emoji: '/img/Jeremy.png', category: categories[0], price: 5.95, github: 'https://github.com/Jcasanova1990/' },
    {name: 'Juan', emoji: '/img/juan.png', category: categories[0], price: 7.95, github: 'https://github.com/zjuan4101/' },
    {name: 'William', emoji: '/img/william.jpg', category: categories[0], price: 0.95, github: 'https://github.com/willikoski/' },
    {name: 'BlackJack Code', emoji: '/img/Blackjack.jpg', category: categories[1], price: 19.95, github: 'https://github.com/willikoski/Blackjack' },
    {name: 'Tip Splitter Code', emoji: '/img/TipSplitter.png', category: categories[1], price: 14.95, github: 'https://github.com/willikoski/HourlyCalculator' },
    {name: 'BookMarker Code', emoji: '/img/Bookmarks.png', category: categories[1], price: 14.95, github: 'https://github.com/willikoski/bookmarks' },
    {name: 'Rick Roll', emoji: '/img/RickRoll.jpg', category: categories[2], price: 0.00, github: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    {name: 'Willikoski Twitch', emoji: '/img/william.jpg', category: categories[2], price: 0.00, github: 'https://www.twitch.tv/willikoski' },
    {name: 'Arthur Youtube', emoji: '/img/Arthur.png', category: categories[2], price: 0.00, github: 'https://www.youtube.com/@bigpoppacode' },
    {name: 'Arthur PM2 ', emoji: '/img/Arthur.png', category: categories[3], price: 10.00, github: 'https://liberty.sfs-flex.com/cheatsheets/pm2/' },
    {name: 'Arthur React ', emoji: '/img/Arthur.png', category: categories[3], price: 10.00, github: 'https://liberty.sfs-flex.com/cheatsheets/react/' },
    {name: 'Arthur Router', emoji: '/img/Arthur.png', category: categories[3], price: 10.00, github: 'https://liberty.sfs-flex.com/cheatsheets/react-router/' },
    {name: 'Arthur Deployment', emoji: '/img/Arthur.png', category: categories[3], price: 10.00, github: 'https://liberty.sfs-flex.com/cheatsheets/cloud-deployment/' },
    {name: 'Arthur Coffee Script', emoji: '/img/Arthur.png', category: categories[4], price: 999999.00, github: 'https://github.com/arthurbernierjr/coffeescript' },
  ]);

  console.log(items)

  process.exit();

})();
```
## Categories / Model Schema for the project 
### Category.js
```javascript 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true },
  sortOrder: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema); 
```
### Item.js
```javascript 
const mongoose = require('mongoose');
// Ensure the Category model is processed by Mongoose
require('./category');

const itemSchema = require('./itemSchema');

module.exports = mongoose.model('Item', itemSchema);
```

### ItemSchema.js
```javascript 
const item = require('./item');

const Schema = require('mongoose').Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  emoji: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, required: true, default: 0 },
  github: String
}, {
  timestamps: true
});

module.exports = itemSchema;
```
### Order.js
```javascript 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./itemSchema');

const lineItemSchema = new Schema({
  qty: { type: Number, default: 1 },
  item: itemSchema
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

lineItemSchema.virtual('extPrice').get(function() {
  // 'this' is bound to the lineItem subdoc
  return this.qty * this.item.price;
});

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  lineItems: [lineItemSchema],
  isPaid: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

orderSchema.virtual('orderTotal').get(function() {
  return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
});

orderSchema.virtual('totalQty').get(function() {
  return this.lineItems.reduce((total, item) => total + item.qty, 0);
});

orderSchema.virtual('orderId').get(function() {
  return this.id.slice(-6).toUpperCase();
});

orderSchema.statics.getCart = function(userId) {
  // 'this' is the Order model
  return this.findOneAndUpdate(
    // query
    { user: userId, isPaid: false },
    // update
    { user: userId },
    // upsert option will create the doc if
    // it doesn't exist
    { upsert: true, new: true }
  );
};

orderSchema.methods.addItemToCart = async function(itemId) {
  const cart = this;
  // Check if item already in cart
  const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
  if (lineItem) {
    lineItem.qty += 1;
  } else {
    const item = await mongoose.model('Item').findById(itemId);
    cart.lineItems.push({ item });
  }
  return cart.save();
};

// Instance method to set an item's qty in the cart (will add item if does not exist)
orderSchema.methods.setItemQty = function(itemId, newQty) {
  // this keyword is bound to the cart (order doc)
  const cart = this;
  // Find the line item in the cart for the menu item
  const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
  if (lineItem && newQty <= 0) {
    // Calling remove, removes itself from the cart.lineItems array
    lineItem.deleteOne();
  } else if (lineItem) {
    // Set the new qty - positive value is assured thanks to prev if
    lineItem.qty = newQty;
  }
  // return the save() method's promise
  return cart.save();
};

module.exports = mongoose.model('Order', orderSchema);
```
### User
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 6;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minlength: 3,
    required: true
  },
  balance: { type: Number, required: true, default: 10000 }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

userSchema.pre('save', async function(next) {
  // 'this' is the use document
  if (!this.isModified('password')) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = mongoose.model('User', userSchema);
```
