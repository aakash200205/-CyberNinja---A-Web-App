function getProducts(req,res){
    res.render('administrator/products/allProducts');

}


function getNewProducts(req,res){

    res.render('administration/products/newProducts');

}


module.exports={
    getProducts:getProducts,
    getNewProducts:getNewProducts
};