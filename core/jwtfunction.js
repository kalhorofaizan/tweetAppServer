const jwt = require('jsonwebtoken');
const {jwtScret} = require('../setting/config');


createjwt = (username, email) => {
    const token = jwt
        .sign({username: username, email: email}, jwtScret, {expiresIn: '24h'});
    return 'faizan ' + token;
};

varifyjwt=(req,res,next)=>{
    let token=req.headers['token'];
    if(token.startsWith("faizan ")){
        token=token.slice(7,token.length);
    }
    if (token){
        jwt.verify(token,jwtScret,(err,decoded)=>{
           if (err){
               return res.json({
                   message:"token not verify",
                   success:false,
               })
           }else {
               req.decode=decoded;
               next();
           }
        });
    }else {
        return res.json({
            success:false,
            message:"token not found",
        });
    }
};


module.exports = {createjwt,varifyjwt};
