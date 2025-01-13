function flashSessionData(req,data,action){
    req.session.flashedData = data;
    req.session.save(action);

};

function getSessionData(req){
    const sessionData = req.session.flashedData;
    req.session.flashedData = null;
    return sessionData;

};


 module.exports={
    flashSessionData:flashSessionData,
    getSessionData:getSessionData
 };