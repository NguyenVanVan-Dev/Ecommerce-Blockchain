
const NewModel = require('../Models/News')

class SiteController {
    // [GET] /
    index (req, res){
        res.send('<h2>Home Pages </h2>');
    }
    //[GET] /search
    search(req, res){
        res.send('<h2>Search Pages </h2>');
    }
    //[GET] /new 
    store(req,res)
    {
        const news  = new NewModel({ 
            title: 'naice con bò cười',
            content:'1234 ngày ',
        });
        news.save();
        res.send(news);
    }
}


module.exports = new SiteController;