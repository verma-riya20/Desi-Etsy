import Cart from '../models/cart.js';

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');

    if (!cart) return res.status(200).json({ items: [] });

    const cleanItems = cart.items
      .filter(item => item.productId)
      .map(item => ({
        id: item.productId._id,
        name: item.productId.name,
        price: Number(item.productId.price),
        image: item.productId.image,
        quantity: item.quantity,
      }));

    res.status(200).json({ items: cleanItems });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart', error: err.message });
  }
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    if (!productId || !quantity) {
      return res.status(400).json({ message: "productId and quantity are required" });
    }

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [{ productId, quantity }] });
    } else {
      const existingItem = cart.items.find(item => item.productId.equals(productId));
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    }

    const updatedCart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    const cleanItems = updatedCart.items
      .filter(item => item.productId)
      .map(item => ({
        id: item.productId._id,
        name: item.productId.name,
        price: Number(item.productId.price),
        image: item.productId.image,
        quantity: item.quantity,
      }));

    res.status(200).json({ items: cleanItems });
  } catch (err) {
    res.status(500).json({ message: 'Error adding to cart', error: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      cart.items = cart.items.filter(item => !item.productId.equals(productId));
      await cart.save();

      const updatedCart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
      const cleanItems = updatedCart.items
        .filter(item => item.productId)
        .map(item => ({
          id: item.productId._id,
          name: item.productId.name,
          price: Number(item.productId.price),
          image: item.productId.image,
          quantity: item.quantity,
        }));

      res.status(200).json({ items: cleanItems });
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error removing item', error: err.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      cart.items = [];
      await cart.save();
      res.status(200).json({ message: 'Cart cleared', items: [] });
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error clearing cart', error: err.message });
  }
};
export const updateCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: "productId and quantity are required" });
    }
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item.productId.equals(productId));
    if (!item) return res.status(404).json({ message: "Product not in cart" });

    item.quantity = quantity;  // set new quantity
    await cart.save();

    const updatedCart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    const cleanItems = updatedCart.items
      .filter(i => i.productId)
      .map(i => ({
        id: i.productId._id,
        name: i.productId.name,
        price: Number(i.productId.price),
        image: i.productId.image,
        quantity: i.quantity,
      }));

    res.status(200).json({ items: cleanItems });
  } catch (err) {
    res.status(500).json({ message: 'Error updating cart', error: err.message });
  }
};
