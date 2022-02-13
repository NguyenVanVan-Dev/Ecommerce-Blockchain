
const manageRouter = require('./manage');
const siteRouter = require('./site');


function route(app){

    app.use('/manage', manageRouter);

    app.use('/', siteRouter);
    
}

module.exports = route