module.exports = function (req, res, next){
    function validEmail(email){
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
    }

    if(req.path === "/signup"){
        let {username, email, password} = req.body;

        username = username.trim();
        password = password.trim();
        email = email.trim();

        if(!password || !username || !email){
            return res.status(401).json("Fill Credentials properly");
        }

        if(![username, password, email].every(Boolean)){
            return res.status(401).json("Missing Credentials");
        }else if(!validEmail(email)){
            return res.status(401).json("Email is incorrect");
        }

    }
    else if(req.path === "/login"){
        let {email, password} = req.body;

        password = password.trim();
        email = email.trim();

        if(!password || !email){
            return res.status(401).json("Fill Credentials properly");
        }

        if(![email, password].every(Boolean)){
            return res.status(401).json("Missing Credentials");
        }else if(!validEmail(email)){
            return res.status(401).json("Email is incorrect");
        }
    }

    
    next();
}