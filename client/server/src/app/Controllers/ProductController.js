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
        let whoCall = req.query.whoCall;
        let type =req.query.type;
        let products ;
        try {
            if(whoCall == 'admin'){
                products = await productModle.find().sort({ createdAt: -1 });
            }else 
            {
                switch (type) {
                    case 'featured':
                        products = await productModle.find({type_display: 1 , display: 1});
                        break;
                    case 'latest':
                        products = await productModle.find({type_display: 2 , display: 1});
                        break;
                    default:
                        products = await productModle.find({display: 1});
                        break;
                }
            }
            console.log(products);
            if(products){
                res.status(200).json({success:true,products});
            }
        } catch (error) {
            res.status(500).json({success:false,error});
        }
    }
    async detail(req,res){
        let id = req.query.id
        
        try {
            const product = await productModle.findOne({_id:id});
            // console.log(product)
            if(product){
                res.status(200).json({success:true,product});
            }
        } catch (error) {
            res.status(400).json({success:false,message:"Category not Found"});
        }
    }

    async update(req,res){
        let listError = {};
        Uploadfile(req,res,(error)=>{
            if(error){
                res.status(400).json({message:'Upload File Failure!',error: error.message})
            }
            else
            {
                const {name, keyword, desc,display,slug,category_id,price,qty,type,old_image,id} = req.body;
                const unlinkAsync = promisify(fs.unlink);
                const opts = { runValidators: true };
                productModle.updateOne({_id:id},{ $set:{ name,keyword,desc,display,slug,category_id,price,qty,type_display:type,image: req.file ? req.file.filename : ''}},opts)
                        .then((result)=>{
                            unlinkAsync(`public\\uploads\\${old_image}`);
                            res.status(200).json({success:true,message:"Update Product Successfully "});
                        })
                        .catch((error)=>{
                            
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
    async delete(req,res){
      const  {id} = req.body; 
      if(!id){
        res.status(403).json({success:false,message:"Delete Product Failure , Infomation not found"});
      }
      try {
        await productModle.findById( id )
                        .then((resoult)=>{
                            const unlinkAsync = promisify(fs.unlink);
                            unlinkAsync(`public\\uploads\\${resoult.image}`);
                        })
        await  productModle.deleteOne({ _id: id })
                .then((result)=>{
                    res.status(200).json({success:true});
                })
      } catch (error) {
        res.status(500).json({success:false,message:"Internal Server Error"})
      }
    }
}


module.exports = new ProductController;