function handleErrors (error,req,res,next){
    console.log(error);
    res.status(500).render('customer/errors/500')
}



module.exports = handleErrors;