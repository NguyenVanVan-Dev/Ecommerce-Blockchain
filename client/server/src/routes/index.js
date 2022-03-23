
const userRouter = require('./user');
const categoryRouter = require('./category');
const productRouter = require('./product');
const authRouter = require('./auth');
const siteRouter = require('./site');
const contractRouter = require('./contract');
const checkoutRouter = require('./checkout');


function route(app){

    app.use('/admin', authRouter);
    app.use('/product', productRouter);
    app.use('/category', categoryRouter);
    app.use('/contract', contractRouter);
    app.use('/user', userRouter);
    app.use('/checkout', checkoutRouter);
    app.use('/', siteRouter);
    
    
}

module.exports = route