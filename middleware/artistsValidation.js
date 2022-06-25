module.exports = function (req, res, next){

    
        let { artistName, birthDate, bio } = req.body;
    
        if(![artistName, birthDate].every(Boolean)){
            return res.status(401).json("Fill Credentials properly");
        }
        
        artistName = artistName.trim();
        birthDate = birthDate.trim();

        next();

}