// @desc Authenticate user and get token
// @route POST /api/auth/login
import User from "../models/user.models.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import colors from 'colors'
// helper function to create the token


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{expiresIn: '5d'})
}

// @desc Register a new user
// @route POST /api/auth/register

export const registerUser = async(req, res) => {
    try{
        const { name, email, password, role, phoneNumber} = req.body;

        // check if a user exists already
        const userExists = await User.findOne({ email});
       
        if(userExists){
            return res.status(400).json({message: 'User already exists' })
        }
        
        // creating a user

        const user = await User.create({
            name,
            email,
            password,
            role,
            phoneNumber
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    }catch(error){
            res.status(200).json({message: error.message})
    };
    
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // find the user by the email
  const user = await User.findOne({ email });

  // Check if user exists and password matches

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
    console.log(`${user.name} logged in Sucessfully`.green.underline)
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
