const productModle = require('../Models/Product')
const Uploadfile = require('../Middleware/Uploadfile');
const fs = require('fs')
const { promisify } = require('util')


class ProductController {
    
    //[POST] /product/store
    async store(req, res){
        let listError = {};
        const {name, keyword, desc,display,slug,category_id,price,qty,type_display,wallet} = req.body;
        const productSave  = new productModle({ 
                name,
                keyword,
                desc,
                display,
                slug,
                category_id,
                price,
                qty,
                wallet,
                type_display,
                image: req.file ? req.file.filename : ''
        });
        await productSave.save()
                .then((result)=>{
                    res.status(200).json({success:true,id:result._id,message:"Add Product Successfully "});
                })
                .catch((error)=>{
                    const unlinkAsync = promisify(fs.unlink);
                    if(req.file)
                    {
                        unlinkAsync(req.file.path);
                    }  
                    listError = {
                        ...listError,
                        name:error.errors.name ? error.errors.name.message : '',
                        keyword:error.errors.keyword ? error.errors.keyword.message : '',
                        desc:error.errors.desc ? error.errors.desc.message  : '',
                        slug:error.errors.slug ? error.errors.slug.message  : '',
                        price:error.errors.price ? error.errors.price.message  : '',
                        qty:error.errors.qty ? error.errors.qty.message  : '',
                        wallet:error.errors.wallet ? error.errors.wallet.message  : '',
                        image:error.errors.image ? error.errors.image.message  : '',
                    };
                    res.status(400).json({success:false,message:"Add Product Failure!",listError});
                });
                return false;
    }
     //[GET] /product/show
    async show(req,res){
        let whoCall = req.query.whoCall;
        let type =req.query.type;
        let category_id =req.query.category_id;
        let product_id =req.query.product_id;
        let products = {} ;
        let listOne;
        let listTwo;
        try {
            if(whoCall == 'admin'){
                products = await productModle.find().sort({ createdAt: -1 });
            }else 
            {
                switch (type) {
                    case 'featured':
                        products = await productModle.find({type_display: 1 , display: 1}).sort({ createdAt: -1 }).limit(12);
                        break;
                    case 'latest':
                         listOne = await productModle.find({type_display: 2 , display: 1}).sort({ createdAt: -1 }).limit(3);
                         listTwo = await productModle.find({type_display: 2 , display: 1}).sort({ createdAt: -1 }).skip(3).limit(3);
                        products = {
                            listOne,
                            listTwo
                        }
                        break;
                    case 'top-rated':
                         listOne = await productModle.find({type_display: 3 , display: 1}).sort({ createdAt: -1 }).limit(3);
                         listTwo = await productModle.find({type_display: 3 , display: 1}).sort({ createdAt: -1 }).skip(3).limit(3);
                        products = {
                            listOne,
                            listTwo
                        }
                        break;    
                    case 'related-product':
                        products = await productModle.find({type_display: 1 , display: 1, category_id:category_id, _id: { "$ne": product_id }}).sort({ createdAt: -1 }).limit(8);
                        break; 
                    default:
                        products = await productModle.find({display: 1}).sort({ createdAt: -1 });
                        break;
                }
            }
            if(products){
                res.status(200).json({success:true,products});
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({success:false,error});
        }
    }
    //[GET] /product/detail?id=...
    async detail(req,res){
        let id  = req.query.id
        try {
            const product = await productModle.findOne({_id:id});
            if(product){
                res.status(200).json({success:true,product});
            }
        } catch (error) {
            res.status(400).json({success:false,message:"Product not Found"});
        }
    }
    //[PUT] /product/update
    async update(req,res){
        let listError = {};
        const {name, keyword, desc,display,slug,category_id,type_display,id,image} = req.body;
        const unlinkAsync = promisify(fs.unlink);
        const opts = { runValidators: true };
        let update = { $set:{ name,keyword,desc,display,slug,category_id,type_display:type_display,image: req.file ? req.file.filename : image}};
        await productModle.updateOne({_id:id},update,opts)
                            .then((result)=>{
                                if(req.file) 
                                {
                                    unlinkAsync(`public\\uploads\\${image}`);
                                } 
                                res.status(200).json({success:true,message:"Update Product Successfully "});
                            })
                            .catch((error)=>{
                                if(req.file) 
                                {
                                    unlinkAsync(req.file.path);
                                } 
                                listError = {
                                    ...listError,
                                    name:error.errors.name ? error.errors.name.message : '',
                                    keyword:error.errors.keyword ? error.errors.keyword.message : '',
                                    desc:error.errors.desc ? error.errors.desc.message  : '',
                                    slug:error.errors.slug ? error.errors.slug.message  : '',
                                    price:error.errors.price ? error.errors.price.message  : '',
                                    qty:error.errors.qty ? error.errors.qty.message  : '',
                                    image:error.errors.image ? error.errors.image.message  : '',
                                };
                                res.status(400).json({success:false,message:"Add Product Failure!",listError});
                            });
    }
    //[DELETE] /product/delete 
    async delete(req,res){
        const  id = req.query.id; 
        try {
            await productModle.findByIdAndRemove(id)
            .then((result)=>{
                if(result){
                    const unlinkAsync = promisify(fs.unlink);
                    unlinkAsync(`public\\uploads\\${result.image}`);
                    res.status(200).json({success:true});
                }else{
                    throw {message:"Delete Product Failure , Infomation not found"};
                }
               
            });
        } catch (error) {
            res.status(500).json({success:false,message: error.message})
        }
    }
}


module.exports = new ProductController;