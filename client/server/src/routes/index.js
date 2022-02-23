
const categoryRouter = require('./category');
const userRouter = require('./user');
const authRouter = require('./auth');
const siteRouter = require('./site');
const authMiddleware = require('../app/Middleware/Authtization')

function route(app){

    app.use('/admin', authRouter);
    app.use('/category',authMiddleware, categoryRouter);
    app.use('/user', userRouter);
    app.use('/', siteRouter);
    
}

module.exports = route