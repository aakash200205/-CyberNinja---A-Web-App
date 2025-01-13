
const User = require('../model/user');
const authentication_util = require('../util/authentication');
const validation_util = require('../util/validation');
const sessionflash_util = require('../util/sessionFlash');


function getSignup(req,res){
    let sessionData = sessionflash_util.getSessionData(req);

    if(!sessionData){
       sessionData={
        email:'',
        password:'',
        confirmPassword:'',
        fullname:'',
        address:'',
        pincode:'',
        city:''
       }
    }
    res.render('customer/authentication/signup',{inputData:sessionData});

};

async function signup(req,resp){
    const enteredData = {
       email: req.body.email, 
       password: req.body.password,
       confirmPassword : req.body.confirmPassword, 
        fullname:req.body.fullname, 
        address:req.body.address,
        pincode:req.body.pincode, 
        city:req.body.city

    };

    if(!validation_util.checkUserDetails(req.body.email, 
        req.body.password, 
        req.body.fullname, 
        req.body.address,
        req.body.pincode, 
        req.body.city)|| !validation_util.passwordIsConfirmed(req.body.password && req.body.confirmPassword)){
            sessionflash_util.flashSessionData(req,{
                errorMessage : 'Please check the inputs .',
                ...enteredData
            },function(){
               res.redirect('/signup'); 
            });
        
        return;
    }

    const user = new User(req.body.email, req.body.password, req.body.fullname, req.body.address, req.body.pincode, req.body.city);
    
    try{
    const existsAlready = await user.existsAlready();

    if(existsAlready){
        sessionflash_util.flashSessionData(req,{
            errorMessage:'User exists already! Try to login',
            ...enteredData
        },function(){
             res.redirect('/signup');
        });
       
        
        return;
    }

        await user.insertTodb();
    }catch(error){
        next(error);
        return;
    }
                             

                                                        
    resp.redirect('/login');

};

function getLogin(req,resp){
    let sessionData = sessionflash_util.getSessionData(req);

    if(!sessionData){
        sessionData={
            email:'',
            password:'',
        };
    }

    resp.render('/customer/authentication/login',{inputData:sessionData});

};

async function Login(req,res){
    const user = new User(req.body.email,req.body.password);
    let existingUser;
    try{
       existingUser = await user.getUserWithSameEmail();
    }catch(error){
        next(error);
        return;
    }
    

    if(!existingUser){
        sessionflash_util.flashSessionData(req,{
            errorMessage:'Invalid Credentials . Please double check the email and password!',
            email:req.body.email,
            password:req.body.password
        },function(){
             res.redirect('/login');
        });
       
        return;
    }

    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);  //const passwordIsCorrect = await user.hasMatchingPassword()

    if(!passwordIsCorrect){
        sessionflash_util.flashSessionData(req,{
            email:req.body.email,
            password:req.body.password
        },function(){
            res.redirect('/login'); 
        });
       
        return;
    }

    authentication_util.createUserSession(req,existingUser,function(){
        res.redirect('/');
    })

} 

function logout(req,res){
    authentication_util.destroyUserAuthenticationSession(req);
    res.redirect('/login');
}


module.exports = {
    getSignup:getSignup,
    getLogin:getLogin,
    signup:signup,
    Login:Login,
    logout:logout
};