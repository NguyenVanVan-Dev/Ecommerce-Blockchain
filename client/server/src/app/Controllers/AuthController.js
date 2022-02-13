const UserModel = require('../Models/Users')

class AuthController {
    register(req,res,next){
        const registerAdmin  = new UserModel({ 
            name: req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            password:req.body.password
        });
        registerAdmin.save()
        .then(data => {
            res.json(data);
        })
        .catch(error =>{ 
            res.json(error);
        });
    }
    login (req, res,next){
        res.send('<h2>Login Pages </h2>');
    }
}


module.exports = new AuthController;