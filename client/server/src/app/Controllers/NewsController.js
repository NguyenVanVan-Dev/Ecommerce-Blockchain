class NewsController {

    index (req, res){
        res.send('<h2>Hello World! Ecommerce Blockchain New Pages</h2>');
    }
}


module.exports = new NewsController;