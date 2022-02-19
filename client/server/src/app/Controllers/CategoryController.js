const categoryModle = require('../Models/Category')



class CategoryController {
    //[POST] /category/store
    async store(req, res){
        const {name, keyword, desc,display,slug} = req.body;
        const category = await categoryModle.findOne({ name })
        let listError = {};
        if(category){
            listError ={
                email:"Category already in use, please add another category!"
            }
            return res.status(400).json({success:false, message:"Add Category Failure!",listError})
        }
        const categorySave  = new categoryModle({ 
            name,
            keyword,
            desc,
            display,
            slug
        });
        await  categorySave.save()
                .then((result)=>{
                    res.status(200).json({success:true,message:"Add Category Successfully "});
                })
                .catch((error)=>{
                    console.log(error.errors)
                    listError = {
                        name:error.errors.name ? error.errors.name.message : '',
                        keyword:error.errors.keyword ? error.errors.keyword.message : '',
                        desc:error.errors.desc ? error.errors.desc.message  : '',
                        slug:error.errors.slug ? error.errors.slug.message  : ''
                    };
                    res.status(403).json({success:false,message:"Add CategoryFailure!",listError});
                });
        // try {
            
        // } catch (error) {
        //     // console.log(error.message)
        //     res.status(500).json({success:false,message:"Internal Server Error"})
        // }
    }
     //[GET] /manage/:slug
    show(req,res){
        res.send('<h2>Show Page Manager</h2>');
    }
}


module.exports = new CategoryController;