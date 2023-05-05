const jwt = require('jsonwebtoken');

const fetchUser = (req, res, next)=>{
    const Token = req.header('auth-Token');
    if(!Token){
        res.status(401).send({error: "Please input a valid Token"})
    }
    try {
        const data = jwt.verify(Token, "JWT_SECRET_KEY");
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send({error: "Please input a valid Token"})
    }

}

module.exports = fetchUser;