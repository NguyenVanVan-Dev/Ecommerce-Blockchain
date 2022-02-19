
const categoryRouter = require('./category');
const userRouter = require('./user');
const authRouter = require('./auth');
const siteRouter = require('./site');


function route(app){

    app.use('/admin', authRouter);
    app.use('/category', categoryRouter);
    app.use('/user', userRouter);
    app.use('/', siteRouter);
    
}

module.exports = route