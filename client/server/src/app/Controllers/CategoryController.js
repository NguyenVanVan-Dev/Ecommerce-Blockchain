const categoryModle = require('../Models/Category')



class CategoryController {
    //[POST] /category/store
    async store(req, res){
        const {name, keyword, desc,display,slug} = req.body;
        console.log(name);
        const category = await categoryModle.findOne({ name })
        let listError = {};
        
        try {
            if(category){
                listError ={
                    name:"Category already in use, please add another category!"
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
        } catch (error) {
            res.status(500).json({success:false,message:"Internal Server Error"})
        }
    }
     //[GET] /category/show
    async show(req,res){
        let whoCall = req.query.whoCall
        let category 
        if(whoCall == 'admin'){
            category = await categoryModle.find();
        }else {
            category = await categoryModle.find({display:1});
        }
        try {
            if(category){
                res.status(200).json({success:true,category});
            }
        } catch (error) {
            res.status(500).json({success:false,error});
        }
    }
    async detail(req,res){
        let id = req.query.id
        console.log(req.query.id)
        try {
            const category = await categoryModle.findOne({_id:id});
            if(category){
                res.status(200).json({success:true,category});
            }
            else
            {
                res.status(403).json({success:false,message:"Category not Found"});
            }
        } catch (error) {
            res.status(500).json({success:false,error});
        }
    }

    async update(req,res){
        const {name, keyword, desc,display,slug,id} = req.body;
        let listError = {};
        
        try {
            const opts = { runValidators: true };
            await  categoryModle.updateOne({ _id: id },{ $set:{name, keyword, desc,display,slug}},opts)
                    .then((result)=>{
                        console.log(result)
                        res.status(200).json({success:true,message:"Update Category Successfully "});
                    })
                    .catch((error)=>{
                        console.log(error.errors)
                        listError = {
                            name:error.errors.name ? error.errors.name.message : '',
                            keyword:error.errors.keyword ? error.errors.keyword.message : '',
                            desc:error.errors.desc ? error.errors.desc.message  : '',
                            slug:error.errors.slug ? error.errors.slug.message  : ''
                        };
                        res.status(403).json({success:false,message:"Update Category Failure!",listError});
                    });
        } catch (error) {
            res.status(500).json({success:false,message:"Internal Server Error"})
        }
    }
    async delete(req,res){
      const  {id} = req.body;
      if(!id){
        res.status(403).json({success:false,message:"Delete Category Failure , Infomation not found"});
      }
      try {
        await  categoryModle.deleteOne({ _id: id })
                            .then((result)=>{
                                res.status(200).json({success:true,message:"Delete Category Successfully "});
                            })
      } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Server Error"})
      }
    }
}


module.exports = new CategoryController;