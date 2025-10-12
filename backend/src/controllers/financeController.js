import Finance from "../models/Finance.js";

export const createFinance = async (req, res) =>{
    const {type, amount, category, description, date} = req.body;
    const userId = req.user.id;

    try {
        const finance = await Finance.create({
            user: userId,
            type,
            amount,
            category,
            description,
            date,
        });
        res.status(201).json(finance);
    }
    catch (error){
        res.status(500).json({message: error.message});

    }
};

export const getFinances = async (req, res) =>{
    const userId = req.user.id;

    try{
        const finances = await Finance.find({user: userId}).sort({date: -1});
        res.json(finances);
    }
    catch (error){
        res.status(500).json({message: error.message})
    }
};
