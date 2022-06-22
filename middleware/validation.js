module.exports = function (req, res, next){
    let {username, email, password} = req.body;

    username = username.trim();
    password = password.trim();
    email = email.trim();

    if(!password || !username || !email){
        return res.status(401).json("Fill Credentials properly");
    }

    function validEmail(email){
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
    }

    if(req.path === "/signup"){
        if(![username, password, email].every(Boolean)){
            return res.status(401).json("Missing Credentials");
        }else if(!validEmail(email)){
            return res.status(401).json("Missing Credentials");
        }

    }
    else if(req.path === "/login"){
        if(![email, password].every(Boolean)){
            return res.status(401).json("Missing Credentials");
        }
    }

    
    next();
}