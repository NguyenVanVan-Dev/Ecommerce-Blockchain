class ManageController {
    //[GET] /manage 
    index (req, res){
        res.send('<h2>Hello World! Ecommerce Blockchain Manager</h2>');
    }
     //[GET] /manage/:slug
    show(req,res){
        res.send('<h2>Show Page Manager</h2>');
    }
}


module.exports = new ManageController;