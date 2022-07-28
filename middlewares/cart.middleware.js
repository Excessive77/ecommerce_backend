//Models
const { Cart } = require('../models/cart.model');

//Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const userHasCart = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const cart = await Cart.findOne({ where: { id, status: 'active' } });

    if (!cart) {
        return next(new AppError('This cart is not available', 404));
    }

    req.cart = cart;
    next();
});

module.exports = { userHasCart };
