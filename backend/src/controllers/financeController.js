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

export const  updateFinance = async (req, res) =>{
    try{
        const finance = await Finance.findById(req.params.id);
        if (!finance) return res.status(404).json({message: "Lançamento nao encontrado"});

        if (finance.user.toString() !== req.user.id)
            return res.status(401).json({message: "Não autorizado"});

        const updateFinance = await Finance.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updateFinance)
    }catch(error){
        res.status(500).json({message: error.message})
    }
};

export const deleteFinance = async (req, res) => {
    try {
        const finance = await Finance.findById(req.params.id);
        if(!finance)
            return res.status(400).json({message: "Não encontrado"});
        if (finance.user.toString() !== req.user.id)
            return res.status(401).json({message: "Não autorizado"});

        await finance.deleteOne();
        res.json({message: "Lançamento deletado"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
};