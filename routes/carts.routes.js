const express = require('express');

//Controllers
const {
    addProductToCart,
    removeProductFromCart,
    getUserCart,
    purchaseCart,
    updateProductInCart,
} = require('../controllers/cart.controller');

//Middlewares
const { protectSession } = require('../middlewares/auth.middleware');

const cartRouter = express.Router();

cartRouter.use(protectSession);

cartRouter.get('/', getUserCart);

cartRouter.post('/add-product', addProductToCart);

cartRouter.patch('/update-cart', updateProductInCart);

cartRouter.post('/purchase', purchaseCart);

cartRouter.delete('/:productId', removeProductFromCart);

module.exports = { cartRouter };
