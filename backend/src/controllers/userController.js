import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "7d"});
};

export const registerUser = async(req, res)=> {
    const{name, email, password} = req.body;
    console.log("req body:", req.body)
    try{
        const userExists = await User.findOne({email});
        if(userExists)
            return res.status(400).json({message: "Usuário ja existe"});

        const user = await User.create({name, email, password});
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
};

export const loginUser = async (req, res)=> {
    const {email, password} = req.body

    try{
        const user = await User.findOne({email});
        if(!user)
            return res.status(400).json({message: "Usuario não foi encontrado"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({message: "Senha Invalida"});

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
};
