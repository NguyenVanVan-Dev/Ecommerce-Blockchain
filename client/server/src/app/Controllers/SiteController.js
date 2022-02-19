
class SiteController {
    // [GET] /
    index (req, res){
        res.send('<h2>Home Pages </h2>');
    }
    //[GET] /search
    search(req, res){
        res.send('<h2>Search Pages </h2>');
    }
}


module.exports = new SiteController;