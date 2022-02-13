
const UserModel = require('../Models/Users')

class UserController {
    // [GET] /user/create
    create (req, res,next){
        res.send('<h2>User Pages </h2>');
    }
     // [POST] /user/create
    store(req,res,next)
    {
        const user  = new UserModel({ 
            name: 'Mỹ Linh Xinh',
            age:21,
            address: 'Đà nẵng' 
        });
        user.save();
        res.send(user);
    }
}


module.exports = new UserController;