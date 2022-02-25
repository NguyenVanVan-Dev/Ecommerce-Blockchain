const productModle = require('../Models/Product')
const Uploadfile = require('../Middleware/Uploadfile');
const fs = require('fs')
const { promisify } = require('util')


class ProductController {
    
    //[POST] /product/store
    async store(req, res){

        let listError = {};
        Uploadfile(req,res,(error)=>{
            if(error){
                res.status(400).json({message:'Upload File Failure!',error: error.message})
            }
            else
            {
                console.log( req.file);
                const {name, keyword, desc,display,slug,category_id,price,qty,type} = req.body;
                const productSave  = new productModle({ 
                        name,
                        keyword,
                        desc,
                        display,
                        slug,
                        category_id,
                        price,
                        qty,
                        type_display:type,
                        image: req.file ? req.file.filename : ''
                });
                        productSave.save()
                        .then((result)=>{
                            res.status(200).json({success:true,message:"Add Product Successfully "});
                        })
                        .catch((error)=>{
                            const unlinkAsync = promisify(fs.unlink);
                            if(req.file)
                            {
                                unlinkAsync(req.file.path);
                            } else 
                            {
                                listError={
                                    image: 'Please Chose Image for product!'
                                }
                            }
                            listError = {
                                ...listError,
                                name:error.errors.name ? error.errors.name.message : '',
                                keyword:error.errors.keyword ? error.errors.keyword.message : '',
                                desc:error.errors.desc ? error.errors.desc.message  : '',
                                slug:error.errors.slug ? error.errors.slug.message  : ''
                            };
                            res.status(403).json({success:false,message:"Add Product Failure!",listError});
                        });
            }
        })
    }
     //[GET] /category/show
    async show(req,res){
        let whoCall = req.query.whoCall
        let category 
        if(whoCall == 'admin'){
            category = await productModle.find();
        }else {
            category = await productModle.find({display:1});
        }
        console.log(category);
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
        const category = await productModle.findOne({_id:id});
        try {
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
            await  productModle.updateOne({ _id: id },{ $set:{name, keyword, desc,display,slug}},opts)
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
        await  productModle.deleteOne({ _id: id })
                            .then((result)=>{
                                res.status(200).json({success:true,message:"Delete Category Successfully "});
                            })
      } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Server Error"})
      }
    }
}


module.exports = new ProductController;