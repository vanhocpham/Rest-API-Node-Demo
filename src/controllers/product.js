const Product = require('../models/product');
const mongoose = require('mongoose');
exports.products_get_all = (req, res, next) => {
    Product.find()
        .select('_id name price')
        .exec()
        .then(docs => {
            console.log(docs);
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:8818/api/auth/products/' + doc._id
                        }
                    }
                })

            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    }  ;

exports.products_create_product = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created product successfully',
                createdProduct: {
                    _id: result._id,
                    name: result.name,
                    price: result.price,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8818/api/auth/products/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });

};
exports.products_get_id =(req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('_id name price')
        .exec()
        .then(doc => {
            console.log("from databse", doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_PRODUCT',
                        url: 'http://localhost:8818/api/auth/products/'
                    }
                });
            } else {
                res.status(404).json({ message: "No valid entry for provied ID " })
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });

};
exports.products_update_product = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result=>{
            console.log(result);
            res.status(200).json({
                message: 'Product Updated',
                request:{
                    type:'GET',
                    url: 'http://localhost:8818/api/auth/products/'+id
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err})
        });
};

exports.products_delete_id = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message:'Product deleted',
                request:{
                    type: 'POST',
                    url: 'http://localhost:8818/api/auth/products/'+id,
                    body: {name:'String', price:'Number'}
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
};