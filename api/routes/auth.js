const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone,
            securityWord: req.body.securityWord,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err){
        res.status(500).json(err);
    }
});


//LOGIN
router.post("/login", async(req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Usuario no registrado!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Contraseña invalida!");

    const{password, ...others} = user._doc;
    res.status(200).json(others);
  } catch(err){
    res.status(500).json(err);
  } 
});

//SECURITYWORD
router.post("/securityWord", async(req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Usuario no registrado!");

    const validated = await bcrypt.compare(req.body.securityWord, user.securityWord);
    !validated && res.status(400).json("Palabra de seguridad invalida!");

    const{securityWord, ...others} = user._doc;
    res.status(200).json(others);
  } catch(err){
    res.status(500).json(err);
  } 
});

module.exports = router;