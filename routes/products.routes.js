const express = require('express');

//Controllers
const {
    createCategory,
    createProductByUser,
    deleteProduct,
    getAllCategories,
    getAllProducts,
    getProductById,
    updateCategory,
    updateProduct,
} = require('../controllers/products.controllers');

//Utils
const { upload } = require('../utils/uploadImgs.utils');

//Middlewares
const {
    createProductValidators,
} = require('../middlewares/validators.middlware');
const { productExists } = require('../middlewares/product.middlware');
const { categoryExists } = require('../middlewares/category.middlware');
const {
    protectCreatorOfProduct,
    protectSession,
} = require('../middlewares/auth.middleware');

const productRouter = express.Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:id', productExists, getProductById);
productRouter.get('/categories', getAllCategories);

productRouter.use(protectSession);

productRouter.post(
    '/',
    upload.array('productImg', 5),
    createProductValidators,
    createProductByUser
);

productRouter.patch(
    '/:id',
    productExists,
    protectCreatorOfProduct,
    updateProduct
);

productRouter.delete(
    '/:id',
    productExists,
    protectCreatorOfProduct,
    deleteProduct
);

productRouter.post('/categories', createCategory);
productRouter.patch('/categories/:id', categoryExists, updateCategory);

module.exports = { productRouter };
