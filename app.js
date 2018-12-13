//re    
const express = require ('express');
const app = express();
const morgan = require('morgan');
const bodyPairser= require('body-parser');
const mongoose = require('mongoose');


const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/order');
const userRoutes = require('./api/routes/user');

//connect mongodb
mongoose.connect('mongodb://admin:'+process.env.MONGO_ATLAS_PW+'@be-rhp-shard-00-00-qnyux.mongodb.net:27017,be-rhp-shard-00-01-qnyux.mongodb.net:27017,be-rhp-shard-00-02-qnyux.mongodb.net:27017/test?ssl=true&replicaSet=BE-RHP-shard-0&authSource=admin&retryWrites=true'
);

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyPairser.urlencoded({extended:false}));
app.use(bodyPairser.json());

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With,Content-Type, Accept,Authorization'
    );
    if(req.method=== 'OPTIONS'){
        res.header(
            'Access-Control-Allow-Methods', 
            'PUT, POST, PATCH, DELETE, GET'
        )
        return res.status(200).json({});    
    }
    next();
});
//routes which handle request
app.use('/products', productRoutes);

app.use('/order', orderRoutes);

app.use('/user', userRoutes);

app.use((req, res,next)=>{
    const error = new Error('Not Found');
    error.status=404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});

module.exports=app;