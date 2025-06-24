const User = require("../models/user")
const validate = require("../utils/validate");
const bcrypt = require("bcrypt");
const jwt = req('');

const register = async (req,res)=>{

  try{
    // Validate  Data
    validate(req.body);
    const {FirstName, LastName, password} = req.body;
    // Email Already Exist   const ans = User.Exist({emailID});

    req.body.password = await bcrypt.hash(password,10);
    const user = await User.create(req.body);

    const token = jwt.sign({emailID},process.env.JWT_KEY,{expiresIn: 60+60});
    res.cookies('token',token,{maxAge:60*60*1000});
    res.status(201).send("User Register Successfully");

  }
  catch(err){
      res.status(400).send("Error"+err);
  }
}

const login = async (req,res)=>{

  try{
    const {emailID,password} = req.body;
    if(!emailID){
      throw new Error("Email is required");
    }
    if(!password){
      throw new Error("Password is required");
    }
    const user = await User.findOne({emailID});

    const match = bcrypt.compare(password,User.password);
    if(!match){
      throw new Error("Invalid Credentials");
    }
    const token = jwt.sign({emailID},process.env.JWT_KEY,{expiresIn: 60+60});
    res.cookies('token',token,{maxAge:60*60*1000});
    res.status(201).send("User Login Successfully");
  }
  catch(err){
      req.status(401).send("Error",+err);
  }
}

// Logout
const logout = async (req,res)=>{

  try{
    
  }
  catch(err){

  }
}
