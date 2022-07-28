const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

//Models
const { Product } = require('../models/product.model');
const { Category } = require('../models/category.model');
const { ProductImgs } = require('../models/productImgs.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { storage } = require('../utils/firebase.util');

const getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Product.findAll({ where: { status: 'active' } });

    res.satatus(200).json({ status: 'success', products });
});

const createProductByUser = catchAsync(async (req, res, next) => {
    const { title, description, quantity, price, categoryId } = req.body;
    const { sessionUser } = req;

    const newProduct = await Product.create({
        title,
        description,
        quantity,
        price,
        categoryId,
        userId: sessionUser.id,
    });

    if (req.files.length > 0) {
        const filesPromises = req.files.map(async file => {
            const imgsRef = ref(
                storage,
                `products/${Date.now()}_${file.originalname}`
            );
            const imgRes = await uploadBytes(imgsRef, file.buffer);

            return await ProductImgs.create({
                productId: newProduct.id,
                imgUrl: imgRes.metadata.fullPath,
            });
        });

        await Promise.all(filesPromises);
    }
    //Aqui va el codigo del email

    res.status(201).json({ status: 'success', newProduct });
});

const getProductById = catchAsync(async (req, res, next) => {
    const { product } = req;
    //Map async de awevo!!!
    const productImgsPromises = product.productImgs.map(async productImg => {
        const imgRef = ref(storage, productImg.imgUrl);

        const imgFullPath = await getDownloadURL(imgRef);

        productImg.imgUrl = imgFullPath;
    });

    await Promise.all(productImgsPromises);

    res.status(200).json({ status: 'success', product });
});

const updateProduct = catchAsync(async (req, res, next) => {
    const { product } = req;
    const { title, description, quantity, price } = req.body;

    await product.update({
        title,
        description,
        quantity,
        price,
    });

    res.status(204).json({ status: 'success' });
});

const deleteProduct = catchAsync(async (req, res, next) => {
    const { product } = req;

    await product.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
});

const getAllCategories = catchAsync(async (req, res, next) => {
    const categories = Category.findAll({ where: { status: 'active' } });

    res.status(200).json({ status: 'success', categories });
});

const createCategory = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    const category = await Category.create({ name });

    res.status(201).json({ status: 'succes', category });
});

const updateCategory = catchAsync(async (req, res, next) => {
    const { category } = req;
    const { name } = req.body;

    await category.update({ name });

    res.status(201).json({ status: 'success' });
});

module.exports = {
    getAllProducts,
    createProductByUser,
    getProductById,
    updateProduct,
    deleteProduct,
    getAllCategories,
    createCategory,
    updateCategory,
};
