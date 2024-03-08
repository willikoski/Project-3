const Order = require('../../models/order');
const User = require('../../models/user');

module.exports = {
  cart,
  addToCart,
  setItemQtyInCart,
  checkout,
  history,
  addItemQtyInCart
};

// A cart is the unpaid order for a user
async function cart(req, res) {
  try{
    const cart = await Order.getCart(req.user._id);
    res.status(200).json(cart);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }
}

// Add an item to the cart
async function addToCart(req, res) {
  try{
    const cart = await Order.getCart(req.user._id);
    await cart.addItemToCart(req.params.id);
    res.status(200).json(cart);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }  
}

// Updates an item's qty in the cart
async function setItemQtyInCart(req, res) {
  try{
    const cart = await Order.getCart(req.user._id);
    await cart.setItemQty(req.body.itemId, req.body.newQty);
    res.status(200).json(cart);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }
}

//Add qty

async function addItemQtyInCart(req, res) {
  try {
    const cart = await Order.getCart(req.user._id);
    await cart.addItemQty(req.body.itemId, req.body.incrementBy); // Assuming req.body.incrementBy holds the increment value
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

// Update the cart's isPaid property to true
async function checkout(req, res) {
  try {
    const cart = await Order.getCart(req.user._id);
    // Assuming orderTotal is the total amount to be deducted from the user's balance
    const orderTotal = cart.orderTotal;

    // Update the user's balance by subtracting the order total
    const user = await User.findById(req.user._id);
    user.balance -= orderTotal;
    await user.save();

    // Mark the order as paid
    cart.isPaid = true;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(400).json({ msg: error.message });
  }
}

// Return the logged in user's paid order history
async function history(req, res) {
  // Sort most recent orders first
  try{
    const orders = await Order
      .find({ user: req.user._id, isPaid: true })
      .sort('-updatedAt').exec();
    res.status(200).json(orders);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }

}