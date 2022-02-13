
const manageRouter = require('./manage');
const userRouter = require('./user');
const authRouter = require('./auth');
const siteRouter = require('./site');


function route(app){

    app.use('/admin', authRouter);
    app.use('/manage', manageRouter);
    app.use('/user', userRouter);
    app.use('/', siteRouter);
    
}

module.exports = route